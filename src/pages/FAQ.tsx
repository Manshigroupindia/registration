import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Registration & Eligibility',
      q: 'Who can register for the Mr, Miss, and Mrs categories?',
      a: 'The pageant welcomes aspiring and seasoned candidates across India. The "Mr" category is open to unmarried/married male contenders. "Miss" is open to unmarried female contenders. "Mrs" celebrates married, widowed, or divorced women of grace and accomplishment.',
    },
    {
      category: 'Registration & Eligibility',
      q: 'Is prior modeling or runway experience required to audition?',
      a: 'No prior ramp experience is mandatory. Candidates of beginner, intermediate, and professional experience levels are eligible. Grooming mentors and catwalk choreographers will conduct orientation sessions on the event day.',
    },
    {
      category: 'Event & Venue Details',
      q: 'When and where will the event take place?',
      a: 'The event is scheduled for 21 December 2026 in the National Capital Region (Delhi / NCR). Program timings run from 10:00 AM to 6:00 PM IST. Registered candidates will receive their designated venue hall address and entry pass badge via WhatsApp.',
    },
    {
      category: 'Makeup Seminar & Competition',
      q: 'What is included in the Makeup Seminar and Competition track?',
      a: 'The morning session features a masterclass on HD cinematic sculpting and bridal transformations. The afternoon features a live competitive arena where stylists showcase skills on live models before Bollywood and media juries.',
    },
    {
      category: 'Certificates & Verification',
      q: 'How does the Certificate Verification Ledger work?',
      a: 'Every official certificate carries a unique identifier (e.g. ICG-2026-CERT-XXXX) and a cryptographic QR code. Any party can verify its authenticity permanently on our public Certificate Verification page.',
    },
    {
      category: 'Awards & Felicitation',
      q: 'Who is the Celebrity Guest presenting the awards?',
      a: 'Acclaimed Bollywood actress Jividha Sharma is our distinguished Guest of Honour. She will officiate the grand trophy and sash presentations during the twilight Award Show.',
    },
    {
      category: 'Film Casting',
      q: 'What is the casting opportunity for ‘Devi And Diva’?',
      a: 'Deven Jha Productions will scout standout contestants and makeup artists participating in this edition for potential roles and styling assignments in the upcoming cinematic short film ‘Devi And Diva’. Final selection is subject to director prerogative.',
    },
    {
      category: 'General & Support',
      q: 'How do I resolve a name misspelling on an issued certificate?',
      a: 'You can submit a ticket directly on our Contact Us page or reach the verification concierge. The secretariat will cross-verify your physical credential and issue an updated ledger index.',
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      <SEO
        title="Frequently Asked Questions | Iconic Creation Of God Pageant & Awards"
        description="Find answers about audition criteria, category guidelines, registration fees, seminar schedules, venue access, and certificate verification."
        canonical="https://registration.jantalive.in/faq"
      />
      {/* Header */}
      <section className="relative w-full bg-surface-container-lowest py-20 px-margin-mobile lg:px-margin border-b border-outline-variant/30 text-center overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high border border-primary/30 mb-space-md shadow-sm">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Knowledge Base
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-semibold">
            Frequently Asked <span className="text-primary italic">Questions</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-sm">
            Everything you need to know about candidate enrolments, categories, masterclass access, and credential verifications.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-4xl mx-auto">
        <div className="flex flex-col gap-space-md">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-surface-container border-primary/50 shadow-lg'
                    : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-space-lg flex items-center justify-between text-left gap-space-md focus:outline-none"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                      {faq.category}
                    </span>
                    <span className="font-title-lg text-title-lg text-on-surface font-semibold">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-space-lg pb-space-lg pt-0 text-on-surface-variant font-body-md text-body-md leading-relaxed border-t border-surface-variant/30 mt-2">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-space-xl p-space-lg rounded-3xl bg-surface-container border border-outline-variant/30 text-center flex flex-col items-center">
          <MessageSquare className="w-8 h-8 text-primary mb-space-xs" />
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
            Still Have Questions?
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-1">
            Our pageant desk is active from 10:00 AM to 7:00 PM IST to address candidate queries and sponsorship inquiries.
          </p>
          <Link
            to="/contact"
            className="mt-space-md px-space-xl py-3 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold shadow-gold-glow hover:bg-primary hover:text-on-primary transition-all"
          >
            Contact Secretariat
          </Link>
        </div>
      </section>
    </div>
  );
};
