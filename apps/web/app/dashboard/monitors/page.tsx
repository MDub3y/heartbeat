import Link from "next/link";
import { Plus } from "lucide-react";

export default function MonitorsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="dashboard-h1">Monitors</h1>
            <Link href="/dashboard/monitors/new" className="btn-primary gap-2">
                <Plus className="w-4 h-4" />
                Create monitor
            </Link>
        </div>

        {/* Empty State / List Placeholder */}
        <div className="dashboard-card p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-[#1F212E] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#5B63D3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">No monitors yet</h3>
            <p className="text-[#9CA3AF] max-w-md mb-6">
                Start monitoring your website uptime, SSL certificates, and APIs in seconds.
            </p>
            <Link href="/dashboard/monitors/new" className="btn-primary">
                Create your first monitor
            </Link>
        </div>
    </div>
  );
}