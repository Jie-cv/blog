# Personal Blog Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React-based personal blog homepage with a tech-inspired visual style, story-driven journey timeline, blog/thinking sections, and GSAP-powered upward reveal animations when content enters the viewport.

**Architecture:** Create a Vite + React + TypeScript single-page app with focused presentational sections under `src/sections/`, shared animation hooks/components under `src/components/` and `src/hooks/`, and static content data under `src/data/`. Use GSAP with ScrollTrigger for page-level animations, especially reusable “enter viewport and slide upward” reveals across sections and cards.

**Tech Stack:** React, TypeScript, Vite, CSS Modules, GSAP, ScrollTrigger

---

## File Structure

- Create: `package.json` — app scripts and dependencies
- Create: `tsconfig.json` — TypeScript compiler options
- Create: `tsconfig.node.json` — Vite TypeScript node config
- Create: `vite.config.ts` — Vite config
- Create: `index.html` — app mount HTML
- Create: `src/main.tsx` — React app entry
- Create: `src/App.tsx` — top-level page composition
- Create: `src/index.css` — global reset, theme variables, base layout styles
- Create: `src/App.module.css` — page shell spacing and background layers
- Create: `src/data/siteContent.ts` — personal content, journey nodes, blog cards, thinking cards, skills, links
- Create: `src/hooks/useRevealUp.ts` — reusable GSAP upward reveal hook for in-view sections/cards
- Create: `src/components/SectionTitle.tsx` — shared section heading component
- Create: `src/components/SectionTitle.module.css` — section heading styles
- Create: `src/components/GlowPanel.tsx` — reusable card container with tech-style border/glow
- Create: `src/components/GlowPanel.module.css` — card container styles
- Create: `src/components/RevealGroup.tsx` — optional wrapper for staggered upward reveal children
- Create: `src/components/RevealGroup.module.css` — wrapper styles
- Create: `src/sections/HeroSection.tsx` — landing hero with CTA and visual panel
- Create: `src/sections/HeroSection.module.css` — hero styles and visual decoration
- Create: `src/sections/AboutSection.tsx` — current-state intro
- Create: `src/sections/AboutSection.module.css` — about styles
- Create: `src/sections/JourneySection.tsx` — timeline section and highlighted milestones
- Create: `src/sections/JourneySection.module.css` — timeline styles
- Create: `src/sections/SkillsSection.tsx` — skills and projects grid
- Create: `src/sections/SkillsSection.module.css` — skills/project card styles
- Create: `src/sections/ThoughtsBlogSection.tsx` — thinking cards and blog cards
- Create: `src/sections/ThoughtsBlogSection.module.css` — two-column content styles
- Create: `src/sections/FooterSection.tsx` — closing statement and contact links
- Create: `src/sections/FooterSection.module.css` — footer styles
- Create: `src/types/content.ts` — shared content types
- Create: `src/assets/` (optional later only if needed for local icons/images; skip initially)
- Modify later if needed: `src/data/siteContent.ts` — enrich project content once resume-derived items are available

## Task 1: Scaffold the React app

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `src/App.module.css`

- [ ] **Step 1: Write the failing app smoke test mentally by defining the expected boot path**

```ts
// Expected boot path after this task:
// index.html -> src/main.tsx -> <App /> -> page shell renders
// Vite dev server should load without module resolution errors.
```

- [ ] **Step 2: Create `package.json` with exact dependencies**

```json
{
  "name": "personal-blog-homepage",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.12.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.6.2",
    "vite": "^5.4.8"
  }
}
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.app.json" }
  ]
}
```

- [ ] **Step 4: Create `tsconfig.app.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": "."
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 7: Create `index.html`**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>赵捷 | 个人成长博客</title>
    <meta name="description" content="一个关于成长、前端与持续向前的个人博客首页" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Create `src/main.tsx`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 9: Create `src/App.tsx`**

```tsx
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.noise} />
      <main className={styles.main}>App shell ready</main>
    </div>
  )
}

