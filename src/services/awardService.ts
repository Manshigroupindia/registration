import { AwardRecord, VerificationStatus } from '../types';
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_AWARDS } from './seedData';
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'icg_awards';

function getStoredAwards(): AwardRecord[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_AWARDS));
    return INITIAL_AWARDS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_AWARDS;
  }
}

function saveStoredAwards(records: AwardRecord[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
}

export const awardService = {
  async getAll(): Promise<AwardRecord[]> {
    if (isFirebaseConfigured() && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'awards'));
        if (!querySnapshot.empty) {
          const list: AwardRecord[] = [];
          querySnapshot.forEach((d) => list.push(d.data() as AwardRecord));
          return list;
        }
      } catch (err) {
        console.warn('Firestore fetch failed, using local awards cache.', err);
      }
    }
    return getStoredAwards();
  },

  async verify(query: { awardNumber?: string; certNumber?: string }): Promise<{
    status: VerificationStatus;
    record?: AwardRecord;
    matchedBy?: 'award' | 'certificate';
    message?: string;
  }> {
    const cleanAward = (query.awardNumber || '').trim().toUpperCase();
    const cleanCert = (query.certNumber || '').trim().toUpperCase();

    if (!cleanAward && !cleanCert) {
      return {
        status: 'unverified',
        message: 'Please provide either an Award Number or an associated Certificate Number.',
      };
    }

    const all = await this.getAll();

    // Check by Award Number first
    if (cleanAward) {
      const match = all.find((a) => a.id.trim().toUpperCase() === cleanAward);
      if (match) {
        return {
          status: match.status,
          record: match,
          matchedBy: 'award',
          message: match.status === 'revoked'
            ? `Award record revoked: ${match.revocationReason || 'Disciplinary / administrative reason'}`
            : 'Award record successfully authenticated against official registry.',
        };
      }
    }

    // Check by Certificate Number
    if (cleanCert) {
      const match = all.find(
        (a) => a.associatedCertificateNumber && a.associatedCertificateNumber.trim().toUpperCase() === cleanCert
      );
      if (match) {
        return {
          status: match.status,
          record: match,
          matchedBy: 'certificate',
          message: match.status === 'revoked'
            ? `Award record revoked: ${match.revocationReason || 'Disciplinary / administrative reason'}`
            : `Award record successfully authenticated via linked Certificate #${cleanCert}.`,
        };
      }
    }

    return {
      status: 'unverified',
      message: 'No authenticated award record matches the entered credentials.',
    };
  },

  async create(data: Omit<AwardRecord, 'createdAt'>): Promise<{ success: boolean; award?: AwardRecord; error?: string }> {
    const all = await this.getAll();
    const cleanId = data.id.trim().toUpperCase();

    if (all.some((a) => a.id.trim().toUpperCase() === cleanId)) {
      return { success: false, error: `Award Number "${cleanId}" already exists.` };
    }

    const newAward: AwardRecord = {
      ...data,
      id: cleanId,
      createdAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, 'awards', cleanId), newAward);
      } catch (err) {
        console.warn('Firestore save failed, caching locally.', err);
      }
    }

    saveStoredAwards([newAward, ...all]);
    return { success: true, award: newAward };
  },

  async update(id: string, updates: Partial<AwardRecord>): Promise<boolean> {
    const all = await this.getAll();
    const index = all.findIndex((a) => a.id.toUpperCase() === id.toUpperCase());
    if (index === -1) return false;

    all[index] = { ...all[index], ...updates };
    saveStoredAwards(all);

    if (isFirebaseConfigured() && db) {
      try {
        await updateDoc(doc(db, 'awards', id), updates);
      } catch (err) {
        console.warn('Firestore update failed:', err);
      }
    }
    return true;
  },

  async revoke(id: string, reason: string): Promise<boolean> {
    return this.update(id, {
      status: 'revoked',
      revocationReason: reason,
    });
  },

  async restore(id: string): Promise<boolean> {
    return this.update(id, {
      status: 'verified',
      revocationReason: undefined,
    });
  },

  async delete(id: string): Promise<boolean> {
    const all = await this.getAll();
    const filtered = all.filter((a) => a.id.toUpperCase() !== id.toUpperCase());
    saveStoredAwards(filtered);

    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, 'awards', id));
      } catch (err) {
        console.warn('Firestore delete failed:', err);
      }
    }
    return true;
  },
};
