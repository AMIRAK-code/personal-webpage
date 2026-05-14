'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '12+', label: 'Happy Clients', desc: 'Across Europe and beyond' },
  { value: '5+', label: 'Awards Won', desc: 'For creative excellence' },
  { value: '3+', label: 'Years Building', desc: 'Refining the craft daily' },
  { value: '∞', label: 'Ideas', desc: 'Never running dry' },
]

export default function Stats() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.stats-label', {
        scrollTrigger: { trigger: '.stats-label', start: 'top 88%' },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.from('.stat-item', {
        scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' },
        y: 48,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
      })

      gsap.from('.stats-quote-line', {
        scrollTrigger: { trigger: '.stats-quote', start: 'top 82%' },
        y: '105%',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="px-8 md:px-12 py-32 md:py-40"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16 stats-label">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">04</span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
          By the numbers
        </span>
      </div>

      {/* Stats grid */}
      <div
        className="stats-grid grid grid-cols-2 md:grid-cols-4 mb-24"
        style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-item p-8 md:p-12 project-card"
            style={{
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : undefined,
            }}
          >
            <div
              className="font-black leading-none tracking-[-0.03em] text-text-primary mb-3"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
            >
              {stat.value}
            </div>
            <div className="font-bold text-[15px] text-text-primary mb-1">{stat.label}</div>
            <div className="font-mono text-[11px] text-text-muted">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* Pull quote */}
      <div className="stats-quote max-w-4xl">
        {['"Every pixel is a', 'decision. Make it count."'].map((line, i) => (
          <div key={i} className="clip-wrap">
            <div
              className="stats-quote-line font-black leading-[0.92] tracking-[-0.02em] text-text-primary"
              style={{ fontSize: 'clamp(32px, 5.5vw, 76px)' }}
            >
              {line}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
