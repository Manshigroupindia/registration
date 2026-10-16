import { SiteSettings } from '../types';
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_SITE_SETTINGS } from './seedData';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'icg_site_settings';

function getStoredSettings(): SiteSettings {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SITE_SETTINGS));
    return INITIAL_SITE_SETTINGS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_SITE_SETTINGS;
  }
}

export const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    if (isFirebaseConfigured() && db) {
      try {
        const snap = await getDoc(doc(db, 'siteSettings', 'global'));
        if (snap.exists()) {
          return snap.data() as SiteSettings;
        }
      } catch (err) {
        console.warn('Firestore settings fetch error:', err);
      }
    }
    return getStoredSettings();
  },

  async updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSettings();
    const merged: SiteSettings = {
      ...current,
      ...updates,
      organizers: {
        ...current.organizers,
        ...(updates.organizers || {}),
      },
      celebrityGuest: {
        ...current.celebrityGuest,
        ...(updates.celebrityGuest || {}),
      },
      socialHandles: {
        ...current.socialHandles,
        ...(updates.socialHandles || {}),
      },
      partnerWebsites: {
        ...current.partnerWebsites,
        ...(updates.partnerWebsites || {}),
      },
      filmProject: {
        ...current.filmProject,
        ...(updates.filmProject || {}),
      },
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, 'siteSettings', 'global'), merged);
      } catch (err) {
        console.warn('Firestore settings update failed:', err);
      }
    }

    return merged;
  },
};
