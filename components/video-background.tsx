"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Try to force play (helps on some mobile devices)
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          setHasError(true);
          console.error("Video play failed:", error);
        });
      }
    }
  }, []);
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[rgb(var(--background))]">
      {/* Video Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{
          scale: 1,
          opacity: isLoaded && !hasError ? 0.3 : 0, // Animates to 0.3 once loaded, or 0 on error
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setIsLoaded(true)} // More reliable than loadeddata
          onError={() => setHasError(true)}
          poster="/finance-poster.jpg" // Optional: Add a poster image
        >
          {/* 
            IMPORTANT: Place your video files in the `public` folder of your project.
            Provide different video sources for different resolutions.
            The browser will choose the first source that matches the media query.
          */}
          <source
            src="https://res.cloudinary.com/ndtech/video/upload/v1752929056/istockphoto-1382201604-640_adpp_is_b1m8fu.mp4"
            type="video/mp4"
          />
          {/* <source
            src="/video/vecteezy_compass-with-the-text-consulting-right-path-concept-video_1617474.mp4"
            type="video/mp4"
          /> */}
          {/* Fallback message */}
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better text readability and theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--background))]/50 via-transparent to-[rgb(var(--background))]/80" />
      </motion.div>
      {/* Fallback animated background if video fails to load */}
      {(hasError || !isLoaded) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgb(var(--muted-foreground)) 1px, transparent 1px),
                  linear-gradient(90deg, rgb(var(--muted-foreground)) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Floating Financial Elements as fallback */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`fallback-line-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-[rgb(var(--muted-foreground))]/30 to-transparent"
                style={{
                  width: `${Math.random() * 300 + 200}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [
                    -100,
                    typeof window !== "undefined"
                      ? window.innerWidth + 100
                      : 1920,
                  ],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 border-4 border-[rgb(var(--accent-gold))]/30 border-t-[rgb(var(--accent-gold))] rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      )}
    </div>
  );
}
