import { MonitorCheck, ShieldCheck } from "lucide-react";

// This simulates the "Incidents" view from image_1fab23.png
export default function DashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="dashboard-h1">Incidents</h1>
        
        <div className="flex gap-3">
            <input 
                type="text" 
                placeholder="Search" 
                className="h-9 px-3 rounded bg-[#13141C] border border-[#26272F] text-sm text-white focus:border-[#5B63D3] outline-none w-64" 
            />
            <button className="h-9 px-4 rounded bg-[#5B63D3] hover:bg-[#4d55c4] text-white text-sm font-medium transition-colors">
                Report a new incident
            </button>
        </div>
      </div>

      <div className="dashboard-card overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_200px_200px] gap-4 px-6 py-3 border-b border-[#26272F] bg-[#1A1B26] text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
            <div>Incident</div>
            <div>Started at</div>
            <div>Length</div>
        </div>

        {/* Empty State / Rows */}
        <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-white font-medium mb-1">No open incidents</h3>
            <p className="text-[#9CA3AF] text-sm">Everything is running smoothly.</p>
        </div>
        
        {/* Example Row (Hidden/Commented for visual accuracy of 'no incidents') */}
        {/* <div className="grid grid-cols-[1fr_200px_200px] gap-4 px-6 py-4 border-b border-[#26272F] hover:bg-[#1A1B26] transition-colors cursor-pointer group">
            <div className="flex items-start gap-3">
                <MonitorCheck className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                    <div className="text-white font-medium group-hover:text-[#5B63D3] transition-colors">API Down</div>
                    <div className="text-xs text-[#9CA3AF] mt-1">Timeout (no headers received)</div>
                </div>
            </div>
            <div className="text-sm text-[#9CA3AF]">Oct 24, 2025 at 10:00 AM</div>
            <div className="text-sm text-[#9CA3AF]">2 minutes</div>
        </div>
        */}
      </div>

    </div>
  );
}