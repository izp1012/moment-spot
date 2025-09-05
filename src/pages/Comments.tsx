import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Send, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
}

interface Post {
  id: string;
  content: string;
  location: string | null;
  images: string[];
  user_id: string;
}

const Comments = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPost();
      fetchComments();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: "오류",
        description: "게시글을 불러올 수 없습니다.",
        variant: "destructive",
      });
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            user_id: user.id,
            content: newComment.trim(),
          }
        ]);

      if (error) throw error;

      setNewComment('');
      fetchComments();
      toast({
        title: "댓글 작성 완료",
        description: "댓글이 성공적으로 작성되었습니다.",
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      toast({
        title: "오류",
        description: "댓글 작성에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    return `${Math.floor(diffInSeconds / 86400)}일 전`;
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">댓글</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Original Post */}
        <div className="bg-card rounded-lg border p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">사용자</p>
              {post.location && (
                <p className="text-sm text-muted-foreground">{post.location}</p>
              )}
            </div>
          </div>

          {post.images.length > 0 && (
            <div className="mb-4">
              <img
                src={post.images[0]}
                alt="Post image"
                className="w-full rounded-lg object-cover max-h-96"
              />
            </div>
          )}

          <p className="text-sm leading-relaxed">{post.content}</p>
        </div>

        {/* Comments List */}
        <div className="space-y-4 mb-20">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">첫 번째 댓글을 작성해보세요!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted/50 rounded-lg px-3 py-2">
                    <p className="font-medium text-sm mb-1">사용자</p>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-3">
                    {formatTimeAgo(comment.created_at)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        {user ? (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
            <div className="container mx-auto max-w-2xl">
              <form onSubmit={handleSubmitComment} className="flex space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="댓글을 입력하세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={!newComment.trim() || isSubmitting}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
            <div className="container mx-auto max-w-2xl text-center">
              <p className="text-muted-foreground mb-2">댓글을 작성하려면 로그인하세요</p>
              <Button onClick={() => navigate('/auth')} variant="outline">
                로그인
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;