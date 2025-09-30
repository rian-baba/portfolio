import { useEffect, useState } from 'react'
import { getAccount, getPortfolio, listProjects, savePortfolio, signIn, signOut, updateProject } from './appwrite/services.ts'
import { initialProjects, site, skills, type Project } from './content'

// Admin Form Component
function AdminForm({ 
  isOpen, 
  onClose, 
  onSave,
  portfolioData,
  portfolioSkills,
  aboutText
}: { 
  isOpen: boolean
  onClose: () => void
  onSave: (data: {
    name: string
    role: string
    heroTitle: string
    heroSubtitle: string
    email: string
    linkedin: string
    location: string
    availability: string
    focus: string
    skills: string
    aboutText: string
    phone: string
  }) => void
  portfolioData: (typeof site) & { contactPhone?: string }
  portfolioSkills: string[]
  aboutText: string
}) {
  const [formData, setFormData] = useState({
    name: portfolioData.title.split(' — ')[0],
    role: portfolioData.role,
    heroTitle: portfolioData.heroTitle,
    heroSubtitle: portfolioData.heroSubtitle,
    email: portfolioData.contactEmail,
    linkedin: portfolioData.linkedinUrl,
    location: portfolioData.quickFacts[0].replace('Location: ', ''),
    availability: portfolioData.quickFacts[1].replace('Availability: ', ''),
    focus: portfolioData.quickFacts[2].replace('Focus: ', ''),
    skills: portfolioSkills.join(', '),
    aboutText: aboutText,
    phone: portfolioData.contactPhone ?? ''
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">Edit Portfolio Information</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Update your personal information and skills
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-name" className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                id="admin-name"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-role" className="block text-sm font-medium mb-1">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                id="admin-role"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-hero-title" className="block text-sm font-medium mb-1">Hero Title</label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, heroTitle: e.target.value }))}
              id="admin-hero-title"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-hero-desc" className="block text-sm font-medium mb-1">Hero Description</label>
            <textarea
              value={formData.heroSubtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
              rows={3}
              id="admin-hero-desc"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-about" className="block text-sm font-medium mb-1">About Section</label>
            <textarea
              value={formData.aboutText}
              onChange={(e) => setFormData(prev => ({ ...prev, aboutText: e.target.value }))}
              rows={4}
              placeholder="Write about yourself, your experience, and what you do..."
              id="admin-about"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                id="admin-email"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-linkedin" className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                id="admin-linkedin"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-phone" className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="e.g. +92 300 1234567"
                id="admin-phone"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="admin-location" className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                id="admin-location"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-availability" className="block text-sm font-medium mb-1">Availability</label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                id="admin-availability"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-focus" className="block text-sm font-medium mb-1">Focus</label>
              <input
                type="text"
                value={formData.focus}
                onChange={(e) => setFormData(prev => ({ ...prev, focus: e.target.value }))}
                id="admin-focus"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-skills" className="block text-sm font-medium mb-1">Skills (comma separated)</label>
            <textarea
              value={formData.skills}
              onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
              rows={2}
              placeholder="React, TypeScript, Node.js, Express..."
              id="admin-skills"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Project Edit Form Component
function ProjectEditForm({ 
  project, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onSave: (data: Project) => void
}) {
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    description: '',
    tags: [],
    githubUrl: '',
    liveUrl: '',
    imageUrl: ''
  })

  useEffect(() => {
    if (project) {
      setFormData(project)
    }
  }, [project])

  if (!isOpen || !project) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">Edit Project</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Update project information
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="proj-title" className="block text-sm font-medium mb-1">Project Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              id="proj-title"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
          </div>

          <div>
            <label htmlFor="proj-desc" className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              placeholder="Enter project description. Each sentence will be converted to a bullet point automatically."
              id="proj-desc"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Tip: Write each point as a separate sentence. They will be displayed as bullet points.
            </p>
          </div>

          <div>
            <label htmlFor="proj-tags" className="block text-sm font-medium mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
              }))}
              id="proj-tags"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="proj-github" className="block text-sm font-medium mb-1">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                id="proj-github"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label htmlFor="proj-live" className="block text-sm font-medium mb-1">Live URL</label>
              <input
                type="url"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                id="proj-live"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn-primary"
            >
              Save Project
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return { isDark, setIsDark }
}

