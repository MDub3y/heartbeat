"use client";

import Link from "next/link";
import { Loader2, Plus, MoreHorizontal, ArrowUpRight, Search } from "lucide-react";
import { EmptyState } from "../empty-state";
import { useEffect, useState } from "react";
import { apiFetch } from "@/app/lib/api";

interface Monitor {
  id: string;
  url: string;
  ticks: { status: string; response_time_ms: number; createdAt: string }[];
}

export default function MonitorsPage() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMonitors() {
      try {
        const data = await apiFetch<{ websites: Monitor[] }>("/website");
        setMonitors(data.websites);
      } catch (e) {
        console.error("Failed to fetch monitors", e);
      } finally {
        setLoading(false);
      }
    }
    fetchMonitors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <Loader2 className="w-8 h-8 text-[#5B63D3] animate-spin" />
      </div>
    );
  }

  // Only show EmptyState if there are truly NO monitors
  if (monitors.length === 0) {
    return (
      <EmptyState 
        title="No monitors yet"
        description="Start monitoring your website uptime, SSL certificates, and APIs in seconds."
        buttonText="Create your first monitor"
        buttonHref="/dashboard/monitors/new"
      />
    );
  }

  return (
    <div className="w-full lg:w-[calc(100%-272px)] mx-auto">
        {/* Header / Sub-nav */}
        <div className="flex items-center justify-between px-5 h-[52px] border-b border-[#26272F] bg-[#0B0C14]">
            <div className="flex items-center gap-2 font-medium text-white">
                <span className="text-[#9CA3AF]">Monitors</span>
            </div>
            <Link href="/dashboard/monitors/new" className="p-1 hover:bg-[#26272F] rounded text-[#9CA3AF] hover:text-white transition">
                <Plus className="w-5 h-5" />
            </Link>
        </div>

        <main className="p-5 lg:pt-8 max-w-[1040px] mx-auto">
            {/* Monitor Group List */}
            <div className="mb-8">
                <div className="rounded-lg border border-[#26272F] bg-[#13141C] overflow-hidden">
                    {/* Group Header */}
                    <div className="px-5 py-3 border-b border-[#26272F] bg-[#1A1B26]/50 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-medium">
                            <span className="text-white">Monitors</span>
                            <span className="px-2 py-0.5 rounded bg-[#26272F] text-xs text-[#9CA3AF]">{monitors.length}</span>
                        </div>
                    </div>

                    {/* List Items */}
                    <div>
                        {monitors.map((monitor) => {
                            const lastTick = monitor.ticks?.[0];
                            const isUp = lastTick?.status === "Up";
                            const hasData = monitor.ticks.length > 0;

                            return (
                                <Link 
                                    key={monitor.id} 
                                    href={`/dashboard/monitors/${monitor.id}`}
                                    className="block px-5 py-4 border-b border-[#26272F] last:border-0 hover:bg-[#1F212E] transition-colors group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 min-w-0">
                                            {/* Status Dot */}
                                            <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                                                {hasData ? (
                                                    <>
                                                        <span className={`absolute inline-flex h-full w-full rounded-full opacity-20 animate-ping ${isUp ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                        <div className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isUp ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                    </>
                                                ) : (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-500/50"></div>
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <div className="text-white font-semibold truncate mb-0.5 text-[15px]">
                                                    {monitor.url.replace(/^https?:\/\//, '')}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                                                    {hasData ? (
                                                        <>
                                                            <span className={isUp ? "text-green-400" : "text-red-400"}>
                                                                {isUp ? "Up" : "Down"}
                                                            </span>
                                                            <span>·</span>
                                                            <span>{new Date(lastTick!.createdAt).toLocaleTimeString()}</span>
                                                        </>
                                                    ) : (
                                                        <span>Pending first check...</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                                                <span className="w-3 h-3 rounded-full border border-[#9CA3AF] flex items-center justify-center text-[8px]">3m</span>
                                                3m
                                            </div>
                                            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#26272F] text-[#9CA3AF] transition">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}