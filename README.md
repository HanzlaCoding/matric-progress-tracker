# MatricPrep AI

**Your intelligent study companion for Matriculation success**

A modern, mobile-first web app designed specifically for Matriculation students in Pakistan. MatricPrep AI helps you plan your studies, track chapter progress, and stay focused on exam preparation with an AI-powered daily study schedule.

## Features

### 📚 1. **Exam Countdown Timer**
- Dark-themed header with a live countdown to the Matriculation exam (March 15, 2027)
- Shows Days, Hours, Minutes, and Seconds remaining
- Updates in real-time to keep you motivated

### 🔖 2. **Subject Selection**
- Easy dropdown selector for 6 core subjects:
  - Physics
  - Mathematics
  - Chemistry
  - Computer Science
  - English
  - Urdu
- Instantly switches between subjects with dedicated content for each

### 📅 3. **AI-Powered Study Planner**
- Set your available study hours per day (0.5 to 8 hours)
- Click "Generate AI Schedule" to receive a personalized daily study plan
- Get detailed time blocks with specific topics and activities
- Each schedule is optimized for retention and focus

### ✅ 4. **Interactive Progress Tracker**
- Track 8 chapters per subject (48 total)
- Click chapters to mark them as completed
- Visual progress bar shows completion percentage
- Checkboxes update in real-time
- Data persists across sessions using localStorage
- One-click reset button to start fresh

### 🎯 5. **Responsive Design**
- Mobile-first approach optimized for all devices
- Beautiful dark theme with accent colors
- Clean card-based layouts with crisp borders
- Smooth animations and transitions

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Storage**: Browser localStorage (session-based)
- **UI Components**: shadcn/ui + custom components

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Usage

1. **Select a Subject**: Use the dropdown to choose which subject to study
2. **Set Study Hours**: Adjust the slider to your available study time
3. **Generate Schedule**: Click the button to get an AI-generated study plan
4. **Track Progress**: Check off chapters as you complete them
5. **Switch Subjects**: Use the dropdown to switch between subjects and track each independently

## Data Management

- All progress data is stored in your browser's localStorage
- Progress persists until you manually reset it
- Switching subjects shows the progress for that specific subject
- Closing the browser preserves your data for your next session

## Features Showcase

### Study Planner
Each generated schedule includes:
- Specific topic recommendations
- Time allocations per activity
- Morning/afternoon/evening time slots
- Quick revision sessions
- Total study time calculation

### Progress Tracker
Subjects include subject-specific chapters:
- **Physics**: 8 topics including Mechanics, Waves, Optics, Electrostatics
- **Math**: 8 topics including Algebra, Geometry, Trigonometry, Calculus
- **Chemistry**: 8 topics including Atomic Structure, Bonding, Reactions
- **Computer**: 8 topics including Programming, Data Structures, Networking
- **English**: 8 topics including Grammar, Literature, Writing, Communication
- **Urdu**: 8 topics including Grammar, Vocabulary, Poetry, Writing

## Responsive Breakpoints

- **Mobile**: Full responsive layout for phones (< 768px)
- **Tablet**: Optimized 2-column layout (768px - 1024px)
- **Desktop**: Full-featured experience (> 1024px)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Tips for Success

📚 **Study Smart**: Use the AI-generated schedules to structure your daily study time
✓ **Track Progress**: Checking off chapters gives you a sense of achievement
🎯 **Stay Focused**: With personalized schedules, you know exactly what to study
⏰ **Manage Time**: Set realistic study hours and stick to the generated schedule
🔄 **Review**: The countdown timer keeps exam day in focus

## Exam Date

**Matriculation Exam**: March 15, 2027

---

**MatricPrep AI** • Empowering Pakistani students for exam success
# matric-progress-tracker
