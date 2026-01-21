"use client";

import { motion } from "motion/react";
import Link from "next/link";

export function CTASection() {
  return (
    <div className="mx-auto pt-24 pb-10 md:pb-24 md:pt-32 bg-cta-flare max-w-[1888px] w-full">
      <section className="container mx-auto flex flex-col items-center px-4">
        
        {/* Logo Mark (Approximation) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-white scale-[70%] md:scale-100 mb-2 md:mb-5 flex items-center gap-2 font-bold text-2xl tracking-tight"
        >
           <div className="w-6 h-6 bg-white text-black flex items-center justify-center rounded-[5px] text-[12px]">▲</div>
           Better Stack
        </motion.div>

        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 md:mt-5 font-medium homepage-heading-gradient text-center text-[28px] md:text-[40px] leading-[110%]"
        >
          Get started in 30 seconds
        </motion.h2>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-center text-[#C9D3EE] max-w-[400px] md:max-w-[483px] text-lg leading-relaxed"
        >
          We call you when your website goes down.
          <br />
          Get started in just 30 seconds, completely for free.
        </motion.p>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 w-full sm:w-auto"
        >
          <form className="flex flex-col sm:flex-row gap-3 items-center">
            <input 
              autoComplete="email" 
              className="appearance-none px-5 border rounded-lg backdrop-blur-2xl text-white h-12 w-full max-w-[316px] sm:max-w-full sm:w-[324px] border-[#727DA1]/20 bg-[#727DA1]/10 placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6871df]/50 transition-all font-medium" 
              name="email" 
              placeholder="Your work e-mail" 
              required 
              type="email" 
            />
            <button 
              className="cta-button px-6 flex items-center justify-center text-white font-medium whitespace-nowrap h-12 w-full sm:w-auto max-w-[316px]" 
              type="submit"
            >
              Start for free
            </button>
          </form>

          <p className="mt-5 pb-2 text-[#C9D3EE]/60 text-[13px] sm:text-base text-center">
            Start monitoring for free or{" "}
            <Link 
              className="text-[#C9D3EE] underline underline-offset-4 transition decoration-[#C9D3EE]/20 hover:decoration-[#C9D3EE]" 
              href="#"
            >
              book a demo
            </Link>
          </p>
        </motion.div>

      </section>
    </div>
  );
}