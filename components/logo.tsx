import type * as React from "react"

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
}

export function Logo({ width = 120, height = 48, ...props }: LogoProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        {/* Blue gradient for the circles - consistent across themes, using Nunu logo blues */}
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "rgb(var(--accent-blue))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "rgb(var(--accent-blue-dark))", stopOpacity: 1 }} />
        </linearGradient>
        {/* Gold gradient for accents - consistent across themes */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "rgb(var(--accent-gold))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "rgb(var(--accent-gold-dark))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Background circle elements representing the "nu nu" concept */}
      <circle cx="30" cy="40" r="12" fill="url(#gradient1)" opacity="0.8" />
      <circle cx="50" cy="40" r="12" fill="url(#gradient1)" opacity="0.6" />

      {/* Main company name - dynamically colored */}
      <text x="80" y="50" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="rgb(var(--foreground))">
        nunu
      </text>

      {/* Consulting text - dynamically colored */}
      <text
        x="80"
        y="75"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="normal"
        fill="rgb(var(--muted-foreground))"
        letterSpacing="2px"
      >
        CONSULTING
      </text>

      {/* Decorative line - Using gold gradient */}
      <line x1="80" y1="85" x2="240" y2="85" stroke="url(#goldGradient)" strokeWidth="2" />

      {/* Small accent dots - Using gold */}
      <circle cx="245" cy="85" r="2" fill="rgb(var(--accent-gold))" />
      <circle cx="255" cy="85" r="2" fill="rgb(var(--accent-gold-dark))" />
    </svg>
  )
}
