import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Heart, MessageCircle, User } from "lucide-react";
import { CreatePostModal } from "./CreatePostModal";

export const Header = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Moment Place
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="장소나 태그 검색..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCreateModalOpen(true)}
              className="hover:bg-primary/10"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <CreatePostModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen} 
      />
    </>
  );
};