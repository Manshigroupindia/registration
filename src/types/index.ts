export type PageantCategory = 'Mr' | 'Miss' | 'Mrs';

export type ParticipationTrack = 
  | 'Modeling'
  | 'Makeup Artist'
  | 'Makeup Competition'
  | 'Fashion Show'
  | 'Devi And Diva Casting'
  | 'Other';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Professional';

export type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'waitlisted';

export interface Registration {
  id: string; // e.g. ICG-2026-REG-1042
  fullName: string;
  dob: string;
  category: PageantCategory;
  email: string;
  phone: string;
  city: string;
  state: string;
  interestedIn: ParticipationTrack[];
  experienceLevel: ExperienceLevel;
  portfolioUrl?: string;
  shortIntroduction?: string;
  photoUrl?: string;
  termsAccepted: boolean;
  status: RegistrationStatus;
  createdAt: string;
  notes?: string;
}

export type VerificationStatus = 'verified' | 'unverified' | 'revoked' | 'under_review';

export interface CertificateRecord {
  id: string; // e.g. ICG-2026-CERT-0849
  recipientName: string;
  title: string; // e.g. "Runners-Up — Mr Iconic Category"
  category: string; // e.g. "Mr Iconic", "Makeup Masterclass Distinction"
  eventName: string; // "Iconic Creation Of God 2026"
  eventDate: string; // "21 December 2026"
  issueDate: string; // "22 December 2026"
  organizers: string; // "Deven Jha & Ritu Jha"
  presenters: string; // "Janta Live News & Deven Jha Productions"
  status: VerificationStatus;
  recipientPhotoUrl?: string;
  verificationCount: number;
  pdfUrl?: string;
  qrCodeUrl?: string;
  hashSeal?: string;
  revocationReason?: string;
  createdAt: string;
}

export interface AwardRecord {
  id: string; // Unique Award Number, e.g. ICG-AWD-2026-992
  recipientName: string;
  awardTitle: string; // e.g. "Best Makeup Artist & Creative Transformation of the Year"
  associatedCertificateNumber?: string; // e.g. ICG-2026-CERT-0412
  category: string; // e.g. "Makeup Competition & Seminar"
  eventName: string; // "Iconic Creation Of God 2026"
  eventDate: string; // "21 December 2026"
  issueDate: string; // "21 December 2026"
  guestOfHonour: string; // "Jividha Sharma — Acclaimed Bollywood Actress"
  organizers: string; // "Deven Jha & Ritu Jha"
  presenters: string; // "Janta Live News & Deven Jha Productions"
  status: VerificationStatus;
  recipientPhotoUrl?: string;
  pdfUrl?: string;
  qrCodeUrl?: string;
  revocationReason?: string;
  createdAt: string;
}

export type EnquiryStatus = 'pending' | 'in_progress' | 'resolved';

export interface ContactEnquiry {
  id: string; // e.g. ICG-ENQ-2026-001
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  enquiryType: 'Registration' | 'Sponsorship' | 'Media' | 'Certificate Verification' | 'Award Inquiry' | 'General';
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface SiteSettings {
  eventName: string;
  eventTagline: string;
  presentedBy: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  organizers: {
    devenJha: {
      name: string;
      title: string;
      bio: string;
      photoUrl: string;
      verified: boolean;
    };
    rituJha: {
      name: string;
      title: string;
      bio: string;
      photoUrl: string;
      verified: boolean;
    };
  };
  celebrityGuest: {
    name: string;
    title: string;
    bio: string;
    quote: string;
    photoUrl: string;
  };
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialHandles: {
    instagramJantaLive: string;
    instagramDevenJha: string;
    facebook: string;
    youtube: string;
  };
  partnerWebsites: {
    jantaLiveNews: string;
    devenJhaProductions: string;
  };
  filmProject: {
    title: string;
    production: string;
    description: string;
    bannerUrl: string;
  };
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
}
