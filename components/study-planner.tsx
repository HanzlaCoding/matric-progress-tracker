'use client'

import { useState } from 'react'
import { Clock, Sparkles, BookMarked } from 'lucide-react'

interface StudyPlan {
  time: string
  activity: string
  duration: string
}

interface StudyPlannerProps {
  subject: string
}

export default function StudyPlanner({ subject }: StudyPlannerProps) {
  const [hoursPerDay, setHoursPerDay] = useState<number>(2)
  const [studyPlan, setStudyPlan] = useState<StudyPlan[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSchedule = async () => {
    setIsGenerating(true)

    // Simulate AI schedule generation
    const schedules: Record<string, StudyPlan[]> = {
      Physics: [
        { time: '09:00 AM', activity: 'Review Newton\'s Laws (10 min)', duration: '10 min' },
        { time: '09:15 AM', activity: 'Solve Motion Problems (25 min)', duration: '25 min' },
        { time: '09:40 AM', activity: 'Work through Energy Conservation (20 min)', duration: '20 min' },
        { time: '10:00 AM', activity: 'Practice MCQs & Revision (5 min)', duration: '5 min' },
      ],
      Math: [
        { time: '10:00 AM', activity: 'Algebra Fundamentals Review (15 min)', duration: '15 min' },
        { time: '10:20 AM', activity: 'Solve Quadratic Equations (30 min)', duration: '30 min' },
        { time: '10:55 AM', activity: 'Geometry Problems (10 min)', duration: '10 min' },
        { time: '11:10 AM', activity: 'Quick Revision & Notes (5 min)', duration: '5 min' },
      ],
      Chemistry: [
        { time: '11:00 AM', activity: 'Periodic Table Review (12 min)', duration: '12 min' },
        { time: '11:15 AM', activity: 'Chemical Reactions & Bonding (28 min)', duration: '28 min' },
        { time: '11:50 AM', activity: 'Lab-based Problems (15 min)', duration: '15 min' },
        { time: '12:10 PM', activity: 'Flashcard Review (5 min)', duration: '5 min' },
      ],
      Computer: [
        { time: '02:00 PM', activity: 'Programming Concepts (20 min)', duration: '20 min' },
        { time: '02:25 PM', activity: 'Code Practice (30 min)', duration: '30 min' },
        { time: '03:00 PM', activity: 'Logic & Algorithms (8 min)', duration: '8 min' },
        { time: '03:10 PM', activity: 'Quiz & Summary (2 min)', duration: '2 min' },
      ],
      English: [
        { time: '03:00 PM', activity: 'Grammar Rules Review (15 min)', duration: '15 min' },
        { time: '03:20 PM', activity: 'Reading Comprehension (28 min)', duration: '28 min' },
        { time: '04:00 PM', activity: 'Essay Writing Practice (10 min)', duration: '10 min' },
        { time: '04:15 PM', activity: 'Vocabulary & Revision (7 min)', duration: '7 min' },
      ],
      Urdu: [
        { time: '04:30 PM', activity: 'Urdu Grammar - Zamir & Fiil (15 min)', duration: '15 min' },
        { time: '04:50 PM', activity: 'لغت اور محاورات کا مطالعہ (25 min)', duration: '25 min' },
        { time: '05:20 PM', activity: 'شاعری اور ادب کا جائزہ (15 min)', duration: '15 min' },
        { time: '05:40 PM', activity: 'خلاصہ اور نوٹس (5 min)', duration: '5 min' },
      ],
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStudyPlan(schedules[subject] || schedules.Physics)
    setIsGenerating(false)
  }

  return (
    <div className="w-full space-y-4">
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Study Planner
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Available Study Hours Per Day
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
              <span className="text-lg font-bold text-primary min-w-14 text-right">
                {hoursPerDay.toFixed(1)}h
              </span>
            </div>
          </div>

          <button
            onClick={generateSchedule}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {isGenerating ? 'Generating...' : 'Generate AI Schedule'}
          </button>
        </div>
      </div>

      {studyPlan.length > 0 && (
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-primary" />
            Today&apos;s Study Schedule - {subject}
          </h4>
          <div className="space-y-2.5">
            {studyPlan.map((task, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-3 bg-primary/3 rounded-lg border border-primary/5 hover:bg-primary/5 transition-colors"
              >
                <div className="min-w-20">
                  <div className="text-sm font-semibold text-primary">{task.time}</div>
                  <div className="text-xs text-muted-foreground">{task.duration}</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground leading-tight">{task.activity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-xs text-muted-foreground font-medium">
              Total study time: <span className="text-primary font-semibold">{hoursPerDay} hours</span> • Optimize your learning with focused sessions
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
