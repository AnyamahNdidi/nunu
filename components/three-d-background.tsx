"use client"

import { Canvas } from "@react-three/fiber"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState, Suspense } from "react" // Removed useState
import { SceneContent } from "./scene-content" // Import the new SceneContent component

export function ThreeDBackground() {
  const { theme } = useTheme()
  const [bgColor, setBgColor] = useState<string>("#282828") // Default dark metallic grey
  const [sparkleColor, setSparkleColor] = useState<string>("#FFD700") // Default gold
  const [accentBlue, setAccentBlue] = useState<string>("#3B82F6")
  const [accentBlueDark, setAccentBlueDark] = useState<string>("#1D4ED8")

  useEffect(() => {
    // Function to get computed style of a CSS variable
    const getCssVarRgb = (varName: string) => {
      if (typeof window === "undefined") return null
      const root = document.documentElement
      const style = getComputedStyle(root)
      const rgb = style.getPropertyValue(varName).trim()
      return rgb ? `rgb(${rgb})` : null
    }

    // Update colors based on theme
    const currentBg = getCssVarRgb("--background")
    const currentSparkle = getCssVarRgb("--accent-gold")
    const currentAccentBlue = getCssVarRgb("--accent-blue")
    const currentAccentBlueDark = getCssVarRgb("--accent-blue-dark")

    if (currentBg) setBgColor(currentBg)
    if (currentSparkle) setSparkleColor(currentSparkle)
    if (currentAccentBlue) setAccentBlue(currentAccentBlue)
    if (currentAccentBlueDark) setAccentBlueDark(currentAccentBlueDark)
  }, [theme]) // Re-run when theme changes

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]} // Pixel ratio for better quality on high-DPI screens
        style={{ background: bgColor, opacity: 0.3 }} // Apply background color and overall opacity
      >
        <Suspense fallback={null}>
          {/* Render SceneContent inside Canvas */}
          <SceneContent
            theme={theme}
            sparkleColor={sparkleColor}
            accentBlue={accentBlue}
            accentBlueDark={accentBlueDark}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
