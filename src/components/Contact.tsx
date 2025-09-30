import { memo, useState } from 'react'
import type { PortfolioData } from '../types'
import { QUICK_FACT_ICONS } from '../constants'

interface ContactProps {
  portfolioData: PortfolioData
}

export const Contact = memo(({ portfolioData }: ContactProps) => {
  const [showPhone, setShowPhone] = useState(false)

  return (
    <section id="contact" className="container-responsive py-24 slide-in-right relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '1s' }} 
        />
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
          {/* Email Card */}
          <a href={`mailto:${portfolioData.contactEmail}`} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
            <div className="relative premium-card rounded-2xl p-8 text-center h-full flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                  ✉️
                </div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Email
                </h3>
                <p className="text-xs text-[var(--text-dark)] break-all mb-2">
                  {portfolioData.contactEmail}
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] group-hover:gap-3 transition-all">
                <span>Send Message</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a 
            href={portfolioData.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
            <div className="relative premium-card rounded-2xl p-8 text-center h-full flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                  💼
                </div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  LinkedIn
                </h3>
                <p className="text-xs text-[var(--text-dark)] mb-2">Let's connect professionally</p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] group-hover:gap-3 transition-all">
                <span>View Profile</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </a>

          {/* Phone/Social Card */}
          {portfolioData.contactPhone ? (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
              <div className="relative premium-card rounded-2xl p-8 text-center h-full flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                    📱
                  </div>
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Phone
                  </h3>
                  {!showPhone && <p className="text-xs text-[var(--text-dark)] mb-2">Tap to reveal number</p>}
                </div>
                
                {showPhone && (
                  <div className="animate-fade-in-up">
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 mb-3 border border-green-500/20">
                      <a 
                        href={`tel:${portfolioData.contactPhone}`}
                        className="text-lg font-bold text-[var(--accent)] hover:text-green-400 transition-colors font-mono block"
                      >
                        {portfolioData.contactPhone}
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
              <div className="relative premium-card rounded-2xl p-8 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                    🌐
                  </div>
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Social
                  </h3>
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
            { icon: QUICK_FACT_ICONS.LOCATION, text: portfolioData.quickFacts[0] },
            { icon: QUICK_FACT_ICONS.AVAILABILITY, text: portfolioData.quickFacts[1] },
            { icon: QUICK_FACT_ICONS.FOCUS, text: portfolioData.quickFacts[2] }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="premium-card p-5 rounded-xl text-center group hover:scale-105 transition-transform"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
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
  )
})
