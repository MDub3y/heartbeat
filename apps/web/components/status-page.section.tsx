"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeader } from "@/components/ui/section-header";

export function StatusPageSection() {
  return (
    <section className="mt-32 relative z-10 container mx-auto px-4 sm:px-6">
      
      {/* --- REFACTORED HEADER --- */}
      <SectionHeader 
        title="Elegant status page"
        description="Build confidence in your product by sharing your system status at status.yourdomain.com."
        ctaText="Explore status page"
        ctaHref="#"
      />

      {/* --- Feature Grid --- */}
      <div className="mt-20 mx-auto relative flex flex-col md:flex-row max-w-[900px] gap-8">
        
        {/* Left Column: Share Incident Updates */}
        <FadeIn direction="right" className="flex-1 relative">
          {/* Desktop Image */}
          <div className="hidden md:block absolute -z-10 -left-36 -top-5 w-[783px] max-w-none pointer-events-none">
             <Image 
               src="/landing/status-page.jpg" 
               width={830} 
               height={679} 
               alt="Status Page Interface" 
               className="w-full h-auto opacity-90"
             />
          </div>

          {/* Mobile Image */}
          <div className="md:hidden relative -m-10 mb-0 -top-10 -left-8 w-[130%] max-w-none">
             <Image 
                src="/landing/status-page.jpg" 
                width={830} 
                height={679} 
                alt="Status Page Mobile"
                className="w-full h-auto"
             />
          </div>

          {/* Spacer */}
          <div className="hidden md:block h-[490px]"></div>
          
          <div className="ml-5 md:ml-0 -mt-32 md:mt-0 relative z-10">
            <h3 className="text-white font-bold text-[18px] md:text-[28px] leading-[117%]">
              Share incident updates
            </h3>
            <p className="mt-3 text-[#9CA3AF] text-base leading-relaxed max-w-[342px]">
              Communicate ongoing incidents, planned maintenance, and service degradations.
            </p>
          </div>
        </FadeIn>

        {/* Right Column: Custom Domain & Subscriptions */}
        <div className="flex-1 flex flex-col gap-6 mt-12 md:mt-0">
          
          {/* Card 1 */}
          <FadeIn delay={0.2} className="relative mt-4 pl-9 pr-5 py-6 card-premium">
            <div className="absolute inset-0 w-[750px] sm:w-[700px] xl:w-[750px]">
              <Image 
                src="/landing/custom-domain.jpg" 
                width={470} 
                height={300} 
                alt="Custom Domain Setting" 
                className="opacity-90"
              />
            </div>
            <div className="relative z-10 mt-[55%]">
              <h4 className="text-white font-medium text-lg">Custom status.yourdomain.com</h4>
              <p className="mt-2 text-[#9CA3AF] text-sm leading-relaxed">
                Host a branded status page on your own custom subdomain and build confidence in your brand.
              </p>
            </div>
          </FadeIn>

          {/* Card 2 */}
          <FadeIn delay={0.3} className="relative mt-2 px-9 py-6 card-premium">
            <div className="absolute inset-0 sm:w-[700px] xl:w-[750px]">
               <Image 
                 src="/landing/subscribe-to-updates.jpg" 
                 width={472} 
                 height={352}
                 alt="Subscription Options" 
                 className="opacity-90"
               />
            </div>
            <div className="relative z-10 mt-[55%]">
              <h4 className="text-white font-medium text-lg">Subscribe to updates</h4>
              <p className="mt-2 text-[#9CA3AF] text-sm leading-relaxed">
                Let your customers subscribe to email updates so that they always know what&apos;s going on.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>

      {/* Separator Line */}
      <hr className="mt-36 border-separator-gradient" />
    </section>
  );
}