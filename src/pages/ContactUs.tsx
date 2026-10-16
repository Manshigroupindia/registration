import React, { useState } from 'react';
import { enquiryService } from '../services/enquiryService';
import { EVENT_DETAILS } from '../assets/constants';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, Instagram, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

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
  const [successId, setSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.phone.replace(/\D/g, '').length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    const res = await enquiryService.submit(formData);
    setSubmitting(false);

    if (res.success && res.enquiry) {
      setSuccessId(res.enquiry.id);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        enquiryType: 'General',
        message: '',
      });
    } else {
      setErrorMessage('Failed to transmit message. Please try again or contact via WhatsApp.');
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

            {successId ? (
              <div className="p-space-lg rounded-2xl bg-surface-container-high border border-primary/40 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-primary" />
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="font-body-md text-body-md text-on-surface">
                  Your ticket has been logged under Reference ID:
                </p>
                <div className="px-space-md py-2 rounded-xl bg-surface-container-lowest font-mono text-primary font-bold text-lg border border-primary/30">
                  {successId}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                  Our coordination desk will respond to your registered email address or WhatsApp number within 24 hours.
                </p>
                <button
                  onClick={() => setSuccessId(null)}
                  className="mt-2 px-space-lg py-2 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
                {errorMessage && (
                  <div className="p-space-md rounded-xl bg-secondary-container text-on-secondary-container font-body-sm text-body-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm uppercase text-outline">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        placeholder="98765 43210"
                        className="w-full px-space-md py-3 bg-surface-container-high text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary text-body-md"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm uppercase text-outline">Enquiry Type *</label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value as any })}
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
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query or proposal..."
                    className="w-full p-space-md rounded-xl bg-surface-container-high text-on-surface placeholder:text-outline-variant font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-space-sm w-full py-4 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase font-bold tracking-wider hover:bg-primary shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Transmitting Ticket...' : 'Dispatch Message'}</span>
                </button>
              </form>
            )}
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
                <div>
                  <span className="font-label-sm text-label-sm uppercase text-outline block">Email Inquiries</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">
                    contact@iconiccreationofgod.com
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-label-sm text-label-sm uppercase text-outline block">WhatsApp Secretariat</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">
                    +91 98765 43210
                  </span>
                </div>
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
