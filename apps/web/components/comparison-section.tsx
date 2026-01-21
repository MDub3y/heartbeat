"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Check, Plus } from "lucide-react";

export function ComparisonSection() {
  return (
    <section className="relative z-10">
      <div className="py-20 container mx-auto flex flex-col lg:flex-row items-center max-w-[1020px] px-4">
        
        {/* --- Left Text Content --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:mr-16 flex flex-col items-center lg:items-start text-center lg:text-left mb-16 lg:mb-0"
        >
          <h2 className="mt-5 pb-3 text-gradient-metallic font-bold text-[28px] sm:text-[36px] leading-[120%]">
            Save big with <br className="hidden lg:inline" /> Better Stack
          </h2>
          <p className="mt-5 text-[#C9D3EE] max-w-[387px] lg:max-w-[337px] text-[17px] leading-relaxed">
            Better Stack replaces a bunch of existing tools. See how our fixed price for
            unlimited monitors compares with PagerDuty, Pingdom, and Statuspage.io.
          </p>
          
          <Link 
            href="#" 
            className="mt-8 flex items-center group text-[#5B63D3] font-medium hover:text-[#7C87F7] transition-colors"
          >
            See pricing&nbsp;
            <span className="relative flex items-center">
                {/* Animated Arrows */}
                <ArrowRight className="transition-all duration-300 h-4 w-0 group-hover:w-4 opacity-0 group-hover:opacity-100" />
                <ChevronRight className="transition-all duration-300 h-4 w-4 group-hover:w-0 group-hover:opacity-0" />
            </span>
          </Link>
        </motion.div>

        {/* --- Right Comparison Cards --- */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full lg:w-auto">
          
          {/* 1. Competitor Stack (Dark Card) */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="p-2 rounded-xl flex flex-col items-center flex-1 border w-full max-w-[340px] bg-competitor-card border-[#727DA1]/20 relative z-0"
          >
             {/* Item 1: PagerDuty */}
             <div className="self-stretch rounded-lg flex items-center px-[14px] py-[13px] bg-[#0B0C14] border border-white/5">
                <Image src="/landing/icons/pagerduty.png" width={40} height={40} alt="PagerDuty" className="mr-[10px]" />
                <div>
                   <div className="font-bold text-white text-[15px]">PagerDuty</div>
                   <div className="text-[13px] text-[#9CA3AF] mt-[1px]">Incident management</div>
                </div>
             </div>

             {/* Plus Separator */}
             <div className="text-[#9CA3AF] flex justify-center items-center h-[22px] my-1">
                <Plus className="w-4 h-4" />
             </div>

             {/* Item 2: Pingdom */}
             <div className="self-stretch rounded-lg flex items-center px-[14px] py-[13px] bg-[#0B0C14] border border-white/5">
                <Image src="/landing/icons/pingdom.png" width={40} height={40} alt="Pingdom" className="mr-[10px]" />
                <div>
                   <div className="font-bold text-white text-[15px]">Pingdom</div>
                   <div className="text-[13px] text-[#9CA3AF] mt-[1px]">Uptime monitoring</div>
                </div>
             </div>

             {/* Plus Separator */}
             <div className="text-[#9CA3AF] flex justify-center items-center h-[22px] my-1">
                <Plus className="w-4 h-4" />
             </div>

             {/* Item 3: Statuspage */}
             <div className="self-stretch rounded-lg flex items-center px-[14px] py-[13px] bg-[#0B0C14] border border-white/5">
                <Image src="/landing/icons/statuspage.png" width={40} height={40} alt="Statuspage" className="mr-[10px]" />
                <div>
                   <div className="font-bold text-white text-[15px]">Statuspage.io</div>
                   <div className="text-[13px] text-[#9CA3AF] mt-[1px]">Branded status page</div>
                </div>
             </div>

             {/* Price */}
             <div className="mt-10 text-white relative text-center">
                <div className="inline-flex items-start">
                    <span className="text-lg font-bold mr-1 mt-1">$</span>
                    <span className="text-gradient-metallic font-bold text-[44px] tracking-tight">673</span>
                    <span className="text-lg font-bold ml-1 mt-4">/mo</span>
                </div>
                <p className="mt-2 mb-6 text-[13px] text-[#9CA3AF] text-center leading-relaxed">
                    6 team members, 60 monitors, <br/> and 2,000 subscribers
                </p>
             </div>
          </motion.div>

          {/* 2. Better Stack (Light Card) */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="md:-ml-4 -mt-5 md:mt-0 p-1 bg-white rounded-xl text-[#1F2433] flex-1 shrink-0 w-full max-w-[341px] min-h-[450px] shadow-2xl relative z-10"
          >
             {/* Logo */}
             <div className="mt-8 flex justify-center items-center gap-2 text-[#1F2433] font-bold text-xl">
                <div className="w-5 h-5 bg-[#1F2433] text-white flex items-center justify-center rounded-[4px] text-[10px]">▲</div>
                Better Stack
             </div>

             {/* Feature List */}
             <div className="mt-10 px-6 space-y-5">
                <div className="flex items-start">
                   <div className="shrink-0 mt-[2px] w-[18px] h-[19px] bg-[#5B63D3] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                   </div>
                   <div className="ml-3 text-[15px] font-medium leading-tight">Incident management with on-call</div>
                </div>
                <div className="flex items-start">
                   <div className="shrink-0 mt-[2px] w-[18px] h-[19px] bg-[#5B63D3] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                   </div>
                   <div className="ml-3 text-[15px] font-medium leading-tight">Uptime monitoring built-in</div>
                </div>
                <div className="flex items-start">
                   <div className="shrink-0 mt-[2px] w-[18px] h-[19px] bg-[#5B63D3] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                   </div>
                   <div className="ml-3 text-[15px] font-medium leading-tight">Branded status page on your own sub-domain</div>
                </div>
             </div>

             {/* Price */}
             <div className="mt-10 mb-7 mx-4 pt-10 border-t border-gray-100 flex flex-col items-center">
                <div className="inline-flex items-start text-[#1F2433]">
                    <span className="text-lg font-bold mr-1 mt-1">$</span>
                    <span className="font-bold text-[44px] tracking-tight">269</span>
                    <span className="text-lg font-bold ml-1 mt-4">/mo</span>
                </div>
                <p className="mt-2 text-[13px] text-gray-500 text-center leading-relaxed">
                    6 team members, 60 monitors, <br/> and 2,000 subscribers
                </p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}