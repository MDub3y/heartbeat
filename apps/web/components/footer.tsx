"use client";

import Link from "next/link";
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Github, 
  Youtube 
} from "lucide-react";

// Helper for the TikTok icon since it's not standard in all icon sets
const TikTokIcon = () => (
  <svg width="16" height="17" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  return (
    <div className="dark text-[#363D4E] dark:text-neutral-200 bg-[#0B0C14] border-t border-neutral-300/10">
      
      {/* --- Main Navigation Grid --- */}
      <nav className="mx-auto px-5 md:px-10 pt-16 pb-8 max-w-[1110px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-5">
          
          {/* Column 1: Solutions */}
          <div className="flex-1 min-w-[200px]">
            <div className="font-medium text-white mb-6 text-[15px]">Solutions</div>
            <ul className="space-y-3 text-[15px] text-[#939db8]">
                <li><Link href="#" className="hover:text-white transition-colors">OpenTelemetry tracing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Log management</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Infrastructure monitoring</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Error tracking</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Incident management</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Uptime monitoring</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status page</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Data warehouse</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources (Desktop) / Company (Mobile) */}
          <div className="flex-1 min-w-[200px]">
             {/* Desktop: Resources */}
             <div className="hidden lg:block">
                <div className="font-medium text-white mb-6 text-[15px]">Resources</div>
                <ul className="space-y-3 text-[15px] text-[#939db8]">
                    <li><Link href="#" className="hover:text-white transition-colors">Help & Support</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Enterprise</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Dashboards</Link></li>
                </ul>
             </div>
             
             {/* Mobile: Company */}
             <div className="lg:hidden">
                <div className="font-medium text-white mb-6 text-[15px]">Company</div>
                <ul className="space-y-3 text-[15px] text-[#939db8]">
                    <li><Link href="#" className="hover:text-white transition-colors">Work at Better Stack</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Engineering</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                </ul>
             </div>
          </div>

          {/* Column 3: Company (Desktop) / Resources (Mobile) */}
          <div className="flex-1 min-w-[200px]">
             {/* Desktop: Company */}
             <div className="hidden lg:block">
                <div className="font-medium text-white mb-6 text-[15px]">Company</div>
                <ul className="space-y-3 text-[15px] text-[#939db8]">
                    <li><Link href="#" className="hover:text-white transition-colors">Work at Better Stack</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Engineering</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                </ul>
             </div>

             {/* Mobile: Resources */}
             <div className="lg:hidden">
                <div className="font-medium text-white mb-6 text-[15px]">Resources</div>
                <ul className="space-y-3 text-[15px] text-[#939db8]">
                    <li><Link href="#" className="hover:text-white transition-colors">Help & Support</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Enterprise</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Dashboards</Link></li>
                </ul>
             </div>
          </div>

          {/* Column 4: Community (Wide) */}
          <div className="flex-1 lg:grow max-w-[450px]">
            <div className="font-medium text-white mb-6 text-[15px]">Community</div>
            <ul className="space-y-4 text-[15px] text-[#939db8]">
                <li><Link href="#" className="hover:text-white transition-colors block leading-tight">What Is Incident Management? Beginner’s Guide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block leading-tight">Best Datadog Alternatives to Consider in 2026</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block leading-tight">8 Best Free & Open Source Status Page Tools in 2026</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block leading-tight">13 Best Sentry Alternatives in 2026</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block leading-tight">15 Best Grafana Alternatives in 2026</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block leading-tight">The 10 Best Incident.io Alternatives in 2026</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block leading-tight">5 Most Used Incident Management Tools</Link></li>
            </ul>
          </div>

        </div>
      </nav>

      {/* --- Footer Bottom Section --- */}
      <footer className="bg-[#0B0C14]">
        <div className="mx-auto max-w-[1110px] px-5 pb-10">
            
            {/* Top Row: Logo & Contact */}
            <div className="pt-7 flex flex-col lg:flex-row justify-between items-start lg:items-end border-t border-neutral-300/10 gap-6">
                <div>
                    <div className="flex items-center gap-2 text-white font-bold text-lg">
                        <div className="w-5 h-5 bg-white text-black flex items-center justify-center rounded-[4px] text-[10px]">▲</div>
                        <span className="font-roboto tracking-tight">Better Stack</span>
                    </div>
                    <p className="mt-3 hidden lg:block text-[#939db8] text-[15px] max-w-[342px]">
                        30x cheaper than Datadog. Predictable pricing. Exceptional customer support.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 text-[#939db8] text-[15px]">
                    <a href="tel:+1 (628) 900-3830" className="hover:text-white transition-colors hidden lg:block">+1 (628) 900-3830</a>
                    <a href="mailto:hello@betterstack.com" className="hover:text-white transition-colors hidden lg:block">hello@betterstack.com</a>
                    <div className="hidden lg:block h-4 border-l border-neutral-300/10"></div>
                    
                    {/* Social Icons (Desktop) */}
                    <div className="hidden lg:flex gap-4">
                        <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} />
                        <SocialLink href="#" icon={<TikTokIcon />} />
                        <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
                        <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
                        <SocialLink href="#" icon={<Github className="w-4 h-4" />} />
                        <SocialLink href="#" icon={<Youtube className="w-5 h-5" />} />
                    </div>
                </div>
            </div>

            {/* Bottom Row: Legal & Mobile Socials */}
            <div className="mt-5 py-3 lg:border-t border-neutral-300/10 flex flex-col lg:flex-row justify-between items-center text-[12px] leading-[18px] text-[#939db8] dark:text-neutral-400">
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 w-full lg:w-auto">
                    <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">GDPR</Link>
                    <Link href="#" className="hidden sm:flex items-center gap-1.5 hover:text-white text-[#939db8] transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        System status
                    </Link>
                </div>

                {/* Mobile Socials */}
                <div className="mt-8 mb-6 flex lg:hidden gap-6 text-neutral-400">
                    <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
                    <SocialLink href="#" icon={<TikTokIcon />} />
                    <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
                    <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
                    <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
                    <SocialLink href="#" icon={<Youtube className="w-6 h-6" />} />
                </div>

                <div className="flex items-center gap-2">
                    <span>© 2026 Better Stack, Inc.</span>
                </div>
            </div>

        </div>
      </footer>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
    return (
        <a href={href} className="hover:text-white transition-colors" target="_blank" rel="nofollow noopener">
            {icon}
        </a>
    )
}