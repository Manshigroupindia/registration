import { CertificateRecord, VerificationStatus } from '../types';
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_CERTIFICATES } from './seedData';
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'icg_certificates';

function getStoredCertificates(): CertificateRecord[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_CERTIFICATES));
    return INITIAL_CERTIFICATES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_CERTIFICATES;
  }
}

function saveStoredCertificates(records: CertificateRecord[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
}

export const certificateService = {
  async getAll(): Promise<CertificateRecord[]> {
    if (isFirebaseConfigured() && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'certificates'));
        if (!querySnapshot.empty) {
          const list: CertificateRecord[] = [];
          querySnapshot.forEach((d) => list.push(d.data() as CertificateRecord));
          return list;
        }
      } catch (err) {
        console.warn('Firestore fetch failed, using local storage fallback.', err);
      }
    }
    return getStoredCertificates();
  },

  async verify(identifier: string): Promise<{ status: VerificationStatus; record?: CertificateRecord; message?: string }> {
    const cleanId = identifier.trim().toUpperCase();
    if (!cleanId) {
      return { status: 'unverified', message: 'Please provide a valid certificate identifier.' };
    }

    const all = await this.getAll();
    const record = all.find((c) => c.id.trim().toUpperCase() === cleanId);

    if (!record) {
      return {
        status: 'unverified',
        message: 'The certificate number entered does not match any authenticated record in the public ledger.',
      };
    }

    // Increment verification count
    record.verificationCount = (record.verificationCount || 0) + 1;
    saveStoredCertificates(all);

    if (isFirebaseConfigured() && db) {
      try {
        await updateDoc(doc(db, 'certificates', record.id), {
          verificationCount: record.verificationCount,
        });
      } catch (err) {
        // silent
      }
    }

    return {
      status: record.status,
      record,
      message: record.status === 'revoked' 
        ? `This credential was officially revoked. Reason: ${record.revocationReason || 'Administrative revocation'}`
        : record.status === 'under_review'
        ? 'This credential is currently undergoing jury verification and secretariat sign-off.'
        : 'Credential successfully verified and authentic.',
    };
  },

  async create(data: Omit<CertificateRecord, 'createdAt' | 'verificationCount'>): Promise<{ success: boolean; certificate?: CertificateRecord; error?: string }> {
    const all = await this.getAll();
    const cleanId = data.id.trim().toUpperCase();

    if (all.some((c) => c.id.trim().toUpperCase() === cleanId)) {
      return { success: false, error: `Certificate ID "${cleanId}" already exists.` };
    }

    const newCert: CertificateRecord = {
      ...data,
      id: cleanId,
      verificationCount: 0,
      createdAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, 'certificates', cleanId), newCert);
      } catch (err) {
        console.warn('Firestore save failed, caching locally.', err);
      }
    }

    saveStoredCertificates([newCert, ...all]);
    return { success: true, certificate: newCert };
  },

  async update(id: string, updates: Partial<CertificateRecord>): Promise<boolean> {
    const all = await this.getAll();
    const index = all.findIndex((c) => c.id.toUpperCase() === id.toUpperCase());
    if (index === -1) return false;

    all[index] = { ...all[index], ...updates };
    saveStoredCertificates(all);

    if (isFirebaseConfigured() && db) {
      try {
        await updateDoc(doc(db, 'certificates', id), updates);
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
    const filtered = all.filter((c) => c.id.toUpperCase() !== id.toUpperCase());
    saveStoredCertificates(filtered);

    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, 'certificates', id));
      } catch (err) {
        console.warn('Firestore delete failed:', err);
      }
    }
    return true;
  },
};
