'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.from([line1Ref.current, line2Ref.current], {
      y: '105%',
      duration: 1.4,
      ease: 'power4.out',
      stagger: 0.12,
    })
      .from(
        metaRef.current,
        {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .from(
        scrollRef.current,
        {
          y: 16,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      )
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end px-8 md:px-12 pb-12 pt-24"
    >
      {/* Hero display text */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="clip-wrap">
          <div
            ref={line1Ref}
            className="font-black uppercase leading-[0.88] tracking-[-0.02em] text-text-primary"
            style={{ fontSize: 'clamp(72px, 14vw, 200px)' }}
          >
            Creative
          </div>
        </div>
        <div className="clip-wrap">
          <div
            ref={line2Ref}
            className="font-black uppercase leading-[0.88] tracking-[-0.02em] text-text-primary text-right"
            style={{ fontSize: 'clamp(72px, 14vw, 200px)' }}
          >
            Developer
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div
        ref={metaRef}
        className="flex items-start justify-between mt-10 pt-8"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted mb-1">
            Based in
          </p>
          <p className="font-mono text-[13px] text-text-primary">Torino, Italy</p>
        </div>

        <div className="text-center hidden md:block">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted mb-1">
            Studying at
          </p>
          <p className="font-mono text-[13px] text-text-primary">Politecnico di Torino</p>
        </div>

        <div className="text-right">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted mb-1">
            Open for
          </p>
          <p className="font-mono text-[13px] text-text-primary">Freelance Work</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
          scroll to explore
        </span>
        <div
          className="w-px h-14"
          style={{
            background: 'linear-gradient(to bottom, rgba(232,227,218,0.4), transparent)',
          }}
        />
      </div>
    </section>
  )
}
