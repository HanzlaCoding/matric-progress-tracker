'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Circle, BookOpen, Trash2 } from 'lucide-react'

interface Chapter {
  id: string
  name: string
  completed: boolean
}

interface ProgressTrackerProps {
  subject: string
}

const CHAPTERS_BY_SUBJECT: Record<string, string[]> = {
  Physics: [
    'Measurements & Kinematics',
    'Dynamics & Forces',
    'Work, Energy & Power',
    'Circular Motion',
    'Gravitation',
    'Oscillations & Waves',
    'Optics',
    'Electrostatics',
  ],
  Math: [
    'Number System',
    'Algebraic Expressions',
    'Quadratic Equations',
    'Sequences & Series',
    'Trigonometry',
    'Coordinate Geometry',
    'Sets, Functions & Groups',
    'Matrices & Determinants',
  ],
  Chemistry: [
    'Atomic Structure',
    'Chemical Bonding',
    'Stoichiometry',
    'States of Matter',
    'Chemical Kinetics',
    'Thermodynamics',
    'Electrochemistry',
    'Organic Chemistry',
  ],
  Computer: [
    'Introduction to Computing',
    'Software Development',
    'Data Representation',
    'Algorithm Design',
    'Programming Basics',
    'Data Structures',
    'Database Systems',
    'Networking Basics',
  ],
  English: [
    'Grammar Fundamentals',
    'Vocabulary & Idioms',
    'Reading Comprehension',
    'Essay Writing',
    'Poetry & Prose',
    'Communication Skills',
    'Literature Analysis',
    'Exam Techniques',
  ],
  Urdu: [
    'اردو گرائمر - بنیادی اصول',
    'لغت اور محاورات',
    'قواعد ہجاء',
    'شاعری کا تعارف',
    'منثور ادب',
    'لکھنے کی مہارت',
    'سننے اور بولنے کی مہارت',
    'امتحان کی تیاری',
  ],
}

export default function ProgressTracker({ subject }: ProgressTrackerProps) {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const chapterNames = CHAPTERS_BY_SUBJECT[subject] || []
    const storageKey = `chapters_${subject}`
    const saved = localStorage.getItem(storageKey)

    if (saved) {
      try {
        setChapters(JSON.parse(saved))
      } catch {
        const initialChapters: Chapter[] = chapterNames.map((name) => ({
          id: name.toLowerCase().replace(/\s+/g, '_'),
          name,
          completed: false,
        }))
        setChapters(initialChapters)
      }
    } else {
      const initialChapters: Chapter[] = chapterNames.map((name) => ({
        id: name.toLowerCase().replace(/\s+/g, '_'),
        name,
        completed: false,
      }))
      setChapters(initialChapters)
    }
  }, [subject])

  const saveChapters = (updatedChapters: Chapter[]) => {
    const storageKey = `chapters_${subject}`
    localStorage.setItem(storageKey, JSON.stringify(updatedChapters))
    setChapters(updatedChapters)
  }

  const toggleChapter = (id: string) => {
    const updated = chapters.map((ch) =>
      ch.id === id ? { ...ch, completed: !ch.completed } : ch
    )
    saveChapters(updated)
  }

  const resetProgress = () => {
    const updated = chapters.map((ch) => ({ ...ch, completed: false }))
    saveChapters(updated)
  }

  if (!mounted) {
    return <div className="bg-card rounded-xl p-5 border border-border">Loading...</div>
  }

  const completedCount = chapters.filter((ch) => ch.completed).length
  const totalCount = chapters.length
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="w-full space-y-4">
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Chapter Progress - {subject}
          </h3>
          <button
            onClick={resetProgress}
            className="p-2 rounded-lg bg-destructive/8 text-destructive hover:bg-destructive/15 transition-colors"
            title="Reset progress"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar with Emoji Milestones */}
        <div className="space-y-2.5 mb-5">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">
              {completedCount} of {totalCount} completed
            </span>
            <span className="text-sm font-bold text-primary">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full flex items-center justify-end pr-1"
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 0 && (
                <span
                  className="text-lg animate-pulse"
                  style={{
                    animation: progressPercentage >= 100 ? 'bounce 0.6s infinite' : 'pulse 2s infinite',
                  }}
                >
                  {progressPercentage >= 100 ? '🎉' : progressPercentage >= 75 ? '🚀' : progressPercentage >= 50 ? '⭐' : progressPercentage >= 25 ? '💪' : '📚'}
                </span>
              )}
            </div>
          </div>
          {/* Progress Labels */}
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>📚 Start</span>
            <span>💪 25%</span>
            <span>⭐ 50%</span>
            <span>🚀 75%</span>
            <span>🎉 Done!</span>
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => toggleChapter(chapter.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/3 hover:bg-primary/6 transition-colors text-left border border-primary/5 hover:border-primary/15"
            >
              {chapter.completed ? (
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
              <span
                className={`flex-1 text-sm font-medium ${
                  chapter.completed
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground'
                }`}
              >
                {chapter.name}
              </span>
            </button>
          ))}
        </div>

        {/* Achievement */}
        {progressPercentage === 100 && totalCount > 0 && (
          <div className="mt-5 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg text-center">
            <p className="text-sm font-semibold text-primary">All chapters completed!</p>
            <p className="text-xs text-muted-foreground mt-1.5">
              Great job! Time to do final revision for {subject}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
