"use client";
import { cn } from "../../lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { useEffect, useState } from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  // Mount check to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // SVG patterns for different states and themes
  const dotPatterns = {
    light: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
    dark: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
  };

  function handleMouseMove(event) {
    const currentTarget = event.currentTarget;
    const clientX = event.clientX;
    const clientY = event.clientY;
    
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`
    radial-gradient(
      200px circle at ${mouseX}px ${mouseY}px,
      black 0%,
      transparent 100%
    )
  `;

  if (!mounted) {
    return null; // Prevent rendering until client-side to avoid hydration mismatch
  }

  return (
    <div
      className={cn(
        "group relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-black transition-colors duration-300",
        containerClassName
      )}
      onMouseMove={handleMouseMove}>
      {/* Top gradient */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white dark:from-black to-transparent pointer-events-none z-30" />
      
      {/* Light mode pattern - default */}
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          backgroundImage: dotPatterns.light.default,
        }} 
      />
      
      {/* Dark mode pattern - default */}
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: dotPatterns.dark.default,
        }} 
      />
      
      {/* Light mode pattern - hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          backgroundImage: dotPatterns.light.hover,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }} 
      />
      
      {/* Dark mode pattern - hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block"
        style={{
          backgroundImage: dotPatterns.dark.hover,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }} 
      />
      
      {/* Content */}
      <div className={cn("relative z-20", className)}>
        {children}
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-30" />
    </div>
  );
};

export const Highlight = ({
  children,
  className
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-indigo-500 dark:to-purple-500 text-black dark:text-white transition-colors duration-300`,
        className
      )}>
      {children}
    </motion.span>
  );
};