import { memo } from 'react'
import type { PortfolioData } from '../types'

interface HeroProps {
  portfolioData: PortfolioData
}

export const Hero = memo(({ portfolioData }: HeroProps) => {
  return (
    <section id="home" className="min-h-[100vh] flex items-center justify-center px-6 pt-24 pb-16">
      <div className="text-center animate-fade-in-up">
        <h1 className="premium-hero-title text-[clamp(40px,8vw,80px)] font-extrabold">
          {portfolioData.title.split(' — ')[0]}
        </h1>
        <p className="mt-4 text-[var(--text-dark)] text-lg sm:text-xl max-w-2xl mx-auto">
          {portfolioData.heroSubtitle}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#contact" className="btn-ghost border-[var(--accent)] text-[var(--accent)]">
            Get In Touch
          </a>
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
        </div>
      </div>
    </section>
  )
})
