import { useState, useEffect } from 'react';

interface EarningsData {
  totalEarnings: number;
  earningsChange: number;
  totalServices: number;
  servicesChange: number;
  averagePerService: number;
  averageChange: number;
  totalHours: number;
  hoursChange: number;
  chartData: {
    labels: string[];
    earnings: number[];
  };
  services: Array<{
    id: string;
    clientName: string;
    clientImage: string;
    date: string;
    duration: number;
    amount: number;
    status: 'completed' | 'pending_payment';
  }>;
}

// Mock data generator
const generateMockData = (period: 'week' | 'month' | 'year'): EarningsData => {
  const now = new Date();
  const labels: string[] = [];
  const earnings: number[] = [];

  // Generate chart data based on period
  if (period === 'week') {
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('pt-BR', { weekday: 'short' }));
      earnings.push(Math.floor(Math.random() * 300) + 100);
    }
  } else if (period === 'month') {
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(date.getDate().toString());
      earnings.push(Math.floor(Math.random() * 300) + 100);
    }
  } else {
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      labels.push(date.toLocaleDateString('pt-BR', { month: 'short' }));
      earnings.push(Math.floor(Math.random() * 3000) + 1000);
    }
  }

  // Generate mock services
  const services = Array.from({ length: 5 }, (_, i) => ({
    id: `service-${i}`,
    clientName: `Cliente ${i + 1}`,
    clientImage: `https://i.pravatar.cc/150?u=${i}`,
    date: new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString(),
    duration: Math.floor(Math.random() * 4) + 2,
    amount: Math.floor(Math.random() * 200) + 100,
    status: Math.random() > 0.3 ? 'completed' as const : 'pending_payment' as const
  }));

  const totalEarnings = earnings.reduce((a, b) => a + b, 0);
  const totalServices = services.length;
  const totalHours = services.reduce((acc, service) => acc + service.duration, 0);

  return {
    totalEarnings,
    earningsChange: Math.floor(Math.random() * 30) - 15,
    totalServices,
    servicesChange: Math.floor(Math.random() * 30) - 15,
    averagePerService: totalEarnings / totalServices,
    averageChange: Math.floor(Math.random() * 20) - 10,
    totalHours,
    hoursChange: Math.floor(Math.random() * 25) - 12,
    chartData: { labels, earnings },
    services
  };
};

export function useEarnings(caregiverId: string, period: 'week' | 'month' | 'year') {
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEarnings = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const data = generateMockData(period);
        setEarnings(data);
      } catch (error) {
        console.error('Error loading earnings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEarnings();
  }, [caregiverId, period]);

  return { earnings: earnings!, isLoading };
}