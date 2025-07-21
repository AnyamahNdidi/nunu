"use client";

import type React from "react";

import { motion, useInView, useTransform } from "framer-motion";
import { forwardRef } from "react";
import {
  TrendingUp,
  PieChart,
  BarChart3,
  Target,
  DollarSign,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThreeDIcon } from "./three-d-icon"; // Keep the main 3D icon for the header
type HeroProps = {
  scrollY: any;
};
export const Services = forwardRef<HTMLElement, HeroProps>(
  ({ scrollY }, ref) => {
    const isInView = useInView(ref as React.RefObject<HTMLElement>, {
      once: false,
      margin: "-100px",
    });

    const services = [
      {
        icon: TrendingUp, // Reverted to Lucide icon
        title: "Investment Strategy",
        description:
          "Maximize returns with data-driven investment strategies tailored to your risk profile and goals.",
        color: "text-[rgb(var(--accent-green))]",
        bgColor: "bg-[rgb(var(--accent-green))]/10",
        borderColor: "border-[rgb(var(--accent-green))]/20",
      },
      {
        icon: PieChart, // Reverted to Lucide icon
        title: "Portfolio Management",
        description:
          "Diversified portfolio optimization using advanced analytics and market intelligence.",
        color: "text-[rgb(var(--muted-foreground))]",
        bgColor: "bg-[rgb(var(--muted-foreground))]/10",
        borderColor: "border-[rgb(var(--muted-foreground))]/20",
      },
      {
        icon: BarChart3, // Reverted to Lucide icon
        title: "Financial Planning",
        description:
          "Comprehensive financial planning for long-term wealth creation and preservation.",
        color: "text-[rgb(var(--accent-purple))]",
        bgColor: "bg-[rgb(var(--accent-purple))]/10",
        borderColor: "border-[rgb(var(--accent-purple))]/20",
      },
      {
        icon: Target, // Reverted to Lucide icon
        title: "Risk Management",
        description:
          "Advanced risk assessment and mitigation strategies to protect your investments.",
        color: "text-[rgb(var(--accent-gold))]",
        bgColor: "bg-[rgb(var(--accent-gold))]/10",
        borderColor: "border-[rgb(var(--accent-gold))]/20",
      },
      {
        icon: DollarSign, // Reverted to Lucide icon
        title: "Tax Optimization",
        description:
          "Strategic tax planning to minimize liabilities and maximize after-tax returns.",
        color: "text-[rgb(var(--accent-gold))]",
        bgColor: "bg-[rgb(var(--accent-gold))]/10",
        borderColor: "border-[rgb(var(--accent-gold))]/20",
      },
      {
        icon: Shield, // Reverted to Lucide icon
        title: "Wealth Protection",
        description:
          "Comprehensive wealth protection strategies including insurance and estate planning.",
        color: "text-[rgb(var(--accent-red))]",
        bgColor: "bg-[rgb(var(--accent-red))]/10",
        borderColor: "border-[rgb(var(--accent-red))]/20",
      },
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

    const itemVariants = {
      hidden: { opacity: 0, y: 50 }, // Changed to simple fade-in from bottom
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6, // Slightly faster for a fade
          ease: "easeOut",
        },
      },
    };

    const iconFloatingVariants = {
      initial: { y: 0 },
      animate: {
        y: [0, -10, 0], // Floating animation
        transition: {
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      },
    };
    const y = useTransform(scrollY, [0, 300], [0, 100]);

    return (
      <section
        id="services"
        ref={ref}
        className="py-24 relative z-10 flex  bg-[rgb(var(--background))] items-center justify-center min-h-screen scroll-snap-align-start" // Changed to min-h-screen
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionContentVariants as any}
          className="w-full px-4 sm:px-6 lg:px-8 bg-[rgb(var(--card-background))]/70  rounded-2xl p-8 md:p-12 border border-[rgb(var(--card-border))]/50 " // Added transform-gpu
          style={{ transformOrigin: "bottom center", y }} // Set transform origin
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[rgb(var(--foreground))] mb-4">
              Our Financial Services
            </h2>
            <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto mb-8">
              Comprehensive financial consulting solutions designed to optimize
              your wealth and secure your financial future.
            </p>
            {/* Main Three.js Icon in the header */}
            <div className="flex justify-center mb-8">
              <ThreeDIcon
                size={80}
                initialColor="rgb(var(--accent-gold))"
                rotationSpeed={0.005}
              />
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants as any}>
                <Card
                  className={`h-[350px] max-w-sm h transition-all duration-300 group cursor-pointer bg-[rgb(var(--card-background))] border hover:shadow-[8px_8px_15px_rgba(0,0,0,0.1),_-8px_-8px_15px_rgba(255,255,255,0.9)]`} // Neumorphic card styling, increased height
                >
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden`} // Container for the icon
                      style={{
                        background: `linear-gradient(145deg, rgb(var(--card-background-light)), rgb(var(--card-background-dark)))`,
                        boxShadow: `inset 5px 5px 10px rgba(0,0,0,0.05), inset -5px -5px 10px rgba(255,255,255,0.8)`,
                      }}
                    >
                      {/* This is where the 3D-like icon will be rendered using CSS transforms */}
                      <motion.div
                        className={`absolute inset-0 flex items-center justify-center ${service.color}`}
                        variants={iconFloatingVariants as any} // Apply floating animation
                        initial="initial"
                        animate="animate"
                        style={{
                          perspective: 1000, // Apply perspective for 3D effect
                          textShadow: `0 0 10px ${service.color
                            .replace("text-", "")
                            .replace("rgb(var(--", "rgba(var(--")
                            .replace("))", "), 0.7)")}`, // Glowing effect
                        }}
                      >
                        <service.icon className={`h-12 w-12`} />{" "}
                        {/* Larger icon */}
                      </motion.div>
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--accent-gold))] transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[rgb(var(--muted-foreground))] text-center leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

Services.displayName = "Services";
