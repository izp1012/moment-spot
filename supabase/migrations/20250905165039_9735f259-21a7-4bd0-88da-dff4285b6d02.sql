-- Insert real user profile
INSERT INTO public.profiles (user_id, username, display_name, bio, avatar_url) VALUES
('b4d833f2-21a1-44d0-aad0-a048bf5b40bd', '송인효', '송인효', '특별한 순간들을 기록하는 것을 좋아합니다 📸', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150');

-- Insert some posts for the real user and add other dummy users
INSERT INTO public.profiles (id, user_id, username, display_name, bio, avatar_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'jinwoo_kim', '김진우', '일상의 특별한 순간들을 기록합니다 📸', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'minji_lee', '이민지', '여행과 맛집을 사랑하는 사람 ✈️🍴', 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150');

-- Insert posts
INSERT INTO public.posts (user_id, content, location, images) VALUES
('b4d833f2-21a1-44d0-aad0-a048bf5b40bd', '홍대 근처에서 찾은 숨겨진 카페! 분위기가 정말 좋았어요. 원두향이 진하고 디저트도 맛있었습니다 🍰', '홍대입구역 근처 카페거리', '{"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800", "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800"}'),
('550e8400-e29b-41d4-a716-446655440001', '제주도 성산일출봉에서 맞이한 새벽! 정말 장관이었습니다. 새해 첫날 일출을 보니 마음이 새로워지네요 🌅', '성산일출봉', '{"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"}'),
('550e8400-e29b-41d4-a716-446655440002', '강남 도서관에서 하루종일 책 읽기! 이 책 정말 추천해요. 잔잔하면서도 감동적인 이야기입니다 📖', '강남구립도서관', '{"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800"}'),
('b4d833f2-21a1-44d0-aad0-a048bf5b40bd', '명동에서 발견한 맛집! 김치찌개가 정말 맛있었어요. 집밥 느낌이 나서 더욱 좋았습니다 🥘', '명동 골목길', '{"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"}');