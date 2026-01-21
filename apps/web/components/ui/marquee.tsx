"use client";

import FastMarquee from "react-fast-marquee";
import { 
  Cpu, 
  Globe, 
  Shield, 
  Activity, 
  Heart, 
  ShoppingBag, 
  Flag 
} from "lucide-react";

interface MarqueeProps {
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function Marquee({ direction = "left", speed = 30, className = "" }: MarqueeProps) {
  return (
    <div className={`relative flex flex-col items-center overflow-hidden w-full ${className}`}>
      
      {/* Marquee Content with Scale & Opacity */}
      <div className="max-w-[1320px] w-full scale-75 md:scale-100 opacity-60">
        <FastMarquee direction={direction} speed={speed} autoFill className="py-4">
           <div className="flex items-center gap-16 md:gap-24 px-8 text-[#939db8] font-semibold text-xl tracking-tight select-none">
              <span className="flex items-center gap-2"><Cpu className="w-6 h-6" /> Accenture</span>
              <span className="flex items-center gap-2"><Activity className="w-6 h-6" /> Raspberry Pi</span>
              <span className="flex items-center gap-2"><Shield className="w-6 h-6" /> Brave</span>
              <span className="flex items-center gap-2"><Globe className="w-6 h-6" /> Drata</span>
              <span className="flex items-center gap-2"><Heart className="w-6 h-6" /> Unicef</span>
              <span className="flex items-center gap-2"><Flag className="w-6 h-6" /> Canada</span>
              <span className="flex items-center gap-2"><ShoppingBag className="w-6 h-6" /> Decathlon</span>
           </div>
        </FastMarquee>
      </div>

      {/* Side Fades (The "Dark Gradient" Overlay) */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
         <div className="grow h-full bg-gradient-to-r from-[#0B0C14] md:from-50% to-transparent"></div>
         <div className="min-w-[200px] md:min-w-[1000px]"></div>
         <div className="grow h-full bg-gradient-to-l from-[#0B0C14] md:from-50% to-transparent"></div>
      </div>
    </div>
  );
}