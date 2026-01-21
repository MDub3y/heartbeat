"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldAlert, 
  Calendar, 
  List, 
  Activity, 
  Globe, 
  Signal, 
  LayoutGrid, 
  BarChart3,
  ChevronRight,
  LogOut
} from "lucide-react";

import { signOut, useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const handleSignOut = async () => {
    await signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/");
            },
        },
    });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[#13141C] border-r border-[#26272F] flex flex-col z-50">
      
      {/* Logo Area */}
      <div className="h-[60px] flex items-center px-5 border-b border-[#26272F]">
        <Link href="/dashboard" className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="w-5 h-5 bg-white text-black flex items-center justify-center rounded-[4px] text-[10px]">▲</div>
            <span className="font-roboto tracking-tight">Better Stack</span>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        
        {/* Group: Uptime */}
        <div className="px-3 mb-2 mt-2 text-xs font-semibold text-[#555B6D] uppercase tracking-wider">
            Uptime
        </div>

        <NavItem href="/dashboard" icon={<ShieldAlert />} label="Incidents" active={pathname === "/dashboard"} />
        <NavItem href="/dashboard/on-call" icon={<Calendar />} label="Who's on-call?" active={isActive("/dashboard/on-call")} />
        <NavItem href="/dashboard/policies" icon={<List />} label="Escalation policies" active={isActive("/dashboard/policies")} />
        <NavItem href="/dashboard/monitors" icon={<Globe />} label="Monitors" active={isActive("/dashboard/monitors")} />
        <NavItem href="/dashboard/heartbeats" icon={<Activity />} label="Heartbeats" active={isActive("/dashboard/heartbeats")} />
        <NavItem href="/dashboard/status-pages" icon={<Signal />} label="Status pages" active={isActive("/dashboard/status-pages")} />

        {/* Group: Tools */}
        <div className="px-3 mb-2 mt-6 text-xs font-semibold text-[#555B6D] uppercase tracking-wider">
            Tools
        </div>
        <NavItem href="/dashboard/integrations" icon={<LayoutGrid />} label="Integrations" active={isActive("/dashboard/integrations")} />
        <NavItem href="/dashboard/reporting" icon={<BarChart3 />} label="Reporting" active={isActive("/dashboard/reporting")} />

      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-[#26272F]">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5B63D3] flex items-center justify-center text-xs text-white font-bold">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                    {session?.user?.name || "User"}
                </div>
                <div className="text-xs text-[#9CA3AF] truncate">
                    {session?.user?.email}
                </div>
            </div>
            <button 
                onClick={handleSignOut}
                className="text-[#555B6D] hover:text-white transition-colors"
                title="Sign out"
            >
                <LogOut className="w-4 h-4" />
            </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
    return (
        <Link 
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                active 
                ? "bg-[#26272F] text-white" 
                : "text-[#9CA3AF] hover:bg-[#26272F]/50 hover:text-white"
            }`}
        >
            <span className={active ? "text-[#5B63D3]" : "text-[#555B6D]"}>
                {/* Clone element to force size if needed, or rely on CSS */}
                <div className="w-5 h-5">{icon}</div>
            </span>
            {label}
        </Link>
    )
}