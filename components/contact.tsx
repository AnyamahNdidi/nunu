"use client";

import type React from "react";
import { forwardRef, useRef } from "react"; // Import forwardRef
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Contact = forwardRef<HTMLElement>((props, ref) => {
  // Changed back to named export with forwardRef
  // const localRef = useRef<HTMLElement>(null);
  const { ref: localRef, inView: isInView } = useInView({
    threshold: 0,
    rootMargin: "-100px",
  });

  const setRefs = (node: HTMLElement | null) => {
    // @ts-ignore - type mismatch between refs
    localRef(node);
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@nunuconsulting.com",
      color: "text-[rgb(var(--accent-gold))]",
      bgColor: "bg-[rgb(var(--accent-gold))]/10",
      borderColor: "border-[rgb(var(--accent-gold))]/20",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      color: "text-[rgb(var(--muted-foreground))]",
      bgColor: "bg-[rgb(var(--muted-foreground))]/10",
      borderColor: "border-[rgb(var(--muted-foreground))]/20",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Business Ave, Suite 100\nNew York, NY 10001",
      color: "text-[rgb(var(--accent-purple))]",
      bgColor: "bg-[rgb(var(--accent-purple))]/10",
      borderColor: "border-[rgb(var(--accent-purple))]/20",
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

  return (
    <section
      id="contact"
      ref={setRefs}
      className="py-24 relative z-10 flex items-center justify-center min-h-screen scroll-snap-align-start" // Changed to min-h-screen
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionContentVariants as any}
        className="w-full px-4 sm:px-6 lg:px-8 bg-[rgb(var(--card-background))]/70 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-[rgb(var(--card-border))]/50 transform-gpu" // Added transform-gpu
        style={{ transformOrigin: "bottom center" }} // Set transform origin
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[rgb(var(--foreground))] mb-4">
            Let's Start Your Transformation
          </h2>
          <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto">
            Ready to unlock your business potential? Get in touch with our
            experts and discover how we can help you achieve extraordinary
            results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={`text-center h-full hover:shadow-lg transition-shadow border ${info.borderColor} shadow-md bg-[rgb(var(--card-background))]/50 backdrop-blur-md`}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 border ${info.borderColor}`}
                  >
                    <info.icon className={`h-8 w-8 ${info.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-[rgb(var(--foreground))]">
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[rgb(var(--muted-foreground))] whitespace-pre-line">
                    {info.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border border-[rgb(var(--card-border))] shadow-xl bg-[rgb(var(--card-background))]/70 backdrop-blur-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-[rgb(var(--foreground))]">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    className="bg-[rgb(var(--input-background))]/50 border-[rgb(var(--input-border))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:border-[rgb(var(--accent-gold))]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    className="bg-[rgb(var(--input-background))]/50 border-[rgb(var(--input-border))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:border-[rgb(var(--accent-gold))]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  className="bg-[rgb(var(--input-background))]/50 border-[rgb(var(--input-border))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:border-[rgb(var(--accent-gold))]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">
                  Company
                </label>
                <Input
                  placeholder="Your Company Name"
                  className="bg-[rgb(var(--input-background))]/50 border-[rgb(var(--input-border))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:border-[rgb(var(--accent-gold))]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Tell us about your project and how we can help..."
                  rows={5}
                  className="bg-[rgb(var(--input-background))]/50 border-[rgb(var(--input-border))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:border-[rgb(var(--accent-gold))]"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-gradient-to-r from-[rgb(var(--accent-gold))] to-[rgb(var(--accent-gold-dark))] hover:from-[rgb(var(--accent-gold-dark))] hover:to-[rgb(var(--accent-gold))] text-[rgb(var(--background))] py-3 text-lg">
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
});

Contact.displayName = "Contact";
