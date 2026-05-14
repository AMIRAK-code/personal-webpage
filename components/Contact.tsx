'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.contact-label', {
        scrollTrigger: { trigger: '.contact-label', start: 'top 88%' },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.from('.contact-heading-line', {
        scrollTrigger: { trigger: '.contact-heading', start: 'top 82%' },
        y: '105%',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.12,
      })

      gsap.from('.contact-cta', {
        scrollTrigger: { trigger: '.contact-cta', start: 'top 85%' },
        y: 32,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="contact"
      ref={containerRef}
      className="px-8 md:px-12 py-32 md:py-48"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16 contact-label">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">05</span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
          Contact
        </span>
      </div>

      {/* Heading */}
      <div className="contact-heading mb-16">
        {["Let's build", 'something', 'together.'].map((line, i) => (
          <div key={i} className="clip-wrap">
            <div
              className="contact-heading-line font-black leading-[0.88] tracking-[-0.02em] text-text-primary"
              style={{ fontSize: 'clamp(56px, 11vw, 160px)' }}
            >
              {line}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="contact-cta flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <a
          href="https://www.amircodess.com/order.html"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-5 transition-colors duration-300"
          style={{
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#e8e3da',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = '#e8e3da'
            ;(e.currentTarget as HTMLElement).style.color = '#0a0a0a'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLElement).style.color = '#e8e3da'
          }}
        >
          Start a Project
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
          >
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>

        <a
          href="https://www.amircodess.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-text-muted link-underline"
        >
          View Live Site →
        </a>
      </div>
    </section>
  )
}
