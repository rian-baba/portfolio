import { memo } from 'react'
import type { Project } from '../types'

interface ProjectsProps {
  projects: Project[]
  admin: boolean
  onEdit: (project: Project) => void
  onDelete: (projectId: string) => void
  onAdd: () => void
  onEditInfo: () => void
}

export const Projects = memo(({ 
  projects, 
  admin, 
  onEdit, 
  onDelete, 
  onAdd,
  onEditInfo 
}: ProjectsProps) => {
  return (
    <section id="projects" className="container-responsive py-24 slide-in">
      <div className="flex items-end justify-between gap-4">
        <h2 className="section-title text-3xl font-bold text-center w-full">Projects</h2>
        {admin && (
          <div className="hidden sm:flex gap-2">
            <button className="btn-primary" onClick={onEditInfo}>
              Edit Info
            </button>
            <button className="btn-ghost" onClick={onAdd}>
              Add Project
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, index) => (
          <article 
            key={p.id} 
            className={`premium-card rounded-2xl overflow-hidden ${
              index < 6 ? `animate-fade-in-up-delayed-${index + 1}` : 'animate-fade-in-up'
            }`}
          >
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
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                {p.githubUrl && (
                  <a className="btn-ghost text-sm" href={p.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                {p.liveUrl && (
                  <a className="btn-ghost text-sm" href={p.liveUrl} target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
                {admin && (
                  <>
                    <button onClick={() => onEdit(p)} className="btn-ghost text-sm">
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm(`Delete project "${p.title}"?`)) {
                          onDelete(p.id)
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
      
      {admin && (
        <div className="mt-8 flex gap-3">
          <button 
            className="btn-ghost" 
            onClick={() => {
              const json = JSON.stringify(projects, null, 2)
              navigator.clipboard.writeText(json)
              alert('Projects JSON copied.')
            }}
          >
            Copy Projects JSON
          </button>
          <button 
            className="btn-ghost text-red-600 hover:text-red-700" 
            onClick={() => {
              if (window.confirm(`Delete all ${projects.length} projects?`)) {
                projects.forEach(p => onDelete(p.id))
              }
            }}
          >
            Delete All Projects
          </button>
        </div>
      )}
    </section>
  )
})
