import { AdminUser } from '../types';
import { auth, isFirebaseConfigured } from './firebase';
import { signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged, User } from 'firebase/auth';

const ADMIN_STORAGE_KEY = 'icg_admin_session';

export interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  loading: boolean;
}

export const authService = {
  getInitialState(): AuthState {
    const session = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (session) {
      try {
        const user = JSON.parse(session) as AdminUser;
        return { isAuthenticated: true, user, loading: false };
      } catch {
        // invalid session
      }
    }
    return { isAuthenticated: false, user: null, loading: false };
  },

  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    const cleanEmail = email.trim();

    if (isFirebaseConfigured() && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
        const adminUser: AdminUser = {
          email: cred.user.email || cleanEmail,
          name: cred.user.displayName || 'Administrator',
          role: 'superadmin',
        };
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
        return { success: true, user: adminUser };
      } catch (err: any) {
        return {
          success: false,
          error: err.message || 'Firebase authentication failed. Please verify administrator credentials.',
        };
      }
    }

    // Default development / initial setup administrator
    // Allows immediate management without blocking when Firebase credentials are not yet linked
    if (
      (cleanEmail === 'admin@iconiccreationofgod.com' && password === 'IconicRoyalAdmin2026!') ||
      (cleanEmail === 'admin@jantalive.com' && password === 'Delhi2026Gala')
    ) {
      const adminUser: AdminUser = {
        email: cleanEmail,
        name: cleanEmail.includes('janta') ? 'Janta Live Admin' : 'Executive Administrator',
        role: 'superadmin',
      };
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. (Default local setup: admin@iconiccreationofgod.com / IconicRoyalAdmin2026!)',
    };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    if (isFirebaseConfigured() && auth) {
      try {
        await fbSignOut(auth);
      } catch (err) {
        // silent
      }
    }
  },
};
