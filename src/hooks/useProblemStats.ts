
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from './useAuth';
import { ProblemCompletion } from '@/types/dashboard';

export interface ProblemStats {
  beginner: number;
  intermediate: number;
  advanced: number;
  total: number;
}

export const useProblemStats = (user: User | null) => {
  const [stats, setStats] = useState<ProblemStats>({
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const { data: completions, error } = await supabase
          .from('problem_completions')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error("Error fetching problem stats:", error);
          setLoading(false);
          return;
        }

        if (!completions) {
          setLoading(false);
          return;
        }

        // Since we can't directly join with the problem difficulty,
        // we'll count based on the saved difficulty value
        const beginnerCount = completions.filter(comp => 
          comp.difficulty === 'easy' || comp.difficulty === 'Beginner').length;
          
        const intermediateCount = completions.filter(comp => 
          comp.difficulty === 'medium' || comp.difficulty === 'Intermediate').length;
          
        const advancedCount = completions.filter(comp => 
          comp.difficulty === 'hard' || comp.difficulty === 'Advanced').length;
        
        setStats({
          beginner: beginnerCount,
          intermediate: intermediateCount,
          advanced: advancedCount,
          total: completions.length
        });
      } catch (error) {
        console.error("Error fetching problem stats:", error);
      }
      setLoading(false);
    };

    fetchStats();
  }, [user]);

  return { stats, loading };
};
