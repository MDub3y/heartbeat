import Link from "next/link";
import { ChevronRight, Globe } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="flex items-center gap-2 text-[13px] font-medium text-[#9CA3AF] overflow-x-auto whitespace-nowrap">
      <Link href="/dashboard/monitors" className="flex items-center gap-2 hover:bg-[#1F212E] px-2 py-1 rounded transition-colors text-[#5B63D3]">
        <Globe className="w-4 h-4" />
        Monitors
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-[#555B6D]" />
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}