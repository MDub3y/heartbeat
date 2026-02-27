"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    Pause,
    ShieldAlert,
    Send,
    Settings,
    Loader2
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { apiFetch } from "@/app/lib/api";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";

interface MonitorDetail {
    id: string;
    url: string;
    ticks: {
        id: string;
        status: string;
        response_time_ms: number;
        createdAt: string;
    }[];
}

export default function MonitorDetailsPage() {
    const params = useParams();
    const [monitor, setMonitor] = useState<MonitorDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetails() {
            try {
                const data = await apiFetch<MonitorDetail>(`/status/${params.id}`);
                setMonitor(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchDetails();
    }, [params.id]);

    function calculateAvailability(ticks: any[], days: number) {
        if (ticks.length === 0) return { percentage: "0.00%", downtime: "None", incidents: 0 };

        const now = new Date();
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

        const relevantTicks = ticks.filter(t => new Date(t.createdAt) >= cutoff);
        if (relevantTicks.length === 0) return { percentage: "100.00%", downtime: "None", incidents: 0 };

        const total = relevantTicks.length;
        const upTicks = relevantTicks.filter(t => t.status === "Up").length;
        const downTicks = total - upTicks;
        const percentage = ((upTicks / total) * 100).toFixed(2);

        const downtimeMinutes = downTicks * 3;
        const downtimeStr = downtimeMinutes > 0
            ? `${Math.floor(downtimeMinutes / 60)}h ${downtimeMinutes % 60}m`
            : "None";

        return {
            percentage: `${percentage}%`,
            downtime: downtimeStr,
            incidents: downTicks > 0 ? 1 : 0
        };
    }

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-[#5B63D3]" /></div>;
    if (!monitor) return <div className="p-10 text-white">Monitor not found</div>;

    const lastTick = monitor.ticks[0];
    const isUp = lastTick?.status === "Up";
    const hasData = monitor.ticks.length > 0;

    // Chart Data
    const chartData = [...monitor.ticks].reverse().map(t => ({
        time: new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        latency: t.response_time_ms
    }));

    return (
        <div className="w-full lg:w-[calc(100%-272px)] mx-auto min-h-screen bg-[#1f2433]">

            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-5 h-[52px] border-b border-[#2f3647] bg-[#1f2433]/80 backdrop-blur-md">
                <Breadcrumbs items={[{ label: monitor.url.replace(/^https?:\/\//, '') }]} />
            </div>

            <main className="px-5 py-8 lg:pt-10 max-w-[1040px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
                    <div className="flex items-start gap-4">
                        {/* Status Pulse */}
                        <div className="relative mt-1">
                            <div className={`w-3 h-3 rounded-full ${isUp ? 'bg-green-500' : 'bg-red-500'} ${!hasData ? 'bg-gray-500' : ''}`}></div>
                            {hasData && <div className={`absolute -inset-1 rounded-full opacity-30 animate-pulse ${isUp ? 'bg-green-500' : 'bg-red-500'}`}></div>}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-white leading-tight">{monitor.url}</h1>
                            <div className="flex items-center gap-2 mt-1 text-[15px] font-medium">
                                {hasData ? (
                                    <span className={isUp ? "text-green-400" : "text-red-400"}>{isUp ? "Up" : "Down"}</span>
                                ) : (
                                    <span className="text-gray-400">Pending</span>
                                )}
                                <span className="text-[#555B6D]">·</span>
                                <span className="text-[#9CA3AF] font-normal">Checked every 3 minutes</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <ActionButton icon={<Send className="w-4 h-4" />} label="Send test alert" />
                    <ActionButton icon={<ShieldAlert className="w-4 h-4" />} label="Incidents" />
                    <ActionButton icon={<Pause className="w-4 h-4" />} label="Pause" />
                    <ActionButton icon={<Settings className="w-4 h-4" />} label="Configure" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <StatCard label="Currently up for" value={isUp ? "5d 3h 30m" : "0s"} />
                    <StatCard label="Last checked at" value={lastTick ? "Just now" : "Never"} />
                    <StatCard label="Incidents" value="0" />
                </div>

                {/* Response Chart */}
                <div className="rounded border border-[#2f3647] bg-[#222838] mb-8 overflow-hidden">
                    <div className="px-5 py-3 border-b border-[#2f3647] flex justify-between items-center">
                        <h3 className="text-sm font-medium text-white bg-[#222838]">Response times</h3>
                        <div className="flex gap-2">
                            <span className="text-xs text-[#9CA3AF] px-2 py-1 rounded bg-[#2f3647]">Europe</span>
                            <span className="text-xs text-white px-2 py-1 rounded bg-[#2f3647]">24h</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full p-4 relative bg-[#1A1B26]/50">
                        {hasData ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#5B63D3" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#5B63D3" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2f3647" vertical={false} />
                                    <XAxis dataKey="time" hide />
                                    <YAxis stroke="#555B6D" fontSize={12} tickFormatter={(v) => `${v}ms`} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#222838', borderColor: '#2f3647', color: '#fff' }} />
                                    <Area type="monotone" dataKey="latency" stroke="#5B63D3" fillOpacity={1} fill="url(#colorLatency)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-[#555B6D] text-sm">
                                No data recorded yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Availability Table */}
                <div className="rounded border border-[#2f3647] overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className=" border-b bg-[#222838] border-[#2f3647] text-[#9CA3AF]">
                            <tr>
                                <th className="px-5 py-3 font-medium">Time period</th>
                                <th className="px-5 py-3 font-medium text-right">Availability</th>
                                <th className="px-5 py-3 font-medium text-right">Downtime</th>
                                <th className="px-5 py-3 font-medium text-right">Incidents</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2f3647] text-[#C9D3EE]">
                            {[
                                { label: "Today", days: 1 },
                                { label: "Last 7 days", days: 7 },
                                { label: "Last 30 days", days: 30 }
                            ].map((period) => {
                                const stats = calculateAvailability(monitor.ticks, period.days);
                                return (
                                    <tr key={period.label} className="hover:bg-[#1F212E] transition-colors">
                                        <td className="px-5 py-3">{period.label}</td>
                                        <td className={`px-5 py-3 text-right font-medium ${parseFloat(stats.percentage) < 100 ? "text-yellow-400" : "text-green-400"
                                            }`}>
                                            {stats.percentage}
                                        </td>
                                        <td className="px-5 py-3 text-right text-[#9CA3AF]">
                                            {stats.downtime}
                                        </td>
                                        <td className="px-5 py-3 text-right">{stats.incidents}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
}

// Helpers
function ActionButton({ icon, label }: { icon: React.ReactNode, label: string; }) {
    return (
        <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-transparent hover:bg-[#1F212E] text-[#C9D3EE] hover:text-white transition-colors text-sm font-medium">
            {icon}
            {label}
        </button>
    );
}

function StatCard({ label, value }: { label: string, value: string; }) {
    return (
        <div className="p-5 rounded border border-[#2f3647] bg-[#222838]">
            <h6 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-2">{label}</h6>
            <h2 className="text-xl font-medium text-white">{value}</h2>
        </div>
    );
}