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
  const introRef = useRef<HTMLParagraphElement | null>(null)
  const actionsRef = useRef<HTMLDivElement | null>(null)
  const avatarRef = useRef<HTMLDivElement | null>(null)
  const profileRef = useRef<HTMLDivElement | null>(null)
  const metricRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .fromTo(eyebrowRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.55 })
        .fromTo(titleRef.current, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.25')
        .fromTo(subtitleRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.4')
        .fromTo(introRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.35')
        .fromTo(
          actionsRef.current?.children ?? [],
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
          '-=0.3',
        )
        .fromTo(avatarRef.current, { autoAlpha: 0, y: 24, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.65 }, '-=0.45')
        .fromTo(profileRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.45')
        .fromTo(metricRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.45')
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
        <p className={styles.intro} ref={introRef}>
          {hero.intro}
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

      <div className={styles.sidebar}>
        <div className={styles.avatarWrap} ref={avatarRef}>
          <img className={styles.avatar} src={hero.avatarSrc} alt="赵捷头像" />
        </div>

        <GlowPanel className={styles.profilePanel}>
          <div className={styles.profileGrid} ref={profileRef}>
            {hero.profileFacts.map((fact) => (
              <div key={fact.label} className={styles.factItem}>
                <span className={styles.factLabel}>{fact.label}</span>
                <strong className={styles.factValue}>{fact.value}</strong>
              </div>
            ))}
          </div>
        </GlowPanel>

        <GlowPanel className={styles.metricPanel}>
          <div className={styles.metrics} ref={metricRef}>
            {hero.metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <strong className={styles.metricValue}>{metric.value}</strong>
              </div>
            ))}
          </div>
        </GlowPanel>
      </div>
    </section>
  )
}
