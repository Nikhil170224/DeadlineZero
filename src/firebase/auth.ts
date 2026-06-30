import { GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

export const googleProvider = isFirebaseConfigured ? new GoogleAuthProvider() : null;

export const signInWithGoogle = async (): Promise<User | null> => {
  if (!isFirebaseConfigured || !auth || !googleProvider) {
    throw new Error('Firebase config missing — add .env.local vars');
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  if (!isFirebaseConfigured || !auth) return;
  try {
    await fbSignOut(auth);
  } catch (error) {
    console.error('Sign-out error:', error);
    throw error;
  }
};

export const onAuthChange = (callback: (user: User | null) => void): (() => void) => {
  if (!isFirebaseConfigured || !auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};
