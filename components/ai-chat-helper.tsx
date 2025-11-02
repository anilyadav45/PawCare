"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  type: "user" | "ai"
  text: string
}

interface Reminder {
  id: string
  task: string
  icon: string
}

const aiResponses: Record<string, string> = {
  health:
    "For animal health, ensure regular vaccinations, clean shelter, fresh water, and balanced nutrition. Watch for signs of illness like discharge, lethargy, or loss of appetite.",
  feeding:
    "Proper feeding is crucial. Provide quality hay, grains, and vegetables. The amount depends on the animal type and size. Always ensure fresh water is available.",
  disease:
    "Common diseases include FMD, PPR, and parasitic infections. Prevention through vaccination and hygiene is key. Consult a veterinarian if you notice any symptoms.",
  vaccination:
    "Vaccinate animals regularly against common diseases. Consult your local veterinarian for a vaccination schedule. Keep vaccination records for reference.",
  shelter:
    "Provide clean, dry shelter with proper ventilation. Ensure adequate space for movement. Protect from extreme weather conditions. Regular cleaning prevents disease spread.",
  default:
    "Thank you for your question! For specific advice about your animals, please consult with a local veterinarian or share your question in our community section.",
}

const todoReminders: Reminder[] = [
  { id: "1", task: "Check Water", icon: "💧" },
  { id: "2", task: "Feed Animals", icon: "🌾" },
  { id: "3", task: "Check Shelter", icon: "🏠" },
  { id: "4", task: "Health Check", icon: "⚠️" },
  { id: "5", task: "Repair Fences", icon: "⚡" },
  { id: "6", task: "Vaccination Due", icon: "🛡️" },
]

function getAIResponse(question: string): string {
  const lowerQuestion = question.toLowerCase()
  for (const [key, response] of Object.entries(aiResponses)) {
    if (lowerQuestion.includes(key)) {
      return response
    }
  }
  return aiResponses.default
}

export function AIChatHelper() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      text: "Hello! I'm your Grami Pashu Sahayak AI assistant. Ask me anything about animal care, health, feeding, or farming tips!",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showReminder, setShowReminder] = useState(false)
  const [currentReminder, setCurrentReminder] = useState<Reminder | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onstart = () => {
        setIsListening(true)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("")
        setInputValue(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.log("[v0] Speech recognition error:", event.error)
        setIsListening(false)
      }
    }
  }, [])

  useEffect(() => {
    const reminderInterval = setInterval(() => {
      const randomReminder = todoReminders[Math.floor(Math.random() * todoReminders.length)]
      setCurrentReminder(randomReminder)
      setShowReminder(true)

      // Auto-close reminder after 5 seconds
      setTimeout(() => {
        setShowReminder(false)
      }, 5000)
    }, 30000)

    return () => clearInterval(reminderInterval)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop()
        setIsListening(false)
      } else {
        recognitionRef.current.start()
      }
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue,
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: getAIResponse(inputValue),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 500)
  }

  return (
    <>
      {showReminder && currentReminder && (
        <div className="fixed bottom-32 right-6 z-50 animate-fade-in-up">
          <Card className="bg-primary text-primary-foreground p-4 shadow-xl border-2 border-primary/50 max-w-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentReminder.icon}</span>
              <div>
                <p className="font-bold text-sm">Reminder!</p>
                <p className="text-xs opacity-90">{currentReminder.task}</p>
              </div>
              <button
                onClick={() => setShowReminder(false)}
                className="ml-auto text-primary-foreground hover:opacity-70 transition-opacity"
              >
                ✕
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        id="ai-chat-button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] animate-fade-in-up">
          <Card className="shadow-2xl flex flex-col h-96 bg-card">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
              <h3 className="font-bold">Grami Pashu Sahayak AI</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:opacity-80 transition-opacity"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="border-t border-border p-4 flex gap-2">
              <Input
                type="text"
                placeholder="Ask a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleVoiceInput}
                disabled={isLoading}
                className={`${
                  isListening ? "bg-red-500 hover:bg-red-600" : "bg-secondary hover:bg-secondary/90"
                } text-secondary-foreground`}
                title="Click to speak"
              >
                {isListening ? "🎤" : "🎙️"}
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Send
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  )
}
