'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { GoogleGenAI } from '@google/genai'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

interface AIStudyAssistantProps {
  subject: string
  studentName: string
}

export default function AIStudyAssistant({ subject, studentName }: AIStudyAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${studentName}! 👋 I'm your ${subject} study assistant. Ask me anything about ${subject} concepts, formulas, or practice problems!`,
      sender: 'assistant',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Get API Key from Vite environment variables
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY

      if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY is missing in your .env file.')
      }

      // Initialize the official @google/genai SDK
      const ai = new GoogleGenAI({ apiKey })

      // Prepare the system prompt based on the subject
      const SUBJECT_GUIDES: Record<string, string> = {
        Physics: 'Explain concepts using formulas, real-world examples, and include step-by-step problem solving.',
        Math: 'Guide through mathematical proofs, algebraic manipulations, and trigonometric identities.',
        Chemistry: 'Explain chemical reactions, atomic structure, bonding, and stoichiometry.',
        Computer: 'Cover programming concepts, data structures, algorithms, and databases.',
        English: 'Help with grammar, vocabulary, essay writing, and comprehension.',
        Urdu: 'Explain Urdu grammar, literature, poetry, and writing skills.',
      }

      const subjectGuide = SUBJECT_GUIDES[subject] || 'Provide comprehensive, educational responses.'
      
      const systemPrompt = `You are a highly knowledgeable and encouraging Pakistani matriculation ${subject} tutor. Your role is to help ${studentName} understand ${subject} concepts, solve problems, and prepare for exams.
Focus: ${subjectGuide}
- Provide clear, step-by-step explanations
- Keep responses concise but comprehensive (100-200 words ideal)
- Be encouraging and supportive`

      // Format previous messages for the model
      const contents = [
        ...messages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: input }] }
      ]

      // Call the latest Gemini 2.0 Flash model using the official SDK
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
        }
      })

      const aiText = response.text || 'I could not generate a response.'

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'assistant',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error: any) {
      console.error('[v0] Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error.message || 'Sorry, I encountered an error. Please try again later.',
        sender: 'assistant',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 bg-primary rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center text-primary-foreground z-40"
        title="Study Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[90vw] bg-card rounded-xl shadow-2xl border border-border flex flex-col z-40 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">{subject} Assistant</h3>
                <p className="text-xs opacity-90">Ask anything about {subject}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary/10 text-foreground rounded-br-none'
                      : 'bg-primary/5 text-foreground rounded-bl-none'
                  }`}
                >
                  {msg.sender === 'assistant' ? (
                    <ReactMarkdown 
                      className="prose prose-sm dark:prose-invert max-w-none break-words space-y-2"
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                        h3: ({node, ...props}) => <h3 className="font-semibold text-base mt-3 mb-1" {...props} />,
                        h4: ({node, ...props}) => <h4 className="font-medium text-sm mt-2 mb-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-primary" {...props} />,
                        code: ({node, className, children, ...props}) => {
                          const match = /language-(\w+)/.exec(className || '')
                          return match ? (
                            <pre className="bg-black/10 dark:bg-white/10 p-2 rounded-md overflow-x-auto text-xs mt-2 mb-2">
                              <code className={className} {...props}>{children}</code>
                            </pre>
                          ) : (
                            <code className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-xs" {...props}>
                              {children}
                            </code>
                          )
                        }
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-primary/5 text-foreground px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
