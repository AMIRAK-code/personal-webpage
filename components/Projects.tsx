'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    number: '01',
    name: 'Creative Portfolio',
    desc: 'An interactive design showcase built to push the boundaries of web presentation — fluid animations, layered visuals, and a carefully crafted user journey.',
    tags: ['UI/UX', 'Motion', 'WebGL'],
    href: 'https://www.amircodess.com/index1.0.html',
  },
  {
    number: '02',
    name: 'Brand Shop',
    desc: 'E-commerce elevated with interactive elements — hover states with depth, cart animations that feel satisfying, and a shopping experience that does not feel transactional.',
    tags: ['E-Commerce', 'Interaction', 'UX'],
    href: 'https://www.amircodess.com/shop.html',
  },
  {
    number: '03',
    name: 'Sound Artist',
    desc: 'Creative motion design fused with real-time audio visualization — a synesthetic experience where music becomes visible and the interface breathes with the sound.',
    tags: ['Creative', 'Motion', 'Audio Vis'],
    href: 'https://www.amircodess.com/indexdj.html',
  },
  {
    number: '04',
    name: 'WebGL Sandbox',
    desc: 'Advanced 3D web environment built entirely in Three.js — custom shaders, spatial interaction, and immersive scenes that demonstrate what the modern browser is capable of.',
    tags: ['Three.js', 'Shaders', 'WebGL'],
    href: 'https://www.amircodess.com/indexjarv.html',
  },
]

// ─── Iframe background ─────────────────────────────────────────────────────────
// Renders the target URL at 1440×900, then scales it down to cover the card.
function IframePreview({ src }: { src: string }) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const wrap   = wrapRef.current
    const iframe = iframeRef.current
    if (!wrap || !iframe) return

    const NATIVE_W = 1440
    const NATIVE_H = 900

    const fit = () => {
      const { width, height } = wrap.getBoundingClientRect()
      // "cover" — use whichever axis needs the larger scale
      const scale = Math.max(width / NATIVE_W, height / NATIVE_H)
      iframe.style.transform = `scale(${scale})`
      // centre within the wrapper
      iframe.style.left = `${(width  - NATIVE_W * scale) / 2}px`
      iframe.style.top  = `${(height - NATIVE_H * scale) / 2}px`
    }

    const ro = new ResizeObserver(fit)
    ro.observe(wrap)
    fit()
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <iframe
        ref={iframeRef}
        src={src}
        scrolling="no"
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: 'absolute',
          width:  1440,
          height: 900,
          border: 'none',
          transformOrigin: 'top left',
          pointerEvents: 'none',
          display: 'block',
          // subtle de-saturate so the iframe reads as "background"
          filter: 'saturate(0.7) brightness(0.9)',
        }}
      />
    </div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────
export default function Projects() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.projects-label', {
        scrollTrigger: { trigger: '.projects-label', start: 'top 88%' },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.from('.projects-heading-line', {
        scrollTrigger: { trigger: '.projects-heading', start: 'top 85%' },
        y: '105%',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
      })

      document.querySelectorAll('.project-item').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 82%' },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="work"
      ref={containerRef}
      className="px-8 md:px-12 py-32 md:py-40"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16 projects-label">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">03</span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">Work</span>
      </div>

      {/* Section heading */}
      <div className="projects-heading mb-20 max-w-3xl">
        {['Selected', 'Projects.'].map((line, i) => (
          <div key={i} className="clip-wrap">
            <div
              className="projects-heading-line font-black leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(40px, 6.5vw, 88px)' }}
            >
              {line}
            </div>
          </div>
        ))}
      </div>

      {/* Project cards */}
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <a
            key={project.number}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item block group"
          >
            <div
              className="relative overflow-hidden rounded-sm"
              style={{
                background: '#080808',          // fallback if iframe blocked
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: 380,
              }}
            >
              {/* ── Live iframe background ── */}
              <IframePreview src={project.href} />

              {/* ── Dark gradient overlay — lightens slightly on hover ── */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  // diagonal gradient: denser on left where text lives
                  background: 'linear-gradient(120deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.30) 100%)',
                  zIndex: 1,
                }}
              />
              {/* Extra hover-reveal layer (becomes transparent on hover) */}
              <div
                className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  zIndex: 2,
                }}
              />

              {/* ── Content ── */}
              <div className="relative p-10 md:p-14" style={{ zIndex: 10 }}>
                {/* Top row */}
                <div className="flex items-start justify-between mb-10">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
                    {project.number} / {String(projects.length).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-text-muted group-hover:text-text-primary transition-colors duration-300 flex items-center gap-2">
                    View
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    >
                      <path
                        d="M2 12L12 2M12 2H5M12 2V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>

                {/* Project name */}
                <h3
                  className="font-black leading-[0.92] tracking-[-0.02em] text-text-primary mb-6 group-hover:translate-x-1 transition-transform duration-500 ease-out"
                  style={{ fontSize: 'clamp(32px, 5.5vw, 76px)' }}
                >
                  {project.name}
                </h3>

                {/* Description */}
                <p className="font-mono text-[13px] leading-relaxed text-text-muted max-w-xl mb-10">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1"
                      style={{
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(232,227,218,0.5)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
