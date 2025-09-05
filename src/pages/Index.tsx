import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import mountainHero from "@/assets/mountain-hero.jpg";

interface Post {
  id: string;
  user_id: string;
  content: string;
  location: string | null;
  images: string[];
  created_at: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            profiles:user_id (
              username,
              display_name,
              avatar_url
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts:', error);
          return;
        }

        // Transform data to match our interface
        const transformedPosts = data?.map((post: any) => ({
          id: post.id,
          user_id: post.user_id,
          content: post.content,
          location: post.location,
          images: post.images,
          created_at: post.created_at,
          username: post.profiles?.username,
          display_name: post.profiles?.display_name,
          avatar_url: post.profiles?.avatar_url,
        })) || [];

        setPosts(transformedPosts);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "방금 전";
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}일 전`;
    
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${mountainHero})` }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              특별한 순간,<br />소중한 장소
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              일상 속에서 발견한 의미 있는 공간들을 사진과 이야기로 기록하고 공유해보세요
            </p>
          </div>
        </div>
      </section>

      {/* Feed Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">최근 공유된 장소들</h2>
            <p className="text-muted-foreground">사람들이 나눈 특별한 장소 이야기를 만나보세요</p>
          </div>
          
          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-card rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-muted rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="h-3 bg-muted rounded w-32"></div>
                      </div>
                    </div>
                    <div className="h-64 bg-muted rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={{
                    id: post.id,
                    user: {
                      name: post.display_name || post.username || "사용자",
                      avatar: post.avatar_url || "",
                    },
                    location: post.location || "",
                    images: post.images,
                    caption: post.content,
                    likes: 0, // TODO: 좋아요 수 계산
                    comments: 0, // TODO: 댓글 수 계산
                    timestamp: formatTimeAgo(post.created_at),
                    isLiked: false, // TODO: 사용자의 좋아요 상태
                  }}
                />
              ))}
              {posts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">아직 공유된 게시글이 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Moment Place
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            당신의 특별한 장소 이야기를 세상과 나누어 보세요
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;