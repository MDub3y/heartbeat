"use client";

import { Marquee } from "@/components/ui/marquee";

const TwitterIcon = () => (
  <svg width="22" height="16" viewBox="0 0 24 24" className="mt-4 shrink-0 text-[#98a4f7]" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const TESTIMONIALS = [
  {
    name: "Conor",
    handle: "@cnrstvns",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/conor-avatar-b2a571f1.png",
    content: <>
      <a href="#" className="text-[#98a4f7] hover:underline">@BetterStackHQ</a> is one of the best products I&apos;ve ever used. Went from 0-100 on logging in 15 minutes. Incredible
    </>
  },
  {
    name: "Quentin",
    handle: "@glaffont",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/quentin-avatar-b1fa4f5b.png",
    content: <>
      I tested <a href="#" className="text-[#98a4f7] hover:underline">@BetterStackHQ</a> for @gamubsapp! So much easier to configure and the interface is better than @FreshworksInc!
    </>
  },
  {
    name: "TonyHe",
    handle: "@ttttonyhe",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/tony-avatar-c7f7948d.png",
    content: <>
      <a href="#" className="text-[#98a4f7] hover:underline">@BetterStackHQ</a> status page looks SO neat! A fantastic tool for SaaS products like @Snapodcast
    </>
  },
  {
    name: "John",
    handle: "@johncjago",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/john-avatar-672aa1f6.png",
    content: <>
      By far <a href="#" className="text-[#98a4f7] hover:underline">@BetterStackHQ</a> has given me more pleasant surprises other tool in this space. We had an outage due to a domain name expiring, and it turns out we can even be alered about that. Great user experience and UI on top of all the features. How is it not more popular?
    </>
  },
  {
    name: "Tianzhou",
    handle: "@tianzhouchen",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/tianzhou-avatar-58056662.png",
    content: <>
      One year one tool. @linear won my heart last year. This year so far, <a href="#" className="text-[#98a4f7] hover:underline">@BetterStackHQ</a> is the frontrunner, well designed 👏
    </>
  },
  {
    name: "Chris",
    handle: "@chrishow",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/chrishow-avatar-c3cd7f8e.png",
    content: <>
      I just checked this out, and have never been so happy that I saw an ad 👏
    </>
  },
  {
    name: "NeverLand",
    handle: "@neverlandoff",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/neverland-avatar-b7306358.png",
    content: <>
      Looking for a status page? I recommend <a href="#" className="text-[#98a4f7] hover:underline">@BetterStackHQ</a>. Perfect support, answered my dms in a couple of minutes, and it&apos;s the first actual cool looking status page which allows custom domains (on the free plan 😱) haven&apos;t actually tried it, but it looks good so far. <br/><br/>#NotSponsor
    </>
  },
  {
    name: "Valentin Prugnaud 🦊",
    handle: "@valentinprgnd",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/valentin-avatar-5e6816d9.png",
    content: <>
      Switched from @Statuspage to <a href="#" className="text-[#98a4f7] hover:underline">@BetterStackHQ</a> over the week end, looking pretty good status.speakbox.ca
    </>
  },
  {
    name: "Markus Leimer",
    handle: "@markuslei22",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/markus-avatar-cf69cf0e.png",
    content: <>
      What are you using for logging and incident management? <br/><br/> For me the go to is currently <a href="#" className="text-[#98a4f7] hover:underline">@BetterStackHQ</a> - love their simplicity and powerful features. Would like to learn more about what&apos;s out there.
    </>
  },
  {
    name: "Darren Pinder",
    handle: "@dmpinder",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/darren-avatar-c61b4a3b.png",
    content: <>
      I&apos;m utterly blown away by <a href="#" className="text-[#98a4f7] hover:underline">@BetterStackHQ</a>! They do everything. I&apos;m now monitoring one of our US servers for every kind of log Ubuntu creates, custom alerts for errors, website downtime, incident logging, Slack notifications, S3 log storage, and loads more. 😍
    </>
  },
  {
    name: "kostya",
    handle: "@nstkostyal",
    avatar: "https://betterstackcdn.com/assets/betterstack/twitter/kostya-avatar-34fee346.png",
    content: <>
      I absolutely love services like <a href="#" className="text-[#98a4f7] hover:underline">@BetterStackHQ</a> <br/><br/> simple, does a great job, and has a generous free plan for companies just starting out <br/><br/> I don&apos;t remember finding anything even close to it ~4 years ago when i was looking for a monitoring tool for one of my projects
    </>
  }
];

export function TestimonialsSection() {
  return (
    <section className="container mx-auto pt-32 -mb-32 sm:mb-32 relative z-10 px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
            <h4 className="text-gradient-metallic font-bold text-[24px] lg:text-[36px] leading-[108%]">
                Don’t just take our word for it
            </h4>
            <p className="mt-4 max-w-[624px] text-[#C9D3EE] text-lg leading-[140%]">
                We&apos;re proud to be working with publicly traded companies as well as individual indie hackers and are thankful for their feedback, suggestions, and support.
            </p>
        </div>

        <div className="mt-14"></div>

        {/* Marquee Section */}
        <Marquee className="mt-4 -mb-20" />

        {/* Masonry Grid */}
        <div className="max-w-[1320px] mt-28 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 mx-auto">
            {TESTIMONIALS.map((t, i) => (
                <div 
                    key={i}
                    className="break-inside-avoid mb-4 w-full"
                >
                    <div className="p-5 backdrop-blur-xl rounded-xl border bg-[#171824]/80 border-[#727DA1]/20 hover:border-[#727DA1]/40 transition-colors">
                        <p className="text-[#C9D3EE] text-[15px] leading-[1.5]">
                            {t.content}
                        </p>
                        <div className="mt-5"></div>
                        <div className="-m-5 p-5 flex items-start mt-1">
                            <img 
                                src={t.avatar} 
                                alt={t.name} 
                                width={37} 
                                height={37} 
                                className="mt-1 shrink-0 rounded-full"
                            />
                            <div className="mx-2 grow">
                                <div className="font-bold text-white text-[15px]">
                                    {t.name}
                                </div>
                                <div className="text-[13px] text-[#9CA3AF]">
                                    {t.handle}
                                </div>
                            </div>
                            <TwitterIcon />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="h-32"></div>

        <Marquee className="mt-4 -mb-20" />
    </section>
  );
}