'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { number: '01', name: 'Three.js & WebGL', desc: 'GPU-powered 3D in the browser' },
  { number: '02', name: 'GSAP Animation', desc: 'Motion with professional precision' },
  { number: '03', name: 'Creative Coding', desc: 'Art through algorithms' },
  { number: '04', name: 'Interactive Design', desc: 'Interfaces that respond and delight' },
  { number: '05', name: 'UI/UX Architecture', desc: 'Systems built for humans' },
  { number: '06', name: '3D Web Experiences', desc: 'Spatial computing for the web' },
  { number: '07', name: 'Frontend Development', desc: 'Responsive, accessible, performant' },
  { number: '08', name: 'Motion Design', desc: 'Storytelling through movement' },
]

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.skills-label', {
        scrollTrigger: { trigger: '.skills-label', start: 'top 88%' },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.from('.skills-heading-line', {
        scrollTrigger: { trigger: '.skills-heading', start: 'top 85%' },
        y: '105%',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
      })

      gsap.from('.skill-row', {
        scrollTrigger: { trigger: '.skills-list', start: 'top 80%' },
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.06,
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="skills"
      ref={containerRef}
      className="px-8 md:px-12 py-32 md:py-40"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16 skills-label">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">02</span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
          Skills
        </span>
      </div>

      {/* Section heading */}
      <div className="skills-heading mb-20 max-w-3xl">
        {['What I bring', 'to the table.'].map((line, i) => (
          <div key={i} className="clip-wrap">
            <div
              className="skills-heading-line font-black leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(40px, 6.5vw, 88px)' }}
            >
              {line}
            </div>
          </div>
        ))}
      </div>

      {/* Skills list */}
      <div className="skills-list">
        {skills.map((skill, i) => (
          <div
            key={skill.number}
            className="skill-row flex items-center justify-between py-6 group project-card"
            style={{
              borderTop: i === 0 ? '1px solid rgba(255,255,255,0.07)' : undefined,
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-baseline gap-6 md:gap-12">
              <span className="font-mono text-[10px] tracking-[0.25em] text-text-muted w-6 shrink-0">
                {skill.number}
              </span>
              <span
                className="font-bold text-text-primary group-hover:translate-x-2 transition-transform duration-300 ease-out"
                style={{ fontSize: 'clamp(20px, 3.5vw, 44px)' }}
              >
                {skill.name}
              </span>
            </div>
            <span className="font-mono text-[11px] text-text-muted hidden md:block ml-8 text-right max-w-[200px]">
              {skill.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
