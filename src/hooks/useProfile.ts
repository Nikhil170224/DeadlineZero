import { useState, useEffect } from 'react';
import { Profile, subscribeProfile, updateProfile as dbUpdateProfile, checkAndSeedData } from '../firebase/firestore';
import { isFirebaseConfigured } from '../firebase/config';

export function useProfile(uid: string | null) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid || !isFirebaseConfigured) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Initial seed check on login
    checkAndSeedData(uid)
      .catch((err) => {
        console.error('Seeding error:', err);
      });

    const unsubscribe = subscribeProfile(uid, (data) => {
      setProfile(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  const update = async (data: Partial<Profile>) => {
    if (!uid) return;
    try {
      await dbUpdateProfile(uid, data);
    } catch (err: any) {
      console.error('Update profile error:', err);
      setError(err.message || 'Failed to update profile');
      throw err;
    }
  };

  return { profile, loading, error, updateProfile: update };
}
