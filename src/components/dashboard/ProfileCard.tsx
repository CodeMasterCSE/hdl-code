
import { User } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileCardProps {
  user: User;
  problemStats: {
    total: number;
    beginner: number;
    intermediate: number;
    advanced: number;
  };
}

export const ProfileCard = ({ user, problemStats }: ProfileCardProps) => {
  const getInitials = (name: string) => {
    return name
      ? name
          .split(' ')
          .map(part => part[0])
          .join('')
          .toUpperCase()
      : user.email?.substring(0, 2).toUpperCase() || 'U';
  };

  const fullName = user.user_metadata?.full_name || '';
  const email = user.email || '';

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your account details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="" alt={fullName} />
            <AvatarFallback className="text-lg bg-blue-100 text-blue-700">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-xl font-semibold">{fullName || 'HDL User'}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="text-center">
              <p className="text-2xl font-bold">{problemStats.total}</p>
              <p className="text-xs text-muted-foreground">Solved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {problemStats.beginner * 10 + 
                 problemStats.intermediate * 20 + 
                 problemStats.advanced * 30}
              </p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {problemStats.total >= 10 ? "Expert" : 
                 problemStats.total >= 5 ? "Pro" : 
                 problemStats.total >= 1 ? "Beginner" : "-"}
              </p>
              <p className="text-xs text-muted-foreground">Rank</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