export default App
```

- [ ] **Step 10: Create `src/index.css`**

```css
:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #f3f7ff;
  background: #07111f;
  line-height: 1.5;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --bg-primary: #07111f;
  --bg-secondary: rgba(14, 27, 48, 0.78);
  --panel-border: rgba(120, 180, 255, 0.22);
  --text-primary: #f3f7ff;
  --text-secondary: #9eb0c9;
  --accent-primary: #53a6ff;
  --accent-secondary: #7a7dff;
  --accent-glow: rgba(83, 166, 255, 0.35);
  --container-width: 1180px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background:
    radial-gradient(circle at top, rgba(83, 166, 255, 0.16), transparent 32%),
    linear-gradient(180deg, #07111f 0%, #050b16 100%);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}
```

- [ ] **Step 11: Create `src/App.module.css`**

```css
.page {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.noise {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 0.5px, transparent 0.5px);
  background-size: 12px 12px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.45), transparent 85%);
}

.main {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 12: Install dependencies**

Run: `npm install`
Expected: packages installed successfully and `package-lock.json` created

- [ ] **Step 13: Run dev server**

Run: `npm run dev -- --host 127.0.0.1 --port 4173`
Expected: Vite prints a local URL without TypeScript/module errors

- [ ] **Step 14: Commit scaffold**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html src/main.tsx src/App.tsx src/index.css src/App.module.css
git commit -m "feat: scaffold personal blog homepage"
```

## Task 2: Define typed page content and structure

**Files:**
- Create: `src/types/content.ts`
- Create: `src/data/siteContent.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create shared types in `src/types/content.ts`**

```ts
export type HeroLink = {
  label: string
  href: string
}

export type JourneyItem = {
  year: string
  title: string
  description: string
  highlight?: boolean
}

export type SkillTag = {
  label: string
}

export type ProjectItem = {
  title: string
  summary: string
  stack: string[]
  highlight: string
}

export type ArticleCard = {
  title: string
  summary: string
  tag: string
}

export type ContactLink = {
  label: string
  href: string
}

export type SiteContent = {
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    links: HeroLink[]
    metrics: { label: string; value: string }[]
  }
  about: {
    title: string
    body: string
  }
  journey: JourneyItem[]
  skillTags: SkillTag[]
  projects: ProjectItem[]
  thinking: ArticleCard[]
  blog: ArticleCard[]
  footer: {
    quote: string
    contacts: ContactLink[]
  }
}
```

- [ ] **Step 2: Create `src/data/siteContent.ts` with exact starter content**

```ts
import type { SiteContent } from '../types/content'

export const siteContent: SiteContent = {
  hero: {
    eyebrow: 'Frontend / React / Growth Journey',
    title: '从曲折里走出来的前端学习者',
    subtitle:
      '我不是一路顺利地走到这里，但每一次偏离，最后都让我更坚定地走向前端开发。',
    links: [
      { label: '查看成长历程', href: '#journey' },
      { label: '查看博客与思考', href: '#thoughts-blog' },
    ],
    metrics: [
      { label: '当前阶段', value: '大三 / 前端方向' },
      { label: '起点时间', value: '2025-02-11' },
      { label: '目标', value: '持续成长，冲击更高平台' },
    ],
  },
  about: {
    title: '现在的我',
    body:
      '我是东华理工大学的一名大三学生。走到前端这条路并不算顺利，但也正因为经历过专业受阻、方向摇摆和现实压力，我才更确定自己真正想长期投入的事情是什么。',
  },
  journey: [
    {
      year: '高中',
      title: '三个月的逆袭',
      description:
        '就读南丰县第一中学。高考前 3 个月，我把自己的名次从约 200 名冲到了全校 68 名，也第一次真正相信，结果是可以靠自己一点点改变的。',
    },
    {
      year: '高考后',
      title: '第一次面对落差',
      description:
        '高考的结果并不理想，原本的 211 梦想落空。那一刻我开始意识到，如果想走到更远的地方，未来还需要靠自己继续翻盘。',
    },
    {
      year: '大一',
      title: '专业受阻，但没有停下',
      description:
        '原本想靠转专业接近计算机方向，但政策变化打断了这条路。最后我转去了 GIS，一个依然能接触开发的专业，也是在那时，我第一次认真思考自己的长期路线。',
    },
    {
      year: '2025-02-11',
      title: '开始学习前端',
      description:
        '我想先试试看前端开发到底适不适合自己。结果是，我越学越确定，这就是我真正感兴趣并愿意长期投入的方向。',
      highlight: true,
    },
    {
      year: '学习途中',
      title: '被打断，也重新回来',
      description:
        '中途因为比赛和其他安排短暂偏离，但我最后还是回到了前端学习中。这次回归让我更确定，自己不是一时兴起，而是真的想走这条路。',
    },
    {
      year: '暑期',
      title: '在现实挤压里继续前进',
      description:
        '补修课程、当前专业课程、自学技术、找实习计划同时交织在一起。即使计划被打乱，我还是选择继续准备，继续投递。',
    },
    {
      year: '第一段实习',
      title: '走进华顺信安',
      description:
        '进入公司之后，我第一次真正理解团队协作、业务目标和工程实践，也第一次从真实工作环境里重新认识自己。',
      highlight: true,
    },
    {
      year: '实习之后',
      title: '把“想进大厂”变成具体目标',
      description:
        '和 leader 的交流、真实的工作体验、以及身边案例，让我对前端路线越来越坚定。我开始把目标明确成字节，并决定继续深耕 React 和工程能力。',
      highlight: true,
    },
    {
      year: '回校后',
      title: '不再被标签束缚',
      description:
        '有了第一段实习后，我开始相信双非和非科班并不是绝对限制。与其继续焦虑，不如把时间投入到技术成长和下一段机会里。',
    },
    {
      year: '后续冲刺',
      title: '接到字节面试电话',
      description:
        '从最初屡屡受挫，到后来终于迎来机会，这通电话让我知道，持续投入不会立刻兑现，但它一定会留下回响。',
      highlight: true,
    },
  ],
  skillTags: [
    { label: 'React' },
    { label: 'TypeScript' },
    { label: 'JavaScript' },
    { label: 'GSAP' },
    { label: '组件化' },
    { label: '前端工程化' },
    { label: 'Node.js' },
  ],
  projects: [
    {
      title: '成长叙事型个人主页',
      summary: '一个强调成长路径、技术表达与持续输出的科技感个人主页。',
      stack: ['React', 'TypeScript', 'GSAP'],
      highlight: '用时间轴叙事替代传统简历堆砌。',
    },
    {
      title: '前端学习沉淀区',
      summary: '用博客卡片和阶段思考承接学习记录、实习总结与技术复盘。',
      stack: ['React', 'CSS Modules'],
      highlight: '支持后续自然扩展成长期维护的个人博客。',
    },
  ],
  thinking: [
    {
      title: '为什么我最后坚定走前端',
      summary: '不是因为容易，而是因为我真的愿意长时间投入，并且始终保持兴趣。',
      tag: '成长思考',
    },
    {
      title: '第一段实习让我重新理解什么叫成长',
      summary: '真正进入公司以后，我开始把技术、协作和目标放到一个更真实的坐标系里看。',
      tag: '实习反思',
    },
    {
      title: '非科班和双非，真的没有机会吗',
      summary: '很多焦虑来自想象，很多信心来自真实行动。',
      tag: '路径选择',
    },
  ],
  blog: [
    {
      title: 'React 学习笔记',
      summary: '记录组件化、状态管理与渲染机制的学习过程。',
      tag: 'React',
    },
    {
      title: 'Fiber 架构学习记录',
      summary: '从第一段实习后的建议出发，继续补足 React 底层理解。',
      tag: '原理',
    },
    {
      title: '前端实习总结',
      summary: '从第一段实习中看到协作、业务与工程实践的真实样子。',
      tag: '实习',
    },
  ],
  footer: {
    quote: '我走得不算顺，但我一直在向前。',
    contacts: [
      { label: 'Email', href: 'mailto:hello@example.com' },
      { label: 'GitHub', href: 'https://github.com/' },
    ],
  },
}
```

- [ ] **Step 3: Update `src/App.tsx` to consume structured data placeholders**

```tsx
import styles from './App.module.css'
import { siteContent } from './data/siteContent'

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.noise} />
      <main className={styles.main}>
        <pre className={styles.debug}>{JSON.stringify(siteContent.hero, null, 2)}</pre>
      </main>
    </div>
  )
}

export default App
```

- [ ] **Step 4: Add debug style in `src/App.module.css`**

```css
.debug {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 120px 0;
  color: var(--text-secondary);
  white-space: pre-wrap;
}
```

- [ ] **Step 5: Run build to verify types compile**

Run: `npm run build`
Expected: build succeeds and outputs `dist/`

- [ ] **Step 6: Commit typed content foundation**

```bash
git add src/types/content.ts src/data/siteContent.ts src/App.tsx src/App.module.css dist
git commit -m "feat: add personal homepage content model"
```

## Task 3: Build shared UI primitives and reveal hook

**Files:**
- Create: `src/components/SectionTitle.tsx`
- Create: `src/components/SectionTitle.module.css`
- Create: `src/components/GlowPanel.tsx`
- Create: `src/components/GlowPanel.module.css`
- Create: `src/components/RevealGroup.tsx`
- Create: `src/components/RevealGroup.module.css`
- Create: `src/hooks/useRevealUp.ts`

- [ ] **Step 1: Create `src/components/SectionTitle.tsx`**

```tsx
import styles from './SectionTitle.module.css'

type SectionTitleProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <header className={styles.header}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  )
}
```

- [ ] **Step 2: Create `src/components/SectionTitle.module.css`**

```css
.header {
  display: grid;
  gap: 12px;
  max-width: 720px;
}

.eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--accent-primary);
}

.title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1.05;
}

.description {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
}
```

- [ ] **Step 3: Create `src/components/GlowPanel.tsx`**

```tsx
import type { PropsWithChildren } from 'react'
import styles from './GlowPanel.module.css'

type GlowPanelProps = PropsWithChildren<{
  className?: string
}>

export function GlowPanel({ children, className }: GlowPanelProps) {
  return <article className={[styles.panel, className].filter(Boolean).join(' ')}>{children}</article>
}
```

- [ ] **Step 4: Create `src/components/GlowPanel.module.css`**

```css
.panel {
  position: relative;
  border: 1px solid var(--panel-border);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(10, 21, 38, 0.9), rgba(9, 17, 31, 0.72));
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(18px);
}

.panel::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(83, 166, 255, 0.18), transparent 40%, transparent 60%, rgba(122, 125, 255, 0.16));
  opacity: 0.85;
  pointer-events: none;
}
```

- [ ] **Step 5: Create `src/components/RevealGroup.tsx`**

```tsx
import type { PropsWithChildren } from 'react'
import styles from './RevealGroup.module.css'

type RevealGroupProps = PropsWithChildren<{
  className?: string
}>

export function RevealGroup({ children, className }: RevealGroupProps) {
  return <div className={[styles.group, className].filter(Boolean).join(' ')}>{children}</div>
}
```

- [ ] **Step 6: Create `src/components/RevealGroup.module.css`**

```css
.group {
  display: contents;
}
```

- [ ] **Step 7: Create `src/hooks/useRevealUp.ts`**

```ts
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
  y?: number
  delay?: number
  duration?: number
  start?: string
}

export function useRevealUp<T extends HTMLElement>({
  y = 48,
  delay = 0,
  duration = 0.8,
  start = 'top 82%',
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null)

  useLayoutEffect(() => {
    const element = ref.current

    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none none',
          },
        },
      )
    }, element)

    return () => ctx.revert()
  }, [delay, duration, start, y])

  return ref
}
```

- [ ] **Step 8: Run build to verify the hook and components compile**

Run: `npm run build`
Expected: build succeeds without type errors

- [ ] **Step 9: Commit shared primitives**

```bash
git add src/components/SectionTitle.tsx src/components/SectionTitle.module.css src/components/GlowPanel.tsx src/components/GlowPanel.module.css src/components/RevealGroup.tsx src/components/RevealGroup.module.css src/hooks/useRevealUp.ts
git commit -m "feat: add shared homepage UI primitives"
```

## Task 4: Implement the Hero and About sections

**Files:**
- Create: `src/sections/HeroSection.tsx`
- Create: `src/sections/HeroSection.module.css`
- Create: `src/sections/AboutSection.tsx`
- Create: `src/sections/AboutSection.module.css`
- Modify: `src/App.tsx`
- Modify: `src/App.module.css`

- [ ] **Step 1: Create `src/sections/HeroSection.tsx`**

```tsx
import { GlowPanel } from '../components/GlowPanel'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './HeroSection.module.css'

type HeroSectionProps = {
  hero: SiteContent['hero']
}

export function HeroSection({ hero }: HeroSectionProps) {
  const sectionRef = useRevealUp<HTMLElement>({ y: 56, duration: 0.9, start: 'top 88%' })

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>{hero.eyebrow}</span>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <div className={styles.actions}>
          {hero.links.map((link) => (
            <a key={link.href} className={styles.link} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <GlowPanel className={styles.panel}>
        <div className={styles.metrics}>
          {hero.metrics.map((metric) => (
            <div key={metric.label} className={styles.metric}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <strong className={styles.metricValue}>{metric.value}</strong>
            </div>
          ))}
        </div>
      </GlowPanel>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/sections/HeroSection.module.css`**

```css
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;
  padding: 80px 0 48px;
}

.copy {
  display: grid;
  gap: 20px;
}

.eyebrow {
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-size: 0.78rem;
}

.title {
  margin: 0;
  font-size: clamp(3rem, 7vw, 5.75rem);
  line-height: 0.96;
}

.subtitle {
  margin: 0;
  max-width: 640px;
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
}

.link {
  padding: 14px 22px;
  border-radius: 999px;
  border: 1px solid rgba(125, 180, 255, 0.22);
  background: rgba(10, 22, 40, 0.72);
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.link:hover {
  transform: translateY(-2px);
  border-color: rgba(125, 180, 255, 0.5);
  box-shadow: 0 10px 28px rgba(83, 166, 255, 0.18);
}

.panel {
  padding: 28px;
}

.metrics {
  display: grid;
  gap: 18px;
}

.metric {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.02);
}

.metricLabel {
  color: var(--text-secondary);
  font-size: 0.86rem;
}

.metricValue {
  font-size: 1.05rem;
}

@media (max-width: 900px) {
  .section {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 120px;
  }
}
```

- [ ] **Step 3: Create `src/sections/AboutSection.tsx`**

```tsx
import { GlowPanel } from '../components/GlowPanel'
import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './AboutSection.module.css'

type AboutSectionProps = {
  about: SiteContent['about']
}

export function AboutSection({ about }: AboutSectionProps) {
  const sectionRef = useRevealUp<HTMLElement>()

  return (
    <section className={styles.section} ref={sectionRef}>
      <GlowPanel className={styles.panel}>
        <SectionTitle eyebrow="About" title={about.title} description={about.body} />
      </GlowPanel>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/sections/AboutSection.module.css`**

```css
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 32px 0 0;
}

.panel {
  padding: 32px;
}
```

- [ ] **Step 5: Replace `src/App.tsx` with section composition**

```tsx
import styles from './App.module.css'
import { siteContent } from './data/siteContent'
import { AboutSection } from './sections/AboutSection'
import { HeroSection } from './sections/HeroSection'

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.noise} />
      <div className={styles.glowA} />
      <div className={styles.glowB} />
      <main className={styles.main}>
        <HeroSection hero={siteContent.hero} />
        <AboutSection about={siteContent.about} />
      </main>
    </div>
  )
}

export default App
```

- [ ] **Step 6: Extend `src/App.module.css` background layers**

```css
.glowA,
.glowB {
  position: fixed;
  border-radius: 999px;
  filter: blur(90px);
  pointer-events: none;
  opacity: 0.42;
}

.glowA {
  width: 360px;
  height: 360px;
  top: 80px;
  left: -120px;
  background: rgba(83, 166, 255, 0.26);
}

.glowB {
  width: 320px;
  height: 320px;
  top: 420px;
  right: -80px;
  background: rgba(122, 125, 255, 0.22);
}
```

- [ ] **Step 7: Run build to verify hero/about render**

Run: `npm run build`
Expected: build succeeds and hero/about sections are bundled

- [ ] **Step 8: Run dev server and verify upward reveal in browser**

Run: `npm run dev -- --host 127.0.0.1 --port 4173`
Expected: Hero and About render; About section slides upward when entering viewport

- [ ] **Step 9: Commit hero/about implementation**

```bash
git add src/App.tsx src/App.module.css src/sections/HeroSection.tsx src/sections/HeroSection.module.css src/sections/AboutSection.tsx src/sections/AboutSection.module.css
git commit -m "feat: add hero and about sections"
```

## Task 5: Implement the journey timeline with highlighted milestones

**Files:**
- Create: `src/sections/JourneySection.tsx`
- Create: `src/sections/JourneySection.module.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/sections/JourneySection.tsx`**

```tsx
import { GlowPanel } from '../components/GlowPanel'
import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './JourneySection.module.css'

type JourneySectionProps = {
  items: SiteContent['journey']
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
        {items.map((item, index) => {
          const itemRef = useRevealUp<HTMLDivElement>({ y: 52, delay: index * 0.04, start: 'top 88%' })

          return (
            <div key={`${item.year}-${item.title}`} className={styles.row} ref={itemRef}>
              <div className={styles.markerWrap}>
                <span className={item.highlight ? styles.markerHighlight : styles.marker} />
                {index < items.length - 1 ? <span className={styles.line} /> : null}
              </div>
              <GlowPanel className={item.highlight ? styles.panelHighlight : styles.panel}>
                <span className={styles.year}>{item.year}</span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </GlowPanel>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Fix the hook usage bug by extracting a `JourneyRow` component before running build**

```tsx
import { GlowPanel } from '../components/GlowPanel'
import { useRevealUp } from '../hooks/useRevealUp'
import type { JourneyItem } from '../types/content'
import styles from './JourneySection.module.css'

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
```

- [ ] **Step 3: Replace `src/sections/JourneySection.tsx` with the valid version**

```tsx
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
```

- [ ] **Step 4: Create `src/sections/JourneySection.module.css`**

```css
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 120px 0 0;
}

