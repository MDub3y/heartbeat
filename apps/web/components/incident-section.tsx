"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function IncidentSection() {
  return (
    <section className="mt-32 relative z-10 container mx-auto px-4 sm:px-6">
      
      {/* --- Section Header --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex flex-col items-center"
      >
        <h2 className="mt-2 pb-2 text-gradient-metallic font-bold text-center text-[28px] md:text-[40px] leading-[108%] max-w-[629px]">
          A lot more than uptime monitoring. <br className="hidden md:block" /> Batteries included.
        </h2>
        <p className="mt-3 text-[#C9D3EE] text-center max-w-[441px] tracking-[-0.01em] text-lg">
          Get all the debug data you need and collaborate with your colleagues on fixing the root cause of the incident.
        </p>
        
        <Link 
          href="#" 
          className="mt-8 px-5 py-2.5 flex items-center gap-2 text-[13px] font-medium rounded-full border border-[#939DB8]/20 bg-[#171824] text-[#C9D3EE] hover:brightness-125 transition-all"
        >
          Explore incident management
          <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>

      {/* --- Feature Grid --- */}
      <div className="mt-20 mx-auto relative flex flex-col md:flex-row max-w-[900px] gap-8">
        
        {/* Left Column: Smart Incident Merging */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
           className="flex-1 relative"
        >
          {/* Desktop Image: Absolutely positioned to bleed left 
             Matches original: -left-36 -top-5
          */}
          <div className="hidden md:block absolute -z-10 -left-36 -top-5 w-[783px] max-w-none pointer-events-none">
             <Image 
               src="/landing/smart-incident-merging.jpg" 
               width={783} 
               height={778} 
               alt="Smart Incident Merging" 
               className="w-full h-auto opacity-90"
             />
          </div>

          {/* Mobile Image: Relative with negative margins */}
          <div className="md:hidden relative -m-10 mb-0 -top-10 -left-8 w-[130%] max-w-none">
             <Image 
                src="/landing/smart-incident-merging.jpg" 
                width={783} 
                height={778} 
                alt="Smart Incident Merging Mobile"
                className="w-full h-auto"
             />
          </div>

          {/* Text Content Spacer - Pushes text down on desktop to align with image visual flow */}
          <div className="hidden md:block h-[490px]"></div>
          
          <div className="ml-3 md:ml-0 -mt-48 md:mt-0 relative z-10">
            <h3 className="text-white font-bold text-[18px] md:text-[28px] leading-[117%]">
              Smart incident merging
            </h3>
            <p className="mt-3 text-[#9CA3AF] text-base leading-relaxed max-w-[342px]">
              30 incidents get created at the same time. Acknowledge them with a single tap and stop your phone from ringing.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Escalations & Voice Alerts */}
        <div className="flex-1 flex flex-col gap-6 mt-12 md:mt-0">
          
          {/* Card 1: Flexible Escalations */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-4 pl-9 pr-5 py-6 rounded-xl border overflow-hidden border-[#939DB8]/10 bg-card-dark"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-[750px] sm:w-[700px] xl:w-[750px]">
              <Image 
                src="/landing/flexible-incident-escalations.jpg" 
                width={469} 
                height={349} 
                alt="Escalation Rules" 
                className="opacity-90"
              />
            </div>
            
            <div className="relative z-10 mt-52">
              <h4 className="text-white font-medium text-lg">
                Flexible incident escalations
              </h4>
              <p className="mt-2 text-[#9CA3AF] text-sm leading-relaxed">
                Configure complex rules for escalating incidents based on time, team availability, and incident origin.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Voice Alerts */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mt-2 px-9 py-6 rounded-xl border overflow-hidden border-[#939DB8]/10 bg-card-dark"
          >
            {/* Background Image */}
            <div className="absolute inset-0 sm:w-[700px] xl:w-[750px] -top-1">
               <Image 
                 src="/landing/phone-alert.jpg" 
                 width={440} 
                 height={350}
                 alt="Phone Alert" 
                 className="opacity-90"
               />
            </div>
            
            <div className="relative z-10 mt-[50%]">
              <h4 className="text-white font-medium text-lg">
                Unlimited voice call alerts
              </h4>
              <p className="mt-2 text-[#9CA3AF] text-sm leading-relaxed">
                As well as SMS, e-mail, Slack, Teams, and push notifications with our all-you-can-alert pricing.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}