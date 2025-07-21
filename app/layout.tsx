import type React from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Configure Roboto font with desired weights and styles
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Include the weights you need
  style: ["normal", "italic"], // Include styles if needed
  variable: "--font-roboto", // Optional CSS variable
  display: "swap", // Optional: ensures text remains visible during webfont load
});

export const metadata: Metadata = {
  title: "Nunu Consulting",
  description: "Transforming Financial Futures",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={roboto.className}>
      <body>
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
