import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import {
  Appointment,
  createAppointment,
  getClientAppointments,
  getCaregiverAppointments,
  getAppointment,
  updateAppointmentStatus
} from '../lib/firebase/services/appointments';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { toast } from 'sonner';

export function useAppointments() {
  const { user } = useAuthContext();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'client' | 'caregiver' | null>(null);

  useEffect(() => {
    const loadUserRole = async () => {
      if (!user) return;

      try {
        // Verificar se o usuário existe na coleção de clientes
        const clientDoc = doc(db, 'clientes', user.uid);
        const clientSnap = await getDoc(clientDoc);
        
        if (clientSnap.exists()) {
          setUserRole('client');
          return;
        }

        // Se não for cliente, verificar se é cuidador
        const caregiverDoc = doc(db, 'cuidadores', user.uid);
        const caregiverSnap = await getDoc(caregiverDoc);
        
        if (caregiverSnap.exists()) {
          setUserRole('caregiver');
        } else {
          // Se não encontrar em nenhuma coleção, assumir como cliente
          setUserRole('client');
        }
      } catch (error) {
        console.error('Error loading user role:', error);
        setUserRole('client');
      }
    };

    loadUserRole();
  }, [user]);

  useEffect(() => {
    const loadAppointments = async () => {
      if (!user || !userRole) return;

      try {
        setLoading(true);
        const userAppointments = userRole === 'client'
          ? await getClientAppointments(user.uid)
          : await getCaregiverAppointments(user.uid);
        
        setAppointments(userAppointments);
      } catch (error) {
        console.error('Error loading appointments:', error);
        toast.error('Erro ao carregar agendamentos');
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [user, userRole]);

  const scheduleAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'clientId'>) => {
    if (!user) {
      toast.error('Você precisa estar logado para agendar');
      return;
    }

    try {
      const appointmentId = await createAppointment({
        ...appointmentData,
        clientId: user.uid
      });
      
      // Atualizar a lista de agendamentos após criar um novo
      const newAppointment = await getAppointment(appointmentId);
      if (newAppointment) {
        setAppointments(prev => [...prev, newAppointment]);
      }
      
      toast.success('Agendamento realizado com sucesso!');
      return appointmentId;
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast.error('Erro ao realizar agendamento');
      throw error;
    }
  };

  const updateStatus = async (appointmentId: string, status: Appointment['status']) => {
    try {
      await updateAppointmentStatus(appointmentId, status);
      setAppointments(prev => 
        prev.map(app => 
          app.id === appointmentId ? { ...app, status } : app
        )
      );
      toast.success('Status atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast.error('Erro ao atualizar status');
      throw error;
    }
  };

  return {
    appointments,
    loading,
    scheduleAppointment,
    updateStatus
  };
}