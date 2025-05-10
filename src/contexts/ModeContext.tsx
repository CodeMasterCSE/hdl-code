import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

type Mode = 'light' | 'dark' | 'system'

interface ModeContextType {
  mode: Mode
  setMode: (mode: Mode) => void
  resolvedMode: 'light' | 'dark'
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>('system')
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light')

  // Load saved mode preference
  useEffect(() => {
    const loadMode = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('mode_preference')
            .eq('id', user.id)
            .single()
          
          if (profile?.mode_preference) {
            setModeState(profile.mode_preference)
          }
        }
      } catch (error) {
        console.error('Error loading mode preference:', error)
      }
    }
    loadMode()
  }, [])

  // Handle system mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (mode === 'system') {
        setResolvedMode(mediaQuery.matches ? 'dark' : 'light')
      }
    }

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mode])

  const setMode = async (newMode: Mode) => {
    try {
      setModeState(newMode)
      if (newMode === 'system') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setResolvedMode(mediaQuery.matches ? 'dark' : 'light')
      } else {
        setResolvedMode(newMode)
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase
          .from('profiles')
          .upsert({ id: user.id, mode_preference: newMode })
      }
    } catch (error) {
      console.error('Error setting mode:', error)
    }
  }

  return (
    <ModeContext.Provider value={{ mode, setMode, resolvedMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider')
  }
  return context
} 