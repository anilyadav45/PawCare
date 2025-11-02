"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Health", id: "health" },
    { label: "Tasks", id: "tips" },
    { label: "Community", id: "community" },
    { label: "Vets", id: "vets" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("home")}>
            <span className="text-2xl">🌿</span>
            <span className="font-bold text-lg text-orange-600">Grami Pashu Sahayak</span>
          </div>

          {/* Center: Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-orange-600 hover:text-orange-700 transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: AI Help Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                const chatButton = document.getElementById("ai-chat-button")
                chatButton?.click()
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold"
            >
              AI Help
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-orange-200 py-4 px-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
