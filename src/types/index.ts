export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

export interface Internship {
  id: string
  company: string
  role: string
  location?: string
  startDate: string
  endDate?: string
  description: string
  tags?: string[]
  link?: string
}

export interface Service {
  id: string
  icon: string
  title: string
  desc: string
}

export interface SiteConfig {
  title: string
  role: string
  heroTitle: string
  heroSubtitle: string
  contactEmail: string
  linkedinUrl: string
  quickFacts: string[]
  contactPhone?: string
}

export interface PortfolioData extends SiteConfig {
  contactPhone?: string
}
