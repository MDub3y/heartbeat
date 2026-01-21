"use client";

import Link from "next/link";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Calendar, 
  Activity, 
  FileText, 
  Search, 
  Terminal, 
  Server, 
  AlertCircle, 
  Database, 
  Users, 
  BookOpen, 
  HelpCircle, 
  ArrowLeftRight, 
  Briefcase, 
  Code2, 
  ShieldCheck, 
  Newspaper 
} from "lucide-react";
import { ReactNode, useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full max-w-[1110px] mx-auto flex justify-center sticky top-0 z-50 pt-0 bg-[#0c0d14]/80 backdrop-blur-md border-b border-[#727DA1]/15">
      <nav className="grow flex justify-between mx-5 max-w-[1110px] h-[52px] text-[13px] leading-[100%] text-[#C9D3EE]">
        
        {/* Left Section */}
        <div className="flex items-stretch gap-3">
          <Link aria-label="Go to homepage" className="flex items-center py-3" href="/">
             {/* Logo Approximation */}
             <div className="flex items-center gap-2 text-[#C9D3EE] font-semibold text-md -ml-2">
                <div className="w-5 h-5 bg-white text-black flex items-center justify-center rounded-[4px] text-[10px]">▲</div>
                <span className="font-roboto tracking-tight">Better Stack</span>
             </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-stretch gap-4 ml-4">
            
            {/* PLATFORM DROPDOWN */}
            <div className="group relative flex items-center pl-3 py-3 pr-6 -mr-3 cursor-pointer">
              <div className="transition group-hover:text-white font-medium">Platform</div>
              <span className="absolute right-2 text-[#656A7B]">
                <ChevronDown className="w-[11px] h-[11px] transition duration-200 group-hover:rotate-180" />
              </span>
              
              {/* Dropdown Content */}
              <div className="hidden group-hover:block absolute z-40 top-full left-0 text-left pt-2">
                <div className="rounded-lg border backdrop-blur-2xl flex w-[667px] min-[1100px]:w-[950px] xl:w-[1005px] bg-[#181926]/95 border-[#1F2433]/75 shadow-2xl p-1">
                  <div className="grid grid-cols-2 w-full min-[1100px]:grid-cols-3">
                    
                    {/* Col 1 */}
                    <div className="flex-1 py-2 flex flex-col gap-1 md:border-r border-[#727DA112] px-2">
                      <MenuItem href="#" icon={<Calendar className="text-[#7C87F7] w-5 h-5" />} title="Incident management & on-call" desc="Move fast when things break" />
                      <MenuItem href="#" icon={<Activity className="text-[#7C87F7] w-5 h-5" />} title="Uptime monitoring" desc="The most reliable uptime monitoring" />
                      <MenuItem href="#" icon={<FileText className="text-[#7C87F7] w-5 h-5" />} title="Status page" desc="Communicate downtime & build trust" />
                    </div>

                    {/* Col 2 */}
                    <div className="flex-1 py-2 flex flex-col gap-1 md:border-r border-[#727DA112] px-2">
                      <MenuItem href="#" icon={<Search className="text-[#7C87F7] w-5 h-5" />} title="Tracing" desc="eBPF-based OpenTelemetry-native tracing" />
                      <MenuItem href="#" icon={<Terminal className="text-[#7C87F7] w-5 h-5" />} title="Log management" desc="Collect insights across your stack" />
                      <MenuItem href="#" icon={<Server className="text-[#7C87F7] w-5 h-5" />} title="Infrastructure monitoring" desc="OpenTelemetry-native infrastructure monitoring" />
                    </div>

                    {/* Col 3 */}
                    <div className="flex-1 py-2 flex flex-col gap-1 px-2">
                      <MenuItem href="#" icon={<AlertCircle className="text-[#7C87F7] w-5 h-5" />} title="Error tracking" desc="AI‑native error tracking built on Better Stack" />
                      <MenuItem href="#" icon={<Database className="text-[#7C87F7] w-5 h-5" />} title="Data warehouse" desc="Serverless ClickHouse as an API" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link className="flex items-center py-3 px-3 hover:text-white transition font-medium" href="#">Documentation</Link>
            <Link className="flex items-center py-3 px-3 hover:text-white transition font-medium" href="#">Pricing</Link>
            
            {/* COMMUNITY DROPDOWN */}
            <div className="group relative flex items-center p-3 cursor-pointer">
              <div className="transition group-hover:text-white font-medium">Community</div>
              <span className="absolute -right-1 text-[#656A7B]">
                 <ChevronDown className="w-[11px] h-[11px] transition duration-200 group-hover:rotate-180" />
              </span>
              <div className="hidden group-hover:block absolute z-40 top-full left-0 text-left pt-2">
                <div className="rounded-lg border backdrop-blur-2xl flex flex-col gap-1 w-[174px] p-[6px] bg-[#181926]/95 border-[#1F2433]/75 shadow-xl">
                    <SmallMenuItem href="#" icon={<Users className="w-4 h-4" />} text="Community home" />
                    <SmallMenuItem href="#" icon={<BookOpen className="w-4 h-4" />} text="Guides" />
                    <SmallMenuItem href="#" icon={<HelpCircle className="w-4 h-4" />} text="Questions" />
                    <SmallMenuItem href="#" icon={<ArrowLeftRight className="w-4 h-4" />} text="Comparisons" />
                </div>
              </div>
            </div>

            {/* COMPANY DROPDOWN */}
            <div className="group relative flex items-center p-3 cursor-pointer">
              <div className="transition group-hover:text-white font-medium">Company</div>
              <span className="absolute -right-1 text-[#656A7B]">
                 <ChevronDown className="w-[11px] h-[11px] transition duration-200 group-hover:rotate-180" />
              </span>
              <div className="hidden group-hover:block absolute z-40 top-full left-0 text-left pt-2">
                <div className="rounded-lg border backdrop-blur-2xl flex flex-col gap-1 w-[200px] p-[6px] bg-[#181926]/95 border-[#1F2433]/75 shadow-xl">
                    <SmallMenuItem href="#" icon={<Briefcase className="w-4 h-4" />} text="Work at Better Stack" />
                    <SmallMenuItem href="#" icon={<Code2 className="w-4 h-4" />} text="Engineering" />
                    <SmallMenuItem href="#" icon={<ShieldCheck className="w-4 h-4" />} text="Security" />
                    <SmallMenuItem href="#" icon={<BookOpen className="w-4 h-4" />} text="Blog" />
                    <SmallMenuItem href="#" icon={<Newspaper className="w-4 h-4" />} text="Changelog" />
                </div>
              </div>
            </div>
            
            <Link className="hidden lg:flex p-3 hover:text-white transition items-center font-medium" href="#">Enterprise</Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center sm:gap-2 whitespace-nowrap -mr-3 md:mr-0">
          <Link className="p-2 transition hover:text-white font-medium" href="/signin">Sign in</Link>
          <Link className="p-2 px-3 h-[27px] flex items-center rounded bg-button-gradient text-white font-medium text-[13px] shadow-sm" href="signup">
            Sign up
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            className="p-2 group relative md:hidden text-neutral-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-5 fixed z-40 left-0 right-0 bottom-0 backdrop-blur-2xl top-[52px] bg-[#181926]/95 text-[#C9D3EE] border-t border-[#727DA1]/15 overflow-y-auto">
            <div className="flex flex-col gap-4 text-[15px]">
                <div className="font-medium text-white">Platform</div>
                <Link href="#" className="pl-4">Incident Management</Link>
                <Link href="#" className="pl-4">Uptime Monitoring</Link>
                <Link href="#" className="pl-4">Status Page</Link>
                <div className="h-px bg-white/5 my-2" />
                <Link href="#">Documentation</Link>
                <Link href="#">Pricing</Link>
                <Link href="#">Community</Link>
                <Link href="#">Company</Link>
                <Link href="#">Enterprise</Link>
            </div>
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  href: string;
  icon: ReactNode;
  title: string;
  desc: string;
}

function MenuItem({ href, icon, title, desc }: MenuItemProps) {
    return (
        <Link href={href} className="block px-3 flex gap-3 transition py-[10px] hover:bg-[#727DA1]/15 rounded leading-[145%] group/item">
            <span className="mt-0.5">{icon}</span>
            <div>
                <div className="font-medium text-white group-hover/item:text-[#7C87F7] transition-colors">{title}</div>
                <div className="mt-1 text-xs text-neutral-400">{desc}</div>
            </div>
        </Link>
    )
}

interface SmallMenuItemProps {
  href: string;
  icon: ReactNode;
  text: string;
}

function SmallMenuItem({ href, icon, text }: SmallMenuItemProps) {
    return (
        <Link href={href} className="block px-2 flex items-center gap-2 transition py-[6px] hover:bg-[#727DA1]/15 rounded-[6px] leading-[145%] text-neutral-200 hover:text-white">
            <span className="text-neutral-400">{icon}</span>
            {text}
        </Link>
    )
}