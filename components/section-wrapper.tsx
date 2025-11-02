import type React from "react"

interface SectionWrapperProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, title, subtitle, children, className = "" }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{title}</h2>
          {subtitle && <p className="text-lg text-secondary text-balance">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
