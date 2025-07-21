"use client";

import type React from "react";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { forwardRef } from "react";
import { Award, Users2, Globe, Rocket } from "lucide-react";
import Image from "next/image";

type AnimatedGoldIconsProps = {
  scrollY?: any;
};

export const About = forwardRef<HTMLElement, AnimatedGoldIconsProps>(
  ({ scrollY }, ref) => {
    const isInView = useInView(ref as React.RefObject<HTMLElement>, {
      once: false,
      margin: "-100px",
    });

    const y = useTransform(scrollY, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollY, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollY, [0, 1], [1, 0.9]);

    // Add scroll progress for fade effects
    const { scrollYProgress } = useScroll({
      target: ref as any,
      offset: ["start start", "end start"],
    });

    // Add fade and slide effects
    const fadeOut = useTransform(scrollYProgress, [-0.0, 0.8], [1, 0]);
    const slideOut = useTransform(scrollYProgress, [-0.0, 0.8], [0, 100]);
    const rotateOut = useTransform(scrollYProgress, [-0.0, 0.8], [0, 15]);

    const stats = [
      { icon: Award, value: "15+", label: "Years Experience" },
      { icon: Users2, value: "200+", label: "Expert Consultants" },
      { icon: Globe, value: "40+", label: "Countries Served" },
      { icon: Rocket, value: "1000+", label: "Success Stories" },
    ];

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

    return (
      <section
        id="about"
        ref={ref}
        className="relative z-10 flex   justify-center min-h-[100vh] scroll-snap-align-start" // Changed to min-h-screen
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionContentVariants as any}
          className="w-full min-h-auto px-4 sm:px-6 lg:px-8 bg-[rgb(var(--card-background))]/10   p-8 md:p-12 border border-[rgb(var(--card-border))]/50 transform-gpu max-w-full mx-auto"
          style={{
            transformOrigin: "bottom center",
            y: slideOut,
            opacity: fadeOut,
            rotateX: rotateOut,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-[90vh]  ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[rgb(var(--foreground))] mb-6">
                About Nunu Consulting
              </h2>
              <p className="text-lg text-[rgb(var(--muted-foreground))] mb-8 leading-relaxed">
                Founded in 2008, Nunu Consulting has been at the forefront of
                business transformation, helping companies navigate complex
                challenges and unlock unprecedented growth opportunities.
              </p>
              <p className="text-lg text-[rgb(var(--muted-foreground))] mb-8 leading-relaxed">
                Our team of world-class consultants brings deep industry
                expertise, innovative methodologies, and a proven track record
                of delivering measurable results for clients across diverse
                sectors.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-4 bg-[rgb(var(--card-background))] rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[rgb(var(--card-border))]"
                  >
                    <stat.icon className="h-8 w-8 text-[rgb(var(--accent-gold))] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[rgb(var(--foreground))] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[rgb(var(--muted-foreground))]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[rgb(var(--card-border))]">
                <Image
                  src="https://res.cloudinary.com/ndtech/image/upload/v1753036381/dubai-7237750_1920_pwozwv.jpg"
                  alt="Nunu Consulting Team"
                  width={450}
                  height={600}
                  className="object-cover w-full h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--background))]/50 to-transparent" />
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-[rgb(var(--accent-gold-dark))] rounded-full flex items-center justify-center shadow-xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Award className="h-12 w-12 text-[rgb(var(--background))]" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-[rgb(var(--muted-foreground))]/50 rounded-full flex items-center justify-center shadow-xl"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Rocket className="h-10 w-10 text-[rgb(var(--foreground))]" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  }
);

About.displayName = "About";
