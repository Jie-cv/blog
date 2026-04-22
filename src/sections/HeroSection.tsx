import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import * as LucideIcons from 'lucide-react'
import type { SiteContent } from '../types/content'
import styles from './HeroSection.module.css'

type HeroSectionProps = {
  hero: SiteContent['hero']
}

// GitHub 原生 SVG 组件
const GithubSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const DynamicIcon = ({ name }: { name: string }) => {
  if (name === 'Github') {
    return <GithubSvg />
  }
  
  const IconComponent = (LucideIcons as any)[name]
  if (!IconComponent) return null
  return <IconComponent size={16} strokeWidth={2.2} />
}

export function HeroSection({ hero }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const eyebrowRef = useRef<HTMLDivElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)
  const introRef = useRef<HTMLParagraphElement | null>(null)
  const infoRef = useRef<HTMLUListElement | null>(null)
  const actionsRef = useRef<HTMLDivElement | null>(null)
  const avatarRef = useRef<HTMLDivElement | null>(null)

  const allFacts = [...hero.profileFacts, ...hero.metrics]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .fromTo(avatarRef.current, { autoAlpha: 0, y: 24, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.65 })
        .fromTo(eyebrowRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.35')
        .fromTo(titleRef.current, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.25')
        .fromTo(subtitleRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.4')
        .fromTo(introRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.35')
        .fromTo(
          infoRef.current?.children ?? [],
          { autoAlpha: 0, x: -10 },
          { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.05 },
          '-=0.3'
        )
        .fromTo(
          actionsRef.current?.children ?? [],
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
          '-=0.2',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.sidebar}>
        <div className={styles.avatarWrap} ref={avatarRef}>
          <img className={styles.avatar} src={hero.avatarSrc} alt="赵捷头像" />
        </div>

        <div className={styles.copy}>
          <div ref={eyebrowRef} className={styles.eyebrowWrap}>
            <span className={styles.eyebrow}>
              {hero.eyebrow}
            </span>
          </div>
          <h1 className={styles.title} ref={titleRef}>
            {hero.title}
          </h1>
          <p className={styles.subtitle} ref={subtitleRef}>
            {hero.subtitle}
          </p>
          <p className={styles.intro} ref={introRef}>
            {hero.intro}
          </p>
          
          <ul className={styles.infoList} ref={infoRef}>
            {allFacts.map((fact, index) => {
              const href = 'href' in fact ? (fact as any).href : undefined
              
              return (
                <li key={index} className={styles.infoItem}>
                  <div className={styles.infoLabelWrap}>
                    {fact.icon && (
                      <span className={styles.infoIcon}>
                        <DynamicIcon name={fact.icon} />
                      </span>
                    )}
                    <span className={styles.infoLabel}>{fact.label}</span>
                  </div>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                      {fact.value}
                    </a>
                  ) : (
                    <span className={styles.infoValue}>{fact.value}</span>
                  )}
                </li>
              )
            })}
          </ul>

          <div className={styles.actions} ref={actionsRef}>
            {hero.links.map((link, index) => (
              <a
                key={link.href}
                className={index === 0 ? styles.linkPrimary : styles.linkSecondary}
                href={link.href.startsWith('#') ? `${import.meta.env.BASE_URL}${link.href}` : link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
