import { useState, useEffect } from 'react';
import { apiService, Post } from '@/services/api';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleLike = async (postId: string) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const result = post.isLiked 
        ? await apiService.unlikePost(postId)
        : await apiService.likePost(postId);

      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, isLiked: result.liked, likes: result.likes }
          : p
      ));
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    toggleLike,
  };
};