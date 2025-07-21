"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react"; // Import Sun and Moon icons
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useTheme } from "@/components/theme-provider"; // Import useTheme hook

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Use the theme hook

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Hero", href: "#hero" }, // Added Hero to nav items for active state
    { name: "Stats", href: "#stats" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  // Determine the background color based on scroll state and active section
  const navBgClass = isScrolled
    ? "bg-[rgb(var(--card-background))]/70 backdrop-blur-md shadow-2xl border-b border-[rgb(var(--card-border))]/20" // Now matches section background
    : "bg-transparent"; // Transparent when not scrolled

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${navBgClass}`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-[rgb(var(--background))]">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <Logo width={100} height={40} className="h-10 w-auto" />
            <p className="text-xs text-[rgb(var(--muted-foreground))] font-medium hidden sm:block">
              Financial Consulting
            </p>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--accent-gold))] px-4 py-2 text-sm font-medium transition-all duration-200 relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[rgb(var(--accent-gold))] to-[rgb(var(--accent-gold-dark))]"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX:
                        activeSection.toLowerCase() === item.name.toLowerCase()
                          ? 1
                          : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-center space-x-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button className="bg-gradient-to-r from-[rgb(var(--accent-gold))] to-[rgb(var(--accent-gold-dark))] hover:from-[rgb(var(--accent-gold-dark))] hover:to-[rgb(var(--accent-gold))] text-[rgb(var(--background))] px-6 py-2 font-semibold shadow-lg">
                  Get Started
                </Button>
              </motion.div>
            </div>
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-4 text-[rgb(var(--foreground))] hover:bg-[rgb(var(--card-background))]/50"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Theme Toggle Button for Mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2 text-[rgb(var(--foreground))] hover:bg-[rgb(var(--card-background))]/50"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[rgb(var(--foreground))] hover:bg-[rgb(var(--card-background))]/50"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[rgb(var(--card-background))]/70 backdrop-blur-md border-t border-[rgb(var(--card-border))]/20" // Fully opaque for mobile menu
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-[rgb(var(--foreground))] hover:text-[rgb(var(--accent-gold))] block px-4 py-3 text-base font-medium rounded-lg hover:bg-[rgb(var(--card-background))]/50 transition-colors ${
                    activeSection.toLowerCase() === item.name.toLowerCase()
                      ? "text-[rgb(var(--accent-gold))]"
                      : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-[rgb(var(--accent-gold))] to-[rgb(var(--accent-gold-dark))] hover:from-[rgb(var(--accent-gold-dark))] hover:to-[rgb(var(--accent-gold))] text-[rgb(var(--background))] font-semibold">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
