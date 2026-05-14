'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'power2.out',
      })

      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const onMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.3 })
    }

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    document.addEventListener('mousemove', onMouseMove)

    const interactives = document.querySelectorAll('a, button, [data-cursor-grow]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[10001]"
        style={{
          background: '#e8e3da',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10000]"
        style={{
          border: '1px solid #e8e3da',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
