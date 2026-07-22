import { useState, useCallback, useEffect } from 'react'
import Header from '@/components/header'
import SubjectSelector from '@/components/subject-selector'
import StudyPlanner from '@/components/study-planner'
import ProgressTracker from '@/components/progress-tracker'
import StudentOnboarding from '@/components/student-onboarding'
import AIStudyAssistant from '@/components/ai-study-assistant'
import { Zap } from 'lucide-react'

interface StudentProfile {
  name: string
  board: string
  city: string
  subject: string
}

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState('Physics')
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('studentProfile')
    if (saved) {
      const profile = JSON.parse(saved)
      setStudentProfile(profile)
      setSelectedSubject(profile.subject)
    }
    setIsLoading(false)
  }, [])

  const handleOnboardingComplete = (profile: StudentProfile) => {
    localStorage.setItem('studentProfile', JSON.stringify(profile))
    setStudentProfile(profile)
    setSelectedSubject(profile.subject)
  }

  const handleSubjectChange = useCallback((subject: string) => {
    setSelectedSubject(subject)
    if (studentProfile) {
      const updated = { ...studentProfile, subject }
      localStorage.setItem('studentProfile', JSON.stringify(updated))
      setStudentProfile(updated)
    }
  }, [studentProfile])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">📚</div>
          <p className="text-muted-foreground">Loading MatricPrep...</p>
        </div>
      </div>
    )
  }

  if (!studentProfile) {
    return <StudentOnboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8 md:px-6">
        <div className="mb-8">
          <div className="bg-gradient-to-br from-primary/5 via-accent/3 to-transparent rounded-xl p-6 border border-primary/10 shadow-sm">
            <div className="flex items-start gap-3 justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    Welcome back, {studentProfile.name}! 👋
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {studentProfile.board} • {studentProfile.city}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your intelligent study companion for Matriculation success. Track your {selectedSubject} progress and get personalized study schedules!
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('studentProfile')
                  setStudentProfile(null)
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
              >
                Change Profile
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
            <SubjectSelector onSelectSubject={handleSubjectChange} defaultSubject="Physics" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="order-2 lg:order-1">
            <StudyPlanner subject={selectedSubject} />
          </div>

          <div className="order-1 lg:order-2">
            <ProgressTracker subject={selectedSubject} />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-primary/5 to-primary/2 rounded-xl p-4 border border-primary/10 hover:shadow-md transition-all">
            <h3 className="font-semibold text-foreground mb-2 text-sm">Study Smart</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use our AI-generated schedule to optimize your study time and maximize retention.
            </p>
          </div>
          <div className="bg-gradient-to-br from-accent/5 to-accent/2 rounded-xl p-4 border border-accent/10 hover:shadow-md transition-all">
            <h3 className="font-semibold text-foreground mb-2 text-sm">Track Progress</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Check off chapters as you complete them and watch your progress bar grow.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/3 to-accent/3 rounded-xl p-4 border border-primary/5 hover:shadow-md transition-all">
            <h3 className="font-semibold text-foreground mb-2 text-sm">Stay Focused</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              With 6 subjects and personalized schedules, stay on track for exam success.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            MatricPrep AI • Empowering Pakistani students for exam success • March 15, 2027
          </p>
        </div>
      </main>

      <AIStudyAssistant subject={selectedSubject} studentName={studentProfile.name} />
    </div>
  )
}
