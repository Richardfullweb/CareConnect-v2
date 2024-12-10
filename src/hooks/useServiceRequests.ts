import { useState, useEffect } from 'react';
import type { ServiceRequest } from '../types';

// Simulated data - In a real app, this would come from an API
const mockRequests: ServiceRequest[] = [
  {
    id: '1',
    clientId: 'client1',
    caregiverId: 'caregiver1',
    date: '2024-03-20',
    time: '14:00',
    description: 'Acompanhamento para consulta médica',
    status: 'pending'
  },
  {
    id: '2',
    clientId: 'client1',
    caregiverId: 'caregiver1',
    date: '2024-03-21',
    time: '09:00',
    description: 'Cuidados pós-operatórios',
    status: 'accepted'
  },
  {
    id: '3',
    clientId: 'client1',
    caregiverId: 'caregiver2',
    date: '2024-03-19',
    time: '15:30',
    description: 'Acompanhamento domiciliar',
    status: 'completed'
  }
];

export function useServiceRequests(userId: string, role: 'client' | 'caregiver') {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadRequests = async () => {
      setIsLoading(true);
      try {
        // Filter requests based on role
        const filteredRequests = mockRequests.filter(request =>
          role === 'client'
            ? request.clientId === userId
            : request.caregiverId === userId
        );
        
        setRequests(filteredRequests);
      } catch (error) {
        console.error('Error loading requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRequests();
  }, [userId, role]);

  return { requests, isLoading };
}