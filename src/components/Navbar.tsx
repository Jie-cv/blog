import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          ZHAO JIE
        </a>
        <nav className={styles.nav}>
          <a href="#about" className={styles.link}>关于</a>
          <a href="#internships" className={styles.link}>经历</a>
          <a href="#thoughts-blog" className={styles.link}>博客</a>
        </nav>
      </div>
    </header>
  )
}
