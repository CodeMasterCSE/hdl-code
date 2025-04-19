
export interface ProblemCompletion {
  id: string;
  user_id: string;
  problem_id: string;
  completed_at?: string;
  solution?: string;
  created_at?: string;
  difficulty?: string;
  problems?: {
    id: string;
    title: string;
    difficulty?: string;
    [key: string]: any;
  };
}
