import { useState, useEffect } from 'react'
import { getPortfolio, listProjects, listInternships } from '../appwrite/services'
import { storage } from '../utils/storage'
import { STORAGE_KEYS, DEFAULT_ABOUT_TEXT } from '../constants'
import { site, skills as initialSkills, initialProjects, initialInternships } from '../content'
import type { Project, Internship, PortfolioData } from '../types'

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() =>
    storage.get(STORAGE_KEYS.PORTFOLIO_DATA, site)
  )

  const [portfolioSkills, setPortfolioSkills] = useState<string[]>(() =>
    storage.get(STORAGE_KEYS.SKILLS, initialSkills)
  )

  const [aboutText, setAboutText] = useState(() =>
    storage.get(STORAGE_KEYS.ABOUT_TEXT, DEFAULT_ABOUT_TEXT)
  )

  const [projects, setProjects] = useState<Project[]>(() =>
    storage.get(STORAGE_KEYS.PROJECTS, initialProjects)
  )

  const [internships, setInternships] = useState<Internship[]>(() =>
    storage.get(STORAGE_KEYS.INTERNSHIPS, initialInternships)
  )

  // Hydrate from Appwrite on mount
  useEffect(() => {
    const loadData = async () => {
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
          }
          setPortfolioData(merged)
          storage.set(STORAGE_KEYS.PORTFOLIO_DATA, merged)

          if (Array.isArray(remotePortfolio.skills)) {
            setPortfolioSkills(remotePortfolio.skills)
            storage.set(STORAGE_KEYS.SKILLS, remotePortfolio.skills)
          }

          if (typeof remotePortfolio.aboutText === 'string') {
            setAboutText(remotePortfolio.aboutText)
            storage.set(STORAGE_KEYS.ABOUT_TEXT, remotePortfolio.aboutText)
          }
        }
      } catch (error) {
        console.error('Failed to load portfolio data:', error)
      }

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
          storage.set(STORAGE_KEYS.PROJECTS, mapped)
        }
      } catch (error) {
        console.error('Failed to load projects:', error)
      }

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
          storage.set(STORAGE_KEYS.INTERNSHIPS, mapped)
        }
      } catch (error) {
        console.error('Failed to load internships:', error)
      }
    }

    loadData()
  }, [])

  // Persist to localStorage on changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.PROJECTS, projects)
  }, [projects])

  useEffect(() => {
    storage.set(STORAGE_KEYS.INTERNSHIPS, internships)
  }, [internships])

  return {
    portfolioData,
    setPortfolioData,
    portfolioSkills,
    setPortfolioSkills,
    aboutText,
    setAboutText,
    projects,
    setProjects,
    internships,
    setInternships,
  }
}
