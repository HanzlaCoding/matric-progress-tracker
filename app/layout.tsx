import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { PWAInstall } from '@/components/pwa-install'
import { OfflineIndicator } from '@/components/offline-indicator'

export const metadata: Metadata = {
  title: 'MatricPrep AI - Your Matriculation Study Companion',
  description: 'AI-powered study planning and progress tracking for Matriculation students in Pakistan. Get personalized study schedules and track chapter progress.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'white',
    title: 'MatricPrep AI',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: 'MatricPrep AI - Your Matriculation Study Companion',
    description: 'AI-powered study planning and progress tracking for Matriculation students in Pakistan.',
    url: 'https://matricprep.ai',
    siteName: 'MatricPrep AI',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MatricPrep AI',
    description: 'AI-powered study planning and progress tracking for Matriculation students in Pakistan.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fa' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        <meta name="apple-mobile-web-app-title" content="MatricPrep AI" />
      </head>
      <body className="antialiased">
        <OfflineIndicator />
        {children}
        <PWAInstall />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
