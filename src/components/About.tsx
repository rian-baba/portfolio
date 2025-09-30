import { memo } from 'react'
import profileImage from '../assets/image.jpeg'

interface AboutProps {
  aboutText: string
}

export const About = memo(({ aboutText }: AboutProps) => {
  return (
    <section id="about" className="container-responsive py-24 slide-in">
      <h2 className="section-title text-3xl font-bold text-center mb-12">About Me</h2>
      <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
        {/* Round Profile Picture */}
        <div className="flex-shrink-0">
          <div className="relative group">
            {/* Animated gradient ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 animate-pulse" />
            
            {/* Profile image container */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl">
              <img 
                src={profileImage}
                alt="Profile" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  // Fallback if image not found
                  e.currentTarget.src = 'https://via.placeholder.com/400x400/6366f1/ffffff?text=Profile'
                }}
              />
            </div>
            
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
  )
})
