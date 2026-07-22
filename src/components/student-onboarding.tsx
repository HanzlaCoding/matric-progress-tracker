'use client'

import { useState } from 'react'
import { ChevronRight, GraduationCap } from 'lucide-react'

interface StudentProfile {
  name: string
  board: string
  city: string
  subject: string
}

interface StudentOnboardingProps {
  onComplete: (profile: StudentProfile) => void
}

const BOARDS = [
  'Punjab Board',
  'Sindh Board',
  'KPK Board',
  'Balochistan Board',
  'AJK Board',
  'Gilgit-Baltistan Board',
]

const SUBJECTS = ['Physics', 'Math', 'Chemistry', 'Computer', 'English', 'Urdu']

const MAJOR_CITIES = [
  'Islamabad',
  'Rawalpindi',
  'Lahore',
  'Faisalabad',
  'Multan',
  'Karachi',
  'Hyderabad',
  'Peshawar',
  'Quetta',
  'Gilgit',
  'Other',
]

export default function StudentOnboarding({ onComplete }: StudentOnboardingProps) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<StudentProfile>({
    name: '',
    board: '',
    city: '',
    subject: '',
  })

  const handleContinue = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      onComplete(profile)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return profile.name.trim().length > 0
      case 2:
        return profile.board !== ''
      case 3:
        return profile.city !== ''
      case 4:
        return profile.subject !== ''
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-primary to-accent/90 p-4 rounded-2xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent/80 bg-clip-text text-transparent mb-2">
            MatricPrep AI
          </h1>
          <p className="text-sm text-muted-foreground">Welcome! Let&apos;s get you started 📚</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
          {/* Progress */}
          <div className="flex gap-1 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-gradient-to-r from-primary to-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Step 1: Name */}
          {step === 1 && (
            <div className="animate-in fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-2">What's your name? 👋</h2>
              <p className="text-sm text-muted-foreground mb-6">We'll personalize your study experience</p>
              <input
                type="text"
                placeholder="Enter your name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                autoFocus
              />
            </div>
          )}

          {/* Step 2: Board */}
          {step === 2 && (
            <div className="animate-in fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-2">Which board are you from? 🏫</h2>
              <p className="text-sm text-muted-foreground mb-6">This helps us customize content for your exam</p>
              <select
                value={profile.board}
                onChange={(e) => setProfile({ ...profile, board: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                autoFocus
              >
                <option value="">Select a board</option>
                {BOARDS.map((board) => (
                  <option key={board} value={board}>
                    {board}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Step 3: City */}
          {step === 3 && (
            <div className="animate-in fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-2">Where are you from? 📍</h2>
              <p className="text-sm text-muted-foreground mb-6">Choose your city or region</p>
              <select
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                autoFocus
              >
                <option value="">Select your city</option>
                {MAJOR_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Step 4: Subject */}
          {step === 4 && (
            <div className="animate-in fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-2">Favorite subject? 🎓</h2>
              <p className="text-sm text-muted-foreground mb-6">Choose where you want to focus first</p>
              <div className="grid grid-cols-2 gap-3">
                {SUBJECTS.map((subj) => (
                  <button
                    key={subj}
                    onClick={() => setProfile({ ...profile, subject: subj })}
                    className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                      profile.subject === subj
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-foreground hover:border-primary/50'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleContinue}
              disabled={!isStepValid()}
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {step === 4 ? 'Get Started' : 'Continue'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Step indicator */}
          <p className="text-xs text-center text-muted-foreground mt-4">
            Step {step} of 4
          </p>
        </div>
      </div>
    </div>
  )
}
