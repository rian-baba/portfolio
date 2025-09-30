import { useEffect, useState } from 'react'
import { createInternship, deleteInternship, getAccount, getPortfolio, listInternships, listProjects, savePortfolio, signIn, signOut, updateInternship, updateProject } from './appwrite/services.ts'
import { initialInternships, initialProjects, site, skills, type Internship, type Project } from './content'

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

// Internship Form Component
function InternshipForm({
  internship,
  isOpen,
  onClose,
  onSave,
}: {
  internship: Internship | null
  isOpen: boolean
  onClose: () => void
  onSave: (data: Internship) => void
}) {
  const [formData, setFormData] = useState<Internship>({
    id: '',
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    tags: [],
    link: '',
  })

  useEffect(() => {
    if (internship) setFormData(internship)
  }, [internship])

  if (!isOpen || !internship) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">Edit Internship</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Update internship information</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="int-company" className="block text-sm font-medium mb-1">Company</label>
              <input id="int-company" type="text" value={formData.company} onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" required />
            </div>
            <div>
              <label htmlFor="int-role" className="block text-sm font-medium mb-1">Role</label>
              <input id="int-role" type="text" value={formData.role} onChange={(e) => setFormData(p => ({ ...p, role: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" required />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="int-location" className="block text-sm font-medium mb-1">Location</label>
              <input id="int-location" type="text" value={formData.location || ''} onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="int-start" className="block text-sm font-medium mb-1">Start</label>
                <input id="int-start" type="text" placeholder="Jun 2025" value={formData.startDate} onChange={(e) => setFormData(p => ({ ...p, startDate: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" required />
              </div>
              <div>
                <label htmlFor="int-end" className="block text-sm font-medium mb-1">End</label>
                <input id="int-end" type="text" placeholder="Sep 2025 or Present" value={formData.endDate || ''} onChange={(e) => setFormData(p => ({ ...p, endDate: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="int-desc" className="block text-sm font-medium mb-1">Description</label>
            <textarea id="int-desc" rows={4} placeholder="Har sentence alag point ban jayega." value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" required />
          </div>
          <div>
            <label htmlFor="int-tags" className="block text-sm font-medium mb-1">Tags (comma separated)</label>
            <input id="int-tags" type="text" value={(formData.tags || []).join(', ')} onChange={(e) => setFormData(p => ({ ...p, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" placeholder="React, TypeScript" />
          </div>
          <div>
            <label htmlFor="int-link" className="block text-sm font-medium mb-1">Link</label>
            <input id="int-link" type="url" value={formData.link || ''} onChange={(e) => setFormData(p => ({ ...p, link: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800" placeholder="https://company.com" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary">Save Internship</button>
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function App() {
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

  // Internships (Experience)
  const [internships, setInternships] = useState<Internship[]>(() => {
    const local = localStorage.getItem('internships')
    return local ? (JSON.parse(local) as Internship[]) : initialInternships
  })
  const [showInternshipEdit, setShowInternshipEdit] = useState(false)
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null)

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

  // Profile picture position state
  const [profileTransform, setProfileTransform] = useState(() => {
    const saved = localStorage.getItem('profileTransform')
    return saved || 'scale(1) translate(0px, 0px)'
  })
  const [profileObjectFit, setProfileObjectFit] = useState<'contain' | 'cover'>(() => {
    const saved = localStorage.getItem('profileObjectFit')
    return (saved as 'contain' | 'cover') || 'contain'
  })

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
      try {
        const remoteInternships = await listInternships()
        if (remoteInternships && remoteInternships.length) {
          const mapped: Internship[] = remoteInternships.map((d: any) => ({
            id: d.$id,
            company: d.company,
            role: d.role,
            location: d.location,
            startDate: d.startDate,
            endDate: d.endDate,
            description: d.description,
            tags: d.tags || [],
            link: d.link,
          }))
          setInternships(mapped)
          localStorage.setItem('internships', JSON.stringify(mapped))
        }
      } catch {}
    })()
  }, [])

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('internships', JSON.stringify(internships))
  }, [internships])

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

  // Load profile picture position on mount and when admin changes
  useEffect(() => {
    const savedTransform = localStorage.getItem('profileTransform')
    const savedObjectFit = localStorage.getItem('profileObjectFit')
    
    if (savedTransform) {
      setProfileTransform(savedTransform)
    }
    if (savedObjectFit) {
      setProfileObjectFit(savedObjectFit as 'contain' | 'cover')
    }
  }, [admin])

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

  const handleInternshipEdit = (internship: Internship) => {
    setEditingInternship(internship)
    setShowInternshipEdit(true)
  }

  const handleInternshipSave = (updated: Internship) => {
    setInternships(prev => prev.map(i => i.id === updated.id ? updated : i))
    setShowInternshipEdit(false)
    setEditingInternship(null)
    // persist to Appwrite
    updateInternship(updated).catch(() => {})
  }

  const handleInternshipDelete = (internshipId: string) => {
    setInternships(prev => prev.filter(i => i.id !== internshipId))
    // delete from Appwrite
    deleteInternship(internshipId).catch(() => {})
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
            {internships.length > 0 && <li><a href="#work-experience" className="hover:text-[var(--accent)]">Experience</a></li>}
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
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
          {/* Round Profile Picture */}
          <div className="flex-shrink-0">
            <div className="relative group">
              {/* Animated gradient ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 animate-pulse" />
              
              {/* Profile image container */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl bg-slate-100">
                <img 
                  src="/src/assets/image.jpeg"
                  alt="Profile" 
                  className={`w-full h-full object-${profileObjectFit} transition-transform duration-300 ${admin ? 'cursor-move' : ''}`}
                  loading="lazy"
                  draggable={false}
                  style={{ transform: profileTransform }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x400/6366f1/ffffff?text=Profile'
                  }}
                  onMouseDown={(e) => {
                    if (!admin) return
                    e.preventDefault()
                    const img = e.currentTarget
                    const startX = e.clientX
                    const startY = e.clientY
                    
                    const transform = img.style.transform
                    const translateMatch = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/)
                    const currentX = translateMatch ? parseFloat(translateMatch[1]) : 0
                    const currentY = translateMatch ? parseFloat(translateMatch[2]) : 0
                    
                    const onMouseMove = (moveEvent: MouseEvent) => {
                      const deltaX = moveEvent.clientX - startX
                      const deltaY = moveEvent.clientY - startY
                      const newX = currentX + deltaX
                      const newY = currentY + deltaY
                      
                      const scaleMatch = transform.match(/scale\(([\d.]+)\)/)
                      const scale = scaleMatch ? scaleMatch[1] : '1'
                      
                      img.style.transform = `scale(${scale}) translate(${newX}px, ${newY}px)`
                    }
                    
                    const onMouseUp = () => {
                      document.removeEventListener('mousemove', onMouseMove)
                      document.removeEventListener('mouseup', onMouseUp)
                      // Update state with current transform
                      setProfileTransform(img.style.transform)
                    }
                    
                    document.addEventListener('mousemove', onMouseMove)
                    document.addEventListener('mouseup', onMouseUp)
                  }}
                />
              </div>
              
              {/* Admin: Zoom Controls */}
              {admin && (
                <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
                  <button
                    onClick={(e) => {
                      const img = e.currentTarget.parentElement?.parentElement?.querySelector('img')
                      if (img) {
                        const currentScale = parseFloat(img.style.transform.match(/scale\(([\d.]+)\)/)?.[1] || '1')
                        const translateMatch = img.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/)
                        const translateX = translateMatch ? translateMatch[1] : '0'
                        const translateY = translateMatch ? translateMatch[2] : '0'
                        const newTransform = `scale(${Math.min(currentScale + 0.1, 2)}) translate(${translateX}px, ${translateY}px)`
                        img.style.transform = newTransform
                        setProfileTransform(newTransform)
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full shadow-lg transition-all flex items-center justify-center text-lg font-bold"
                    title="Zoom In"
                  >
                    +
                  </button>
                  <button
                    onClick={(e) => {
                      const img = e.currentTarget.parentElement?.parentElement?.querySelector('img')
                      if (img) {
                        const currentScale = parseFloat(img.style.transform.match(/scale\(([\d.]+)\)/)?.[1] || '1')
                        const translateMatch = img.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/)
                        const translateX = translateMatch ? translateMatch[1] : '0'
                        const translateY = translateMatch ? translateMatch[2] : '0'
                        const newTransform = `scale(${Math.max(currentScale - 0.1, 0.5)}) translate(${translateX}px, ${translateY}px)`
                        img.style.transform = newTransform
                        setProfileTransform(newTransform)
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full shadow-lg transition-all flex items-center justify-center text-lg font-bold"
                    title="Zoom Out"
                  >
                    −
                  </button>
                  <button
                    onClick={(e) => {
                      const img = e.currentTarget.parentElement?.parentElement?.querySelector('img')
                      if (img) {
                        const newFit = profileObjectFit === 'contain' ? 'cover' : 'contain'
                        setProfileObjectFit(newFit)
                      }
                    }}
                    className="bg-purple-500 hover:bg-purple-600 text-white w-8 h-8 rounded-full shadow-lg transition-all flex items-center justify-center text-xs"
                    title="Toggle Crop/Fit"
                  >
                    ✂️
                  </button>
                  <button
                    onClick={(e) => {
                      const img = e.currentTarget.parentElement?.parentElement?.querySelector('img')
                      if (img) {
                        const resetTransform = 'scale(1) translate(0px, 0px)'
                        img.style.transform = resetTransform
                        setProfileTransform(resetTransform)
                        setProfileObjectFit('contain')
                      }
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white w-8 h-8 rounded-full shadow-lg transition-all flex items-center justify-center text-xs"
                    title="Reset"
                  >
                    ↺
                  </button>
                  <button
                    onClick={() => {
                      localStorage.setItem('profileTransform', profileTransform)
                      localStorage.setItem('profileObjectFit', profileObjectFit)
                      alert('✅ Picture position saved!')
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full shadow-lg transition-all flex items-center justify-center text-xs font-bold"
                    title="Save Position"
                  >
                    💾
                  </button>
                </div>
              )}
              
              {/* Decorative floating elements */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse" />
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
          
          {/* About Text */}
          <div className="text-[var(--text-dark)] text-lg leading-relaxed max-w-2xl text-center md:text-left">
            <p>{aboutText}</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container-responsive py-24 slide-in-right">
        <h2 className="section-title text-3xl font-bold text-center">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {portfolioSkills.map((skill, idx) => (
            <div key={skill} className={`premium-card rounded-xl text-center p-6 ${idx < 6 ? `animate-fade-in-up-delayed-${idx+1}` : 'animate-fade-in-up'}`}>
              <h3 className="text-[var(--text-light)] font-semibold">{skill}</h3>
              </div>
            ))}
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="work-experience" className="container-responsive py-24 slide-in">
        {/* Show section if: admin mode OR has internships */}
        {(admin || internships.length > 0) ? (
          <>
            <div className="flex flex-col gap-4">
              <h2 className="section-title text-3xl font-bold text-center">Work Experience</h2>
              
              {admin && (
                <>
                  <div className="text-center text-sm text-green-500 mb-2">
                    🔧 Admin Mode Active (admin={String(admin)}, internships={internships.length})
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center items-center bg-blue-500/10 p-4 rounded-lg border-2 border-blue-500">
                    <button className="btn-ghost" onClick={() => setShowAdminForm(true)}>Edit Info</button>
                    <button
                      className="btn-primary text-lg px-6 py-3 font-bold"
                      onClick={async () => {
                        console.log('Add Work Experience clicked!')
                        const newItem: Internship = {
                          id: `int-${Date.now()}`,
                          company: 'Company',
                          role: 'Intern',
                          location: 'Remote',
                          startDate: 'Month Year',
                          endDate: 'Present',
                          description: 'Yahan details likhein.',
                          tags: [],
                          link: '',
                        }
                        setInternships(prev => [newItem, ...prev])
                        setEditingInternship(newItem)
                        setShowInternshipEdit(true)
                        // Create in Appwrite
                        try {
                          await createInternship(newItem)
                        } catch (err) {
                          console.error('Failed to create internship in Appwrite:', err)
                        }
                      }}
                    >
                      ➕ Add Work Experience
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {internships.length > 0 ? (
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {internships.map((item, index) => (
                  <article key={item.id} className={`premium-card rounded-2xl overflow-hidden ${index < 6 ? `animate-fade-in-up-delayed-${index+1}` : 'animate-fade-in-up'}`}>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[var(--accent)]">{item.role} · {item.company}</h3>
                        <span className="text-sm text-[var(--text-dark)]">{item.startDate} — {item.endDate || 'Present'}</span>
                      </div>
                      <div className="mt-1 text-sm text-[var(--text-dark)]">{item.location}</div>
                      <div className="mt-3 text-[var(--text-dark)] text-sm">
                        {item.description.split('.').filter(Boolean).map((sentence, i) => (
                          <div key={i} className="flex items-start gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full mt-2" />
                            <span>{sentence.trim()}</span>
                          </div>
                        ))}
                      </div>
                      {!!(item.tags && item.tags.length) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags!.map((t) => (<span key={t} className="tag">{t}</span>))}
                        </div>
                      )}
                      <div className="mt-5 flex gap-3">
                        {item.link && (<a className="btn-ghost text-sm" href={item.link} target="_blank" rel="noreferrer">Link</a>)}
                        {admin && (
                          <>
                            <button onClick={() => handleInternshipEdit(item)} className="btn-ghost text-sm">Edit</button>
                            <button onClick={() => { if (window.confirm(`Delete experience "${item.company}"?`)) handleInternshipDelete(item.id) }} className="btn-ghost text-sm">Delete</button>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              admin && (
                <div className="mt-12 text-center text-[var(--text-dark)]">
                  <p>No work experience added yet. Click "Add Work Experience" to get started.</p>
                </div>
              )
            )}
            
            {admin && internships.length > 0 && (
              <div className="mt-8 flex gap-3 justify-center">
                <button className="btn-ghost" onClick={() => { const json = JSON.stringify(internships, null, 2); navigator.clipboard.writeText(json); alert('Work Experience JSON copied.'); }}>Copy Experience JSON</button>
                <button className="btn-ghost text-red-600 hover:text-red-700" onClick={() => { if (window.confirm(`Delete all ${internships.length} experiences?`)) setInternships([]) }}>Delete All Experiences</button>
              </div>
            )}
          </>
        ) : null}
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
      <section id="contact" className="container-responsive py-24 slide-in-right relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header with Gradient */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-6xl animate-bounce inline-block">👋</span>
            </div>
            <h2 className="section-title text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-[var(--text-dark)] text-lg max-w-2xl mx-auto">
              Got an exciting project or opportunity? I'm always open to discussing new ideas and collaborations.
            </p>
          </div>
          
          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Email Card - Gradient Border */}
            <a 
              href={`mailto:${portfolioData.contactEmail}`}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative premium-card rounded-2xl p-8 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                    ✉️
                  </div>
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Email</h3>
                  <p className="text-xs text-[var(--text-dark)] break-all mb-2">{portfolioData.contactEmail}</p>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] group-hover:gap-3 transition-all">
                  <span>Send Message</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>

            {/* LinkedIn Card - Gradient Border */}
            <a 
              href={portfolioData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative premium-card rounded-2xl p-8 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                    💼
                  </div>
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">LinkedIn</h3>
                  <p className="text-xs text-[var(--text-dark)] mb-2">Let's connect professionally</p>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] group-hover:gap-3 transition-all">
                  <span>View Profile</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>

            {/* Phone/Social Card - Gradient Border */}
            {(portfolioData as any).contactPhone ? (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative premium-card rounded-2xl p-8 text-center h-full flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                      📱
                    </div>
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Phone</h3>
                    {!showPhone && <p className="text-xs text-[var(--text-dark)] mb-2">Tap to reveal number</p>}
                  </div>
                  
                  {/* Phone Number - Slides in from right */}
                  {showPhone && (
                    <div className="animate-fade-in-up">
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 mb-3 border border-green-500/20">
                        <a 
                          href={`tel:${(portfolioData as any).contactPhone}`}
                          className="text-lg font-bold text-[var(--accent)] hover:text-green-400 transition-colors font-mono block"
                        >
                          {(portfolioData as any).contactPhone}
                        </a>
                      </div>
                      <button 
                        onClick={() => setShowPhone(false)}
                        className="text-xs text-[var(--text-dark)] hover:text-red-400 underline transition-colors"
                      >
                        ✕ Hide Number
                      </button>
                    </div>
                  )}
                  
                  {!showPhone && (
                    <button 
                      onClick={() => setShowPhone(true)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all"
                    >
                      <span>Show Number</span>
                      <span className="transition-transform">→</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative premium-card rounded-2xl p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                      🌐
                    </div>
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Social</h3>
                    <p className="text-xs text-[var(--text-dark)] mb-2">Follow my journey</p>
                  </div>
                  <div className="mt-4 text-sm font-semibold text-[var(--text-dark)]">Coming Soon</div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Facts with Icons */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '📍', text: portfolioData.quickFacts[0] },
              { icon: '⚡', text: portfolioData.quickFacts[1] },
              { icon: '🎯', text: portfolioData.quickFacts[2] }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="premium-card p-5 rounded-xl text-center group hover:scale-105 transition-transform"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                <p className="text-sm font-medium text-[var(--text-dark)]">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Response Time Badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <span className="text-2xl animate-pulse">⚡</span>
              <span className="text-sm font-medium text-[var(--text-dark)]">
                Usually responds within 24 hours
              </span>
            </div>
          </div>
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
      <InternshipForm
        internship={editingInternship}
        isOpen={showInternshipEdit}
        onClose={() => { setShowInternshipEdit(false); setEditingInternship(null) }}
        onSave={handleInternshipSave}
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
