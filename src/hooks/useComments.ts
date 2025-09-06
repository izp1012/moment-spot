import { useState, useEffect } from 'react';
import { apiService, Comment } from '@/services/api';

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getComments(postId);
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const addComment = async (content: string) => {
    try {
      const newComment = await apiService.createComment({
        content,
        postId,
      });
      setComments(prev => [...prev, newComment]);
      return newComment;
    } catch (err) {
      console.error('Error creating comment:', err);
      throw err;
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await apiService.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      throw err;
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    refetch: fetchComments,
  };
};