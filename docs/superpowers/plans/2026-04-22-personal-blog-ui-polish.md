# Personal Blog UI Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the existing personal blog homepage to feel more like a personal blog first by switching to a white-led theme, enriching the hero/profile area, and adding a dedicated internship timeline.

**Architecture:** Keep the current single-page React structure and reuse the existing sections/components where possible. Extend the content model with profile metadata and internship items, update the hero to a blended blog/profile layout, add a new internship timeline section, and adjust global/module CSS from dark tech styling to a light, clean personal-blog aesthetic while preserving the GSAP reveal-up behavior.

**Tech Stack:** React, TypeScript, Vite, CSS Modules, GSAP, ScrollTrigger

---

## File Structure

- Modify: `src/types/content.ts` — add profile and internship data types
- Modify: `src/data/siteContent.ts` — add avatar path, personal info, intro copy, internship timeline items
- Modify: `src/App.tsx` — insert the internship section and adjust section order if needed
- Modify: `src/index.css` — switch global theme variables from dark to light
- Modify: `src/App.module.css` — soften background effects for light theme
- Modify: `src/sections/HeroSection.tsx` — render avatar, self-intro, profile details, blog entry points together
- Modify: `src/sections/HeroSection.module.css` — rebuild hero layout for a white-theme blog/profile first screen
- Modify: `src/sections/AboutSection.module.css` — align card styling with light theme
- Create: `src/sections/InternshipsSection.tsx` — dedicated internship node-line section
- Create: `src/sections/InternshipsSection.module.css` — light-theme internship timeline styles
- Modify: `src/sections/JourneySection.module.css` — restyle existing journey timeline to match light theme
- Modify: `src/sections/SkillsSection.module.css` — restyle tags/cards for light theme
- Modify: `src/sections/ThoughtsBlogSection.module.css` — restyle cards for light theme
- Modify: `src/sections/FooterSection.module.css` — restyle footer card for light theme

## Task 1: Extend content model with profile and internship data

**Files:**
- Modify: `src/types/content.ts`
- Modify: `src/data/siteContent.ts`

- [ ] **Step 1: Update `src/types/content.ts` to add profile and internship types**

```ts
export type HeroLink = {
  label: string
  href: string
}

export type ProfileFact = {
  label: string
  value: string
}

export type InternshipItem = {
  company: string
  team: string
  summary: string
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
    intro: string
    avatarSrc: string
    links: HeroLink[]
    profileFacts: ProfileFact[]
    metrics: { label: string; value: string }[]
  }
  about: {
    title: string
    body: string
  }
  internships: InternshipItem[]
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

- [ ] **Step 2: Update `src/data/siteContent.ts` with exact profile and internship content**

```ts
import type { SiteContent } from '../types/content'

