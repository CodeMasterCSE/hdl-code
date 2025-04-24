import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from './useAuth';
import { ProblemCompletion } from '@/types/dashboard';

export interface ProblemStats {
  easy: number;
  medium: number;
  hard: number;
  total: number;
}

// Map of problem IDs to their difficulties
const SAMPLE_DIFFICULTIES: Record<string, string> = {
  // Logic Gates
  'p004': 'easy', // AND Gate
  'p005': 'easy', // OR Gate
  'p006': 'easy', // NOT Gate
  'p007': 'easy', // NAND Gate
  'p008': 'easy', // NOR Gate
  
  // Flip-Flops
  'ff001': 'medium', // SR Flip-Flop
  'ff002': 'medium', // D Flip-Flop
  'ff003': 'medium', // JK Flip-Flop
  'ff004': 'medium', // T Flip-Flop
  
  // Sequential Circuits
  'seq001': 'hard', // 4-bit Binary Counter
  'seq002': 'hard', // Modulo-10 Counter
  'seq003': 'hard', // 4-bit Shift Register
  'seq004': 'hard', // 4-bit Parallel Load Register
  'seq005': 'hard', // Sequence Detector
  'seq006': 'hard'  // Traffic Light Controller
};

export const useProblemStats = (user: User | null) => {
  const [stats, setStats] = useState<ProblemStats>({
    easy: 0,
    medium: 0,
    hard: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [completedProblemIds, setCompletedProblemIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
    if (!user) {
        setStats({ easy: 0, medium: 0, hard: 0, total: 0 });
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
          easy: 0,
          medium: 0,
          hard: 0,
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
