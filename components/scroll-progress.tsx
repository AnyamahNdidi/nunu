"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(var(--accent-blue))] to-[rgb(var(--accent-green))] transform-origin-0 z-50"
        style={{ scaleX }}
      />

      {/* Animated Scroll Indicator - Always visible */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: [0, 10, 0] }} // Only vertical bounce animation
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center text-[rgb(var(--muted-foreground))]">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-[rgb(var(--muted-foreground))]/60 rounded-full flex justify-center bg-[rgb(var(--card-background))]/30 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-3 bg-[rgb(var(--accent-blue))] rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>
          <ChevronDown className="w-5 h-5 mt-2 text-[rgb(var(--accent-blue))]" />
        </div>
      </motion.div>
    </>
  )
}
