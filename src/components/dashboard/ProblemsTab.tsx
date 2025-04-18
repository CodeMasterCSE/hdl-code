
import { User } from "@/hooks/useAuth";

interface ProblemsTabProps {
  statsLoading: boolean;
  user: User;
}

export const ProblemsTab = ({ statsLoading, user }: ProblemsTabProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">My Problems</h3>
      {statsLoading ? (
        <div className="animate-pulse h-20 bg-muted rounded" />
      ) : (
        <p className="text-muted-foreground">Your solved problems will appear here.</p>
      )}
    </div>
  );
};
