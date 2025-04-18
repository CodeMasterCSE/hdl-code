
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from './useAuth';

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
        const { data: allCompletions } = await supabase
          .from('problem_completions')
          .select('*, problems:problem_id(difficulty)')
          .eq('user_id', user.id);

        if (!allCompletions) {
          setLoading(false);
          return;
        }

        const beginnerCount = allCompletions.filter(comp => comp.problems?.difficulty === 'Beginner').length || 0;
        const intermediateCount = allCompletions.filter(comp => comp.problems?.difficulty === 'Intermediate').length || 0;
        const advancedCount = allCompletions.filter(comp => comp.problems?.difficulty === 'Advanced').length || 0;
        
        setStats({
          beginner: beginnerCount,
          intermediate: intermediateCount,
          advanced: advancedCount,
          total: allCompletions.length || 0
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
