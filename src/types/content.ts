export type HeroLink = {
  label: string
  href: string
}

export type ProfileFact = {
  label: string
  value: string
  href?: string
  icon?: string
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
  icon?: string
}

export type ProjectItem = {
  title: string
  summary: string
  stack: string[]
  highlight: string
}

export type ArticleCard = {
  id?: string
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
    metrics: { label: string; value: string; icon?: string }[]
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
