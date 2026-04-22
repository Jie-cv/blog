import { GlowPanel } from '../components/GlowPanel'
import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { JourneyItem, SiteContent } from '../types/content'
import styles from './JourneySection.module.css'

type JourneySectionProps = {
  items: SiteContent['journey']
}

type JourneyRowProps = {
  item: JourneyItem
  isLast: boolean
  delay: number
}

function JourneyRow({ item, isLast, delay }: JourneyRowProps) {
  const itemRef = useRevealUp<HTMLDivElement>({ y: 52, delay, start: 'top 88%' })

  return (
    <div className={styles.row} ref={itemRef}>
      <div className={styles.markerWrap}>
        <span className={item.highlight ? styles.markerHighlight : styles.marker} />
        {!isLast ? <span className={styles.line} /> : null}
      </div>
      <GlowPanel className={item.highlight ? styles.panelHighlight : styles.panel}>
        <span className={styles.year}>{item.year}</span>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </GlowPanel>
    </div>
  )
}

export function JourneySection({ items }: JourneySectionProps) {
  const titleRef = useRevealUp<HTMLDivElement>({ y: 36 })

  return (
    <section className={styles.section} id="journey">
      <div ref={titleRef}>
        <SectionTitle
          eyebrow="Journey"
          title="一路偏离，也一路靠近目标"
          description="把时间线拉长之后，我更愿意把这些节点看作一次次修正方向，而不是一次次被打乱。"
        />
      </div>
      <div className={styles.timeline}>
        {items.map((item, index) => (
          <JourneyRow
            key={`${item.year}-${item.title}`}
            item={item}
            isLast={index === items.length - 1}
            delay={index * 0.04}
          />
        ))}
      </div>
    </section>
  )
}
