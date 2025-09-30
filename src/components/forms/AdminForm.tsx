import { memo, useState } from 'react'
import type { PortfolioData } from '../../types'

interface AdminFormProps {
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
  portfolioData: PortfolioData
  portfolioSkills: string[]
  aboutText: string
}

export const AdminForm = memo(({ 
  isOpen, 
  onClose, 
  onSave,
  portfolioData,
  portfolioSkills,
  aboutText
}: AdminFormProps) => {
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
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})
