import { ContactEnquiry, EnquiryStatus } from '../types';
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_ENQUIRIES } from './seedData';
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'icg_enquiries';

function getStoredEnquiries(): ContactEnquiry[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_ENQUIRIES));
    return INITIAL_ENQUIRIES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_ENQUIRIES;
  }
}

function saveStoredEnquiries(records: ContactEnquiry[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
}

export const enquiryService = {
  async getAll(): Promise<ContactEnquiry[]> {
    if (isFirebaseConfigured() && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'enquiries'));
        if (!querySnapshot.empty) {
          const list: ContactEnquiry[] = [];
          querySnapshot.forEach((d) => list.push(d.data() as ContactEnquiry));
          return list;
        }
      } catch (err) {
        console.warn('Firestore fetch failed, using local enquiries fallback.', err);
      }
    }
    return getStoredEnquiries();
  },

  async submit(data: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; enquiry?: ContactEnquiry }> {
    const all = await this.getAll();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newId = `ICG-ENQ-2026-${randomSuffix}`;

    const newEnquiry: ContactEnquiry = {
      ...data,
      id: newId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, 'enquiries', newId), newEnquiry);
      } catch (err) {
        console.warn('Firestore save failed, caching locally.', err);
      }
    }

    saveStoredEnquiries([newEnquiry, ...all]);
    return { success: true, enquiry: newEnquiry };
  },

  async updateStatus(id: string, status: EnquiryStatus): Promise<boolean> {
    const all = await this.getAll();
    const index = all.findIndex((e) => e.id === id);
    if (index === -1) return false;

    all[index].status = status;
    saveStoredEnquiries(all);

    if (isFirebaseConfigured() && db) {
      try {
        await updateDoc(doc(db, 'enquiries', id), { status });
      } catch (err) {
        console.warn('Firestore update failed:', err);
      }
    }
    return true;
  },

  async delete(id: string): Promise<boolean> {
    const all = await this.getAll();
    const filtered = all.filter((e) => e.id !== id);
    saveStoredEnquiries(filtered);

    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, 'enquiries', id));
      } catch (err) {
        console.warn('Firestore delete failed:', err);
      }
    }
    return true;
  },
};
