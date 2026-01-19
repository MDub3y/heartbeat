"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { ChevronRight, ScrollText, Globe, Clock } from "lucide-react";

export function UptimeSection() {
  return (
    <section className="mt-32 relative z-10 container mx-auto px-4 sm:px-6" id="uptime-monitoring">
      
      {/* --- Section Header --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex flex-col items-center"
      >
        <h2 className="mt-2 pb-2 text-gradient-metallic font-bold text-center text-[28px] md:text-[40px] leading-[108%] max-w-[600px]">
          Best-in-class uptime monitoring. <br className="hidden md:block" /> No false positives.
        </h2>
        <p className="mt-3 text-[#C9D3EE] text-center max-w-[411px] tracking-[-0.01em] text-lg">
          Get a screenshot of the error and a second-by-second timeline with our fastest 30-second checks.
        </p>
        
        <Link 
          href="#" 
          className="mt-8 px-5 py-2.5 flex items-center gap-2 text-[13px] font-medium rounded-full border border-[#939DB8]/20 bg-[#171824] text-[#C9D3EE] hover:brightness-125 transition-all"
        >
          Explore website monitoring
          <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>

      {/* --- Main Feature Grid --- */}
      <div className="mt-20 mx-auto relative flex flex-col md:flex-row max-w-[900px] gap-8">
        
        {/* Left Column: Traceroute (MTR) */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
           className="flex-1 mt-10 md:mt-0 relative"
        >
          {/* Desktop Image (Absolute positioning to bleed out) */}
          <div className="hidden md:block absolute -left-36 -top-20 w-[760px] max-w-none pointer-events-none">
             <Image 
               src="/landing/mtr.jpg" 
               width={687} 
               height={823} 
               alt="MTR Debugging" 
               className="w-full h-auto opacity-90"
             />
          </div>

          {/* Mobile Image */}
          <div className="md:hidden relative -m-6 mb-0">
             <Image 
                src="/landing/mtr.jpg" 
                width={687} 
                height={823} 
                alt="MTR Mobile"
                className="w-full h-auto rounded-lg"
             />
          </div>

          {/* Text Content */}
          {/* Spacer div to push text down on desktop to match image layout */}
          <div className="hidden md:block h-[450px]"></div>
          
          <div className="mt-8 md:mt-20 ml-0 md:ml-0 relative z-10">
            <h3 className="text-white font-bold text-[18px] md:text-[24px] leading-[120%]">
              Traceroute & MTR for timeouts
            </h3>
            <p className="mt-3 text-[#9CA3AF] text-base leading-relaxed max-w-[342px]">
              Understand connection timeouts and request timeouts with edge-based traceroute and MTR outputs.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Screenshots & Playwright */}
        <div className="flex-1 flex flex-col gap-6 mt-10 md:mt-20">
          
          {/* Card 1: Screenshots (Image popping out top) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-12 md:mt-4 rounded-xl border bg-card-dark border-[#939DB8]/10"
          >
            {/* Pop-out Image */}
            <div className="hidden md:block absolute -top-28 left-1/2 -translate-x-1/2 w-[450px]">
              <Image 
                src="/landing/incident-ss.png" 
                width={472} 
                height={746} 
                alt="Incident Screenshot" 
                className="relative shadow-2xl rounded-lg"
              />
            </div>
            {/* Mobile Image (Inside card) */}
            <div className="md:hidden w-full p-4 pb-0">
                 <Image 
                    src="/landing/incident-ss.png" 
                    width={472} 
                    height={746} 
                    alt="Incident Screenshot" 
                    className="w-full h-auto rounded-t-lg"
                 />
            </div>

            <div className="relative z-10 px-8 pt-6 pb-8 md:pt-[240px]">
              <h4 className="text-white font-semibold text-lg">
                Screenshots & error logs
              </h4>
              <p className="mt-2 text-[#9CA3AF] text-sm leading-relaxed">
                We record your API's error message and take a screenshot of your website being down so that you know exactly what happened.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Playwright */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative px-8 py-6 rounded-xl border overflow-hidden border-[#939DB8]/10 bg-card-dark min-h-[320px]"
          >
            <div className="absolute inset-0 w-full h-full">
               {/* Masking the image to fade into the card background */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F101A]/80 to-[#0F101A] z-10" />
               <Image 
                 src="/landing/playwright.jpg" 
                 fill
                 alt="Playwright Code" 
                 className="object-cover object-top opacity-60"
               />
            </div>
            
            <div className="relative z-20 mt-[180px]">
              <h4 className="text-white font-semibold text-lg">
                Playwright transaction monitoring
              </h4>
              <p className="mt-2 text-[#9CA3AF] text-sm leading-relaxed">
                We test all vital interactions by running a real Chrome browser instance, with a full-fledged JavaScript runtime.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* --- Bottom Feature Grid --- */}
      <div className="mt-16 md:mt-28 flex flex-col md:flex-row justify-center gap-12 md:gap-16">
        
        <FeatureItem 
          icon={<ScrollText className="w-6 h-6 text-[#C9D3EE]" />}
          title="From SSL to domain expiration"
          desc="Monitor everything. Whether it's your web page, API, ping, SSL, domain expiration, POP3, IMAP, SMTP, DNS, or generic network monitoring. We've got you covered."
        />
        
        <FeatureItem 
          icon={<Globe className="w-6 h-6 text-[#C9D3EE]" />}
          title="30s checks from around the world"
          desc="Get a screenshot of the error and a second-by-second timeline with our fastest 30-second checks."
        />
        
        <FeatureItem 
          icon={<Clock className="w-6 h-6 text-[#C9D3EE]" />}
          title="Cron monitoring"
          desc="Never lose a database backup again. Track your CRON jobs and serverless workers and get alerted if they don't run correctly."
        />

      </div>

      {/* Separator Line */}
      <hr className="mt-36 border-separator-gradient" />
    </section>
  );
}

// Helper for the bottom 3 features
function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex-1 max-w-[340px]"
    >
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 mb-4">
        {icon}
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-[#9CA3AF] text-[15px] leading-relaxed">
        {desc}
      </p>
    </motion.div>
  )
}