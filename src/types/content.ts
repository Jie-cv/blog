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
