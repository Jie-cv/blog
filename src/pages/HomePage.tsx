import { siteContent } from '../data/siteContent'
import { HeroSection } from '../sections/HeroSection'
import { InternshipsSection } from '../sections/InternshipsSection'
import { JourneySection } from '../sections/JourneySection'
import { SkillsSection } from '../sections/SkillsSection'
import { ThoughtsBlogSection } from '../sections/ThoughtsBlogSection'
import { FooterSection } from '../sections/FooterSection'
import styles from '../App.module.css'

export function HomePage() {
  return (
    <>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <HeroSection hero={siteContent.hero} />
        </aside>
        <main className={styles.mainContent}>
          <SkillsSection tags={siteContent.skillTags} projects={siteContent.projects} />
        </main>
      </div>
      <div className={styles.fullWidthLayout}>
        <InternshipsSection items={siteContent.internships} />
        <JourneySection items={siteContent.journey} />
        <ThoughtsBlogSection thinking={siteContent.thinking} blog={siteContent.blog} />
        <FooterSection footer={siteContent.footer} />
      </div>
    </>
  )
}
