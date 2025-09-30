import { memo } from 'react'

interface SkillsProps {
  skills: string[]
}

export const Skills = memo(({ skills }: SkillsProps) => {
  return (
    <section id="skills" className="container-responsive py-24 slide-in-right">
      <h2 className="section-title text-3xl font-bold text-center">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {skills.map((skill, idx) => (
          <div 
            key={skill} 
            className={`premium-card rounded-xl text-center p-6 ${
              idx < 6 ? `animate-fade-in-up-delayed-${idx + 1}` : 'animate-fade-in-up'
            }`}
          >
            <h3 className="text-[var(--text-light)] font-semibold">{skill}</h3>
          </div>
        ))}
      </div>
    </section>
  )
})
