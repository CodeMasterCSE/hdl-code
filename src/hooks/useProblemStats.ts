
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
        const [beginnerData, intermediateData, advancedData, totalData] = await Promise.all([
          supabase
            .from('problem_completions')
            .select('*')
            .eq('user_id', user.id)
            .eq('difficulty', 'Beginner'),
          supabase
            .from('problem_completions')
            .select('*')
            .eq('user_id', user.id)
            .eq('difficulty', 'Intermediate'),
          supabase
            .from('problem_completions')
            .select('*')
            .eq('user_id', user.id)
            .eq('difficulty', 'Advanced'),
          supabase
            .from('problem_completions')
            .select('*')
            .eq('user_id', user.id)
        ]);

        setStats({
          beginner: beginnerData.data?.length || 0,
          intermediate: intermediateData.data?.length || 0,
          advanced: advancedData.data?.length || 0,
          total: totalData.data?.length || 0
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
