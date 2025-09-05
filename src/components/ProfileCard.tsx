import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Users, Grid, Calendar } from "lucide-react";

interface ProfileCardProps {
  user: {
    name: string;
    bio: string;
    avatar?: string;
    location: string;
    postsCount: number;
    followersCount: number;
    followingCount: number;
    joinDate: string;
  };
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-glow border-0">
      <div className="text-center space-y-4">
        {/* Avatar */}
        <Avatar className="h-24 w-24 mx-auto border-4 border-primary/20">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="text-xl bg-gradient-primary text-white">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground text-sm mt-1">{user.bio}</p>
          <div className="flex items-center justify-center text-muted-foreground text-xs mt-2">
            <MapPin className="h-3 w-3 mr-1" />
            {user.location}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
          <div className="text-center">
            <p className="font-bold text-lg">{user.postsCount}</p>
            <p className="text-xs text-muted-foreground">게시글</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">{user.followersCount}</p>
            <p className="text-xs text-muted-foreground">팔로워</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">{user.followingCount}</p>
            <p className="text-xs text-muted-foreground">팔로잉</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button className="flex-1 bg-gradient-primary hover:opacity-90">
            팔로우
          </Button>
          <Button variant="outline" size="icon">
            <Users className="h-4 w-4" />
          </Button>
        </div>

        {/* Join Date */}
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {user.joinDate}에 가입
        </div>
      </div>
    </Card>
  );
};