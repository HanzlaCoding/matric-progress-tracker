import { useState, useCallback, useEffect } from 'react'
import Header from '@/components/header'
import SubjectSelector from '@/components/subject-selector'
import StudyPlanner from '@/components/study-planner'
import ProgressTracker from '@/components/progress-tracker'
import StudentOnboarding from '@/components/student-onboarding'
import AIStudyAssistant from '@/components/ai-study-assistant'
import { Zap, BookOpen } from 'lucide-react'

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
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
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

      <main className="w-full max-w-6xl mx-auto px-3 py-4 md:py-8 md:px-6">
        <div className="mb-4 md:mb-8">
          <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-1 tracking-tight">
                    Welcome back, {studentProfile.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {studentProfile.board}
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

        <div className="mb-6 md:mb-8">
          <div className="bg-card rounded-xl p-5 md:p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <SubjectSelector onSelectSubject={handleSubjectChange} selectedSubject={selectedSubject} />
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

        <div className="mt-8 md:mt-12 hidden md:grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1">
            <h3 className="font-extrabold text-foreground mb-2 text-base">Study Smart</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use our AI-generated schedule to optimize your study time and maximize retention.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1">
            <h3 className="font-extrabold text-foreground mb-2 text-base">Track Progress</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Check off chapters as you complete them and watch your progress bar grow.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1">
            <h3 className="font-extrabold text-foreground mb-2 text-base">Stay Focused</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
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
