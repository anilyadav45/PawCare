"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionWrapper } from "@/components/section-wrapper"

const contactPeople = [
  { name: "Anil Yadav", role: "Lead Team", phone: "+91 8125305482", image: "/" },
  { name: "Alok Pandey", role: "Backend Developer", phone: "+91 9857487743", image: "/team/priya.jpg" },
  { name: "Manish Chaudhary", role: "Frontend Developer", phone: "+91 7746746343", image: "/team/shyam.jpg" },
  { name: "Sandhya Chaudhary", role: "UI/UX", phone: "+91 9873674634", image: "/team/rajesh.jpg" },
  { name: "Brijesh Chaurasiya", role: "AI/ML Expert", phone: "+91 8954746374", image: "/team/vikram.jpg" },
]

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", village: "", question: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.village && formData.question) {
      setSubmitted(true)
      setFormData({ name: "", village: "", question: "" })
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <SectionWrapper id="contact" title="Contact Us" subtitle="संपर्क करें" className="bg-muted/30">
      <div className="max-w-3xl mx-auto animate-fade-in-up space-y-16">
        {/* Contact Form */}
        <Card className="p-8 shadow-lg border border-accent/20">
          {submitted && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary rounded-lg text-center">
              <p className="text-primary font-semibold">Thank you! We will get back to you soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Name</label>
              <Input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Village</label>
              <Input
                type="text"
                placeholder="Your village"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Question</label>
              <Textarea
                placeholder="Ask your question about animal care..."
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
                className="min-h-32"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
            >
              Submit
            </Button>
          </form>
        </Card>

        {/* Team Members Section */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactPeople.map((person, index) => (
              <Card
                key={index}
                className="p-4 shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4 border border-accent/10"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/50"
                />
                <div>
                  <h4 className="font-bold text-foreground">{person.name}</h4>
                  <p className="text-secondary text-sm">{person.role}</p>
                  <p className="text-muted-foreground text-xs">{person.phone}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
