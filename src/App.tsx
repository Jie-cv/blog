import styles from './App.module.css'
import { siteContent } from './data/siteContent'
import { AboutSection } from './sections/AboutSection'
import { FooterSection } from './sections/FooterSection'
import { HeroSection } from './sections/HeroSection'
import { JourneySection } from './sections/JourneySection'
import { SkillsSection } from './sections/SkillsSection'
import { ThoughtsBlogSection } from './sections/ThoughtsBlogSection'

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.noise} />
      <div className={styles.glowA} />
      <div className={styles.glowB} />
      <main className={styles.main}>
        <HeroSection hero={siteContent.hero} />
        <AboutSection about={siteContent.about} />
        <JourneySection items={siteContent.journey} />
        <SkillsSection tags={siteContent.skillTags} projects={siteContent.projects} />
        <ThoughtsBlogSection thinking={siteContent.thinking} blog={siteContent.blog} />
        <FooterSection footer={siteContent.footer} />
      </main>
    </div>
  )
}

export default App
