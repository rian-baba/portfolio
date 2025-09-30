import { memo } from 'react'
import type { Internship } from '../types'
import { createInternship } from '../appwrite/services'

interface WorkExperienceProps {
  internships: Internship[]
  admin: boolean
  onEdit: (internship: Internship) => void
  onDelete: (internshipId: string) => void
  onAdd: (internship: Internship) => void
  onEditInfo: () => void
}

export const WorkExperience = memo(({ 
  internships, 
  admin, 
  onEdit, 
  onDelete,
  onAdd,
  onEditInfo 
}: WorkExperienceProps) => {
  if (!admin && internships.length === 0) {
    return null
  }

  const handleAddClick = async () => {
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
    onAdd(newItem)
    
    // Create in Appwrite
    try {
      await createInternship(newItem)
    } catch (err) {
      console.error('Failed to create internship in Appwrite:', err)
    }
  }

  return (
    <section id="work-experience" className="container-responsive py-24 slide-in">
      <div className="flex flex-col gap-4">
        <h2 className="section-title text-3xl font-bold text-center">Work Experience</h2>
        
        {admin && (
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <button className="btn-ghost" onClick={onEditInfo}>
              Edit Info
            </button>
            <button className="btn-primary text-lg px-6 py-3 font-bold" onClick={handleAddClick}>
              ➕ Add Work Experience
            </button>
          </div>
        )}
      </div>
      
      {internships.length > 0 ? (
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {internships.map((item, index) => (
            <article 
              key={item.id} 
              className={`premium-card rounded-2xl overflow-hidden ${
                index < 6 ? `animate-fade-in-up-delayed-${index + 1}` : 'animate-fade-in-up'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-[var(--accent)]">
                    {item.role} · {item.company}
                  </h3>
                  <span className="text-sm text-[var(--text-dark)]">
                    {item.startDate} — {item.endDate || 'Present'}
                  </span>
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
                    {item.tags!.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                )}
                <div className="mt-5 flex gap-3">
                  {item.link && (
                    <a className="btn-ghost text-sm" href={item.link} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  )}
                  {admin && (
                    <>
                      <button onClick={() => onEdit(item)} className="btn-ghost text-sm">
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Delete experience "${item.company}"?`)) {
                            onDelete(item.id)
                          }
                        }} 
                        className="btn-ghost text-sm"
                      >
                        Delete
                      </button>
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
          <button 
            className="btn-ghost" 
            onClick={() => {
              const json = JSON.stringify(internships, null, 2)
              navigator.clipboard.writeText(json)
              alert('Work Experience JSON copied.')
            }}
          >
            Copy Experience JSON
          </button>
          <button 
            className="btn-ghost text-red-600 hover:text-red-700" 
            onClick={() => {
              if (window.confirm(`Delete all ${internships.length} experiences?`)) {
                internships.forEach(i => onDelete(i.id))
              }
            }}
          >
            Delete All Experiences
          </button>
        </div>
      )}
    </section>
  )
})
