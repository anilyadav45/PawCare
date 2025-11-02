"use client"

import { SectionWrapper } from "./section-wrapper"

export function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Team Visit & Interacting with Farmers",
      role: "Understanding challenges faced in accessing veterinary care",
      image: "/team8.jpg",
    },

    {
      id: 3,
      name: "Feeding and Nutrition",
      role: "Observing cattle feeding methods in rural areas",
      image: "/team5.jpg",
    },

    {
      id: 7,
      name: "Water and Cleanliness Check",
      role: "Highlighting importance of clean water and hygiene for animals",
      image: "/team12.jpg",
    },

    {
      id: 10,
      name: "Visit to animal keeper Farm",
      role: "Documenting issues in feed management and animal health",
      image: "/team10.jpg",
    },
    {
      id: 11,
      name: "Collecting Common mistakes",
      role: "Collecting the datas that animal keeper  mistakes to tackle",
      image: "/team11.jpg",
    },
    {
      id: 12,
      name: "Observing the problems",
      role: "Concluding field visit with reflections and observing the problems they are facing",
      image: "/team12.jpg",
    },
  ]

  return (
    <SectionWrapper id="team" className="bg-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">🐄 Our Field Visit Experience</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Moments from our team’s visits to nearby villages and animal farms — learning directly from local keepers and understanding their daily challenges.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info Container */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                <p className="text-accent font-semibold">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm border border-accent/20">
          <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
          <p className="text-foreground/70 leading-relaxed mb-4">
            Our main goal in this Community Service Project under the “Animals and Species” category was to visit nearby villages,
            meet animal keepers, and understand the real problems they face in daily animal care. During our visit, we interacted
            with farmers and found issues like lack of quick veterinary help, limited knowledge about feeding and hygiene, and no
            easy way to keep records of their animals’ health.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            After seeing these challenges, we decided to create <strong>Grami Pashu Sahayak</strong> — a simple web app that can help
            villagers get animal care information, tips, and basic guidance in one place. This project is our small step to make
            technology useful for rural people and improve animal welfare with what we learned from the ground.
          </p>
        </div>

      </div>
    </SectionWrapper>
  )
}