function App() {
  const { isDark, setIsDark } = useDarkMode()
  const [admin, setAdmin] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const adminUserId = (import.meta as any).env.VITE_APPWRITE_ADMIN_USER_ID as string | undefined
  const [showAdminForm, setShowAdminForm] = useState(false)
  const [showProjectEdit, setShowProjectEdit] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showPhone, setShowPhone] = useState(false)
  
  // Load saved portfolio data from localStorage
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolioData')
    return saved ? JSON.parse(saved) : site
  })
  
  const [portfolioSkills, setPortfolioSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('portfolioSkills')
    return saved ? JSON.parse(saved) : skills
  })
  
  const [aboutText, setAboutText] = useState(() => {
    const saved = localStorage.getItem('aboutText')
    return saved || "I am a developer focused on building fast, accessible, and maintainable web apps. I enjoy designing APIs, optimizing databases, and shipping pixel-perfect UIs."
  })
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const local = localStorage.getItem('projects')
    return local ? (JSON.parse(local) as Project[]) : initialProjects
  })

  // Services editable (localStorage only as requested)
  const [servicesData, setServicesData] = useState<{ icon: string; title: string; desc: string; id: string }[]>(() => {
    const saved = localStorage.getItem('services')
    if (saved) return JSON.parse(saved)
    return [
      { id: 's-1', icon: '💻', title: 'Web Development', desc: 'Custom websites with modern stacks.' },
      { id: 's-2', icon: '📱', title: 'Mobile Apps', desc: 'iOS/Android with RN/Flutter.' },
      { id: 's-3', icon: '🎨', title: 'UI/UX Design', desc: 'User-centered, beautiful interfaces.' },
      { id: 's-4', icon: '📝', title: 'CV Writing', desc: 'Stand-out resumes and profiles.' },
      { id: 's-5', icon: '✉️', title: 'Cover Letters', desc: 'Tailored, compelling letters.' },
      { id: 's-6', icon: '🚀', title: 'SEO Optimization', desc: 'Better visibility and ranking.' },
    ]
  })
  const [showServiceEditor, setShowServiceEditor] = useState(false)
  const [editingService, setEditingService] = useState<{ icon: string; title: string; desc: string; id: string } | null>(null)

  // hydrate from Appwrite on mount
  useEffect(() => {
    (async () => {
      try {
        const remotePortfolio = await getPortfolio()
        if (remotePortfolio) {
          const merged = {
            ...site,
            title: remotePortfolio.title ?? site.title,
            role: remotePortfolio.role ?? site.role,
            heroTitle: remotePortfolio.heroTitle ?? site.heroTitle,
            heroSubtitle: remotePortfolio.heroSubtitle ?? site.heroSubtitle,
            contactEmail: remotePortfolio.contactEmail ?? site.contactEmail,
            linkedinUrl: remotePortfolio.linkedinUrl ?? site.linkedinUrl,
            quickFacts: remotePortfolio.quickFacts ?? site.quickFacts,
            contactPhone: remotePortfolio.contactPhone,
          } as any
          setPortfolioData(merged)
          if (Array.isArray(remotePortfolio.skills)) setPortfolioSkills(remotePortfolio.skills)
          if (typeof remotePortfolio.aboutText === 'string') setAboutText(remotePortfolio.aboutText)
          localStorage.setItem('portfolioData', JSON.stringify(merged))
          if (Array.isArray(remotePortfolio.skills)) localStorage.setItem('portfolioSkills', JSON.stringify(remotePortfolio.skills))
          if (typeof remotePortfolio.aboutText === 'string') localStorage.setItem('aboutText', remotePortfolio.aboutText)
        }
      } catch {}
      try {
        const remoteProjects = await listProjects()
        if (remoteProjects && remoteProjects.length) {
          const mapped: Project[] = remoteProjects.map((d: any) => ({
            id: d.$id,
            title: d.title,
            description: d.description,
            tags: d.tags || [],
            githubUrl: d.githubUrl,
            liveUrl: d.liveUrl,
            imageUrl: d.imageUrl,
          }))
          setProjects(mapped)
          localStorage.setItem('projects', JSON.stringify(mapped))
        }
      } catch {}
    })()
  }, [])

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    (async () => {
      const acc = await getAccount()
      if (acc && adminUserId && acc.$id === adminUserId) setAdmin(true)
      else setAdmin(false)
    })()
  }, [adminUserId])

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(servicesData))
  }, [servicesData])

  // accent gradient not used after premium redesign

  const handleAdminFormSave = (data: {
    name: string
    role: string
    heroTitle: string
    heroSubtitle: string
    email: string
    linkedin: string
    location: string
    availability: string
    focus: string
    skills: string
    aboutText: string
    phone: string
  }) => {
    // Update content.ts with new data
    const updatedContent = {
      ...site,
      title: `${data.name} — Portfolio`,
      role: data.role,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      contactEmail: data.email,
      linkedinUrl: data.linkedin,
      quickFacts: [
        `Location: ${data.location}`,
        `Availability: ${data.availability}`,
        `Focus: ${data.focus}`
      ],
      contactPhone: data.phone
    }
    
    // Save to localStorage and update state
    localStorage.setItem('portfolioData', JSON.stringify(updatedContent))
    localStorage.setItem('portfolioSkills', JSON.stringify(data.skills.split(',').map((s: string) => s.trim())))
    localStorage.setItem('aboutText', data.aboutText)
    
    // Update state to reflect changes immediately
    setPortfolioData(updatedContent)
    setPortfolioSkills(data.skills.split(',').map((s: string) => s.trim()))
    setAboutText(data.aboutText)

    // Save to Appwrite (best-effort)
    savePortfolio({
      ...updatedContent,
      skills: data.skills.split(',').map((s: string) => s.trim()),
      aboutText: data.aboutText,
    }).catch(() => {})
  }

  const handleProjectEdit = (project: Project) => {
    setEditingProject(project)
    setShowProjectEdit(true)
  }

  const handleProjectSave = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p))
    setShowProjectEdit(false)
    setEditingProject(null)
    // persist to Appwrite
    updateProject(updatedProject).catch(() => {})
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(authEmail, authPassword)
      const acc = await getAccount()
      if (acc && adminUserId && acc.$id === adminUserId) setAdmin(true)
      setShowSignIn(false)
      setAuthEmail('')
      setAuthPassword('')
    } catch (err: any) {
      alert(err?.message || 'Sign-in failed')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setAdmin(false)
  }

  // smooth scroll + navbar scrolled + intersection observers
  useEffect(() => {
    const nav = document.getElementById('navbar')
    const onScroll = () => {
      if (!nav) return
      if (window.scrollY > 100) nav.classList.add('scrolled')
      else nav.classList.remove('scrolled')
    }
    window.addEventListener('scroll', onScroll)
    onScroll()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.slide-in, .slide-in-right').forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen premium-gradient-bg">
      {/* Navbar */}
      <nav id="navbar" className="fixed top-0 w-full z-30 premium-blur-bg transition-all">
        <div className="container-responsive h-16 flex items-center justify-between">
          <a href="#home" className="font-extrabold tracking-tight text-xl sm:text-2xl">{portfolioData.title.split(' — ')[0]}</a>
          <ul className="hidden sm:flex items-center gap-6 text-sm">
            <li><a href="#home" className="hover:text-[var(--accent)]">Home</a></li>
            <li><a href="#about" className="hover:text-[var(--accent)]">About</a></li>
            <li><a href="#skills" className="hover:text-[var(--accent)]">Skills</a></li>
            <li><a href="#projects" className="hover:text-[var(--accent)]">Projects</a></li>
            <li><a href="#services" className="hover:text-[var(--accent)]">Services</a></li>
            <li><a href="#contact" className="hover:text-[var(--accent)]">Contact</a></li>
          </ul>
          <div className="flex items-center gap-2">
            {!admin ? (
              <button className="btn-ghost" onClick={() => setShowSignIn(true)}>Admin Sign In</button>
            ) : (
              <button className="btn-ghost" onClick={handleSignOut}>Sign Out</button>
            )}
            <button aria-label="Toggle theme" className="btn-ghost" onClick={() => setIsDark(!isDark)}>
              {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="min-h-[100vh] flex items-center justify-center px-6 pt-24 pb-16">
        <div className="text-center animate-fade-in-up">
          <h1 className="premium-hero-title text-[clamp(40px,8vw,80px)] font-extrabold">{portfolioData.title.split(' — ')[0]}</h1>
          <p className="mt-4 text-[var(--text-dark)] text-lg sm:text-xl max-w-2xl mx-auto">{portfolioData.heroSubtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact" className="btn-ghost border-[var(--accent)] text-[var(--accent)]">Get In Touch</a>
            <a href="#projects" className="btn-primary">View Projects</a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container-responsive py-24 slide-in">
        <h2 className="section-title text-3xl font-bold text-center mb-12">About Me</h2>
        <div className="grid md:grid-cols-1 gap-8 items-center">
          <div className="text-[var(--text-dark)]">
            <p>{aboutText}</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container-responsive py-24 slide-in-right">
        <h2 className="section-title text-3xl font-bold text-center">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
          {portfolioSkills.map((skill, idx) => (
            <div key={skill} className={`premium-card rounded-xl text-center p-6 ${idx < 6 ? `animate-fade-in-up-delayed-${idx+1}` : 'animate-fade-in-up'}`}>
              <h3 className="text-[var(--text-light)] font-semibold">{skill}</h3>
              </div>
            ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container-responsive py-24 slide-in">
        <div className="flex items-end justify-between gap-4">
          <h2 className="section-title text-3xl font-bold text-center w-full">Projects</h2>
          {admin && (
            <div className="hidden sm:flex gap-2">
              <button className="btn-primary" onClick={() => setShowAdminForm(true)}>Edit Info</button>
              <button
                className="btn-ghost"
                onClick={() => {
                  const title = window.prompt('Project title?')?.trim()
                  if (!title) return
                  const description = window.prompt('Short description?')?.trim() || ''
                  const tagsRaw = window.prompt('Tags (comma separated)?')?.trim() || ''
                  const githubUrl = window.prompt('GitHub URL (optional)?')?.trim() || undefined
                  const liveUrl = window.prompt('Live URL (optional)?')?.trim() || undefined
                  const imageUrl = window.prompt('Image URL (optional)?')?.trim() || undefined
                  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : []
                  const newProj: Project = { id: `p-${Date.now()}`, title, description, tags, githubUrl, liveUrl, imageUrl }
                  setProjects((prev) => [newProj, ...prev])
                }}
              >Add Project</button>
            </div>
          )}
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <article key={p.id} className={`premium-card rounded-2xl overflow-hidden ${index < 6 ? `animate-fade-in-up-delayed-${index+1}` : 'animate-fade-in-up'}`}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--accent)]">{p.title}</h3>
                <div className="mt-3 text-[var(--text-dark)] text-sm">
                  {p.description.split('.').filter(Boolean).map((sentence, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1">
                      <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full mt-2" />
                      <span>{sentence.trim()}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (<span key={t} className="tag">{t}</span>))}
                </div>
                <div className="mt-5 flex gap-3">
                  {p.githubUrl && (<a className="btn-ghost text-sm" href={p.githubUrl} target="_blank" rel="noreferrer">GitHub</a>)}
                  {p.liveUrl && (<a className="btn-ghost text-sm" href={p.liveUrl} target="_blank" rel="noreferrer">Live</a>)}
                  {admin && (
                    <>
                      <button onClick={() => handleProjectEdit(p)} className="btn-ghost text-sm">Edit</button>
                      <button onClick={() => { if (window.confirm(`Delete project \"${p.title}\"?`)) setProjects(prev => prev.filter(project => project.id !== p.id)) }} className="btn-ghost text-sm">Delete</button>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        {admin && (
          <div className="mt-8 flex gap-3">
            <button className="btn-ghost" onClick={() => { const json = JSON.stringify(projects, null, 2); navigator.clipboard.writeText(json); alert('Projects JSON copied.'); }}>Copy Projects JSON</button>
            <button className="btn-ghost text-red-600 hover:text-red-700" onClick={() => { if (window.confirm(`Delete all ${projects.length} projects?`)) setProjects([]) }}>Delete All Projects</button>
          </div>
        )}
      </section>

      {/* Services */}
      <section id="services" className="container-responsive py-24 slide-in-right">
        <h2 className="section-title text-3xl font-bold text-center">Services</h2>
        {admin && (
          <div className="mt-6 flex justify-end">
            <button className="btn-ghost" onClick={() => { setEditingService(null); setShowServiceEditor(true) }}>Add Service</button>
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {servicesData.map((s, i) => (
            <div key={s.id} className={`premium-card rounded-2xl text-center p-10 hover:scale-[1.02] transition-transform ${i < 6 ? `animate-fade-in-up-delayed-${i+1}` : 'animate-fade-in-up'}`}>
              <div className="text-4xl mb-3 text-[var(--accent)]">{s.icon}</div>
              <h3 className="text-xl font-semibold text-[var(--gold)]">{s.title}</h3>
              <p className="text-[var(--text-dark)] mt-2">{s.desc}</p>
              {admin && (
                <div className="mt-4 flex gap-2 justify-center">
                  <button className="btn-ghost text-sm" onClick={() => { setEditingService(s); setShowServiceEditor(true) }}>Edit</button>
                  <button className="btn-ghost text-sm text-red-600" onClick={() => setServicesData(prev => prev.filter(x => x.id !== s.id))}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Documents section removed per request */}

      {/* Contact */}
      <section id="contact" className="container-responsive py-24 slide-in-right">
        <h2 className="section-title text-3xl font-bold text-center">Get In Touch</h2>
        <div className="rounded-2xl border border-slate-200/20 p-8 mt-10 bg-white/5">
          <div className="flex flex-wrap gap-3 justify-center">
            <a className="btn-primary" href={`mailto:${portfolioData.contactEmail}`}>Email Me</a>
            <a className="btn-ghost" href={portfolioData.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
            {(portfolioData as any).contactPhone && (
              <button className="btn-ghost" onClick={() => setShowPhone((v) => !v)}>{showPhone ? 'Hide Phone' : 'Show Phone'}</button>
            )}
          </div>
          {showPhone && (portfolioData as any).contactPhone && (
            <div className="mt-6 p-4 rounded-lg border border-slate-200/20 inline-flex items-center gap-3">
              <span className="font-semibold">Phone:</span>
              <a className="text-[var(--accent)]" href={`tel:${(portfolioData as any).contactPhone}`}>
                {(portfolioData as any).contactPhone}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center py-12 premium-blur-bg">
        <p className="text-[var(--text-dark)]">© {new Date().getFullYear()} Rian Riasat. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4 text-2xl">
          <a href="#" className="hover:text-[var(--accent)]">📧</a>
          <a href="#" className="hover:text-[var(--accent)]">💼</a>
          <a href="#" className="hover:text-[var(--accent)]">🐦</a>
          <a href="#" className="hover:text-[var(--accent)]">📷</a>
        </div>
      </footer>

      {admin && (
        <div className="fixed bottom-4 right-4 z-50">
          <span className="tag">Admin Mode</span>
        </div>
      )}

      {/* Modals */}
      <AdminForm
        isOpen={showAdminForm}
        onClose={() => setShowAdminForm(false)}
        onSave={handleAdminFormSave}
        portfolioData={portfolioData}
        portfolioSkills={portfolioSkills}
        aboutText={aboutText}
      />
      <ProjectEditForm
        project={editingProject}
        isOpen={showProjectEdit}
        onClose={() => { setShowProjectEdit(false); setEditingProject(null) }}
        onSave={handleProjectSave}
      />

      {/* Admin Sign-in Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full">
            <form onSubmit={handleSignIn} className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Admin Sign In</h2>
              <div>
                <label htmlFor="adm-email" className="block text-sm font-medium mb-1">Email</label>
                <input id="adm-email" type="email" required value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" />
              </div>
              <div>
                <label htmlFor="adm-pass" className="block text-sm font-medium mb-1">Password</label>
                <input id="adm-pass" type="password" required value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary">Sign In</button>
                <button type="button" className="btn-ghost" onClick={() => setShowSignIn(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Editor Modal */}
      {showServiceEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const icon = (form.elements.namedItem('icon') as HTMLInputElement).value || '✨'
                const title = (form.elements.namedItem('title') as HTMLInputElement).value.trim()
                const desc = (form.elements.namedItem('desc') as HTMLInputElement).value.trim()
                if (!title) return
                if (editingService) {
                  setServicesData(prev => prev.map(s => s.id === editingService.id ? { ...s, icon, title, desc } : s))
                } else {
                  setServicesData(prev => [{ id: `sv-${Date.now()}`, icon, title, desc }, ...prev])
                }
                setShowServiceEditor(false)
                setEditingService(null)
              }}
              className="p-6 space-y-4"
            >
              <h2 className="text-xl font-bold">{editingService ? 'Edit Service' : 'Add Service'}</h2>
              <div>
                <label htmlFor="icon" className="block text-sm font-medium mb-1">Icon (emoji)</label>
                <input id="icon" name="icon" defaultValue={editingService?.icon || ''} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" />
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                <input id="title" name="title" required defaultValue={editingService?.title || ''} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" />
              </div>
              <div>
                <label htmlFor="desc" className="block text-sm font-medium mb-1">Description</label>
                <input id="desc" name="desc" required defaultValue={editingService?.desc || ''} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary">Save</button>
                <button type="button" className="btn-ghost" onClick={() => { setShowServiceEditor(false); setEditingService(null) }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
