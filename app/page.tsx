"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AnimalHealthSection } from "@/components/animal-health-section"
import { FarmTipsSection } from "@/components/farm-tips-section"
import { CommunityConnectSection } from "@/components/community-connect-section"
import { TeamSection } from "@/components/team-section"
import { VetsSection } from "@/components/vets-section"
import { ContactSection } from "@/components/contact-section"
import { AIChatHelper } from "@/components/ai-chat-helper"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AnimalHealthSection />
      <FarmTipsSection />
      <CommunityConnectSection />
      <VetsSection />
      <ContactSection />
      <AIChatHelper />
      <TeamSection />
      <Footer />
    </main>
  )
}
