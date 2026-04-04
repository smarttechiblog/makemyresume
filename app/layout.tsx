import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Professional Resume Builder',
  description: 'Build your professional resume with latest tech skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
