'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-background">
      <div className="bg-destructive/10 p-4 rounded-full mb-6">
        <AlertTriangle className="w-12 h-12 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3 text-center">Something went wrong!</h2>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        We encountered an unexpected issue. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
        >
          Go Home
        </Link>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
