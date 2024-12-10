import { 
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config';

export type AppointmentStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface Appointment {
  id?: string;
  caregiverId: string;
  clientId: string;
  date: string;
  time: string;
  duration: number;
  description: string;
  status: AppointmentStatus;
  totalAmount: number;
  createdAt: Date;
  specialRequirements?: string;
  needsTransportation?: boolean;
}

export const appointmentsCollection = collection(db, 'appointments');

export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(appointmentsCollection, {
      ...appointmentData,
      createdAt: Timestamp.now(),
      status: 'pending'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getAppointment = async (id: string) => {
  try {
    const docRef = doc(appointmentsCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Appointment;
    }
    return null;
  } catch (error) {
    console.error('Error getting appointment:', error);
    throw error;
  }
};

export const updateAppointmentStatus = async (
  id: string,
  status: AppointmentStatus
) => {
  try {
    const docRef = doc(appointmentsCollection, id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

export const getClientAppointments = async (clientId: string) => {
  try {
    // Simplificando a query para usar apenas o filtro por clientId
    const q = query(
      appointmentsCollection, 
      where('clientId', '==', clientId)
    );
    const querySnapshot = await getDocs(q);
    
    // Ordenação em memória
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as Appointment)
      .sort((a, b) => {
        // Primeiro ordena por data
        const dateComparison = b.date.localeCompare(a.date);
        if (dateComparison !== 0) return dateComparison;
        // Se as datas forem iguais, ordena por hora
        return b.time.localeCompare(a.time);
      });
  } catch (error) {
    console.error('Error getting client appointments:', error);
    throw error;
  }
};

export const getCaregiverAppointments = async (caregiverId: string) => {
  try {
    // Simplificando a query para usar apenas o filtro por caregiverId
    const q = query(
      appointmentsCollection, 
      where('caregiverId', '==', caregiverId)
    );
    const querySnapshot = await getDocs(q);
    
    // Ordenação em memória
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as Appointment)
      .sort((a, b) => {
        // Primeiro ordena por data
        const dateComparison = b.date.localeCompare(a.date);
        if (dateComparison !== 0) return dateComparison;
        // Se as datas forem iguais, ordena por hora
        return b.time.localeCompare(a.time);
      });
  } catch (error) {
    console.error('Error getting caregiver appointments:', error);
    throw error;
  }
};