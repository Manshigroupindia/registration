import { Registration, RegistrationStatus, PageantCategory, ParticipationTrack } from '../types';
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_REGISTRATIONS } from './seedData';
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'icg_registrations';

function getStoredRegistrations(): Registration[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_REGISTRATIONS));
    return INITIAL_REGISTRATIONS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_REGISTRATIONS;
  }
}

function saveStoredRegistrations(records: Registration[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
}

export const registrationService = {
  async getAll(): Promise<Registration[]> {
    if (isFirebaseConfigured() && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations'));
        if (!querySnapshot.empty) {
          const list: Registration[] = [];
          querySnapshot.forEach((d) => list.push(d.data() as Registration));
          return list;
        }
      } catch (err) {
        console.warn('Firestore fetch failed, using local storage fallback.', err);
      }
    }
    return getStoredRegistrations();
  },

  async getById(id: string): Promise<Registration | null> {
    const all = await this.getAll();
    return all.find((r) => r.id.toLowerCase() === id.trim().toLowerCase()) || null;
  },

  async submit(data: Omit<Registration, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; registration?: Registration; error?: string }> {
    const existing = await this.getAll();
    
    // Check duplicate by phone or email
    const cleanPhone = data.phone.replace(/\D/g, '');
    const cleanEmail = data.email.trim().toLowerCase();
    
    const duplicate = existing.find(
      (r) => r.phone.replace(/\D/g, '') === cleanPhone || r.email.trim().toLowerCase() === cleanEmail
    );

    if (duplicate) {
      return {
        success: false,
        error: `A registration with this mobile number (+91 ${cleanPhone}) or email (${cleanEmail}) already exists under Registration ID: ${duplicate.id}.`,
      };
    }

    // Generate unique ID: ICG-2026-REG-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `ICG-2026-REG-${randomSuffix}`;

    const newRecord: Registration = {
      ...data,
      id: newId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Save to Firestore if available
    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, 'registrations', newId), newRecord);
      } catch (err) {
        console.warn('Failed to sync to Firestore, saved to local cache.', err);
      }
    }

    // Always update local cache
    const updated = [newRecord, ...existing];
    saveStoredRegistrations(updated);

    return {
      success: true,
      registration: newRecord,
    };
  },

  async updateStatus(id: string, status: RegistrationStatus): Promise<boolean> {
    const list = await this.getAll();
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) return false;

    list[index].status = status;
    saveStoredRegistrations(list);

    if (isFirebaseConfigured() && db) {
      try {
        await updateDoc(doc(db, 'registrations', id), { status });
      } catch (err) {
        console.warn('Firestore updateDoc failed:', err);
      }
    }

    return true;
  },

  async delete(id: string): Promise<boolean> {
    const list = await this.getAll();
    const filtered = list.filter((r) => r.id !== id);
    saveStoredRegistrations(filtered);

    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, 'registrations', id));
      } catch (err) {
        console.warn('Firestore deleteDoc failed:', err);
      }
    }

    return true;
  },

  exportToCSV(records: Registration[]): void {
    if (records.length === 0) return;
    const headers = [
      'Registration ID',
      'Full Name',
      'Category',
      'Email',
      'Mobile Number',
      'Date of Birth',
      'City',
      'State',
      'Interested In',
      'Experience Level',
      'Portfolio URL',
      'Status',
      'Submission Date',
    ];

    const rows = records.map((r) => [
      `"${r.id}"`,
      `"${r.fullName}"`,
      `"${r.category}"`,
      `"${r.email}"`,
      `"+91 ${r.phone}"`,
      `"${r.dob}"`,
      `"${r.city}"`,
      `"${r.state}"`,
      `"${r.interestedIn.join(', ')}"`,
      `"${r.experienceLevel}"`,
      `"${r.portfolioUrl || 'N/A'}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ICG_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
