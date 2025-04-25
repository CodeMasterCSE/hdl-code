import { User } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Edit, Check, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface ProfileCardProps {
  user: User;
  problemStats: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.user_metadata?.username || '');
  const email = user.email || '';

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

  const handleSave = async () => {
    try {
      // Update username in user metadata
      const { error } = await supabase.auth.updateUser({
        data: { username }
      });

      if (error) throw error;

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setUsername(user.user_metadata?.username || '');
    setIsEditing(false);
  };

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
            <Avatar className="h-24 w-24 ring-4 ring-blue-500/20">
              <AvatarImage src="" alt={fullName} />
              <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white dark:from-blue-400 dark:to-blue-500">
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
          
          <div className="text-center space-y-4 w-full">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={email}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                </div>
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{fullName || 'HDL User'}</h3>
                <p className="text-sm text-muted-foreground">@{username}</p>
                <p className="text-sm text-muted-foreground">{email}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Username
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
