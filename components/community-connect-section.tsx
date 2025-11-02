"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionWrapper } from "@/components/section-wrapper"

interface Post {
  id: string
  name: string
  village: string
  advice: string
  timestamp: string
}

export function CommunityConnectSection() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      village: "Haryana",
      advice: "I use neem leaves mixed with water to treat skin diseases in goats. Very effective and natural!",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Priya Singh",
      village: "Punjab",
      advice: "Feeding my cows with jaggery and groundnut cake has increased milk production by 20%.",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      name: "Vikram Patel",
      village: "Gujarat",
      advice: "Regular vaccination and proper hygiene reduced disease incidents in my farm significantly.",
      timestamp: "1 day ago",
    },
  ])

  const [formData, setFormData] = useState({ name: "", village: "", advice: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.village && formData.advice) {
      const newPost: Post = {
        id: Date.now().toString(),
        name: formData.name,
        village: formData.village,
        advice: formData.advice,
        timestamp: "just now",
      }
      setPosts([newPost, ...posts])
      setFormData({ name: "", village: "", advice: "" })
    }
  }

  return (
    <SectionWrapper id="community" title="Community Connect" subtitle="समुदाय" className="bg-muted/30">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1 animate-fade-in-up">
          <Card className="p-6 shadow-lg sticky top-24">
            <h3 className="text-xl font-bold text-foreground mb-4">Share Your Advice</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Village</label>
                <Input
                  type="text"
                  placeholder="Your village"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Advice</label>
                <Textarea
                  placeholder="Share your farming advice..."
                  value={formData.advice}
                  onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
                  className="w-full min-h-24"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Submit Post
              </Button>
            </form>
          </Card>
        </div>

        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          {posts.map((post, index) => (
            <Card
              key={post.id}
              className="p-6 shadow-md hover:shadow-lg transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-foreground">{post.name}</h4>
                  <p className="text-sm text-secondary">{post.village}</p>
                </div>
                <span className="text-xs text-muted-foreground">{post.timestamp}</span>
              </div>
              <p className="text-foreground leading-relaxed">{post.advice}</p>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
