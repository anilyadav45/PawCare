"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { SectionWrapper } from "@/components/section-wrapper"

interface Animal {
  id: string
  name: string
  hindiName: string
  image: string
  tabs: {
    label: string
    content: string
  }[]
}

const animals: Animal[] = [
  {
    id: "goat",
    name: "Goat",
    hindiName: "बकरी",
    image: "/goat-farm-animal.jpg",
    tabs: [
      {
        label: "Health Tips",
        content:
          "Keep goats in a clean, dry shelter. Provide fresh water daily. Check for parasites regularly. Vaccinate against common diseases like PPR and FMD. Monitor for signs of illness like discharge or lethargy.",
      },
      {
        label: "Feeding",
        content:
          "Feed goats with quality hay, grains, and vegetables. Provide 2-3 kg of fodder per day. Supplement with mineral blocks. Ensure access to clean water at all times. Avoid moldy or spoiled feed.",
      },
      {
        label: "Illness Signs",
        content:
          "Watch for diarrhea, coughing, or nasal discharge. Loss of appetite or weight loss indicates problems. Lameness or difficulty walking needs attention. Fever or lethargy requires immediate veterinary care.",
      },
    ],
  },
  {
    id: "cow",
    name: "Cow",
    hindiName: "गाय",
    image: "/cow-farm-animal.jpg",
    tabs: [
      {
        label: "Health Tips",
        content:
          "Maintain clean housing with proper ventilation. Regular health checkups are essential. Vaccinate against FMD and other diseases. Keep hooves trimmed and clean. Provide adequate space for movement.",
      },
      {
        label: "Feeding",
        content:
          "Feed cows with quality hay, silage, and grains. Provide 15-20 kg of fodder daily. Include mineral supplements and salt. Ensure constant access to clean water. Proper nutrition improves milk production.",
      },
      {
        label: "Illness Signs",
        content:
          "Reduced milk production is a warning sign. Watch for swelling in udders or legs. Difficulty in standing or walking needs attention. Fever, cough, or discharge requires veterinary care.",
      },
    ],
  },
  {
    id: "buffalo",
    name: "Buffalo",
    hindiName: "भैंस",
    image: "/buffalo-farm-animal.jpg",
    tabs: [
      {
        label: "Health Tips",
        content:
          "Provide wallows or water bodies for cooling. Regular grooming prevents skin diseases. Vaccinate against FMD and other diseases. Keep shelter clean and dry. Monitor for tick and parasite infestations.",
      },
      {
        label: "Feeding",
        content:
          "Feed buffaloes with hay, silage, and grains. Provide 20-25 kg of fodder daily. Include mineral supplements. Ensure access to clean water. Proper nutrition supports milk production.",
      },
      {
        label: "Illness Signs",
        content:
          "Reduced milk production indicates health issues. Watch for lameness or difficulty moving. Fever, cough, or nasal discharge needs attention. Swelling in any body part requires veterinary care.",
      },
    ],
  },
  {
    id: "chicken",
    name: "Chicken",
    hindiName: "मुर्गी",
    image: "/chicken-farm-animal.jpg",
    tabs: [
      {
        label: "Health Tips",
        content:
          "Maintain clean coops with proper ventilation. Provide nesting boxes and perches. Vaccinate against common poultry diseases. Protect from predators. Regular cleaning prevents disease spread.",
      },
      {
        label: "Feeding",
        content:
          "Feed chickens with quality grain and vegetable scraps. Provide 100-150g of feed per bird daily. Include calcium for egg production. Ensure access to clean water. Supplement with greens.",
      },
      {
        label: "Illness Signs",
        content:
          "Reduced egg production or no eggs indicates problems. Watch for ruffled feathers or lethargy. Diarrhea or discharge needs attention. Lameness or difficulty walking requires care.",
      },
    ],
  },
]

interface AnimalCardProps {
  animal: Animal
}

function AnimalCard({ animal }: AnimalCardProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img src={animal.image || "/placeholder.svg"} alt={animal.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-foreground mb-1">{animal.name}</h3>
        <p className="text-secondary mb-4">({animal.hindiName})</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-border">
          {animal.tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`pb-2 px-3 font-medium transition-colors ${
                activeTab === index ? "text-primary border-b-2 border-primary" : "text-secondary hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <p className="text-foreground leading-relaxed">{animal.tabs[activeTab].content}</p>
      </div>
    </Card>
  )
}

export function AnimalHealthSection() {
  return (
    <SectionWrapper id="health" title="Animal Health" subtitle="पशु स्वास्थ्य" className="bg-muted/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {animals.map((animal) => (
          <div key={animal.id} className="animate-fade-in-up">
            <AnimalCard animal={animal} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
