import { GlowPanel } from '../components/GlowPanel'
import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './AboutSection.module.css'

type AboutSectionProps = {
  about: SiteContent['about']
}

export function AboutSection({ about }: AboutSectionProps) {
  const sectionRef = useRevealUp<HTMLElement>({ y: 44 })

  return (
    <section className={styles.section} ref={sectionRef}>
      <GlowPanel className={styles.panel}>
        <SectionTitle eyebrow="About" title={about.title} description={about.body} />
      </GlowPanel>
    </section>
  )
}
