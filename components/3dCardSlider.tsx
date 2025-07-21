"use client";

import React, { useReducer, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

type Slide = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

type SliderState = {
  slideIndex: number;
  isTransitioning: boolean;
};

type SliderAction =
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SET_TRANSITIONING"; payload: boolean }
  | { type: "GOTO"; payload: number };

const slidesReducer = (
  state: SliderState,
  action: SliderAction
): SliderState => {
  switch (action.type) {
    case "NEXT":
      if (state.isTransitioning) return state;
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % slides.length,
        isTransitioning: true,
      };
    case "PREV":
      if (state.isTransitioning) return state;
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
        isTransitioning: true,
      };
    case "GOTO":
      if (state.isTransitioning || action.payload === state.slideIndex)
        return state;
      return {
        ...state,
        slideIndex: action.payload,
        isTransitioning: true,
      };
    case "SET_TRANSITIONING":
      return {
        ...state,
        isTransitioning: action.payload,
      };
    default:
      return state;
  }
};

const Slide = ({
  slide,
  offset,
  index,
  isTransitioning,
}: {
  slide: Slide;
  offset: number;
  index: number;
  isTransitioning: boolean;
}) => {
  const active = offset === 0;
  const slideRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(slideRef, { once: false, margin: "-10%" });

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      rotateY: offset > 0 ? 60 : offset < 0 ? -60 : 0,
      z: -300,
    },
    visible: {
      opacity: active ? 1 : Math.max(0.4, 1 - Math.abs(offset) * 0.3),
      scale: active ? 1 : Math.max(0.75, 1 - Math.abs(offset) * 0.1),
      rotateY: active ? 0 : offset > 0 ? 20 : offset < 0 ? -20 : 0,
      z: active ? 0 : -Math.abs(offset) * 80,
      transition: {
        duration: isTransitioning ? 0.8 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.85,
    },
    visible: {
      opacity: active ? 1 : 0,
      y: active ? 0 : 40,
      scale: active ? 1 : 0.85,
      transition: {
        duration: 0.7,
        delay: active ? 0.3 : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    hidden: {
      scale: 1.3,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={slideRef}
      className="absolute w-full h-full flex items-center justify-center"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants as any}
      data-active={active || undefined}
      style={{
        zIndex: active ? 3 : Math.max(1, 2 - Math.abs(offset)),
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <motion.div
        className="relative 
          w-[85vw] h-[70vh] 
          sm:w-[70vw] sm:h-[60vh] 
          md:w-[50vw] md:h-[65vh] 
          lg:w-[35vw] lg:h-[45vw] 
          xl:w-[30vw] xl:h-[40vw]
          transition-all duration-700 ease-out 
          grid grid-rows-[1fr_auto] 
          bg-[rgb(var(--card-background))] 
          rounded-2xl border border-[rgb(var(--card-border))] 
          overflow-hidden shadow-2xl"
        style={{
          transform: `
            perspective(1200px) 
            translateX(calc(${offset * 80}% * var(--mobile-offset, 0.4)))
            translateZ(${active ? 0 : -Math.abs(offset) * 50}px)
            rotateY(${active ? 0 : offset > 0 ? 12 : offset < 0 ? -12 : 0}deg)
          `,
          transformStyle: "preserve-3d",
        }}
        whileHover={
          active
            ? {
                scale: 1.02,
                rotateY: 2,
                transition: {
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }
            : {}
        }
        whileTap={active ? { scale: 0.98 } : {}}
      >
        {/* Image Container */}
        <div className="relative w-full h-full overflow-hidden rounded-t-2xl">
          <motion.div
            variants={imageVariants as any}
            className="relative w-full h-full"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover transition-transform duration-1000 ease-out"
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 50vw, 35vw"
              priority={index < 2}
              style={{
                transform: active ? `scale(1.03)` : "scale(1)",
              }}
            />

            {/* Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 0.7 : 0.4 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Content Container */}
        <motion.div
          variants={contentVariants as any}
          className="relative p-4 sm:p-6 bg-[rgb(var(--card-background))]/95 backdrop-blur-md transform-gpu"
          style={{
            transform: "translateZ(2rem)",
          }}
        >
          {/* Animated Title */}
          <motion.h2
            className="text-lg sm:text-xl lg:text-2xl font-normal uppercase tracking-wider mb-2 text-[rgb(var(--foreground))]"
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{
              duration: 0.6,
              delay: active ? 0.4 : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {slide.title}
          </motion.h2>

          {/* Animated Subtitle */}
          <motion.h3
            className="text-base sm:text-lg lg:text-xl font-normal uppercase tracking-wider mb-3 sm:mb-4 
              before:content-['—_'] text-[rgb(var(--accent-gold))]"
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{
              duration: 0.6,
              delay: active ? 0.5 : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {slide.subtitle}
          </motion.h3>

          {/* Animated Description */}
          <motion.p
            className="text-xs sm:text-sm lg:text-base tracking-wider text-[rgb(var(--muted-foreground))] leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.7,
              delay: active ? 0.6 : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {slide.description}
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[rgb(var(--accent-gold))] to-transparent"
            initial={{ width: 0 }}
            animate={active ? { width: "100%" } : { width: 0 }}
            transition={{
              duration: 0.8,
              delay: active ? 0.7 : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const slides: Slide[] = [
  {
    title: "Digital Transformation",
    subtitle: "Case Study",
    description:
      "Modernized IT infrastructure for global clients, achieving 40% efficiency improvement",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&w=1200&auto=format&fit=crop",
  },
  {
    title: "Financial Strategy",
    subtitle: "Success Story",
    description:
      "Optimized investments for 50+ enterprises, generating $2M+ in additional revenue",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&w=1200&auto=format&fit=crop",
  },
  {
    title: "Operational Excellence",
    subtitle: "Client Results",
    description:
      "Reduced operational costs by 30% through intelligent automation solutions",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=1200&auto=format&fit=crop",
  },
  {
    title: "Leadership Workshop",
    subtitle: "Training Program",
    description:
      "Trained 200+ executives in agile methodologies and digital leadership",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&w=1200&auto=format&fit=crop",
  },
];

export const CardSlider = () => {
  const [state, dispatch] = useReducer(slidesReducer, {
    slideIndex: 0,
    isTransitioning: false,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Handle transition completion
  useEffect(() => {
    if (state.isTransitioning) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_TRANSITIONING", payload: false });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [state.isTransitioning]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      if (!state.isTransitioning) {
        dispatch({ type: "NEXT" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [state.isTransitioning, isAutoPlaying]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      dispatch({ type: "NEXT" });
    } else if (touchEnd - touchStart > 50) {
      dispatch({ type: "PREV" });
    }
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[rgb(var(--background))] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      style={
        {
          "--mobile-offset": isMobile ? "0.6" : "0.8",
        } as React.CSSProperties
      }
    >
      {/* Slides container */}
      <div className="relative w-full h-full">
        <AnimatePresence>
          {[...slides, ...slides, ...slides].map((slide, i) => {
            const offset = slides.length + (state.slideIndex - i);
            return (
              <Slide
                key={i}
                slide={slide}
                offset={offset}
                index={i % slides.length}
                isTransitioning={state.isTransitioning}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <motion.button
        onClick={() => dispatch({ type: "PREV" })}
        disabled={state.isTransitioning}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
          text-3xl sm:text-4xl lg:text-5xl w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 
          opacity-60 hover:opacity-100 disabled:opacity-30 transition-all duration-300 z-10 
          focus:outline-none bg-[rgb(var(--card-background))]/30 backdrop-blur-sm rounded-full
          flex items-center justify-center text-[rgb(var(--foreground))]"
        aria-label="Previous slide"
        whileHover={
          !state.isTransitioning
            ? {
                scale: 1.1,
                backgroundColor: "rgba(var(--accent-gold), 0.1)",
              }
            : {}
        }
        whileTap={!state.isTransitioning ? { scale: 0.9 } : {}}
      >
        ‹
      </motion.button>

      <motion.button
        onClick={() => dispatch({ type: "NEXT" })}
        disabled={state.isTransitioning}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
          text-3xl sm:text-4xl lg:text-5xl w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 
          opacity-60 hover:opacity-100 disabled:opacity-30 transition-all duration-300 z-10 
          focus:outline-none bg-[rgb(var(--card-background))]/30 backdrop-blur-sm rounded-full
          flex items-center justify-center text-[rgb(var(--foreground))]"
        aria-label="Next slide"
        whileHover={
          !state.isTransitioning
            ? {
                scale: 1.1,
                backgroundColor: "rgba(var(--accent-gold), 0.1)",
              }
            : {}
        }
        whileTap={!state.isTransitioning ? { scale: 0.9 } : {}}
      >
        ›
      </motion.button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 
              ${
                state.slideIndex === index
                  ? "bg-[rgb(var(--accent-gold))] scale-125 shadow-lg shadow-[rgb(var(--accent-gold))]/50"
                  : "bg-[rgb(var(--muted-foreground))]/40 hover:bg-[rgb(var(--muted-foreground))]/60 hover:scale-110"
              }`}
            onClick={() => dispatch({ type: "GOTO", payload: index })}
            disabled={state.isTransitioning}
            whileHover={!state.isTransitioning ? { scale: 1.3 } : {}}
            whileTap={!state.isTransitioning ? { scale: 0.9 } : {}}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <motion.div
        className="absolute top-4 right-4 text-xs text-[rgb(var(--muted-foreground))] 
          bg-[rgb(var(--card-background))]/20 backdrop-blur-sm px-3 py-1 rounded-full"
        animate={{ opacity: isAutoPlaying ? 0.6 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        {isAutoPlaying ? "Auto-playing" : "Paused"}
      </motion.div>
    </div>
  );
};
