'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 1,
      delay: 1.8,
      ease: 'power3.out',
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-6"
    >
      <a href="#" className="font-mono text-[11px] tracking-[0.2em] uppercase text-text-primary">
        Amir Akbari
      </a>

      <div className="flex items-center gap-8">
        {['Work', 'About', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-text-muted link-underline"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}
