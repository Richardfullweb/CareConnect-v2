import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../lib/firebase/config';
import { signIn, signUp, logout, resetPassword, AuthError, getErrorMessage } from '../lib/firebase/auth';
import { toast } from 'sonner';

export interface AuthHookReturn {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: { name: string; role: 'client' | 'caregiver' }) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export function useAuth(): AuthHookReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAuth = async (
    action: 'signin' | 'signup' | 'logout' | 'reset',
    data?: { 
      email?: string; 
      password?: string; 
      userData?: {
        name: string;
        role: 'client' | 'caregiver';
      }
    }
  ) => {
    try {
      setLoading(true);
      switch (action) {
        case 'signin':
          if (data?.email && data.password) {
            await signIn(data.email, data.password);
            toast.success('Login realizado com sucesso!');
          }
          break;
        case 'signup':
          if (data?.email && data.password && data.userData) {
            await signUp(data.email, data.password, data.userData);
            toast.success('Conta criada com sucesso!');
          }
          break;
        case 'logout':
          await logout();
          toast.success('Logout realizado com sucesso!');
          break;
        case 'reset':
          if (data?.email) {
            await resetPassword(data.email);
            toast.success('Email de recuperação enviado!');
          }
          break;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : getErrorMessage((error as AuthError).code);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signIn: (email: string, password: string) =>
      handleAuth('signin', { email, password }),
    signUp: (email: string, password: string, userData: { name: string; role: 'client' | 'caregiver' }) =>
      handleAuth('signup', { email, password, userData }),
    logout: () => handleAuth('logout'),
    resetPassword: (email: string) => handleAuth('reset', { email }),
  };
}