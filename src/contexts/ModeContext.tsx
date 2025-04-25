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

  // Update resolved mode when mode changes
  useEffect(() => {
    if (mode === 'system') {
      setResolvedMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } else {
      setResolvedMode(mode)
    }
  }, [mode])

  // Save mode preference to database
  const setMode = async (newMode: Mode) => {
    setModeState(newMode)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase
        .from('profiles')
        .update({ mode_preference: newMode })
        .eq('id', user.id)
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