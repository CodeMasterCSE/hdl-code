import { supabase } from '@/integrations/supabase/client'

export async function addModePreferenceColumn() {
  const { error } = await supabase.rpc('add_mode_preference_column')
  
  if (error) {
    console.error('Error adding mode_preference column:', error)
    throw error
  }
  
  return { success: true }
} 