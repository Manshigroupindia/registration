import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="relative w-full bg-surface-container-lowest py-16 px-margin-mobile lg:px-margin border-b border-outline-variant/30 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high border border-primary/30 mb-space-sm shadow-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Legal Governance
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-semibold">
            Privacy Policy
          </h1>
          <p className="font-body-sm text-body-sm text-outline mt-1">
            Last Updated: 16 October 2026 • Document Version 2.4
          </p>
        </div>
      </section>

      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-4xl mx-auto text-on-surface-variant font-body-md text-body-md leading-relaxed flex flex-col gap-space-lg">
        <div className="p-space-md rounded-2xl bg-surface-container-high/60 border border-primary/20 text-xs text-outline">
          <em>Notice: This Privacy Policy defines the operational data handling protocols of Iconic Creation Of God presented by Janta Live News & Deven Jha Productions. Editable organizer placeholders are maintained pending final legal advisory sign-off.</em>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">1. Information We Collect</h2>
          <p>
            When you register for Iconic Creation Of God (Mr, Miss, or Mrs categories, or the Makeup Seminar & Competition), we collect your full legal name, date of birth, contact email address, WhatsApp mobile number, residential city and state, professional experience level, and optional portfolio links or photograph headshots.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">2. Use of Candidate Information</h2>
          <p>
            Collected candidate data is strictly utilized for:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Pageant audition badge generation and backstage credentialing</li>
            <li>Direct communication regarding rehearsal timetables, wardrobe styling guidelines, and venue entry passes</li>
            <li>Verification against unauthorized duplicate submissions</li>
            <li>Casting consideration by Deven Jha Productions for cinematic short film scouting (‘Devi And Diva’)</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">3. Public Ledger & Credential Verification</h2>
          <p>
            Public certificate and award verification registries display solely the recipient’s name, conferred pageant title, event date, unique certificate/award serial, and verification status. Personal private credentials—such as mobile phone numbers, residential addresses, and date of birth—are never exposed in public lookup ledger responses.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">4. Data Security & Storage</h2>
          <p>
            Submissions are transmitted via encrypted 256-bit protocols. All digital entries are archived within authorized database infrastructure managed by the organizers. We enforce strict administrative access limits, ensuring zero commercial distribution or unauthorized disclosure to external third parties.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">5. Contact Regarding Privacy Inquiries</h2>
          <p>
            For inquiries regarding your stored registration records or to request data amendment, contact our coordination desk at <code className="text-primary font-mono">contact@iconiccreationofgod.com</code>.
          </p>
        </div>
      </section>
    </div>
  );
};
