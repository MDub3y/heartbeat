"use client";

import FastMarquee from "react-fast-marquee";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function Marquee({ children, direction = "left", speed = 40, className = "" }: MarqueeProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* Gradient Masks for smooth fade in/out at edges */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <FastMarquee loop={0} direction={direction} speed={speed} autoFill className="py-4">
          {children}
        </FastMarquee>
      </div>
    </div>
  );
}