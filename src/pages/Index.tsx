import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { usePosts } from "@/hooks/usePosts";
import cafeHero from "@/assets/cafe-hero.jpg";
import mountainHero from "@/assets/mountain-hero.jpg";
import parkHero from "@/assets/park-hero.jpg";

const Index = () => {
  const { posts, loading, error } = usePosts();

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
          
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">게시글을 불러오는 중...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-destructive">오류가 발생했습니다: {error}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">아직 게시글이 없습니다.</p>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
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