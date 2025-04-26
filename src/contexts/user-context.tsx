"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

interface UserContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const refreshSession = async () => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user ?? null)
  }

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    refreshSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  return (
    <UserContext.Provider value={{ user, loading, signOut, refreshSession }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
} 