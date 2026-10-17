import React, { useState } from 'react';
import { enquiryService } from '../services/enquiryService';
import { EVENT_DETAILS, CONTACT_DETAILS, BRAND_ASSETS } from '../assets/constants';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, Instagram, HelpCircle, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjyglbro';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    enquiryType: 'General' as const,
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSuccess(false);

    if (formData.phone.replace(/\D/g, '').length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: `+91 ${formData.phone.trim()}`,
          enquiryType: formData.enquiryType,
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        let errDesc = 'Failed to submit enquiry. Please try again.';
        try {
          const resJson = await response.json();
          if (resJson?.error || (resJson?.errors && resJson.errors.length > 0)) {
            const rawMsg = resJson.error || resJson.errors[0]?.message || errDesc;
            errDesc = typeof rawMsg === 'string'
              ? rawMsg.replace(/formspree/gi, 'contact service')
              : errDesc;
          }
        } catch {}
        throw new Error(errDesc);
      }

      // Also persist in local/Firestore registry for Admin Enquiries dashboard
      try {
        await enquiryService.submit(formData);
      } catch (err) {
        console.warn('Enquiry local storage notice:', err);
      }

      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        enquiryType: 'General',
        message: '',
      });
    } catch (err: any) {
      console.error('Contact Form Submission Error:', err);
      setErrorMessage(
        err?.message && !err.message.toLowerCase().includes('formspree')
          ? err.message
          : 'Unable to submit your message. Please check your connection and retry.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <SEO
        title="Contact Us | Iconic Creation Of God Secretariat Desk"
        description="Get in touch with the Iconic Creation Of God organizing committee for audition queries, sponsorship partnerships, and media accreditations."
        canonical="https://registration.jantalive.in/contact"
      />
      {/* Header */}
      <section className="relative w-full bg-surface-container-lowest py-20 px-margin-mobile lg:px-margin border-b border-outline-variant/30 text-center overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high border border-primary/30 mb-space-md shadow-sm">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              support_agent
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Secretariat Desk
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-semibold">
            Contact <span className="text-primary italic">Us</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-sm">
            Reach out to the pageant organizing committee for candidate nominations, media accreditations, and title sponsorships.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-surface-container rounded-3xl p-space-lg lg:p-space-xl border border-outline-variant/30 shadow-2xl">
            <div className="mb-space-lg">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Direct Inquiry Dossier
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-1">
                Send a Message to the Secretariat
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm uppercase text-outline">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setIsSuccess(false);
                      setFormData({ ...formData, fullName: e.target.value });
                    }}
                    placeholder="Your Full Name"
                    className="w-full px-space-md py-3 rounded-xl bg-surface-container-high text-on-surface placeholder:text-outline-variant font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm uppercase text-outline">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setIsSuccess(false);
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    placeholder="name@domain.com"
                    className="w-full px-space-md py-3 rounded-xl bg-surface-container-high text-on-surface placeholder:text-outline-variant font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm uppercase text-outline">WhatsApp Mobile *</label>
                  <div className="flex rounded-xl overflow-hidden border border-outline-variant/30">
                    <span className="bg-surface-container-highest px-space-md py-3 text-primary font-label-md text-label-md flex items-center justify-center font-bold shrink-0">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => {
                        setIsSuccess(false);
                        setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') });
                      }}
                      placeholder="98765 43210"
                      className="w-full px-space-md py-3 bg-surface-container-high text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary text-body-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm uppercase text-outline">Enquiry Type *</label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => {
                      setIsSuccess(false);
                      setFormData({ ...formData, enquiryType: e.target.value as any });
                    }}
                    className="w-full px-space-md py-3 rounded-xl bg-surface-container-high text-on-surface font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
                  >
                    <option value="General">General Inquiry</option>
                    <option value="Registration">Candidate Registration & Audition</option>
                    <option value="Sponsorship">Sponsorship & Stall Branding</option>
                    <option value="Media">Media & Press Accreditation</option>
                    <option value="Certificate Verification">Certificate Ledger Query</option>
                    <option value="Award Inquiry">Award / Trophy Query</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase text-outline">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => {
                    setIsSuccess(false);
                    setFormData({ ...formData, subject: e.target.value });
                  }}
                  placeholder="Brief summary of inquiry"
                  className="w-full px-space-md py-3 rounded-xl bg-surface-container-high text-on-surface placeholder:text-outline-variant font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase text-outline">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => {
                    setIsSuccess(false);
                    setFormData({ ...formData, message: e.target.value });
                  }}
                  placeholder="Provide details about your query or proposal..."
                  className="w-full p-space-md rounded-xl bg-surface-container-high text-on-surface placeholder:text-outline-variant font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-space-sm w-full py-4 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase font-bold tracking-wider hover:bg-primary shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit</span>
                  </>
                )}
              </button>

              {/* Success Message directly below the Submit button */}
              {isSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 text-center animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank You For Submit Our Team Reach you Shortly</span>
                </div>
              )}

              {/* Error Message directly below the Submit button */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 text-center animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Coordination Info */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Quick Cards */}
            <div className="p-space-lg rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl flex flex-col gap-space-md">
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                Secretariat Coordinates
              </h3>

              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-label-sm text-label-sm uppercase text-outline block">Event Location</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">
                    {EVENT_DETAILS.location}
                  </span>
                  <span className="text-xs text-on-surface-variant block mt-0.5">
                    Official venue ballroom address notified to accredited candidates & VIPs.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-label-sm text-label-sm uppercase text-outline block">Gala Timing</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">
                    {EVENT_DETAILS.date} • {EVENT_DETAILS.time}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-label-sm text-label-sm uppercase text-outline block">Email Inquiries</span>
                  <a
                    href={CONTACT_DETAILS.emailMailto}
                    className="font-body-md text-body-md text-on-surface font-semibold hover:text-primary transition-colors block break-all"
                  >
                    {CONTACT_DETAILS.email}
                  </a>
                  <span className="text-xs text-on-surface-variant block mt-0.5">
                    Click to send official inquiry or collaboration proposal.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="font-label-sm text-label-sm uppercase text-outline block">Phone / WhatsApp Secretariat</span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-0.5">
                    <a
                      href={CONTACT_DETAILS.phoneTel}
                      className="font-body-md text-body-md text-on-surface font-semibold hover:text-primary transition-colors inline-flex items-center gap-1.5"
                    >
                      {CONTACT_DETAILS.phoneDisplay}
                    </a>
                    <span className="text-outline-variant text-xs">•</span>
                    <a
                      href={CONTACT_DETAILS.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 text-xs font-semibold transition-all"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp Link</span>
                    </a>
                  </div>
                  <span className="text-xs text-on-surface-variant block mt-1">
                    Direct helpline for registration, sponsorship, and verification.
                  </span>
                </div>
              </div>
            </div>

            {/* Honorable Organizers Contact Card */}
            <div className="p-space-lg rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-variant/40">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Executive Leadership
                  </span>
                  <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                    Honorable Organizers
                  </h3>
                </div>
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {/* Deven Jha */}
                <div className="p-space-md rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center gap-space-sm">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-primary/40 shadow-sm">
                    <img
                      src={BRAND_ASSETS.organizerDeven}
                      alt="Deven Jha"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-label-md text-label-md font-bold text-on-surface truncate">
                      Deven Jha
                    </h4>
                    <span className="text-[11px] uppercase tracking-wider text-primary font-semibold block truncate">
                      Producer &amp; Founder
                    </span>
                    <span className="text-[11px] text-on-surface-variant block truncate">
                      Deven Jha Productions
                    </span>
                  </div>
                </div>

                {/* Ritu Jha */}
                <div className="p-space-md rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center gap-space-sm">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-primary/40 shadow-sm bg-surface-container">
                    <img
                      src={BRAND_ASSETS.organizerRitu}
                      alt="Ritu Jha"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = BRAND_ASSETS.organizerRitu;
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-label-md text-label-md font-bold text-on-surface truncate">
                      Ritu Jha
                    </h4>
                    <span className="text-[11px] uppercase tracking-wider text-primary font-semibold block truncate">
                      Managing Director &amp; Curator
                    </span>
                    <span className="text-[11px] text-on-surface-variant block truncate">
                      Pageant &amp; Talent Ethos
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Organizer Contact Links */}
              <div className="pt-space-xs flex flex-wrap items-center gap-2">
                <a
                  href={CONTACT_DETAILS.phoneTel}
                  className="flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl bg-surface-container-high hover:border-primary border border-outline-variant/30 text-on-surface hover:text-primary transition-all text-xs font-semibold inline-flex items-center justify-center gap-2"
                  title="Call Organizers Secretariat"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{CONTACT_DETAILS.phoneDisplay}</span>
                </a>
                <a
                  href={CONTACT_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 transition-all text-xs font-semibold inline-flex items-center justify-center gap-2 shadow-sm"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Direct</span>
                </a>
                <a
                  href={CONTACT_DETAILS.emailMailto}
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-container-high hover:border-primary border border-outline-variant/30 text-on-surface hover:text-primary transition-all text-xs font-semibold inline-flex items-center justify-center gap-2 break-all"
                  title="Email Organizers Secretariat"
                >
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{CONTACT_DETAILS.email}</span>
                </a>
              </div>
            </div>

            {/* Official Handles */}
            <div className="p-space-lg rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl flex flex-col gap-space-sm">
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                Official Media Handles
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Follow our presenters on Instagram for live updates, behind-the-scenes auditions, and casting announcements.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="https://instagram.com/jantalivenews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary text-on-surface transition-colors"
                >
                  <span className="flex items-center gap-2 font-body-sm text-body-sm font-semibold">
                    <Instagram className="w-4 h-4 text-primary" />
                    <span>@jantalivenews</span>
                  </span>
                  <span className="font-label-sm text-[11px] uppercase text-outline">Live Broadcast</span>
                </a>
                <a
                  href="https://instagram.com/devenjhaproductions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary text-on-surface transition-colors"
                >
                  <span className="flex items-center gap-2 font-body-sm text-body-sm font-semibold">
                    <Instagram className="w-4 h-4 text-primary" />
                    <span>@devenjhaproductions</span>
                  </span>
                  <span className="font-label-sm text-[11px] uppercase text-outline">Film & Runway</span>
                </a>
              </div>
            </div>

            {/* FAQ Teaser */}
            <div className="p-space-lg rounded-3xl bg-surface-container-low border border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <span className="font-title-lg text-title-lg text-on-surface font-semibold block">Need Instant Answers?</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Review our frequently asked questions.</span>
                </div>
              </div>
              <Link
                to="/faq"
                className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase font-bold hover:bg-primary transition-all shrink-0"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
