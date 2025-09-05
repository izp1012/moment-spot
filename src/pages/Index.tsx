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
      name: "김진우",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
    },
    location: "홍대입구역 근처 카페거리",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop"
    ],
    caption: "홍대 근처에서 찾은 숨겨진 카페! 분위기가 정말 좋았어요. 원두향이 진하고 디저트도 맛있었습니다 🍰",
    likes: 42,
    comments: 8,
    timestamp: "2시간 전",
    isLiked: false
  },
  {
    id: "2",
    user: {
      name: "이민지",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=faces"
    },
    location: "성산일출봉",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    ],
    caption: "제주도 성산일출봉에서 맞이한 새벽! 정말 장관이었습니다. 새해 첫날 일출을 보니 마음이 새로워지네요 🌅",
    likes: 89,
    comments: 12,
    timestamp: "5시간 전",
    isLiked: true
  },
  {
    id: "3",
    user: {
      name: "박승호",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
    },
    location: "강남구립도서관",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop"
    ],
    caption: "강남 도서관에서 하루종일 책 읽기! 이 책 정말 추천해요. 잔잔하면서도 감동적인 이야기입니다 📖",
    likes: 23,
    comments: 6,
    timestamp: "8시간 전",
    isLiked: false
  },
  {
    id: "4",
    user: {
      name: "최유진",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
    },
    location: "여의도 한강공원",
    images: [
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=600&fit=crop"
    ],
    caption: "한강공원에서 피크닉! 날씨도 좋고 벚꽃도 예뻤어요. 친구들과 함께한 소중한 시간이었습니다 🌸",
    likes: 67,
    comments: 9,
    timestamp: "1일 전",
    isLiked: false
  },
  {
    id: "5",
    user: {
      name: "김진우",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
    },
    location: "명동 골목길",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"
    ],
    caption: "명동에서 발견한 맛집! 김치찌개가 정말 맛있었어요. 집밥 느낌이 나서 더욱 좋았습니다 🥘",
    likes: 34,
    comments: 5,
    timestamp: "1일 전",
    isLiked: false
  },
  {
    id: "6",
    user: {
      name: "이민지",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=faces"
    },
    location: "해운대 해수욕장",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    caption: "부산 해운대 해변! 바다를 보니 마음이 시원해졌어요. 파도 소리가 정말 좋았습니다 🌊",
    likes: 78,
    comments: 11,
    timestamp: "2일 전",
    isLiked: true
  },
  {
    id: "7",
    user: {
      name: "박승호",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
    },
    location: "북촌한옥마을",
    images: [
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578895101434-7f0e71b3d673?w=800&h=600&fit=crop"
    ],
    caption: "북촌한옥마을 산책! 전통과 현대가 만나는 아름다운 곳이에요. 외국인 친구들도 정말 좋아했습니다 🏘️",
    likes: 92,
    comments: 16,
    timestamp: "3일 전",
    isLiked: false
  },
  {
    id: "8",
    user: {
      name: "최유진",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
    },
    location: "이태원 경리단길",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
    ],
    caption: "경리단길에서 찾은 예쁜 레스토랑! 음식도 맛있고 인테리어도 너무 예뻐요 ✨",
    likes: 45,
    comments: 7,
    timestamp: "3일 전",
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