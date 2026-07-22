import { BookOpen } from 'lucide-react'

const SUBJECTS = ['Physics', 'Math', 'Chemistry', 'Computer', 'English', 'Urdu']

interface SubjectSelectorProps {
  onSelectSubject: (subject: string) => void
  selectedSubject: string
}

export default function SubjectSelector({ onSelectSubject, selectedSubject }: SubjectSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        Select Subject
      </label>
      <select
        value={selectedSubject}
        onChange={(e) => onSelectSubject(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-white text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium"
      >
        {SUBJECTS.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  )
}
