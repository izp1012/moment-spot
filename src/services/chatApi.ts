// Chat API service for Spring Boot backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export interface ChatRoom {
  id: string;
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  messageType: 'text' | 'image' | 'file';
  isOwn: boolean;
  createdAt: string;
  readAt?: string;
}

export interface SendMessageRequest {
  roomId: string;
  content: string;
  messageType?: 'text' | 'image' | 'file';
}

export interface CreateChatRoomRequest {
  otherUserId: string;
}

class ChatApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Chat API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Chat Rooms API
  async getChatRooms(): Promise<ChatRoom[]> {
    return this.request<ChatRoom[]>('/chat/rooms');
  }

  async getChatRoom(roomId: string): Promise<ChatRoom> {
    return this.request<ChatRoom>(`/chat/rooms/${roomId}`);
  }

  async createChatRoom(data: CreateChatRoomRequest): Promise<ChatRoom> {
    return this.request<ChatRoom>('/chat/rooms', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteChatRoom(roomId: string): Promise<void> {
    return this.request<void>(`/chat/rooms/${roomId}`, {
      method: 'DELETE',
    });
  }

  // Messages API
  async getMessages(roomId: string, page: number = 0, size: number = 50): Promise<ChatMessage[]> {
    return this.request<ChatMessage[]>(`/chat/rooms/${roomId}/messages?page=${page}&size=${size}`);
  }

  async sendMessage(data: SendMessageRequest): Promise<ChatMessage> {
    return this.request<ChatMessage>(`/chat/rooms/${data.roomId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        content: data.content,
        messageType: data.messageType || 'text',
      }),
    });
  }

  async deleteMessage(messageId: string): Promise<void> {
    return this.request<void>(`/chat/messages/${messageId}`, {
      method: 'DELETE',
    });
  }

  async markAsRead(roomId: string): Promise<void> {
    return this.request<void>(`/chat/rooms/${roomId}/read`, {
      method: 'POST',
    });
  }

  // WebSocket connection for real-time chat
  connectWebSocket(roomId: string, onMessage: (message: ChatMessage) => void): WebSocket {
    const wsUrl = `ws://localhost:8080/ws/chat/${roomId}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Chat WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const message: ChatMessage = JSON.parse(event.data);
        onMessage(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('Chat WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Chat WebSocket disconnected');
    };

    return ws;
  }
}

export const chatService = new ChatApiService();