export const siteContent: SiteContent = {
  hero: {
    eyebrow: 'Personal Blog / Frontend Developer',
    title: '你好，我是赵捷。',
    subtitle: '这里是我的个人博客，也是我记录成长、技术和实习经历的地方。',
    intro:
      '目前就读于东华理工大学，正在持续深耕前端开发。我希望把学习、项目、实习和阶段性的思考，慢慢沉淀成真正属于自己的作品。',
    avatarSrc: '/Users/bytedance/Downloads/20260409-140303.jpg',
    links: [
      { label: '查看博客', href: '#thoughts-blog' },
      { label: '查看经历', href: '#internships' },
    ],
    profileFacts: [
      { label: '生日', value: '2005.11.03' },
      { label: '大学', value: '东华理工大学' },
      { label: '邮箱', value: '3382865253@qq.com' },
      { label: '方向', value: '前端开发' },
    ],
    metrics: [
      { label: '当前阶段', value: '大三学生' },
      { label: '学习起点', value: '2025-02-11' },
      { label: '博客定位', value: '成长 / 技术 / 实习记录' },
    ],
  },
  about: {
    title: '关于我',
    body:
      '我不是一路顺利地走到前端这条路上的。也正因为经历过方向摇摆、专业受阻和现实压力，我更想把自己的路径认真记录下来。这个页面对我来说不只是展示页，也是一个长期更新的个人博客入口。',
  },
  internships: [
    {
      company: '华顺信安',
      team: '第一段实习',
      summary: '这是我第一次真正进入职场的起点。我开始理解团队协作、业务目标和工程实践，也是在这里，我对前端路线第一次有了更坚定的认知。',
    },
    {
      company: '字节跳动国际化广告与技术',
      team: '第二段实习',
      summary: '进入更复杂的业务和工程环境后，我开始从更高的要求重新理解前端能力边界，也对协作、质量和技术深度有了更强意识。',
    },
    {
      company: 'TikTok Shop',
      team: '第三段实习',
      summary: '在更成熟的业务体系里继续积累，让我进一步理解产品、工程和落地之间的联系，也让我对未来的前端方向更明确。',
    },
  ],
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
      year: '后续',
      title: '从成长到沉淀',
      description:
        '随着学习和实习不断推进，我开始把经历慢慢整理成自己的博客内容，也更希望用作品记录变化。',
      highlight: true,
    },
  ],
  skillTags: [
    { label: 'React' },
    { label: 'TypeScript' },
    { label: 'JavaScript' },
    { label: 'GSAP' },
    { label: 'Node.js' },
    { label: '组件化开发' },
    { label: '前端工程化' },
  ],
  projects: [
    {
      title: '成长叙事型个人主页',
      summary: '一个强调个人介绍、实习经历、成长路径与博客沉淀的个人主页。',
      stack: ['React', 'TypeScript', 'GSAP'],
      highlight: '用博客首页的方式承接个人表达与技术记录。',
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
      summary: '从实习阶段里看到协作、业务与工程实践的真实样子。',
      tag: '实习',
    },
  ],
  footer: {
    quote: '把成长变成记录，把记录继续变成作品。',
    contacts: [
      { label: 'Email', href: 'mailto:3382865253@qq.com' },
      { label: '大学邮箱联系', href: 'mailto:3382865253@qq.com' },
    ],
  },
}
```

- [ ] **Step 3: Run build to verify the content model still compiles**

Run: `npm run build`
Expected: build succeeds and type updates are accepted

- [ ] **Step 4: Commit content updates**

```bash
git add src/types/content.ts src/data/siteContent.ts
git commit -m "feat: add profile and internship content"
```

## Task 2: Rebuild the hero into a profile-first personal blog header

**Files:**
- Modify: `src/sections/HeroSection.tsx`
- Modify: `src/sections/HeroSection.module.css`

- [ ] **Step 1: Replace `src/sections/HeroSection.tsx` with the richer hero structure**

```tsx
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { GlowPanel } from '../components/GlowPanel'
import type { SiteContent } from '../types/content'
import styles from './HeroSection.module.css'

type HeroSectionProps = {
  hero: SiteContent['hero']
}

