"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { Marquee } from "./ui/marquee";

export function Hero() {
  return (
    <section className="relative w-full pt-20 pb-20 flex flex-col items-center">
      
      {/* Background Beam - Full Width */}
      <div className="hero-beam z-10" />

      {/* Text Content - Constrained Width (match Navbar) */}
      <div className="container px-4 mx-auto flex flex-col items-center relative z-10 max-w-[1110px]">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
            <h1 className="mt-8 homepage-heading-gradient font-medium text-[42px] md:text-[66px] leading-[95%] tracking-tight max-w-[600px]">
              The most reliable <br className="hidden md:block" />
              <span className="leading-[120%]">uptime monitoring</span>
            </h1>

            <p className="mt-6 text-[#C9D3EE] text-lg md:text-[20px] leading-[140%] max-w-[480px]">
              Get 10 monitors, 10 heartbeats and a status page with 3-minute checks totally free.
            </p>
        </motion.div>

        {/* Input Form */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex flex-col items-center mt-10"
        >
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-[320px] sm:max-w-none justify-center">
                <input 
                    className="appearance-none px-5 h-12 w-full sm:w-[324px] border rounded-lg backdrop-blur-xl text-white border-[#727DA1]/20 bg-[#727DA1]/10 placeholder:text-[#727DA1] focus:outline-none focus:ring-2 focus:ring-[#6871df]/50 transition-all font-medium" 
                    name="email" 
                    placeholder="Your work e-mail" 
                    required 
                    type="email" 
                />
                <button 
                    className="cta-button h-12 px-6 flex items-center justify-center text-white font-semibold whitespace-nowrap w-full sm:w-auto" 
                    type="submit"
                >
                    Get started in 30 seconds
                </button>
            </form>

            <p className="mt-5 text-[#C9D3EE]/60 text-[13px] sm:text-base text-center font-medium">
                Looking for an enterprise solution?{" "}
                <Link 
                    className="text-[#C9D3EE] underline underline-offset-4 decoration-[#C9D3EE]/20 hover:decoration-[#C9D3EE] transition-all" 
                    href="#"
                >
                    Book a demo
                </Link>
            </p>
        </motion.div>
      </div>

      {/* Image Section - Wider than text */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
        className="mt-14 w-full max-w-[1700px] px-2 sm:px-5 relative z-[0.5] flex justify-center"
      >
        {/* Mobile Image */}
        <div className="sm:hidden -mb-24 w-full max-w-[400px] hero-image-blend">
            <Image 
                src="/landing/hero-sm.jpg" 
                width={393} 
                height={596} 
                alt="Mobile Dashboard" 
                className="w-full h-auto rounded-lg shadow-2xl border-none "
            />
        </div>

        {/* Desktop Image */}
        <div className="hidden sm:block w-full hero-image-blend">
            <Image 
                src="/landing/hero.jpg" 
                width={1730} 
                height={662} 
                alt="Desktop Dashboard" 
                priority
                className="w-full h-auto rounded-xl shadow-2xl"
            />
        </div>
      </motion.div>

      {/* --- Marquee Section (Bottom of Hero) --- */}
        <Marquee speed={30} className="opacity-60" />
    </section>
  );
}