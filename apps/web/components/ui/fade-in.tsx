"use client";

import { motion, HTMLMotionProps, Variants } from "motion/react";
import { ReactNode } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
  inView?: boolean; // trigger once in viewport
}

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "",
  inView = true,
  ...props 
}: FadeInProps) {
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1], }
    }
  } satisfies Variants;

  return (
    <motion.div
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={!inView ? "visible" : undefined}
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}