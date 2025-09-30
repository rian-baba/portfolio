import { memo } from 'react'
import type { PortfolioData } from '../types'

interface NavbarProps {
  portfolioData: PortfolioData
  admin: boolean
  internshipsCount: number
  onSignInClick: () => void
  onSignOutClick: () => void
}

export const Navbar = memo(({ 
  portfolioData, 
  admin, 
  internshipsCount,
  onSignInClick, 
  onSignOutClick 
}: NavbarProps) => {
  return (
    <nav id="navbar" className="fixed top-0 w-full z-30 premium-blur-bg transition-all">
      <div className="container-responsive h-16 flex items-center justify-between">
        <a href="#home" className="font-extrabold tracking-tight text-xl sm:text-2xl">
          {portfolioData.title.split(' — ')[0]}
        </a>
        <ul className="hidden sm:flex items-center gap-6 text-sm">
          <li><a href="#home" className="hover:text-[var(--accent)]">Home</a></li>
          <li><a href="#about" className="hover:text-[var(--accent)]">About</a></li>
          <li><a href="#skills" className="hover:text-[var(--accent)]">Skills</a></li>
          {internshipsCount > 0 && (
            <li><a href="#work-experience" className="hover:text-[var(--accent)]">Experience</a></li>
          )}
          <li><a href="#projects" className="hover:text-[var(--accent)]">Projects</a></li>
          <li><a href="#services" className="hover:text-[var(--accent)]">Services</a></li>
          <li><a href="#contact" className="hover:text-[var(--accent)]">Contact</a></li>
        </ul>
        <div className="flex items-center gap-2">
          {!admin ? (
            <button className="btn-ghost" onClick={onSignInClick}>
              Admin Sign In
            </button>
          ) : (
            <button className="btn-ghost" onClick={onSignOutClick}>
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  )
})
