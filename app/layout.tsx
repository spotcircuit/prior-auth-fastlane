import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prior-Auth Fastlane MVP',
  description: 'Clinic-safe prior authorization workflow system',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
