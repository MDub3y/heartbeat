"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: React.ReactNode, subtitle: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0C14] flex flex-col items-center pt-16 sm:pt-24 pb-10 w-full overflow-hidden">
        
        {/* Back Button (Optional, good UX) */}
        <div className="absolute top-8 left-8">
            <Link href="/" className="text-[#727DA1] hover:text-white text-sm flex items-center gap-2 transition-colors">
                ← Back to Better Stack
            </Link>
        </div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto px-8 w-full max-w-[432px] flex flex-col items-center"
        >
            {/* Logo */}
            <div className="flex flex-col items-center whitespace-nowrap mb-9">
            <img 
              src="/landing/icons/betterstack-logo.png"
              alt="Better Stack Logo" 
              width="74" 
              height="66" 
              className="mb-2.5" 
          />
                {/* Fallback if no image: <div className="w-16 h-16 bg-white rounded-xl mb-4 text-black flex items-center justify-center text-3xl font-bold">▲</div> */}
                
                <h1 className="font-bold text-gradient-metallic text-[32px] leading-[120%] mt-2.5 text-center">
                    {title}
                </h1>
                <div className="mt-3 text-center text-[#9CA3AF]">
                    {subtitle}
                </div>
            </div>

            {/* Form Content */}
            <div className="w-full">
                {children}
            </div>

        </motion.div>
    </div>
  );
}