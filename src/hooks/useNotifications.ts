import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase/config';

interface AppointmentData {
  date: Date;
  duration: number;
  address: string;
  price: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'appointment_accepted' | 'appointment_completed' | 'appointment_pending' | 'appointment_cancelled';
  title: string;
  content: string;
  appointmentData?: AppointmentData;
  createdAt: Date;
  status: 'read' | 'unread';
}

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'messages'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as Notification[];

      setNotifications(notificationsData);
      setUnreadCount(notificationsData.filter(n => n.status === 'unread').length);
    });

    return () => unsubscribe();
  }, [userId]);

  const markAsRead = async (notificationId: string) => {
    try {
      const notificationRef = doc(db, 'messages', notificationId);
      await updateDoc(notificationRef, {
        status: 'read'
      });
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => n.status === 'unread');
      const updatePromises = unreadNotifications.map(notification => 
        updateDoc(doc(db, 'messages', notification.id), {
          status: 'read'
        })
      );
      await Promise.all(updatePromises);
    } catch (error) {
      console.error('Erro ao marcar todas notificações como lidas:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
}
