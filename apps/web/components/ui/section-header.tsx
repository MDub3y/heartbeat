"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "./fade-in";

interface SectionHeaderProps {
  title: React.ReactNode;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function SectionHeader({ title, description, ctaText, ctaHref, className = "" }: SectionHeaderProps) {
  return (
    <FadeIn className={`mx-auto flex flex-col items-center max-w-[620px] ${className}`}>
      <h2 className="text-section-title">
        {title}
      </h2>
      <p className="text-section-subtitle max-w-[450px]">
        {description}
      </p>
      
      {ctaText && ctaHref && (
        <Link href={ctaHref} className="btn-pill">
          {ctaText}
          <ChevronRight className="w-3 h-3" />
        </Link>
      )}
    </FadeIn>
  );
}