.timeline {
  display: grid;
  gap: 24px;
  margin-top: 40px;
}

.row {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 20px;
  align-items: stretch;
}

.markerWrap {
  position: relative;
  display: flex;
  justify-content: center;
}

.marker,
.markerHighlight {
  width: 14px;
  height: 14px;
  margin-top: 28px;
  border-radius: 999px;
  background: rgba(123, 160, 220, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.14);
  z-index: 1;
}

.markerHighlight {
  background: var(--accent-primary);
  box-shadow: 0 0 24px var(--accent-glow);
}

.line {
  position: absolute;
  top: 42px;
  bottom: -24px;
  width: 1px;
  background: linear-gradient(180deg, rgba(83, 166, 255, 0.35), rgba(83, 166, 255, 0.04));
}

.panel,
.panelHighlight {
  padding: 24px;
}

.panelHighlight {
  padding: 24px;
  box-shadow: 0 20px 54px rgba(83, 166, 255, 0.18);
}

.year {
  color: var(--accent-primary);
  font-size: 0.86rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.title {
  margin: 12px 0 10px;
  font-size: 1.28rem;
}

.description {
  margin: 0;
  color: var(--text-secondary);
}

@media (max-width: 720px) {
  .row {
    grid-template-columns: 28px 1fr;
    gap: 14px;
  }
}
```

- [ ] **Step 5: Update `src/App.tsx` to include journey section**

```tsx
import styles from './App.module.css'
import { siteContent } from './data/siteContent'
import { AboutSection } from './sections/AboutSection'
import { HeroSection } from './sections/HeroSection'
import { JourneySection } from './sections/JourneySection'

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
      </main>
    </div>
  )
}

