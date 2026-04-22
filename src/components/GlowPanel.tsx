import type { PropsWithChildren } from 'react'
import styles from './GlowPanel.module.css'

type GlowPanelProps = PropsWithChildren<{
  className?: string
}>

export function GlowPanel({ children, className }: GlowPanelProps) {
  return <article className={[styles.panel, className].filter(Boolean).join(' ')}>{children}</article>
}
