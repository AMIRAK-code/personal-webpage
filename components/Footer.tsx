'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Live Site', href: 'https://www.amircodess.com' },
]

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.footer-content', {
        scrollTrigger: { trigger: '.footer-content', start: 'top 92%' },
        y: 24,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    },
    { scope: containerRef }
  )

  return (
    <footer
      ref={containerRef}
      className="px-8 md:px-12 py-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="footer-content flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted">
            Amir Akbari
          </span>
          <span className="font-mono text-[10px] text-text-muted">
            © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted link-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#4ade80',
              boxShadow: '0 0 6px #4ade80',
            }}
          />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted">
            Available for work
          </span>
        </div>
      </div>
    </footer>
  )
}
