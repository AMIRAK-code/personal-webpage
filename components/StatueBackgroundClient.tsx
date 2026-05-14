'use client'

import dynamic from 'next/dynamic'

const StatueBackground = dynamic(() => import('./StatueBackground'), { ssr: false })

export default function StatueBackgroundClient() {
  return <StatueBackground />
}
