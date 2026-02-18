import Image from "next/image";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc?: string;
}

export function EmptyState({ 
  title, 
  description, 
  buttonText, 
  buttonHref, 
  imageSrc = "/dashboard/escalation-policies-dark.png"
}: EmptyStateProps) {
  return (
    <main className={"flex flex-col mx-auto px-5 py-8 lg:pt-20 max-w-[1160px] h-full min-h-[calc(100vh-60px)]"}>
      
      <div className="grow flex flex-col justify-center">
        <div className="-mt-16 md:my-20 flex flex-col md:flex-row justify-center items-center overflow-hidden gap-10">
          
          {/* Illustration */}
          <div className="shrink-0">
            <Image 
                alt="Empty State" 
                className="max-w-none md:max-w-full" 
                width={312} 
                height={226} 
                src={imageSrc}
                priority
            />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-white font-semibold leading-normal text-[18px] max-w-[330px] mx-auto md:mx-0">
              {title}
            </h1>
            <p className="mt-3 text-[#9CA3AF] max-w-[295px] mx-auto md:mx-0 leading-relaxed">
              {description}
            </p>
            <div className="mt-6 flex justify-center md:justify-start items-center gap-2 flex-wrap">
              <Link 
                href={buttonHref} 
                className="px-4 py-[10px] leading-none whitespace-nowrap font-medium rounded border border-[#5B63D3] bg-[#5B63D3] hover:bg-[#4d55c4] text-sm text-white transition-colors shadow-lg shadow-[#5B63D3]/20"
              >
                {buttonText}
              </Link>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}