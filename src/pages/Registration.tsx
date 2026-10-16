import React from 'react';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import { BRAND_ASSETS, EVENT_DETAILS } from '../assets/constants';
import { Sparkles, Calendar, MapPin, Clock, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Registration: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-background text-on-surface">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Official Audition Dossier & Entry Portal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight gold-gradient-text">
            Iconic Creation Of God
          </h1>

          <p className="text-sm sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
            Mr / Miss / Mrs • Presented by Janta Live News & Deven Jha Productions. Secure your official candidate nomination for Delhi NCR&apos;s premier pageant & championship.
          </p>

          {/* Event Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/40">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{EVENT_DETAILS.date}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/40">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{EVENT_DETAILS.location}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/40">
              <Clock className="w-4 h-4 text-primary" />
              <span>{EVENT_DETAILS.time}</span>
            </span>
          </div>
        </div>

        {/* Core Categories Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/50 text-center">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">Masterclass</span>
            <h3 className="font-serif font-bold text-sm sm:text-base text-on-surface">Makeup Seminar</h3>
            <span className="text-xs text-primary font-semibold">₹1,500</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/50 text-center">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">Red Carpet</span>
            <h3 className="font-serif font-bold text-sm sm:text-base text-on-surface">Award Show</h3>
            <span className="text-xs text-primary font-semibold">₹3,000</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/50 text-center">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">Runway</span>
            <h3 className="font-serif font-bold text-sm sm:text-base text-on-surface">Makeup Comp.</h3>
            <span className="text-xs text-primary font-semibold">₹3,500</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/50 text-center">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">Privileged Pass</span>
            <h3 className="font-serif font-bold text-sm sm:text-base text-on-surface">VIP Guest</h3>
            <span className="text-xs text-primary font-semibold">₹5,000</span>
          </div>
        </div>

        {/* The Complete Integrated Registration Form */}
        <RegistrationForm />

        {/* Audition Rules & Candidate Benefits */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-surface-container/60 border border-outline-variant/40">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h3 className="font-serif font-bold text-base text-on-surface">Audition Protocol</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Original government ID proof and transaction receipt must match candidate credentials.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Auditions will be evaluated by Bollywood Actress Jivitha Sharma and the jury panel.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Selected candidates receive direct casting consideration for the upcoming film &quot;Devi And Diva&quot;.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container/60 border border-outline-variant/40">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="font-serif font-bold text-base text-on-surface">Candidate Benefits</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Official digitally verifiable Certificate of Participation with scannable QR verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Broadcast media coverage on Janta Live News and regional entertainment channels.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Professional stage photography and portfolio footage provided to all finalists.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
