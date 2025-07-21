"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Environment } from "@react-three/drei"
import { useRef, Suspense, useEffect, useState } from "react"
import type { Mesh } from "three"

interface ThreeDIconProps {
  size?: number
  initialColor?: string // This will be a CSS variable string like "rgb(var(--accent-gold))"
  rotationSpeed?: number
}

function SpinningBox({ rotationSpeed = 0.01, boxColor = "gold" }: { rotationSpeed?: number; boxColor?: string }) {
  const meshRef = useRef<Mesh>(null)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed
    }
  })
  return (
    <Box args={[1, 1, 1]} ref={meshRef}>
      <meshStandardMaterial color={boxColor} metalness={0.8} roughness={0.2} />
    </Box>
  )
}

export function ThreeDIcon({
  size = 50,
  initialColor = "rgb(var(--accent-gold))",
  rotationSpeed = 0.01,
}: ThreeDIconProps) {
  const [resolvedColor, setResolvedColor] = useState<string>("gold") // Default fallback

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement
      const style = getComputedStyle(root)
      // Extract the RGB values from the CSS variable string
      const rgbMatch = initialColor.match(/rgb$$(\d+)\s(\d+)\s(\d+)$$/)
      if (rgbMatch) {
        setResolvedColor(`rgb(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]})`)
      } else {
        setResolvedColor(initialColor) // Use as is if not a CSS var
      }
    }
  }, [initialColor])

  return (
    <div style={{ width: size, height: size, display: "inline-block" }}>
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <SpinningBox rotationSpeed={rotationSpeed} boxColor={resolvedColor} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  )
}
