-- Insert dummy users for posts (without creating conflicting profiles)
INSERT INTO public.posts (user_id, content, location, images) VALUES
('b4d833f2-21a1-44d0-aad0-a048bf5b40bd', '홍대 근처에서 찾은 숨겨진 카페! 분위기가 정말 좋았어요. 원두향이 진하고 디저트도 맛있었습니다 🍰', '홍대입구역 근처 카페거리', '["https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800", "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800"]'),
('b4d833f2-21a1-44d0-aad0-a048bf5b40bd', '명동에서 발견한 맛집! 김치찌개가 정말 맛있었어요. 집밥 느낌이 나서 더욱 좋았습니다 🥘', '명동 골목길', '["https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"]'),
('b4d833f2-21a1-44d0-aad0-a048bf5b40bd', '여의도 한강공원에서 피크닉! 날씨도 좋고 벚꽃도 예뻤어요. 친구들과 함께한 소중한 시간이었습니다 🌸', '여의도 한강공원', '["https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800"]');