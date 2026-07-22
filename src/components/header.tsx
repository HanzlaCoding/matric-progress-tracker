import { GraduationCap } from 'lucide-react'
import ExamCountdown from './exam-countdown'

export default function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-10 shadow-sm">
      <div className="w-full px-4 py-3 md:px-6 md:py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-accent/90 p-2.5 rounded-xl shadow-sm text-2xl animate-bounce">
              📚
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent/80 bg-clip-text text-transparent">
                MatricPrep AI
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Pakistan's Study Companion 🇵🇰</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="w-full md:w-auto bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-3 border border-primary/10">
            <ExamCountdown />
          </div>
        </div>
      </div>
    </header>
  )
}
