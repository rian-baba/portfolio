export const ANIMATION_DELAYS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

export const STORAGE_KEYS = {
  PORTFOLIO_DATA: 'portfolioData',
  SKILLS: 'portfolioSkills',
  ABOUT_TEXT: 'aboutText',
  PROJECTS: 'projects',
  INTERNSHIPS: 'internships',
  SERVICES: 'services',
} as const

export const DEFAULT_ABOUT_TEXT = 
  'I am a developer focused on building fast, accessible, and maintainable web apps. I enjoy designing APIs, optimizing databases, and shipping pixel-perfect UIs.'

export const DEFAULT_SERVICES = [
  { id: 's-1', icon: '💻', title: 'Web Development', desc: 'Custom websites with modern stacks.' },
  { id: 's-2', icon: '📱', title: 'Mobile Apps', desc: 'iOS/Android with RN/Flutter.' },
  { id: 's-3', icon: '🎨', title: 'UI/UX Design', desc: 'User-centered, beautiful interfaces.' },
  { id: 's-4', icon: '📝', title: 'CV Writing', desc: 'Stand-out resumes and profiles.' },
  { id: 's-5', icon: '✉️', title: 'Cover Letters', desc: 'Tailored, compelling letters.' },
  { id: 's-6', icon: '🚀', title: 'SEO Optimization', desc: 'Better visibility and ranking.' },
] as const

export const QUICK_FACT_ICONS = {
  LOCATION: '📍',
  AVAILABILITY: '⚡',
  FOCUS: '🎯',
} as const
