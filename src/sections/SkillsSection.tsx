import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './SkillsSection.module.css'

type SkillsSectionProps = {
  tags: SiteContent['skillTags']
  projects: SiteContent['projects']
}

function SkillTag({ tag, disableReveal }: { tag: SiteContent['skillTags'][number]; disableReveal?: boolean }) {
  const tagRef = useRevealUp<HTMLSpanElement>({ delay: 0, y: 24 })

  return (
    <span ref={disableReveal ? null : tagRef} className={disableReveal ? styles.marqueeTag : styles.tag}>
      {tag.icon && <img src={tag.icon} alt={tag.label} className={styles.tagIcon} />}
      {tag.label}
    </span>
  )
}

function ProjectCard({ project, delay }: { project: SiteContent['projects'][number]; delay: number }) {
  const cardRef = useRevealUp<HTMLDivElement>({ delay, y: 30 })

  return (
    <div ref={cardRef} className={styles.projectCardWrapper}>
      <div className={styles.projectCard}>
        <div className={styles.projectHeader}>
          <div className={styles.projectIcon}>✦</div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
        </div>

        <div className={styles.projectTags}>
          {project.stack.map((tech) => (
            <span key={tech} className={styles.projectTag}>
              {tech}
            </span>
          ))}
        </div>

        <p className={styles.projectDesc}>{project.summary}</p>
        
        {project.highlight && (
          <div className={styles.projectHighlight}>
            <span className={styles.highlightIcon}>✨</span>
            <p className={styles.highlightText}>{project.highlight}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function SkillsSection({ tags, projects }: SkillsSectionProps) {
  const titleRef = useRevealUp<HTMLDivElement>({ y: 36 })
  const marqueeRef = useRevealUp<HTMLDivElement>({ y: 36, delay: 0.1 })

  const row1 = tags.filter((_, i) => i % 3 === 0)
  const row2 = tags.filter((_, i) => i % 3 === 1)
  const row3 = tags.filter((_, i) => i % 3 === 2)

  const repeatTags = (arr: typeof tags, times: number) => Array(times).fill(arr).flat()

  return (
    <section className={styles.section}>
      <div ref={titleRef}>
        <SectionTitle
          eyebrow="Skills & Projects"
          title="技术栈与实践"
          description="这些是我在前端学习和实习中积累的技术栈，也是我持续搭建作品的基础。"
        />
      </div>
      
      <div className={styles.marqueeContainer}>
        <div ref={marqueeRef} className={styles.marqueeContainerInner}>
          <div className={`${styles.marqueeTrack} ${styles.track1}`}>
            {repeatTags(row1, 6).map((tag, index) => (
              <SkillTag key={`row1-${tag.label}-${index}`} tag={tag} disableReveal={true} />
            ))}
          </div>
          <div className={`${styles.marqueeTrack} ${styles.track2}`}>
            {repeatTags(row2, 6).map((tag, index) => (
              <SkillTag key={`row2-${tag.label}-${index}`} tag={tag} disableReveal={true} />
            ))}
          </div>
          <div className={`${styles.marqueeTrack} ${styles.track3}`}>
            {repeatTags(row3, 6).map((tag, index) => (
              <SkillTag key={`row3-${tag.label}-${index}`} tag={tag} disableReveal={true} />
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} delay={0.2 + index * 0.1} />
        ))}
      </div>
    </section>
  )
}
