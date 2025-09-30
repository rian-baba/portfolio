// Appwrite services (frontend SDK) - TypeScript
// Production note: Do NOT embed API keys in frontend. Writes require an authenticated session.

import type { Models } from 'appwrite'
import { Account, Client, Databases, ID, Query } from 'appwrite'

type PortfolioDoc = {
  title?: string
  role?: string
  heroTitle?: string
  heroSubtitle?: string
  contactEmail?: string
  linkedinUrl?: string
  quickFacts?: string[]
  contactPhone?: string
  skills?: string[]
  aboutText?: string
}

export type ProjectDoc = {
  id?: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

const endpoint = (import.meta as any).env.VITE_APPWRITE_ENDPOINT as string
const projectId = (import.meta as any).env.VITE_APPWRITE_PROJECT_ID as string
const databaseId = (import.meta as any).env.VITE_APPWRITE_DATABASE_ID as string
const collectionPortfolio = (import.meta as any).env.VITE_APPWRITE_COLLECTION_PORTFOLIO as string
const collectionProjects = (import.meta as any).env.VITE_APPWRITE_COLLECTION_PROJECTS as string
const adminUserId = (import.meta as any).env.VITE_APPWRITE_ADMIN_USER_ID as string | undefined

const client = new Client().setEndpoint(endpoint).setProject(projectId)
const databases = new Databases(client)
const account = new Account(client)

// Auth
export async function signIn(email: string, password: string): Promise<void> {
  // Appwrite v14: createEmailPasswordSession
  // Fallback to createSession for typings if needed
  const anyAccount = account as any
  if (typeof anyAccount.createEmailPasswordSession === 'function') {
    await anyAccount.createEmailPasswordSession(email, password)
  } else {
    await (anyAccount.createSession as (email: string, password: string) => Promise<void>)(email, password)
  }
  // enforce single-admin policy
  const me = await account.get()
  if (adminUserId && me.$id !== adminUserId) {
    await account.deleteSession('current')
    throw new Error('Unauthorized admin user')
  }
}

export async function signOut(): Promise<void> {
  try {
    await account.deleteSession('current')
  } catch {}
}

export async function getAccount(): Promise<Models.User<Models.Preferences> | null> {
  try {
    return await account.get()
  } catch {
    return null
  }
}

async function assertAdmin(): Promise<void> {
  const me = await getAccount()
  if (!me) throw new Error('Unauthorized: Only admin can perform this action.')
  if (!adminUserId) throw new Error('Admin user id not configured.')
  if (me.$id !== adminUserId) throw new Error('Unauthorized: Only admin can perform this action.')
}

// Portfolio (singleton document: id = 'singleton')
export async function getPortfolio(): Promise<PortfolioDoc & Models.Document | null> {
  try {
    const doc = await databases.getDocument(databaseId, collectionPortfolio, 'singleton')
    return doc as unknown as PortfolioDoc & Models.Document
  } catch {
    try {
      const list = await databases.listDocuments(databaseId, collectionPortfolio, [Query.limit(1)])
      return (list.documents[0] as unknown as PortfolioDoc & Models.Document) || null
    } catch {
      return null
    }
  }
}

export async function savePortfolio(payload: PortfolioDoc): Promise<Models.Document> {
  await assertAdmin()
  try {
    return await databases.updateDocument(databaseId, collectionPortfolio, 'singleton', payload)
  } catch {
    return await databases.createDocument(databaseId, collectionPortfolio, 'singleton', payload)
  }
}

// Projects CRUD
export async function listProjects(): Promise<(ProjectDoc & Models.Document)[]> {
  const list = await databases.listDocuments(databaseId, collectionProjects, [
    Query.orderDesc('$createdAt'),
    Query.limit(100),
  ])
  return list.documents as unknown as (ProjectDoc & Models.Document)[]
}

export async function createProject(project: ProjectDoc): Promise<Models.Document> {
  await assertAdmin()
  return await databases.createDocument(
    databaseId,
    collectionProjects,
    project.id || ID.unique(),
    project
  )
}

export async function updateProject(project: ProjectDoc & { id: string }): Promise<Models.Document> {
  await assertAdmin()
  return await databases.updateDocument(databaseId, collectionProjects, project.id, project)
}

export async function deleteProject(projectId: string): Promise<void> {
  await assertAdmin()
  await databases.deleteDocument(databaseId, collectionProjects, projectId)
}


