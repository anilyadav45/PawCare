"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { SectionWrapper } from "@/components/section-wrapper"
import { Checkbox } from "@/components/ui/checkbox"
import { Droplets, Leaf, Home, AlertCircle, Zap, Shield } from "lucide-react"

interface Tip {
  id: string
  text: string
  icon: React.ReactNode
}

const farmTips: Tip[] = [
  { id: "1", text: "Check water troughs daily", icon: <Droplets className="w-5 h-5 text-blue-500" /> },
  { id: "2", text: "Feed animals with quality fodder", icon: <Leaf className="w-5 h-5 text-green-500" /> },
  { id: "3", text: "Clean animal shelters", icon: <Home className="w-5 h-5 text-amber-600" /> },
  { id: "4", text: "Inspect animals for illness", icon: <AlertCircle className="w-5 h-5 text-red-500" /> },
  { id: "5", text: "Check fences and gates", icon: <Zap className="w-5 h-5 text-yellow-500" /> },
  { id: "6", text: "Update vaccination records", icon: <Shield className="w-5 h-5 text-purple-500" /> },
]

export function FarmTipsSection() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  return (
    <SectionWrapper id="tips" title="Daily Care Routine" subtitle="" className="bg-background">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 shadow-lg">
          <ul className="space-y-4">
            {farmTips.map((tip) => (
              <li
                key={tip.id}
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => toggleCheck(tip.id)}
              >
                <div className="flex-shrink-0">{tip.icon}</div>
                <Checkbox
                  checked={checkedItems.has(tip.id)}
                  onChange={() => toggleCheck(tip.id)}
                  className="flex-shrink-0 border-2 border-primary"
                />
                <span
                  className={`text-lg leading-relaxed transition-all ${
                    checkedItems.has(tip.id)
                      ? "line-through text-secondary"
                      : "text-foreground group-hover:text-primary"
                  }`}
                >
                  {tip.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Progress Indicator */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-secondary">Daily Progress</span>
              <span className="text-sm font-bold text-primary">
                {checkedItems.size} / {farmTips.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(checkedItems.size / farmTips.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </Card>
      </div>
    </SectionWrapper>
  )
}
