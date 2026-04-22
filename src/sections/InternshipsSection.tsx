import { GlowPanel } from '../components/GlowPanel'
import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { InternshipItem, SiteContent } from '../types/content'
import styles from './InternshipsSection.module.css'

type InternshipsSectionProps = {
  items: SiteContent['internships']
}

type InternshipRowProps = {
  item: InternshipItem
  isLast: boolean
  delay: number
}

function InternshipRow({ item, isLast, delay }: InternshipRowProps) {
  const itemRef = useRevealUp<HTMLDivElement>({ y: 44, delay, start: 'top 100%' })

  return (
    <div className={styles.item} ref={itemRef}>
      <div className={styles.markerWrap}>
        <span className={styles.marker} />
        <span className={`${styles.line} ${isLast ? styles.lineLast : ''}`} />
      </div>
      <GlowPanel className={styles.card}>
        <span className={styles.team}>{item.team}</span>
        <h3 className={styles.company}>{item.company}</h3>
        <p className={styles.summary}>{item.summary}</p>
      </GlowPanel>
    </div>
  )
}

export function InternshipsSection({ items }: InternshipsSectionProps) {
  const titleRef = useRevealUp<HTMLDivElement>({ y: 32, start: 'top 100%' })

  return (
    <section className={styles.section} id="internships">
      <div ref={titleRef}>
        <SectionTitle
          eyebrow="Internships"
          title="实习经历"
          description="把每一段实习都看作一个节点，它们共同塑造了我对前端工作的理解。"
        />
      </div>
      <div className={styles.timeline}>
        {items.map((item, index) => (
          <InternshipRow
            key={item.company}
            item={item}
            isLast={index === items.length - 1}
            delay={index * 0.05}
          />
        ))}
      </div>
    </section>
  )
}
