# API 데이터 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Frontend as React Frontend
    participant Backend as Spring Boot
    participant DB as Database
    participant WS as WebSocket
    
    Note over User, WS: 게시글 작성 플로우
    User->>Frontend: 게시글 작성
    Frontend->>Backend: POST /api/posts
    Backend->>DB: 게시글 저장
    DB-->>Backend: 저장 완료
    Backend-->>Frontend: 게시글 응답
    Frontend-->>User: 피드 업데이트
    
    Note over User, WS: 채팅 플로우
    User->>Frontend: 채팅방 열기
    Frontend->>Backend: GET /api/chat/rooms
    Backend->>DB: 채팅방 조회
    DB-->>Backend: 채팅방 데이터
    Backend-->>Frontend: 채팅방 목록
    
    Frontend->>WS: WebSocket 연결
    User->>Frontend: 메시지 전송
    Frontend->>Backend: POST /api/chat/messages
    Backend->>DB: 메시지 저장
    Backend->>WS: 실시간 메시지 전송
    WS-->>Frontend: 상대방에게 메시지 전달
    Frontend-->>User: 메시지 업데이트
    
    Note over User, WS: 좋아요/댓글 플로우
    User->>Frontend: 좋아요 클릭
    Frontend->>Backend: POST /api/posts/{id}/like
    Backend->>DB: 좋아요 저장
    DB-->>Backend: 업데이트 완료
    Backend-->>Frontend: 좋아요 수 응답
    Frontend-->>User: UI 업데이트
```

## API 엔드포인트 목록

### 게시글 관련
- `GET /api/posts` - 게시글 목록 조회
- `POST /api/posts` - 게시글 작성
- `POST /api/posts/{id}/like` - 좋아요
- `DELETE /api/posts/{id}/like` - 좋아요 취소

### 댓글 관련
- `GET /api/posts/{postId}/comments` - 댓글 목록 조회
- `POST /api/posts/{postId}/comments` - 댓글 작성
- `DELETE /api/comments/{id}` - 댓글 삭제

### 채팅 관련
- `GET /api/chat/rooms` - 채팅방 목록
- `POST /api/chat/rooms` - 채팅방 생성
- `GET /api/chat/rooms/{roomId}/messages` - 메시지 조회
- `POST /api/chat/rooms/{roomId}/messages` - 메시지 전송
- `WebSocket: ws://localhost:8080/ws/chat/{roomId}` - 실시간 채팅

### 인증 관련
- `POST /api/auth/kakao` - 카카오 로그인
- `POST /api/auth/google` - 구글 로그인
- `POST /api/auth/logout` - 로그아웃