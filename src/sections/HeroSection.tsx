import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { GlowPanel } from '../components/GlowPanel'
import type { SiteContent } from '../types/content'
import styles from './HeroSection.module.css'

type HeroSectionProps = {
  hero: SiteContent['hero']
}

export function HeroSection({ hero }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const eyebrowRef = useRef<HTMLSpanElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)
  const actionsRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .fromTo(
          eyebrowRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
        )
        .fromTo(
          titleRef.current,
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          '-=0.32',
        )
        .fromTo(
          subtitleRef.current,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          '-=0.4',
        )
        .fromTo(
          actionsRef.current?.children ?? [],
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1 },
          '-=0.35',
        )
        .fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 36, scale: 0.96, filter: 'blur(8px)' },
          { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.85 },
          '-=0.55',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.copy}>
        <span className={styles.eyebrow} ref={eyebrowRef}>
          {hero.eyebrow}
        </span>
        <h1 className={styles.title} ref={titleRef}>
          {hero.title}
        </h1>
        <p className={styles.subtitle} ref={subtitleRef}>
          {hero.subtitle}
        </p>
        <div className={styles.actions} ref={actionsRef}>
          {hero.links.map((link, index) => (
            <a
              key={link.href}
              className={index === 0 ? styles.linkPrimary : styles.linkSecondary}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div ref={panelRef}>
        <GlowPanel className={styles.panel}>
          <div className={styles.metrics}>
            {hero.metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <strong className={styles.metricValue}>{metric.value}</strong>
              </div>
            ))}
          </div>
          <div className={styles.orbit} />
        </GlowPanel>
      </div>
    </section>
  )
}
