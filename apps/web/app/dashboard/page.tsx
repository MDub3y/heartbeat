"use client";

import { useEffect, useState } from "react";
import { MonitorCheck, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import { apiFetch } from "../lib/api";
import { EmptyState } from "./empty-state";

interface Monitor {
  id: string;
  url: string;
  ticks: { status: string; createdAt: string }[];
}

export default function DashboardPage() {
  const [incidents, setIncidents] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIncidents() {
      try {
        // Fetch all monitors
        const data = await apiFetch<{ websites: Monitor[] }>("/website");
        
        // Filter for monitors where the latest status is NOT "Up"
        const downMonitors = data.websites.filter(
            site => site.ticks.length > 0 && site.ticks[0].status !== "Up"
        );
        
        setIncidents(downMonitors);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <Loader2 className="w-8 h-8 text-[#5B63D3] animate-spin" />
      </div>
    );
  }

  // No active incidents -> Show "All Good" Empty State
  if (incidents.length === 0) {
    return (
      <div className="p-8 max-w-6xl mx-auto h-full">
        <div className="flex justify-between items-center mb-8">
            <h1 className="dashboard-h1">Incidents</h1>
        </div>
        <div className="-mt-20">
        <EmptyState         
            title="No active incidents"
            description="All your monitors are operational. Good job!"
            buttonText="View Monitors"
            buttonHref="/dashboard/monitors"
            imageSrc="/dashboard/escalation-policies-dark.png" 
        />
        </div>
      </div>
    );
  }

  // Active Incidents List
  return (
    <div className="p-8 max-w-6xl mx-auto">
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="dashboard-h1">Active Incidents</h1>
        <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-medium">{incidents.length} Service(s) Down</span>
        </div>
      </div>

      <div className="dashboard-card overflow-hidden border-red-500/30">
        <div className="grid grid-cols-[1fr_200px_200px] gap-4 px-6 py-3 border-b border-[#26272F] bg-[#1A1B26] text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
            <div>Incident</div>
            <div>Started at</div>
            <div>Status</div>
        </div>

        {incidents.map((incident) => (
            <div key={incident.id} className="grid grid-cols-[1fr_200px_200px] gap-4 px-6 py-4 border-b border-[#26272F] last:border-0 hover:bg-[#1A1B26]/30 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                        <div className="text-white font-medium group-hover:text-red-400 transition-colors">{incident.url} is down</div>
                        <div className="text-xs text-[#9CA3AF] mt-1">Connection timed out or returned error</div>
                    </div>
                </div>
                <div className="text-sm text-[#9CA3AF]">
                    {new Date(incident.ticks[0].createdAt).toLocaleString()}
                </div>
                <div className="text-sm text-red-400 font-medium">
                    Critical
                </div>
            </div>
        ))}
      </div>

    </div>
  );
}