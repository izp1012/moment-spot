// API service for Spring Boot backend
const API_BASE_URL = 'http://localhost:8080/api';

export interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  location?: string;
  images: string[];
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface CreatePostRequest {
  content: string;
  location?: string;
  images: File[];
}

export interface CreateCommentRequest {
  content: string;
  postId: string;
}

class ApiService {
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
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Posts API
  async getPosts(): Promise<Post[]> {
    return this.request<Post[]>('/posts');
  }

  async getPost(id: string): Promise<Post> {
    return this.request<Post>(`/posts/${id}`);
  }

  async createPost(data: CreatePostRequest): Promise<Post> {
    const formData = new FormData();
    formData.append('content', data.content);
    if (data.location) {
      formData.append('location', data.location);
    }
    data.images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async likePost(postId: string): Promise<{ liked: boolean; likes: number }> {
    return this.request<{ liked: boolean; likes: number }>(`/posts/${postId}/like`, {
      method: 'POST',
    });
  }

  async unlikePost(postId: string): Promise<{ liked: boolean; likes: number }> {
    return this.request<{ liked: boolean; likes: number }>(`/posts/${postId}/like`, {
      method: 'DELETE',
    });
  }

  // Comments API
  async getComments(postId: string): Promise<Comment[]> {
    return this.request<Comment[]>(`/posts/${postId}/comments`);
  }

  async createComment(data: CreateCommentRequest): Promise<Comment> {
    return this.request<Comment>(`/posts/${data.postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content: data.content }),
    });
  }

  async deleteComment(commentId: string): Promise<void> {
    return this.request<void>(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  // User API
  async getUser(id: string): Promise<{ id: string; name: string; avatar?: string }> {
    return this.request<{ id: string; name: string; avatar?: string }>(`/users/${id}`);
  }
}

export const apiService = new ApiService();