export default App
```

- [ ] **Step 6: Run build to verify journey section compiles**

Run: `npm run build`
Expected: build succeeds and journey section renders without hook-rule violations

- [ ] **Step 7: Run dev server and verify each timeline card slides upward on entry**

Run: `npm run dev -- --host 127.0.0.1 --port 4173`
Expected: timeline items animate upward as they enter the viewport and highlighted milestones visually stand out

- [ ] **Step 8: Commit journey section**

```bash
git add src/sections/JourneySection.tsx src/sections/JourneySection.module.css src/App.tsx
git commit -m "feat: add growth journey timeline"
```

## Task 6: Implement skills/projects and thinking/blog grids

**Files:**
- Create: `src/sections/SkillsSection.tsx`
- Create: `src/sections/SkillsSection.module.css`
- Create: `src/sections/ThoughtsBlogSection.tsx`
- Create: `src/sections/ThoughtsBlogSection.module.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/sections/SkillsSection.tsx`**

```tsx
import { GlowPanel } from '../components/GlowPanel'
import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './SkillsSection.module.css'

type SkillsSectionProps = {
  tags: SiteContent['skillTags']
  projects: SiteContent['projects']
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
        {tags.map((tag, index) => (
          <span key={tag.label} className={styles.tag} style={{ transitionDelay: `${index * 60}ms` }}>
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
```

- [ ] **Step 2: Create `src/sections/SkillsSection.module.css`**

```css
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 120px 0 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.tag {
  padding: 10px 16px;
  border-radius: 999px;
  color: #dce8ff;
  background: rgba(13, 28, 49, 0.9);
  border: 1px solid rgba(118, 160, 225, 0.18);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 28px;
}

.card {
  height: 100%;
  padding: 24px;
}

.cardTitle {
  margin: 0;
  font-size: 1.24rem;
}

.cardSummary,
.cardHighlight {
  color: var(--text-secondary);
}

.stackList {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 18px 0;
}

.stackItem {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 0.88rem;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Create `src/sections/ThoughtsBlogSection.tsx`**

```tsx
import { GlowPanel } from '../components/GlowPanel'
import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { SiteContent } from '../types/content'
import styles from './ThoughtsBlogSection.module.css'

type ThoughtsBlogSectionProps = {
  thinking: SiteContent['thinking']
  blog: SiteContent['blog']
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
```

- [ ] **Step 4: Create `src/sections/ThoughtsBlogSection.module.css`**

```css
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 120px 0 0;
}

.columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.column {
  display: grid;
  gap: 18px;
}

.columnTitle {
  margin: 0;
  font-size: 1.2rem;
}

.cardList {
  display: grid;
  gap: 18px;
}

.card {
  padding: 22px;
}

.tag {
  color: var(--accent-primary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.cardTitle {
  margin: 12px 0 10px;
  font-size: 1.15rem;
}

.cardSummary {
  margin: 0;
  color: var(--text-secondary);
}

@media (max-width: 720px) {
  .columns {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Update `src/App.tsx` to include both sections**

```tsx
import styles from './App.module.css'
import { siteContent } from './data/siteContent'
import { AboutSection } from './sections/AboutSection'
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
      </main>
    </div>
  )
}

export default App
```

- [ ] **Step 6: Run build to verify grids compile**

Run: `npm run build`
Expected: build succeeds and all content sections render

- [ ] **Step 7: Run dev server and verify cards reveal upward in viewport**

Run: `npm run dev -- --host 127.0.0.1 --port 4173`
Expected: project cards and blog/thinking columns slide upward on entry

- [ ] **Step 8: Commit content grids**

```bash
git add src/sections/SkillsSection.tsx src/sections/SkillsSection.module.css src/sections/ThoughtsBlogSection.tsx src/sections/ThoughtsBlogSection.module.css src/App.tsx
git commit -m "feat: add skills and thought sections"
```

## Task 7: Implement footer and polish global page rhythm

**Files:**
- Create: `src/sections/FooterSection.tsx`
- Create: `src/sections/FooterSection.module.css`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Modify: `src/App.module.css`

- [ ] **Step 1: Create `src/sections/FooterSection.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `src/sections/FooterSection.module.css`**

```css
.footer {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 120px 0 80px;
}

.panel {
  padding: 32px;
  display: grid;
  gap: 20px;
}

.quote {
  margin: 0;
  font-size: clamp(1.4rem, 2vw, 2rem);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.link {
  color: var(--text-secondary);
}

.link:hover {
  color: var(--text-primary);
}
```

- [ ] **Step 3: Update `src/App.tsx` to include footer**

```tsx
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
```

- [ ] **Step 4: Add reusable section spacing and selection polish in `src/index.css`**

```css
::selection {
  background: rgba(83, 166, 255, 0.28);
  color: #ffffff;
}

img {
  max-width: 100%;
  display: block;
}
```

- [ ] **Step 5: Add main column spacing in `src/App.module.css`**

```css
.main {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0;
}
```

- [ ] **Step 6: Run build to verify final structure**

Run: `npm run build`
Expected: build succeeds and includes all sections

- [ ] **Step 7: Run dev server and verify final scroll rhythm**

Run: `npm run dev -- --host 127.0.0.1 --port 4173`
Expected: footer appears with the same upward reveal behavior and the page reads smoothly top-to-bottom

- [ ] **Step 8: Commit footer and page polish**

```bash
git add src/sections/FooterSection.tsx src/sections/FooterSection.module.css src/App.tsx src/index.css src/App.module.css
git commit -m "feat: finalize personal blog homepage"
```

## Task 8: Verify UI behavior and adjust content polish

**Files:**
- Modify as needed: `src/data/siteContent.ts`
- Modify as needed: `src/sections/*.module.css`

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: build succeeds and outputs optimized assets

- [ ] **Step 2: Run preview server**

Run: `npm run preview -- --host 127.0.0.1 --port 4173`
Expected: preview server starts successfully

- [ ] **Step 3: Manually verify the following in browser**

```txt
1. Hero content is readable at first load.
2. About section enters viewport with an upward reveal.
3. Journey timeline cards reveal upward one by one during scroll.
4. Highlighted milestones visually stand out.
5. Skills/project cards reveal upward and hover cleanly.
6. Thinking and blog columns remain readable on narrow widths.
7. Footer quote lands as a clean closing section.
```

- [ ] **Step 4: If hero feels too static, add load-in motion directly in `HeroSection.tsx`**

```tsx
// Optional refinement inside HeroSection:
// wrap eyebrow/title/subtitle/actions in separate elements and animate them with gsap.timeline()
// only add this if the section needs stronger first-screen motion after browser verification
```

- [ ] **Step 5: If any section spacing feels cramped, adjust exact CSS values where observed**

```css
/* Example values to tweak if needed: */
.section {
  padding-top: 136px;
}

.card {
  padding: 26px;
}
```

- [ ] **Step 6: Commit final visual refinements**

```bash
git add src/data/siteContent.ts src/sections/*.module.css src/sections/HeroSection.tsx
git commit -m "style: polish homepage motion and spacing"
```

## Self-Review Notes

- Spec coverage: hero/about/journey/skills/thinking-blog/footer, deep color system, React stack, GSAP reveal-up animation, responsive behavior, and content placeholders are all covered by tasks 1-8.
- Added the user’s latest requirement explicitly: sections/cards should slide upward when entering the viewport, implemented via `useRevealUp` and verified in Tasks 4-8.
- Placeholder scan: no TBD/TODO placeholders remain in implementation steps; the only optional refinement is clearly marked optional after manual verification.
- Type consistency: `SiteContent`, `JourneyItem`, `ProjectItem`, and section prop signatures are defined before use.
