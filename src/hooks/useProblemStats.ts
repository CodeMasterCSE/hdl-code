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

// Temporary sample difficulties for problems
const SAMPLE_DIFFICULTIES: Record<string, string> = {
  'lg001': 'beginner',
  'lg002': 'beginner',
  'lg003': 'beginner',
  'p001': 'intermediate',
  'p004': 'intermediate',
  'p005': 'intermediate',
  'p006': 'advanced',
  'p007': 'advanced',
  'p009': 'advanced'
};

export const useProblemStats = (user: User | null) => {
  const [stats, setStats] = useState<ProblemStats>({
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [completedProblemIds, setCompletedProblemIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) {
        setStats({ beginner: 0, intermediate: 0, advanced: 0, total: 0 });
        setCompletedProblemIds([]);
        setLoading(false);
        return;
      }

      try {
        const { data: completions, error } = await supabase
          .from('problem_completions')
          .select('problem_id')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching problem completions:', error);
          return;
        }

        const completedIds = completions?.map(c => c.problem_id) || [];
        setCompletedProblemIds(completedIds);

        // Count problems by difficulty
        const difficulties = {
          beginner: 0,
          intermediate: 0,
          advanced: 0,
          total: 0
        };

        completedIds.forEach(id => {
          const difficulty = SAMPLE_DIFFICULTIES[id];
          if (difficulty) {
            difficulties[difficulty]++;
            difficulties.total++;
          }
        });

        setStats(difficulties);
      } catch (error) {
        console.error('Error in useProblemStats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return { stats, loading, completedProblemIds };
};
