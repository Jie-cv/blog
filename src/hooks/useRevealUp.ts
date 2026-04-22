import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
  y?: number
  delay?: number
  duration?: number
  start?: string
}

export function useRevealUp<T extends HTMLElement>({
  y = 48,
  delay = 0,
  duration = 0.8,
  start = 'top 82%',
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null)

  useLayoutEffect(() => {
    const element = ref.current

    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none none',
          },
        },
      )
    }, element)

    return () => ctx.revert()
  }, [delay, duration, start, y])

  return ref
}
