import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import Cursor from '@/components/Cursor'
import MoodWidget from '@/components/MoodWidget'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Amir Akbari — Creative Developer',
  description:
    'Creative Developer based in Torino, Italy. Building digital landscapes that feel alive and engaging.',
  openGraph: {
    title: 'Amir Akbari — Creative Developer',
    description: 'Creative Developer based in Torino, Italy.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="bg-bg text-text-primary font-sans antialiased">
        <LenisProvider>
          <Cursor />
          <MoodWidget />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
