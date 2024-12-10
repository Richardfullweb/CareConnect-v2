import { 
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../config';

export interface Testimonial {
  id?: string;
  appointmentId: string;
  clientId: string;
  caregiverId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  clientName?: string;
}

export const testimonialsCollection = collection(db, 'testimonials');

export const createTestimonial = async (testimonialData: Omit<Testimonial, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(testimonialsCollection, {
      ...testimonialData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
};

export const getCaregiverTestimonials = async (caregiverId: string) => {
  try {
    // Use a simple query first without the complex ordering
    const q = query(
      testimonialsCollection,
      where('caregiverId', '==', caregiverId),
      limit(10) // Limit to 10 testimonials for better performance
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() // Convert Timestamp to Date
    })) as Testimonial[];
  } catch (error) {
    console.error('Error getting caregiver testimonials:', error);
    throw error;
  }
};

export const getClientTestimonials = async (clientId: string) => {
  try {
    // Use a simple query first without the complex ordering
    const q = query(
      testimonialsCollection,
      where('clientId', '==', clientId),
      limit(10) // Limit to 10 testimonials for better performance
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() // Convert Timestamp to Date
    })) as Testimonial[];
  } catch (error) {
    console.error('Error getting client testimonials:', error);
    throw error;
  }
};

export const getAppointmentTestimonial = async (appointmentId: string) => {
  try {
    const q = query(
      testimonialsCollection,
      where('appointmentId', '==', appointmentId)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() // Convert Timestamp to Date
    } as Testimonial;
  } catch (error) {
    console.error('Error getting appointment testimonial:', error);
    throw error;
  }
};
