'use client'

import { useEffect, useState } from 'react'

const KEY = 'eileen_mood_v1'

const MOODS: Record<number, { emoji: string; label: string }> = {
  1: { emoji: '🥂', label: 'lowkey in the mood' },
  2: { emoji: '🔥', label: 'highkey in the mood' },
  3: { emoji: '🥰', label: 'cuddles & kisses mode' },
  4: { emoji: '😌', label: 'just wanna chill' },
  5: { emoji: '😤', label: 'mad — tread carefully' },
  6: { emoji: '🥺', label: 'missing you' },
  7: { emoji: '🍕😤', label: 'hangry' },
  8: { emoji: '🐲', label: 'you already know' },
  9: { emoji: '🩸', label: 'period. literally.' },
}

export default function MoodWidget() {
  const [moodId, setMoodId] = useState<number | null>(null)

  useEffect(() => {
    // read on mount
    const raw = localStorage.getItem(KEY)
    if (raw) setMoodId(parseInt(raw, 10))

    // sync when another tab changes the mood
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        const val = e.newValue ? parseInt(e.newValue, 10) : null
        setMoodId(val)
      }
    }
    window.addEventListener('storage', onStorage)

    // sync via BroadcastChannel (same-origin, any tab)
    let bc: BroadcastChannel | null = null
    try {
      bc = new BroadcastChannel('eileen_mood')
      bc.onmessage = () => {
        const raw = localStorage.getItem(KEY)
        setMoodId(raw ? parseInt(raw, 10) : null)
      }
    } catch (_) {}

    return () => {
      window.removeEventListener('storage', onStorage)
      bc?.close()
    }
  }, [])

  if (!moodId || !MOODS[moodId]) return null

  const mood = MOODS[moodId]

  return (
    <a
      href="/eileen.html"
      style={{
        position: 'fixed',
        bottom: 22,
        right: 22,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: '#fff',
        border: '2px solid #f8bbd0',
        borderRadius: 999,
        padding: '9px 16px 9px 12px',
        boxShadow: '0 6px 24px rgba(194,24,91,0.15)',
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: 13,
        fontWeight: 700,
        color: '#c2185b',
        textDecoration: 'none',
        cursor: 'pointer',
        animation: 'eileenSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
      }}
    >
      <style>{`
        @keyframes eileenSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <span style={{ fontSize: 20, lineHeight: 1 }}>{mood.emoji}</span>
      <span style={{ whiteSpace: 'nowrap' }}>Eileen: {mood.label}</span>
      <span style={{ fontSize: 10, color: '#ddd', marginLeft: 4 }}>✏️</span>
    </a>
  )
}
