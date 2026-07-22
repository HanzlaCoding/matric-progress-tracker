'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

export default function ExamCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)
  const [examInfo, setExamInfo] = useState('Punjab Board - 10th Grade')

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      // Pakistan Matriculation 2025 dates - Punjab boards typically start in early March
      // 10th grade: March 4, 2025 | 9th grade: March 25, 2025
      // Using March 4, 2025 as the countdown target
      const examDate = new Date(2025, 2, 4).getTime() // March 4, 2025
      const now = new Date().getTime()
      const difference = examDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
        setExamInfo('Punjab Board - 10th Grade')
      } else {
        // If March exam has passed, show June exams
        const juneDate = new Date(2025, 5, 2).getTime() // June 2, 2025
        const juneDifference = juneDate - now
        if (juneDifference > 0) {
          setTimeLeft({
            days: Math.floor(juneDifference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((juneDifference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((juneDifference / 1000 / 60) % 60),
            seconds: Math.floor((juneDifference / 1000) % 60),
          })
          setExamInfo('Supplementary Exams')
        }
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">{examInfo}</p>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        <div className="flex gap-2 text-sm font-semibold">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-primary">{timeLeft.days}</span>
            <span className="text-xs text-muted-foreground leading-tight">Days</span>
          </div>
          <span className="text-primary/40">•</span>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-primary">{timeLeft.hours}</span>
            <span className="text-xs text-muted-foreground leading-tight">Hrs</span>
          </div>
          <span className="text-primary/40">•</span>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-primary">{timeLeft.minutes}</span>
            <span className="text-xs text-muted-foreground leading-tight">Min</span>
          </div>
        </div>
      </div>
    </div>
  )
}
