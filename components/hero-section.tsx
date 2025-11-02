"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/indian-farm-animals-in-field-pastoral-landscape.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">ग्रामीण पशु सहायक</h1>
        <p className="text-xl md:text-2xl mb-8 text-balance">Empowering Villagers to Care for Their Animals Better.</p>
        <Button
          onClick={() => scrollToSection("health")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg"
        >
          Get Started
        </Button>
      </div>
    </section>
  )
}
