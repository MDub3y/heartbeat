import Image from "next/image";

interface WipStateProps {
  title: string;
}

export function WipState({ title }: WipStateProps) {
  return (
    <main className="flex flex-col mx-auto px-5 py-8 lg:pt-20 max-w-[1160px] h-full min-h-[calc(100vh-60px)]">
      <div className="grow flex flex-col justify-center">
        <div className="-mt-16 md:my-20 flex flex-col md:flex-row justify-center items-center overflow-hidden gap-10">
          
          <div className="shrink-0 opacity-50 grayscale">
            {/* Ensure this image exists in public/dashboard/ or update path */}
            <Image 
                alt="Work in Progress" 
                width={312} 
                height={226} 
                src="/dashboard/escalation-policies-dark.png"
            />
          </div>

          <div className="text-center md:text-left">
            <div className="inline-block px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs font-bold uppercase tracking-wider mb-3 border border-yellow-500/20">
                Coming Soon
            </div>
            <h1 className="text-white font-semibold leading-normal text-[18px] max-w-[330px] mx-auto md:mx-0">
              {title}
            </h1>
            <p className="mt-3 text-[#9CA3AF] max-w-[295px] mx-auto md:mx-0 leading-relaxed">
              We are working hard to bring you this feature. Stay tuned!
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}