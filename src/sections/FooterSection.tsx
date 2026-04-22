import { GlowPanel } from '../components/GlowPanel'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './FooterSection.module.css'

type FooterSectionProps = {
  footer: SiteContent['footer']
}

export function FooterSection({ footer }: FooterSectionProps) {
  const footerRef = useRevealUp<HTMLElement>({ y: 36 })

  return (
    <footer className={styles.footer} ref={footerRef}>
      <GlowPanel className={styles.panel}>
        <p className={styles.quote}>{footer.quote}</p>
        <div className={styles.links}>
          {footer.contacts.map((contact) => (
            <a key={contact.label} href={contact.href} className={styles.link}>
              {contact.label}
            </a>
          ))}
        </div>
      </GlowPanel>
    </footer>
  )
}
