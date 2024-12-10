import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint,
  DocumentData,
  WithFieldValue,
  DocumentReference,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from './config';

export const createDocument = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  data: T
): Promise<DocumentReference> => {
  try {
    return await addDoc(collection(db, collectionName), data);
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const getDocument = async <T = DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export const updateDocument = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (
  collectionName: string,
  documentId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const queryDocuments = async <T = DocumentData>(
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
): Promise<T[]> => {
  try {
    const q = query(collection(db, collectionName), ...queryConstraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
};