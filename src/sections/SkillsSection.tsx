import { GlowPanel } from '../components/GlowPanel'
import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './SkillsSection.module.css'

type SkillsSectionProps = {
  tags: SiteContent['skillTags']
  projects: SiteContent['projects']
}

type ProjectCardProps = {
  project: SiteContent['projects'][number]
  delay: number
}

function ProjectCard({ project, delay }: ProjectCardProps) {
  const cardRef = useRevealUp<HTMLDivElement>({ delay, y: 46 })

  return (
    <div ref={cardRef}>
      <GlowPanel className={styles.card}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardSummary}>{project.summary}</p>
        <div className={styles.stackList}>
          {project.stack.map((item) => (
            <span key={item} className={styles.stackItem}>
              {item}
            </span>
          ))}
        </div>
        <p className={styles.cardHighlight}>{project.highlight}</p>
      </GlowPanel>
    </div>
  )
}

export function SkillsSection({ tags, projects }: SkillsSectionProps) {
  const titleRef = useRevealUp<HTMLDivElement>({ y: 36 })

  return (
    <section className={styles.section}>
      <div ref={titleRef}>
        <SectionTitle
          eyebrow="Skills & Projects"
          title="不仅有故事，也有持续搭建的能力"
          description="这里不是完整简历，而是我当前技术路径和项目表达的缩影。"
        />
      </div>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag.label} className={styles.tag}>
            {tag.label}
          </span>
        ))}
      </div>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} delay={index * 0.05} />
        ))}
      </div>
    </section>
  )
}
