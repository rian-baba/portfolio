export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

export const site = {
  title: 'Aapka Naam — Portfolio', // Apna naam yahan likhein
  role: 'Full‑Stack Developer', // Apna role/title
  heroTitle: 'Build clean, efficient, and scalable web products.', // Apna hero title
  heroSubtitle:
    'I craft production‑ready UIs, robust APIs, and reliable data layers. Explore my selected work below.', // Apna description
  contactEmail: 'aapka@email.com', // Apna email
  linkedinUrl: 'https://www.linkedin.com/in/aapka-profile', // Apna LinkedIn
  quickFacts: ['Location: Apka City', 'Availability: Open to offers', 'Focus: Full‑stack / React / Node'], // Apni details
}

export const skills: string[] = [
  'React',
  'TypeScript', 
  'Node.js',
  'Express',
  'Next.js',
  'PostgreSQL',
  'MongoDB',
  'Prisma',
  'TailwindCSS',
  'Docker',
  'AWS',
  // Apne skills add karein yahan
]

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Apka Project 1', // Apne project ka naam
    description:
      'Apne project ka description yahan likhein. Kya banaya, kya technologies use ki.', // Apne project ka description
    tags: ['React', 'Node.js', 'MongoDB'], // Apne project ki technologies
    githubUrl: 'https://github.com/aapka-username/project1', // GitHub link
    liveUrl: 'https://project1.com', // Live website link
  },
  {
    id: 'proj-2', 
    title: 'Apka Project 2', // Dusre project ka naam
    description: 'Dusre project ka description yahan likhein.', // Dusre project ka description
    tags: ['Next.js', 'TypeScript', 'TailwindCSS'], // Technologies
    githubUrl: 'https://github.com/aapka-username/project2', // GitHub link
    liveUrl: 'https://project2.com', // Live website link
  },
  // Aur projects add kar sakte hain yahan
]

export const admin = {
  pin: '2580',
}


