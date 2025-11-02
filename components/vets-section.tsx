"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { SectionWrapper } from "@/components/section-wrapper"

interface Vet {
  id: string
  name: string
  state: string
  district: string
  phone: string
}

// State to Districts mapping
const stateDistrictMap: Record<string, string[]> = {
  "Andhra Pradesh": ["Chittoor", "Anantapur", "Kadapa", "Nellore", "Visakhapatnam"],
  Telangana: ["Hyderabad", "Rangareddy", "Medchal", "Nalgonda", "Warangal"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
  Punjab: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"],
  Haryana: ["Faridabad", "Gurgaon", "Hisar", "Rohtak", "Panipat"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Junagadh"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
  Karnataka: ["Bangalore", "Mysore", "Belgaum", "Mangalore", "Hubli"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Aurangabad", "Nashik"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruppur"],
}

const vets: Vet[] = [
  // Andhra Pradesh 
  { id: "1", name: "Dr. Ramesh Reddy", state: "Andhra Pradesh", district: "Chittoor", phone: "9876543210" },
  { id: "2", name: "Dr. Suresh Sah", state: "Andhra Pradesh", district: "Anantapur", phone: "9876543211" },
  { id: "3", name: "Dr. Venkatesh Raut", state: "Andhra Pradesh", district: "Kadapa", phone: "9876543212" },
  { id: "4", name: "Dr. Priya Reddy", state: "Andhra Pradesh", district: "Nellore", phone: "9876543213" },
  { id: "5", name: "Dr. Arun Rao", state: "Andhra Pradesh", district: "Visakhapatnam", phone: "9876543214" },

  // Telangana 
  { id: "6", name: "Dr. Rajesh Reddy", state: "Telangana", district: "Hyderabad", phone: "9876543215" },
  { id: "7", name: "Dr. Kavya Rao", state: "Telangana", district: "Rangareddy", phone: "9876543216" },
  { id: "8", name: "Dr. Vikram Sharma", state: "Telangana", district: "Medchal", phone: "9876543217" },
  { id: "9", name: "Dr. Neha Reddy", state: "Telangana", district: "Nalgonda", phone: "9876543218" },
  { id: "10", name: "Dr. Sanjay Rao", state: "Telangana", district: "Warangal", phone: "9876543219" },

  // Uttar Pradesh 
  { id: "11", name: "Dr. Amit Yadav", state: "Uttar Pradesh", district: "Lucknow", phone: "9876543220" },
  { id: "12", name: "Dr. Pooja Singh", state: "Uttar Pradesh", district: "Kanpur", phone: "9876543221" },
  { id: "13", name: "Dr. Rajiv Yadav", state: "Uttar Pradesh", district: "Agra", phone: "9876543222" },
  { id: "14", name: "Dr. Anita Sharma", state: "Uttar Pradesh", district: "Varanasi", phone: "9876543223" },
  { id: "15", name: "Dr. Deepak Yadav", state: "Uttar Pradesh", district: "Meerut", phone: "9876543224" },

  // Punjab
  { id: "16", name: "Dr. Harpreet Singh", state: "Punjab", district: "Amritsar", phone: "9876543225" },
  { id: "17", name: "Dr. Simran Kaur", state: "Punjab", district: "Ludhiana", phone: "9876543226" },
  { id: "18", name: "Dr. Jaswant Sharma", state: "Punjab", district: "Jalandhar", phone: "9876543227" },
  { id: "19", name: "Dr. Priya Singh", state: "Punjab", district: "Patiala", phone: "9876543228" },

  // Haryana 
  { id: "20", name: "Dr. Vikas Yadav", state: "Haryana", district: "Faridabad", phone: "9876543230" },
  { id: "21", name: "Dr. Neha Singh", state: "Haryana", district: "Gurgaon", phone: "9876543231" },
  { id: "22", name: "Dr. Sanjay Sharma", state: "Haryana", district: "Hisar", phone: "9876543232" },
  { id: "23", name: "Dr. Anjali Yadav", state: "Haryana", district: "Rohtak", phone: "9876543233" },

  // Gujarat
  { id: "24", name: "Dr. Ashok Patel", state: "Gujarat", district: "Ahmedabad", phone: "9876543235" },
  { id: "25", name: "Dr. Meera Shah", state: "Gujarat", district: "Surat", phone: "9876543236" },
  { id: "26", name: "Dr. Kiran Desai", state: "Gujarat", district: "Vadodara", phone: "9876543237" },
  { id: "27", name: "Dr. Priya Patel", state: "Gujarat", district: "Rajkot", phone: "9876543238" },

  // Madhya Pradesh 
  { id: "28", name: "Dr. Anil Yadav", state: "Madhya Pradesh", district: "Indore", phone: "9876543240" },
  { id: "29", name: "Dr. Sunita Singh", state: "Madhya Pradesh", district: "Bhopal", phone: "9876543241" },
  { id: "30", name: "Dr. Manoj Yadav", state: "Madhya Pradesh", district: "Jabalpur", phone: "9876543242" },
  { id: "31", name: "Dr. Kavya Sharma", state: "Madhya Pradesh", district: "Gwalior", phone: "9876543243" },

  // Karnataka 
  { id: "32", name: "Dr. Suresh Reddy", state: "Karnataka", district: "Bangalore", phone: "9876543245" },
  { id: "33", name: "Dr. Priya Rao", state: "Karnataka", district: "Mysore", phone: "9876543246" },
  { id: "34", name: "Dr. Rajesh Sharma", state: "Karnataka", district: "Belgaum", phone: "9876543247" },
  { id: "35", name: "Dr. Anita Reddy", state: "Karnataka", district: "Mangalore", phone: "9876543248" },

  // Maharashtra 
  { id: "36", name: "Dr. Rajesh Sharma", state: "Maharashtra", district: "Mumbai", phone: "9876543250" },
  { id: "37", name: "Dr. Neha Desai", state: "Maharashtra", district: "Pune", phone: "9876543251" },
  { id: "38", name: "Dr. Arun Kulkarni", state: "Maharashtra", district: "Nagpur", phone: "9876543252" },
  { id: "39", name: "Dr. Priya Sharma", state: "Maharashtra", district: "Aurangabad", phone: "9876543253" },

  // Tamil Nadu 
  { id: "40", name: "Dr. Ramesh Reddy", state: "Tamil Nadu", district: "Chennai", phone: "9876543255" },
  { id: "41", name: "Dr. Priya Kumar", state: "Tamil Nadu", district: "Coimbatore", phone: "9876543256" },
  { id: "42", name: "Dr. Suresh Iyer", state: "Tamil Nadu", district: "Madurai", phone: "9876543257" },
  { id: "43", name: "Dr. Anita Reddy", state: "Tamil Nadu", district: "Salem", phone: "9876543258" },
]

export function VetsSection() {
  const [selectedState, setSelectedState] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")

  // Get available districts for selected state
  const availableDistricts = selectedState ? stateDistrictMap[selectedState] || [] : []

  // Filter vets based on selections
  const filteredVets = useMemo(() => {
    return vets.filter((vet) => {
      if (selectedState && vet.state !== selectedState) return false
      if (selectedDistrict && vet.district !== selectedDistrict) return false
      return true
    })
  }, [selectedState, selectedDistrict])

  // Reset district when state changes
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value)
    setSelectedDistrict("")
  }

  return (
    <SectionWrapper id="vets" title="Local Vets" subtitle="पशु चिकित्सक" className="bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Filtering UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in-up">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Select State</label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All States</option>
              {Object.keys(stateDistrictMap).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Select District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Districts</option>
              {availableDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vets List */}
        <div className="space-y-4">
          {filteredVets.length > 0 ? (
            filteredVets.map((vet, index) => (
              <Card
                key={vet.id}
                className="p-6 shadow-md hover:shadow-lg transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{vet.name}</h3>
                    <p className="text-secondary">
                      {vet.district}, {vet.state}
                    </p>
                  </div>
                  <a
                    href={`tel:${vet.phone}`}
                    className="inline-block px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors"
                  >
                    {vet.phone}
                  </a>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-secondary text-lg">No veterinarians found in the selected area.</p>
            </Card>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
