import React from 'react';
import { Scale } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const TermsAndConditions: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <SEO
        title="Terms & Conditions | Iconic Creation Of God"
        description="Review the official terms, candidate code of conduct, registration guidelines, and event policies for Iconic Creation Of God."
        canonical="https://registration.jantalive.in/terms"
      />
      <section className="relative w-full bg-surface-container-lowest py-16 px-margin-mobile lg:px-margin border-b border-outline-variant/30 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high border border-primary/30 mb-space-sm shadow-sm">
            <Scale className="w-4 h-4 text-primary" />
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Pageant Regulations
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-semibold">
            Terms & Conditions
          </h1>
          <p className="font-body-sm text-body-sm text-outline mt-1">
            Last Updated: 16 October 2026 • Edition 2026
          </p>
        </div>
      </section>

      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-4xl mx-auto text-on-surface-variant font-body-md text-body-md leading-relaxed flex flex-col gap-space-lg">
        <div className="p-space-md rounded-2xl bg-surface-container-high/60 border border-primary/20 text-xs text-outline">
          <em>Important Notice: These terms govern candidate participation, audition protocols, and credential issuance for Iconic Creation Of God presented by Janta Live News and Deven Jha Productions.</em>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">1. Candidate Eligibility & Authenticity</h2>
          <p>
            By submitting an official registration, candidate declares under solemn affirmation that all details (full name, date of birth, category eligibility, contact numbers) are genuine and accurate. Submission of false identity credentials will lead to immediate disqualification and revocation of any conferred awards or certificates.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">2. Jury Adjudication & Scoring Finality</h2>
          <p>
            Evaluation criteria for runway walks, poise, presentation, styling, and makeup artistry transformations are determined independently by the officially appointed celebrity and media jury. All jury scorecards, coronation decisions, and category runner-up determinations remain sovereign and final.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">3. Media Rights & Broadcast Consent</h2>
          <p>
            Candidates acknowledge that the event will be chronicled, photographed, and broadcast by Janta Live News and Deven Jha Productions across television, digital streaming, social channels, and print publications. Candidates grant the organizers irrevocable authorization to feature their stage appearances and photo calls for pageant archival and promotional releases.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">4. Film Casting Disclaimers (‘Devi And Diva’)</h2>
          <p>
            Audition scouting for the upcoming cinematic short film <em>‘Devi And Diva’</em> constitutes an exclusive creative opportunity provided by Deven Jha Productions. Candidate participation in the pageant does not constitute a legal guarantee of film casting or commercial employment. Role allocations remain subject solely to directorial discretion and production agreements.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">5. Revocation of Credentials</h2>
          <p>
            The Executive Committee reserves the right to revoke or void any issued certificate or award title in the event of documented code-of-conduct violations, unverified impersonation, or actions bringing disrepute to the pageant ethos or presenting entities.
          </p>
        </div>
      </section>
    </div>
  );
};
