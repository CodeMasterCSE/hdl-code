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
  'p001': 'easy', // AND Gate
  'p002': 'easy', // OR Gate
  'p003': 'easy', // NOT Gate
  'p004': 'easy', // NAND Gate
  'p005': 'easy', // NOR Gate
  'p006': 'easy', // XOR Gate
  'p007': 'easy', // XNOR Gate
  'p008': 'medium', // Universal Gate
  
  // Data Selectors
  'p013': 'easy', // 2:1 Multiplexer
  'p014': 'easy', // 4:1 Multiplexer
  'p015': 'easy', // 1:2 Demultiplexer
  'p016': 'easy', // 1:4 Demultiplexer

  // Arithmetic Circuits
  'p011': 'easy', // Half Subtractor
  'p012': 'easy', // Full Subtractor
  'p009': 'easy', // Half Adder
  'p010': 'easy', // Full Adder
  
  // Flip-Flops
  'p017': 'medium', // SR Flip-Flop
  'p018': 'medium', // D Flip-Flop
  'p019': 'medium', // T Flip-Flop
  'p020': 'medium', // JK Flip-Flop
  
  // Counters
  'p021': 'medium', // 1-bit Binary Up Counter
  'p022': 'medium', // 1-bit Binary Down Counter
  'p023': 'medium', // 2-bit Binary Up Counter
  'p024': 'medium', // 2-bit Binary Down Counter
  'p025': 'medium', // 4-bit Binary Up Counter
  'p026': 'medium', // 4-bit Binary Down Counter
  'p027': 'hard', // 4-bit Up-Down Counter
  'p028': 'hard', // BCD Counter
  'p029': 'hard', // 4-bit Ring Counter
  'p030': 'hard', // 4-bit Johnson Counter

  // Registers
  'p031': 'medium', // 4-bit Shift Left Register
  'p032': 'medium', // 4-bit Shift Right Register
  'p033': 'hard', // 4-bit Bidirectional Shift Register
  'p034': 'hard', // PISO Register
  'p035': 'hard', // SIPO Register

  // State Machines
  'p036': 'hard', // Sequence Detector (101)
  'p037': 'hard', // Traffic Light Controller
  'p038': 'hard', // Moore FSM - Even Parity Detector
  'p039': 'hard', // Mealy FSM - Odd Parity Detector
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
