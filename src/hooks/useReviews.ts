import { useState, useEffect } from 'react';
import type { Review } from '../types';

// Mock data - In a real app, this would come from an API
const mockReviews: Review[] = [
  {
    id: '1',
    serviceRequestId: 'sr1',
    clientId: 'client1',
    caregiverId: 'caregiver1',
    rating: 5,
    comment: 'Excelente profissional! Muito atenciosa e dedicada.',
    createdAt: '2024-03-15T10:00:00Z',
    clientName: 'Ana Silva',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    serviceRequestId: 'sr2',
    clientId: 'client2',
    caregiverId: 'caregiver1',
    rating: 4,
    comment: 'Ótimo atendimento, pontual e profissional.',
    createdAt: '2024-03-14T15:30:00Z',
    clientName: 'Pedro Santos',
    clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];

export function useReviews(caregiverId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0
  });

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const filteredReviews = mockReviews.filter(
          review => review.caregiverId === caregiverId
        );
        
        // Calculate stats
        const total = filteredReviews.length;
        const average = total > 0
          ? filteredReviews.reduce((acc, review) => acc + review.rating, 0) / total
          : 0;

        setReviews(filteredReviews);
        setStats({
          averageRating: average,
          totalReviews: total
        });
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [caregiverId]);

  return { reviews, isLoading, stats };
}