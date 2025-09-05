import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, MapPin, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: {
    id: string;
    user: {
      name: string;
      avatar?: string;
    };
    location: string;
    images: string[];
    caption: string;
    likes: number;
    comments: number;
    timestamp: string;
    isLiked?: boolean;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-soft border-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">{post.user.name}</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {post.location}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Images */}
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={post.images[currentImageIndex]}
            alt={`${post.location} - ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image indicators */}
        {post.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {post.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentImageIndex === index 
                    ? "bg-white" 
                    : "bg-white/50"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={cn(
                "h-8 w-8 hover:bg-primary/10",
                isLiked && "text-red-500"
              )}
            >
              <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-2">
          좋아요 {post.likes + (isLiked && !post.isLiked ? 1 : 0)}개
        </p>

        {/* Caption */}
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-semibold mr-2">{post.user.name}</span>
            {post.caption}
          </p>
        </div>

        {/* Comments */}
        {post.comments > 0 && (
          <button className="text-sm text-muted-foreground mt-2 hover:text-foreground">
            댓글 {post.comments}개 모두 보기
          </button>
        )}

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground mt-2">{post.timestamp}</p>
      </div>
    </Card>
  );
};