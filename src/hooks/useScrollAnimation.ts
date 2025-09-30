import { useEffect } from 'react'

export const useScrollAnimation = () => {
  useEffect(() => {
    const nav = document.getElementById('navbar')
    
    const onScroll = () => {
      if (!nav) return
      if (window.scrollY > 100) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
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
}
