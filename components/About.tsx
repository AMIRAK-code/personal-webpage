'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    number: '01',
    title: 'Immersive Experiences',
    body: 'Digital environments so alive they pull you in — where every interaction is an invitation to explore further.',
  },
  {
    number: '02',
    title: 'Motion & Physics',
    body: 'Animation rooted in natural physics. Nothing snaps or jumps — everything flows with intention and weight.',
  },
  {
    number: '03',
    title: 'Obsessive Detail',
    body: 'The difference between good and great lives in the 1% — micro-interactions, easing curves, typographic rhythm.',
  },
]

export default function About() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.about-label', {
        scrollTrigger: { trigger: '.about-label', start: 'top 88%' },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.from('.about-quote-line', {
        scrollTrigger: { trigger: '.about-quote', start: 'top 82%' },
        y: '105%',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
      })

      gsap.from('.about-sub', {
        scrollTrigger: { trigger: '.about-sub', start: 'top 85%' },
        y: 24,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.pillar-card', {
        scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%' },
        y: 48,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="about"
      ref={containerRef}
      className="px-8 md:px-12 py-32 md:py-40"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16 about-label">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">01</span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
          Philosophy
        </span>
      </div>

      {/* Main quote */}
      <div className="about-quote mb-10 max-w-5xl">
        {[
          'Building digital landscapes',
          'that feel alive and engaging.',
        ].map((line, i) => (
          <div key={i} className="clip-wrap">
            <div
              className="about-quote-line font-black leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
            >
              {line}
            </div>
          </div>
        ))}
      </div>

      {/* Sub-text */}
      <p className="about-sub font-mono text-[13px] leading-relaxed text-text-muted max-w-md mb-24">
        Passionate creative developer studying at Politecnico di Torino — bridging
        the gap between design vision and technical precision.
      </p>

      {/* Three pillars */}
      <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-px"
        style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {pillars.map((p) => (
          <div key={p.number} className="pillar-card p-8 md:p-10 project-card">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted mb-6">
              {p.number}
            </div>
            <h3 className="font-bold text-xl text-text-primary mb-4">{p.title}</h3>
            <p className="font-mono text-[13px] leading-relaxed text-text-muted">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
