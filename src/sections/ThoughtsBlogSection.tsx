import { GlowPanel } from '../components/GlowPanel'
import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './ThoughtsBlogSection.module.css'

type ThoughtsBlogSectionProps = {
  thinking: SiteContent['thinking']
  blog: SiteContent['blog']
}

type ContentColumnProps = {
  title: string
  items: SiteContent['thinking']
  delayBase: number
}

function ContentColumn({ title, items, delayBase }: ContentColumnProps) {
  const columnRef = useRevealUp<HTMLDivElement>({ y: 42, delay: delayBase })

  return (
    <div className={styles.column} ref={columnRef}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <div className={styles.cardList}>
        {items.map((item) => (
          <GlowPanel key={item.title} className={styles.card}>
            <span className={styles.tag}>{item.tag}</span>
            <h4 className={styles.cardTitle}>{item.title}</h4>
            <p className={styles.cardSummary}>{item.summary}</p>
          </GlowPanel>
        ))}
      </div>
    </div>
  )
}

export function ThoughtsBlogSection({ thinking, blog }: ThoughtsBlogSectionProps) {
  const titleRef = useRevealUp<HTMLDivElement>({ y: 36 })

  return (
    <section className={styles.section} id="thoughts-blog">
      <div ref={titleRef}>
        <SectionTitle
          eyebrow="Thinking & Blog"
          title="把经历沉淀成输出，把输出继续变成作品"
          description="我希望这个页面不仅记录过去，也能成为未来持续更新的起点。"
        />
      </div>
      <div className={styles.columns}>
        <ContentColumn title="阶段思考" items={thinking} delayBase={0} />
        <ContentColumn title="博客入口" items={blog} delayBase={0.12} />
      </div>
    </section>
  )
}