export function HeroSection({ hero }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const eyebrowRef = useRef<HTMLSpanElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)
  const introRef = useRef<HTMLParagraphElement | null>(null)
  const actionsRef = useRef<HTMLDivElement | null>(null)
  const avatarRef = useRef<HTMLDivElement | null>(null)
  const profileRef = useRef<HTMLDivElement | null>(null)
  const metricRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .fromTo(eyebrowRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.55 })
        .fromTo(titleRef.current, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.25')
        .fromTo(subtitleRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.4')
        .fromTo(introRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.35')
        .fromTo(
          actionsRef.current?.children ?? [],
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
          '-=0.3',
        )
        .fromTo(avatarRef.current, { autoAlpha: 0, y: 24, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.65 }, '-=0.45')
        .fromTo(profileRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.45')
        .fromTo(metricRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.45')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.copy}>
        <span className={styles.eyebrow} ref={eyebrowRef}>
          {hero.eyebrow}
        </span>
        <h1 className={styles.title} ref={titleRef}>
          {hero.title}
        </h1>
        <p className={styles.subtitle} ref={subtitleRef}>
          {hero.subtitle}
        </p>
        <p className={styles.intro} ref={introRef}>
          {hero.intro}
        </p>
        <div className={styles.actions} ref={actionsRef}>
          {hero.links.map((link, index) => (
            <a
              key={link.href}
              className={index === 0 ? styles.linkPrimary : styles.linkSecondary}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.avatarWrap} ref={avatarRef}>
          <img className={styles.avatar} src={hero.avatarSrc} alt="赵捷头像" />
        </div>

        <GlowPanel className={styles.profilePanel}>
          <div className={styles.profileGrid} ref={profileRef}>
            {hero.profileFacts.map((fact) => (
              <div key={fact.label} className={styles.factItem}>
                <span className={styles.factLabel}>{fact.label}</span>
                <strong className={styles.factValue}>{fact.value}</strong>
              </div>
            ))}
          </div>
        </GlowPanel>

        <GlowPanel className={styles.metricPanel}>
          <div className={styles.metrics} ref={metricRef}>
            {hero.metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <strong className={styles.metricValue}>{metric.value}</strong>
              </div>
            ))}
          </div>
        </GlowPanel>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace `src/sections/HeroSection.module.css` with a white-theme layout**

```css
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 48px;
  align-items: center;
  padding: 80px 0 48px;
}

.copy {
  display: grid;
  gap: 18px;
}

.sidebar {
  display: grid;
  gap: 18px;
}

.eyebrow,
.title,
.subtitle,
.intro,
.actions,
.avatarWrap,
.profilePanel,
.metricPanel {
  opacity: 0;
}

.eyebrow {
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.76rem;
}

.title {
  margin: 0;
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 0.98;
  color: #121826;
}

.subtitle {
  margin: 0;
  max-width: 640px;
  font-size: 1.16rem;
  color: #475467;
}

.intro {
  margin: 0;
  max-width: 640px;
  color: #667085;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 10px;
}

.linkPrimary,
.linkSecondary {
  padding: 13px 22px;
  border-radius: 999px;
  border: 1px solid #d0d5dd;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.linkPrimary {
  background: linear-gradient(135deg, #2f6df6, #4f8cff);
  color: #ffffff;
  box-shadow: 0 14px 24px rgba(47, 109, 246, 0.18);
}

.linkSecondary {
  background: #ffffff;
  color: #1d2939;
}

.linkPrimary:hover,
.linkSecondary:hover {
  transform: translateY(-2px);
}

.avatarWrap {
  width: 168px;
  height: 168px;
  margin: 0 auto;
  border-radius: 50%;
  padding: 6px;
  background: linear-gradient(135deg, rgba(47, 109, 246, 0.22), rgba(79, 140, 255, 0.08));
  box-shadow: 0 18px 40px rgba(47, 109, 246, 0.12);
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.profilePanel,
.metricPanel {
  padding: 22px;
}

.profileGrid,
.metrics {
  display: grid;
  gap: 14px;
}

.factItem,
.metric {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e4e7ec;
}

.factLabel,
.metricLabel {
  font-size: 0.82rem;
  color: #667085;
}

.factValue,
.metricValue {
  color: #101828;
}

@media (max-width: 900px) {
  .section {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 110px;
  }

  .sidebar {
    order: -1;
  }

  .avatarWrap {
    margin-left: 0;
  }
}
```

- [ ] **Step 3: Run build to verify the new hero compiles**

Run: `npm run build`
Expected: build succeeds and the hero compiles with the new fields

- [ ] **Step 4: Commit hero rebuild**

```bash
git add src/sections/HeroSection.tsx src/sections/HeroSection.module.css

git commit -m "feat: rebuild hero as personal blog header"
```

## Task 3: Add a dedicated internship timeline section

**Files:**
- Create: `src/sections/InternshipsSection.tsx`
- Create: `src/sections/InternshipsSection.module.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/sections/InternshipsSection.tsx`**

```tsx
import { GlowPanel } from '../components/GlowPanel'
import { SectionTitle } from '../components/SectionTitle'
import { useRevealUp } from '../hooks/useRevealUp'
import type { InternshipItem, SiteContent } from '../types/content'
import styles from './InternshipsSection.module.css'

type InternshipsSectionProps = {
  items: SiteContent['internships']
}

type InternshipRowProps = {
  item: InternshipItem
  isLast: boolean
  delay: number
}

function InternshipRow({ item, isLast, delay }: InternshipRowProps) {
  const itemRef = useRevealUp<HTMLDivElement>({ y: 44, delay, start: 'top 88%' })

  return (
    <div className={styles.row} ref={itemRef}>
      <div className={styles.markerWrap}>
        <span className={styles.marker} />
        {!isLast ? <span className={styles.line} /> : null}
      </div>
      <GlowPanel className={styles.card}>
        <span className={styles.team}>{item.team}</span>
        <h3 className={styles.company}>{item.company}</h3>
        <p className={styles.summary}>{item.summary}</p>
      </GlowPanel>
    </div>
  )
}

export function InternshipsSection({ items }: InternshipsSectionProps) {
  const titleRef = useRevealUp<HTMLDivElement>({ y: 32 })

  return (
    <section className={styles.section} id="internships">
      <div ref={titleRef}>
        <SectionTitle
          eyebrow="Internships"
          title="实习经历"
          description="把每一段实习都看作一个节点，它们共同塑造了我对前端工作的理解。"
        />
      </div>
      <div className={styles.timeline}>
        {items.map((item, index) => (
          <InternshipRow
            key={item.company}
            item={item}
            isLast={index === items.length - 1}
            delay={index * 0.05}
          />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/sections/InternshipsSection.module.css`**

```css
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 110px 0 0;
}

.timeline {
  display: grid;
  gap: 24px;
  margin-top: 36px;
}

.row {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 20px;
}

.markerWrap {
  position: relative;
  display: flex;
  justify-content: center;
}

.marker {
  width: 14px;
  height: 14px;
  margin-top: 26px;
  border-radius: 50%;
  background: #2f6df6;
  box-shadow: 0 0 0 6px rgba(47, 109, 246, 0.08);
  z-index: 1;
}

.line {
  position: absolute;
  top: 40px;
  bottom: -24px;
  width: 2px;
  background: linear-gradient(180deg, rgba(47, 109, 246, 0.35), rgba(47, 109, 246, 0.06));
}

.card {
  padding: 24px;
}

.team {
  color: #2f6df6;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.company {
  margin: 10px 0 10px;
  font-size: 1.32rem;
  color: #101828;
}

.summary {
  margin: 0;
  color: #667085;
}

@media (max-width: 720px) {
  .row {
    grid-template-columns: 28px 1fr;
    gap: 14px;
  }
}
```

- [ ] **Step 3: Update `src/App.tsx` to render internships before journey**

```tsx
import styles from './App.module.css'
import { siteContent } from './data/siteContent'
import { AboutSection } from './sections/AboutSection'
import { FooterSection } from './sections/FooterSection'
import { HeroSection } from './sections/HeroSection'
import { InternshipsSection } from './sections/InternshipsSection'
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
        <SkillsSection tags={siteContent.skillTags} projects={siteContent.projects} />
        <InternshipsSection items={siteContent.internships} />
        <JourneySection items={siteContent.journey} />
        <ThoughtsBlogSection thinking={siteContent.thinking} blog={siteContent.blog} />
        <FooterSection footer={siteContent.footer} />
      </main>
    </div>
  )
}

export default App
```

- [ ] **Step 4: Run build to verify the internship section compiles**

Run: `npm run build`
Expected: build succeeds and the new section renders in the app tree

- [ ] **Step 5: Commit internship timeline**

```bash
git add src/sections/InternshipsSection.tsx src/sections/InternshipsSection.module.css src/App.tsx

git commit -m "feat: add internship timeline section"
```

## Task 4: Convert the global theme from dark tech to light personal-blog styling

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.module.css`
- Modify: `src/components/GlowPanel.module.css`
- Modify: `src/components/SectionTitle.module.css`
- Modify: `src/sections/AboutSection.module.css`
- Modify: `src/sections/JourneySection.module.css`
- Modify: `src/sections/SkillsSection.module.css`
- Modify: `src/sections/ThoughtsBlogSection.module.css`
- Modify: `src/sections/FooterSection.module.css`

- [ ] **Step 1: Replace `src/index.css` theme variables with a light palette**

```css
:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #101828;
  background: #f8fafc;
  line-height: 1.5;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --bg-primary: #f8fafc;
  --bg-secondary: rgba(255, 255, 255, 0.9);
  --panel-border: #e4e7ec;
  --text-primary: #101828;
  --text-secondary: #667085;
  --accent-primary: #2f6df6;
  --accent-secondary: #7aa2ff;
  --accent-glow: rgba(47, 109, 246, 0.18);
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
    radial-gradient(circle at top, rgba(47, 109, 246, 0.08), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

img {
  max-width: 100%;
  display: block;
}

::selection {
  background: rgba(47, 109, 246, 0.18);
  color: #101828;
}
```

- [ ] **Step 2: Replace `src/App.module.css` background styling for the light theme**

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
  background-image: radial-gradient(rgba(15, 23, 42, 0.03) 0.5px, transparent 0.5px);
  background-size: 12px 12px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.25), transparent 85%);
}

.glowA,
.glowB {
  position: fixed;
  border-radius: 999px;
  filter: blur(90px);
  pointer-events: none;
  opacity: 0.34;
}

.glowA {
  width: 320px;
  height: 320px;
  top: 60px;
  left: -100px;
  background: rgba(47, 109, 246, 0.12);
}

.glowB {
  width: 280px;
  height: 280px;
  top: 420px;
  right: -60px;
  background: rgba(122, 162, 255, 0.12);
}

.main {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0;
}
```

- [ ] **Step 3: Replace `src/components/GlowPanel.module.css` with light card styles**

```css
.panel {
  position: relative;
  border: 1px solid var(--panel-border);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.96));
  box-shadow: 0 18px 40px rgba(16, 24, 40, 0.06);
  backdrop-filter: blur(12px);
  overflow: hidden;
}

.panel::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(47, 109, 246, 0.05), transparent 42%, transparent 60%, rgba(122, 162, 255, 0.05));
  pointer-events: none;
}

.panel > * {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 4: Replace `src/components/SectionTitle.module.css` with darker text on light backgrounds**

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
  color: #101828;
}

.description {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
}
```

- [ ] **Step 5: Replace section module CSS files with light-theme card styles**

```css
/* src/sections/AboutSection.module.css */
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 32px 0 0;
}

.panel {
  padding: 32px;
}
```

```css
/* src/sections/JourneySection.module.css */
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 110px 0 0;
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
  background: rgba(47, 109, 246, 0.22);
  border: 1px solid rgba(47, 109, 246, 0.18);
  z-index: 1;
}

.markerHighlight {
  background: var(--accent-primary);
  box-shadow: 0 0 16px var(--accent-glow);
}

.line {
  position: absolute;
  top: 42px;
  bottom: -24px;
  width: 1px;
  background: linear-gradient(180deg, rgba(47, 109, 246, 0.28), rgba(47, 109, 246, 0.05));
}

.panel,
.panelHighlight {
  padding: 24px;
}

.panelHighlight {
  box-shadow: 0 18px 40px rgba(47, 109, 246, 0.09);
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
  color: #101828;
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

```css
/* src/sections/SkillsSection.module.css */
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 110px 0 0;
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
  color: #1d2939;
  background: #ffffff;
  border: 1px solid #d0d5dd;
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
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 44px rgba(16, 24, 40, 0.08);
}

.cardTitle {
  margin: 0;
  font-size: 1.24rem;
  color: #101828;
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
  background: #f8fafc;
  border: 1px solid #eaecf0;
  font-size: 0.88rem;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

```css
/* src/sections/ThoughtsBlogSection.module.css */
.section {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 110px 0 0;
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
  color: #101828;
}

.cardList {
  display: grid;
  gap: 18px;
}

.card {
  padding: 22px;
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 44px rgba(16, 24, 40, 0.08);
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
  color: #101828;
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

```css
/* src/sections/FooterSection.module.css */
.footer {
  width: min(100% - 32px, var(--container-width));
  margin: 0 auto;
  padding: 110px 0 80px;
}

.panel {
  padding: 32px;
  display: grid;
  gap: 20px;
}

.quote {
  margin: 0;
  font-size: clamp(1.4rem, 2vw, 2rem);
  color: #101828;
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

- [ ] **Step 6: Run build to verify the light theme compiles**

Run: `npm run build`
Expected: build succeeds after the CSS/theme updates

- [ ] **Step 7: Commit the light theme polish**

```bash
git add src/index.css src/App.module.css src/components/GlowPanel.module.css src/components/SectionTitle.module.css src/sections/AboutSection.module.css src/sections/JourneySection.module.css src/sections/SkillsSection.module.css src/sections/ThoughtsBlogSection.module.css src/sections/FooterSection.module.css

git commit -m "style: convert homepage to light theme"
```

## Task 5: Verify the polished UI in the browser and make targeted refinements

**Files:**
- Modify as needed: `src/sections/HeroSection.module.css`
- Modify as needed: `src/sections/InternshipsSection.module.css`
- Modify as needed: `src/index.css`

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: build succeeds and outputs optimized assets

- [ ] **Step 2: Start the dev server for manual verification**

Run: `npm run dev -- --host 127.0.0.1 --port 4173`
Expected: Vite starts without errors

- [ ] **Step 3: Manually verify the following UI requirements in the browser**

```txt
1. The page reads as a personal blog homepage immediately.
2. The hero shows a round avatar, self-introduction, birthday, university, and email.
3. The page uses a white-led visual theme.
4. The internship section appears as a node-line timeline with 3 items.
5. Skills remain visible and readable in the light theme.
6. Existing reveal-up animations still trigger on scroll.
7. Blog/thinking cards still look like blog entry points, not generic cards.
```

- [ ] **Step 4: If hero spacing feels too dense, tighten only the exact CSS selectors below**

```css
.section {
  gap: 40px;
}

.profilePanel,
.metricPanel {
  padding: 20px;
}
```

- [ ] **Step 5: If the internship line feels visually weak, strengthen only these exact styles**

```css
.marker {
  box-shadow: 0 0 0 8px rgba(47, 109, 246, 0.1);
}

.line {
  width: 2px;
}
```

- [ ] **Step 6: Commit final refinements**

```bash
git add src/sections/HeroSection.module.css src/sections/InternshipsSection.module.css src/index.css

git commit -m "style: refine personal blog ui polish"
```

## Self-Review Notes

- Spec coverage: the plan covers the requested UI-only optimization scope — profile-first hero, white theme, avatar, birthday/university/email, technical stack retained, internship node-line timeline added, existing blog structure preserved.
- Placeholder scan: no TODO/TBD markers remain; optional refinement steps name exact selectors and values.
- Type consistency: `profileFacts`, `avatarSrc`, `intro`, and `internships` are defined in the content model before section usage.
