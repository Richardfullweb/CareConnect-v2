import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

export interface AuthError {
  code: string;
  message: string;
}

export const getErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Este e-mail já está em uso';
    case 'auth/invalid-credential':
      return 'E-mail ou senha incorretos';
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres';
    case 'auth/invalid-email':
      return 'E-mail inválido';
    case 'auth/operation-not-allowed':
      return 'O método de autenticação não está habilitado';
    case 'auth/user-disabled':
      return 'Esta conta foi desativada';
    case 'auth/user-not-found':
      return 'Usuário não encontrado';
    case 'auth/wrong-password':
      return 'Senha incorreta';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente mais tarde';
    default:
      return 'Ocorreu um erro. Tente novamente';
  }
};

export const signUp = async (
  email: string,
  password: string,
  userData: {
    name: string;
    role: 'client' | 'caregiver';
  }
): Promise<UserCredential> => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    // Update profile with display name
    await updateProfile(user, { displayName: userData.name });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: userData.name,
      email: user.email,
      role: userData.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    // If user is a caregiver, create a document in the cuidadores collection
    if (userData.role === 'caregiver') {
      await setDoc(doc(db, 'cuidadores', user.uid), {
        name: userData.name,
        email: user.email,
        userId: user.uid,
        profileComplete: false,
        disponivel: true,
        avaliacao: 0,
        numeroAvaliacoes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    return userCredential;
  } catch (error: any) {
    console.error('Error in signUp:', error);
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error('Error in signIn:', error);
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error in logout:', error);
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Error in resetPassword:', error);
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};