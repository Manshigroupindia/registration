import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_ASSETS, EVENT_DETAILS, CONTACT_DETAILS } from '../assets/constants';
import { ShieldCheck, Film, Newspaper, ExternalLink, Target, Eye, Award, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <SEO
        title="About Us | Iconic Creation Of God — Mr, Miss & Mrs"
        description="Learn about Iconic Creation Of God, presented by Janta Live News and Deven Jha Productions under the visionary direction of Deven Jha and Ritu Jha."
        canonical="https://registration.jantalive.in/about"
      />
      {/* Header Banner */}
      <section className="relative w-full bg-surface-container-lowest py-20 px-margin-mobile lg:px-margin overflow-hidden border-b border-outline-variant/30">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high border border-primary/30 mb-space-md shadow-sm">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              The Grand Genesis
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-semibold">
            About <span className="text-primary italic">Iconic Creation Of God</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-space-md leading-relaxed">
            Presented jointly by Janta Live News and Deven Jha Productions, Iconic Creation Of God stands as Northern India’s hallmark celebration of runway elegance, transformative makeup artistry, and Bollywood honours.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
          <div className="p-space-xl rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl flex flex-col gap-space-md">
            <div className="w-12 h-12 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Our Sovereign Vision
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              To establish an unshakeable, merit-based platform where emerging models, certified stylists, and visionary artists from all walks of life can step into national media spotlights without prejudice, elevating the prestige of Indian couture globally.
            </p>
            <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface mt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>Empowering diverse age groups across Mr, Miss, and Mrs divisions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>Transparent scoring systems with published audit standards</span>
              </li>
            </ul>
          </div>

          <div className="p-space-xl rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl flex flex-col gap-space-md">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container/20 text-secondary flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Our Pageant Mission
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We provide structured training masterclasses, cinematic talent scouting for genuine film productions like ‘Devi And Diva’, and formal felicitation from celebrated Bollywood luminaries like Jividha Sharma.
            </p>
            <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface mt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>Live masterclasses in HD bridal and editorial cinematic beauty</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>Legitimate career pathways to Bollywood and fashion runways</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The Producers & Presenters */}
      <section className="w-full bg-surface-container-low py-space-xl border-y border-outline-variant/30">
        <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Executive Alliances
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs font-semibold">
              Presented by Industry Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
            {/* Janta Live News */}
            <div className="p-space-xl rounded-3xl bg-surface-container border border-outline-variant/40 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="p-space-sm rounded-xl bg-primary-container/20 text-primary">
                    <Newspaper className="w-8 h-8" />
                  </div>
                  <span className="px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase font-bold">
                    Official Broadcast Partner
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Janta Live News
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
                  A high-impact digital and television media network delivering real-time coverage across politics, entertainment, culture, and social empowerment. Janta Live News guarantees nationwide broadcast reach and red-carpet coverage for all pageant finalists.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md border-t border-surface-variant/40 flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline">Media Coverage Hub: Delhi NCR</span>
                <a
                  href="https://jantalivenews.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline font-label-sm text-label-sm uppercase font-bold"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Deven Jha Productions */}
            <div className="p-space-xl rounded-3xl bg-surface-container border border-outline-variant/40 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="p-space-sm rounded-xl bg-primary-container/20 text-primary">
                    <Film className="w-8 h-8" />
                  </div>
                  <span className="px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase font-bold">
                    Production & Casting House
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Deven Jha Productions
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
                  Pioneering independent cinematic narratives, music videos, and high-fashion pageants. Spearheaded by producer Deven Jha, the banner produces meaningful storytelling, including the upcoming short film <em>‘Devi And Diva’</em>.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md border-t border-surface-variant/40 flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline">Production Studio: Delhi / Mumbai</span>
                <a
                  href="https://devenjhaproductions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline font-label-sm text-label-sm uppercase font-bold"
                >
                  <span>Explore Productions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honorable Organizers Profile */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
            Leadership
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs font-semibold">
            Honorable Organizers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
          {/* Deven Jha */}
          <div className="p-space-xl rounded-3xl bg-surface-container border border-outline-variant/30 flex flex-col sm:flex-row items-center sm:items-start gap-space-lg shadow-xl">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/40 shadow-lg">
              <img
                src={BRAND_ASSETS.organizerDeven}
                alt="Deven Jha – Organizer of Iconic Creation Of God"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Founder, Producer & Media Strategist
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mt-1 font-bold">
                Deven Jha
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm leading-relaxed">
                With a rich career bridging news broadcasting and commercial film production, Deven Jha brings rigorous stage management, ethical jury standards, and pan-Indian visibility to Iconic Creation Of God.
              </p>
              <div className="mt-space-md inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified National Pageant Organizer</span>
              </div>
            </div>
          </div>

          {/* Ritu Jha */}
          <div className="p-space-xl rounded-3xl bg-surface-container border border-outline-variant/30 flex flex-col sm:flex-row items-center sm:items-start gap-space-lg shadow-xl">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/40 shadow-lg bg-surface-container-high">
              <img
                src={BRAND_ASSETS.organizerRitu}
                alt="Ritu Jha – Managing Director & Creative Curator"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = BRAND_ASSETS.organizerRitu;
                }}
              />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Managing Director & Creative Curator
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mt-1 font-bold">
                Ritu Jha
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm leading-relaxed">
                Championing women empowerment and bridal makeup artists, Ritu Jha crafts the artistic curriculum, catwalk choreography guidelines, and dignified presentation modules for the Mr, Miss, and Mrs pageant.
              </p>
              <div className="mt-space-md inline-flex items-center justify-center sm:justify-start gap-1.5 text-primary font-label-sm text-label-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified National Pageant Curator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Organizer Secretariat Contact Strip */}
        <div className="mt-space-lg p-space-md sm:p-space-lg rounded-2xl bg-surface-container-high/60 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-space-md text-center sm:text-left shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-primary block">
                Organizer Secretariat &amp; Inquiries Desk
              </span>
              <span className="font-body-sm text-on-surface font-semibold">
                Direct desk access for auditions, nominations &amp; partnerships under Deven Jha &amp; Ritu Jha
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
            <a
              href={CONTACT_DETAILS.phoneTel}
              className="px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 text-on-surface hover:border-primary hover:text-primary transition-all text-xs font-semibold inline-flex items-center gap-1.5"
              title="Call Secretariat"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{CONTACT_DETAILS.phoneDisplay}</span>
            </a>
            <a
              href={CONTACT_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-all text-xs font-semibold inline-flex items-center gap-1.5"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={CONTACT_DETAILS.emailMailto}
              className="px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 text-on-surface hover:border-primary hover:text-primary transition-all text-xs font-semibold inline-flex items-center gap-1.5"
              title="Send Email"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>{CONTACT_DETAILS.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="w-full bg-surface-container-lowest py-space-xl border-t border-outline-variant/30">
        <div className="max-w-5xl mx-auto px-margin-mobile text-center flex flex-col items-center">
          <h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold">
            Be Part of Delhi NCR’s Grandest Celebration
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-sm">
            Auditions and candidate enrolments are currently open. Secure your stage credentials before capacity limits are reached.
          </p>
          <div className="mt-space-lg flex flex-wrap gap-space-md justify-center">
            <Link
              to="/register"
              className="px-space-xl py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase font-bold shadow-gold-glow hover:bg-primary hover:text-on-primary transition-all"
            >
              Enrol for Audition
            </Link>
            <Link
              to="/event"
              className="px-space-xl py-3.5 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-lg text-label-lg uppercase font-semibold hover:bg-surface-variant transition-colors"
            >
              Explore Activities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
