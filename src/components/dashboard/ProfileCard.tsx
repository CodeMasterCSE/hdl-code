import { User } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Edit } from "lucide-react";

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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Profile</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24 ring-4 ring-primary/10">
              <AvatarImage src="" alt={fullName} />
              <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center space-y-1">
            <h3 className="text-xl font-semibold">{fullName || 'HDL User'}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{problemStats.total}</div>
            <p className="text-xs text-muted-foreground">Solved</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {problemStats.beginner * 10 + 
               problemStats.intermediate * 20 + 
               problemStats.advanced * 30}
            </div>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {problemStats.total >= 10 ? "Expert" : 
               problemStats.total >= 5 ? "Pro" : 
               problemStats.total >= 1 ? "Beginner" : "-"}
            </div>
            <p className="text-xs text-muted-foreground">Rank</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
