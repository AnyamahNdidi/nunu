"use client";

import type React from "react";

import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { forwardRef, useState, useEffect } from "react";

type HeroProps = {
  scrollY: any;
};
const WORD_CYCLE = ["Financial", "Strategic", "Growth"];

const TRANSITION_DURATION = 1.0; // Slower transition
const WORD_DISPLAY_DURATION = 4000; // Longer display time

export const Hero = forwardRef<HTMLElement, HeroProps>(({ scrollY }, ref) => {
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: false,
    margin: "-100px",
  });

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const y = useTransform(scrollY, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollY, [0, 1], [1, 0.9]);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % WORD_CYCLE.length);
    }, WORD_DISPLAY_DURATION);

    return () => clearInterval(interval);
  }, [isInView]);

  const sectionContentVariants = {
    hidden: { opacity: 0, y: 150, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };
  const { scrollYProgress } = useScroll({
    target: ref as any,
    offset: ["start start", "end start"],
  });

  // Fade and slide out effect
  const fadeOut = useTransform(scrollYProgress, [-0.0, 0.8], [1, 0]);
  const slideOut = useTransform(scrollYProgress, [-0.0, 0.8], [0, 100]);
  const rotateOut = useTransform(scrollYProgress, [-0.0, 0.8], [0, 15]);

  // Text-specific animations
  const textFadeOut = useTransform(scrollYProgress, [-0.0, 0.6], [1, 0]);
  const textSlideOut = useTransform(scrollYProgress, [-0.0, 0.6], [0, 50]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex snap-start justify-center overflow-hidden pt-20 min-h-[100vh] scroll-snap-align-start"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionContentVariants as any}
        className="relative z-10 px-0 left-0 right-0  sm:px-6 lg:px-0 max-w-full rounded-2xl transform-gpu w-full"
        style={{
          y: slideOut,
          opacity: fadeOut,
          rotateX: rotateOut,
          transformOrigin: "top center",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-2 lg:px-8 items-center justify-items-center md:justify-items-start bg-[rgb(var(--background))] w-full pb-3  min-h-[60vh] ">
          {/* Left Column: Animated Text - Centered on mobile */}
          <motion.div
            className="text-center md:text-left w-full md:w-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-[5rem] font-light text-[rgb(var(--foreground))] leading-tight">
              <div className="relative h-24 sm:h-28 md:h-24 md overflow-hidden flex justify-center md:block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      backgroundImage: [
                        "linear-gradient(45deg, rgb(var(--foreground)), rgb(var(--accent-gold)))",
                        "linear-gradient(45deg, rgb(var(--accent-gold)), rgb(var(--accent-gold-dark)))",
                        "linear-gradient(45deg, rgb(var(--accent-gold-dark)), rgb(var(--foreground)))",
                      ],
                      backgroundClip: "text",
                      webkitBackgroundClip: "text",
                      color: "transparent",
                      backgroundSize: "200% 200%",
                    }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{
                      duration: TRANSITION_DURATION,
                      ease: "easeInOut",
                      backgroundImage: {
                        duration: TRANSITION_DURATION * 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear",
                      },
                    }}
                    className="absolute left-0 right-0 mx-auto md:left-0 md:right-auto md:mx-0 inline-block font-medium text-6xl sm:text-7xl md:text-5xl lg:text-[5rem] text-center whitespace-nowrap w-fit"
                  >
                    {WORD_CYCLE[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block text-5xl sm:text-6xl md:text-5xl lg:text-[5rem]">
                  Consulting
                </span>
                <span className="block text-[rgb(var(--accent-gold))] text-5xl sm:text-6xl md:text-5xl lg:text-[5rem]">
                  Excellence
                </span>
              </motion.div>
            </h1>
          </motion.div>

          {/* Right Column - Centered on mobile */}
          <motion.div
            className="text-center md:text-left space-y-8 w-full md:w-auto col-span-1 md:col-span-2 px-4 md:px-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.p
              style={{
                y: textSlideOut,
                opacity: textFadeOut,
              }}
              className="text-lg md:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl mx-auto md:mx-0"
            >
              We help ambitious companies unlock their financial potential
              through data-driven strategies, innovative investment solutions,
              and transformative growth initiatives. Cutting-edge AI solutions.
            </motion.p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 w-full">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full sm:w-auto"
                style={{
                  y: textSlideOut,
                  opacity: textFadeOut,
                }}
              >
                <motion.div
                  className="absolute mb-3 inset-0 bg-gradient-to-r from-[rgb(var(--accent-gold))] to-[rgb(var(--accent-gold-dark))] rounded-full blur-lg opacity-50"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Button
                  size="lg"
                  className="relative bg-[rgb(var(--foreground))] text-[rgb(var(--background))] px-8 py-4 text-lg font-semibold shadow-2xl border border-[rgb(var(--accent-gold))] w-full sm:w-auto"
                >
                  Book Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg  font-semibold bg-[rgb(var(--card-background))]/30 backdrop-blur-md border-[rgb(var(--card-border))]/50 hover:bg-[rgb(var(--card-background))]/50 w-full sm:w-auto"
              >
                Our Methodology
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";
