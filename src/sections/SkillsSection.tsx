import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './SkillsSection.module.css'

type SkillsSectionProps = {
  tags: SiteContent['skillTags']
  projects: SiteContent['projects']
}

function SkillTag({ tag, delay }: { tag: SiteContent['skillTags'][number]; delay: number }) {
  const tagRef = useRevealUp<HTMLSpanElement>({ delay, y: 24 })

  return (
    <span ref={tagRef} className={styles.tag}>
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

  return (
    <section className={styles.section}>
      <div ref={titleRef}>
        <SectionTitle
          eyebrow="Skills & Projects"
          title="技术栈与实践"
          description="这些是我在前端学习和实习中积累的技术栈，也是我持续搭建作品的基础。"
        />
      </div>
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <SkillTag key={tag.label} tag={tag} delay={index * 0.03} />
        ))}
      </div>
      
      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} delay={0.2 + index * 0.1} />
        ))}
      </div>
    </section>
  )
}
