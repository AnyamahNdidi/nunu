"use client";

import type React from "react";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { forwardRef } from "react";
import { DollarSign, Smile, Award } from "lucide-react"; // Imported Lucide icons

type HeroProps = {
  scrollY: any;
};
export const Stats = forwardRef<HTMLElement, HeroProps>(({ scrollY }, ref) => {
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: false,
    margin: "-100px",
  });

  // const stats = [
  //   { number: "$2.5B+", label: "Assets Under Management", icon: DollarSign }, // Changed to Lucide icon
  //   { number: "98%", label: "Client Satisfaction", icon: Smile }, // Changed to Lucide icon
  //   { number: "15+", label: "Years Experience", icon: Award }, // Changed to Lucide icon
  // ];

  const sectionContentVariants = {
    hidden: { opacity: 0, y: 150, rotateX: -20 }, // Increased y and rotateX for more dramatic effect
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0, // Reset rotateX
      transition: {
        duration: 0.6, // Slightly increased duration for smoothness
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90, rotateY: -90 }, // Start rotated and small
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 0.8, // Longer duration for a smoother 3D entry
        ease: "easeOut",
        type: "spring", // Use spring for a more natural feel
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
      rotateX: 180,
      rotateY: 180,
      rotateZ: 180,
    }, // Start heavily rotated and small
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transition: {
        duration: 1.0, // Longer duration
        ease: "easeOut",
        type: "spring",
        stiffness: 80, // Slightly less stiff for more bounce
        damping: 15, // More damping for less oscillation
      },
    },
  };
  const y = useTransform(scrollY, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollY, [0.3, 0.6], [0, 1]);
  const scale = useTransform(scrollY, [0.3, 0.6], [0.9, 1]);

  const { scrollYProgress } = useScroll({
    target: ref as any,
    offset: ["start start", "end start"], // Changed offset to better trigger fade out
  });

  // Adjusted fade and slide out effect triggers
  const fadeOut = useTransform(scrollYProgress, [-0.1, 0.8], [1, 0]);
  const slideOut = useTransform(scrollYProgress, [-0.1, 0.8], [0, 100]);
  const rotateOut = useTransform(scrollYProgress, [-0.1, 0.8], [0, 15]);

  return (
    <section
      id="stats"
      ref={ref}
      className="py-10 relative z-10 snap-start flex items-center justify-center min-h-screen scroll-snap-align-start"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionContentVariants as any}
        className="w-full px-4 sm:px-6 lg:px-8 rounded-2xl p-8 md:p-12 border-[rgb(var(--card-border))]/50 transform-gpu"
        style={{
          y: slideOut,
          opacity: fadeOut,
          rotateX: rotateOut,
          transformOrigin: "top center",
          willChange: "transform, opacity", // Added for performance
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="text-left mb-10">
            <h2 className="text-3xl md:text-4xl  font-bold text-[rgb(var(--foreground))] mb-4">
              Driving Results with Insight & Innovation
            </h2>
            <p className="text-lg text-left text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              At Nunu Consulting, we empower businesses with tailored strategies
              backed by years of experience and a client-first approach. Our
              proven track record and dedication to excellence continue to
              deliver measurable outcomes for our clients across industries.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

Stats.displayName = "Stats";
