"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { forwardRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Testimonials = forwardRef<HTMLElement>((props, ref) => {
  const isInView = useInView(ref as React.RefObject<HTMLElement>, { once: false, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "Nunu Consulting transformed our business strategy completely. Their insights led to a 300% increase in revenue within 18 months.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder, GrowthCorp",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "The team's expertise in digital transformation helped us modernize our operations and stay ahead of the competition.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "VP Operations, ScaleUp Ltd.",
      avatar: "/placeholder.svg?height=60&width=60",
      content: "Outstanding results! Their strategic approach to team optimization improved our productivity by 250%.",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

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
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 relative z-10 flex items-center justify-center min-h-screen scroll-snap-align-start" // Changed to min-h-screen
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionContentVariants}
        className="w-full px-4 sm:px-6 lg:px-8 bg-[rgb(var(--card-background))]/70 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-[rgb(var(--card-border))]/50 transform-gpu" // Added transform-gpu
        style={{ transformOrigin: "bottom center" }} // Set transform origin
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[rgb(var(--foreground))] mb-4">What Our Clients Say</h2>
          <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders have to say about their experience with Nunu
            Consulting.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-[rgb(var(--card-border))] shadow-xl bg-[rgb(var(--card-background))]/70 backdrop-blur-md">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-[rgb(var(--accent-gold))] fill-current" />
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl font-medium text-[rgb(var(--foreground))] mb-8 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <Avatar className="h-16 w-16 border-2 border-[rgb(var(--accent-gold))]">
                    <AvatarImage src={testimonials[currentIndex].avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[rgb(var(--card-background))] text-[rgb(var(--foreground))]">
                      {testimonials[currentIndex].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-bold text-[rgb(var(--foreground))] text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-[rgb(var(--muted-foreground))]">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-[rgb(var(--card-background))]/50 border-[rgb(var(--card-border))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--card-background))]/70 hover:border-[rgb(var(--accent-gold))]"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-[rgb(var(--accent-gold))]" : "bg-[rgb(var(--muted-foreground))]"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-[rgb(var(--card-background))]/50 border-[rgb(var(--card-border))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--card-background))]/70 hover:border-[rgb(var(--accent-gold))]"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
})

Testimonials.displayName = "Testimonials"
