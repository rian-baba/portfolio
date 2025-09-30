import { useState, useEffect } from 'react'
import { getAccount } from '../appwrite/services'

const adminUserId = (import.meta as any).env.VITE_APPWRITE_ADMIN_USER_ID as string | undefined

export const useAdmin = () => {
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const acc = await getAccount()
        if (acc && adminUserId && acc.$id === adminUserId) {
          setAdmin(true)
        } else {
          setAdmin(false)
        }
      } catch {
        setAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    checkAdmin()
  }, [])

  return { admin, loading, setAdmin }
}
