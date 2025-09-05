import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import cafeHero from "@/assets/cafe-hero.jpg";
import mountainHero from "@/assets/mountain-hero.jpg";
import parkHero from "@/assets/park-hero.jpg";

// Mock data for demonstration
const mockPosts = [
  {
    id: "1",
    user: {
      name: "김민지",
      avatar: ""
    },
    location: "홍대 카페 온더스퀘어",
    images: [cafeHero],
    caption: "따뜻한 오후 햇살이 들어오는 이곳에서 친구와 나눈 소중한 시간들... 매번 올 때마다 새로운 이야기가 생기는 특별한 공간이에요 ☕️ #홍대카페 #힐링스팟",
    likes: 24,
    comments: 3,
    timestamp: "2시간 전",
    isLiked: false
  },
  {
    id: "2",
    user: {
      name: "박준혁",
      avatar: ""
    },
    location: "남산 N서울타워",
    images: [mountainHero],
    caption: "서울 전체가 한눈에 보이는 이곳... 일몰 때 오르면 정말 말로 표현할 수 없는 감동이 있어요. 연인과 함께라면 더욱 특별한 추억이 될 것 같아요 🌅 #남산타워 #일몰명소",
    likes: 56,
    comments: 12,
    timestamp: "4시간 전",
    isLiked: true
  },
  {
    id: "3",
    user: {
      name: "이서연",
      avatar: ""
    },
    location: "여의도 한강공원 벚꽃길",
    images: [parkHero],
    caption: "봄이 오면 꼭 가고 싶었던 곳... 벚꽃이 만개했을 때의 그 순간을 절대 잊을 수 없어요. 자연이 주는 선물을 온몸으로 느낄 수 있는 곳이었습니다 🌸 #벚꽃명소 #한강공원",
    likes: 89,
    comments: 7,
    timestamp: "1일 전",
    isLiked: false
  }
];

const Index = () => {
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
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
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