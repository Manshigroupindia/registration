import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { awardService } from '../services/awardService';
import { pdfService } from '../services/pdfService';
import { AwardRecord, VerificationStatus } from '../types';
import { QRCodeDisplay } from '../components/common/QRCodeDisplay';
import { SEO } from '../components/common/SEO';
import { 
  Trophy, 
  Search, 
  FileCheck, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Link as LinkIcon, 
  ShieldAlert,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const AwardVerification: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAward = searchParams.get('award') || 'ICG-AWD-2026-992';
  const initialCert = searchParams.get('cert') || '';

  const [lookupMode, setLookupMode] = useState<'award' | 'cert'>(initialCert ? 'cert' : 'award');
  const [primaryInput, setPrimaryInput] = useState(initialCert || initialAward);
  const [secondaryInput, setSecondaryInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<VerificationStatus | 'idle'>('idle');
  const [record, setRecord] = useState<AwardRecord | null>(null);
  const [matchedBy, setMatchedBy] = useState<'award' | 'certificate' | undefined>(undefined);
  const [message, setMessage] = useState<string>('');

  const executeVerify = async (queryVal: string, mode: 'award' | 'cert', crossCert?: string) => {
    if (!queryVal.trim()) return;
    setLoading(true);

    const query = mode === 'award'
      ? { awardNumber: queryVal.trim(), certNumber: crossCert?.trim() || undefined }
      : { certNumber: queryVal.trim() };

    const res = await awardService.verify(query);
    setLoading(false);
    setStatus(res.status);
    setRecord(res.record || null);
    setMatchedBy(res.matchedBy);
    setMessage(res.message || '');
  };

  useEffect(() => {
    if (initialAward || initialCert) {
      executeVerify(
        lookupMode === 'award' ? initialAward : initialCert,
        lookupMode
      );
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupMode === 'award') {
      setSearchParams({ award: primaryInput.trim() });
    } else {
      setSearchParams({ cert: primaryInput.trim() });
    }
    executeVerify(primaryInput.trim(), lookupMode, secondaryInput.trim());
  };

  const handleModeSwitch = (mode: 'award' | 'cert') => {
    setLookupMode(mode);
    if (mode === 'award') {
      setPrimaryInput('ICG-AWD-2026-992');
    } else {
      setPrimaryInput('ICG-2026-CERT-0412');
    }
  };

  const fillSample = (code: string, mode: 'award' | 'cert' = 'award') => {
    setLookupMode(mode);
    setPrimaryInput(code);
    executeVerify(code, mode);
  };

  const handleDownloadPdf = async () => {
    if (!record) return;
    await pdfService.downloadElementAsPdf('award-citation-card', `${record.id}_AwardCitation.pdf`);
  };

  return (
    <div className="flex flex-col w-full relative min-h-screen">
      <SEO
        title="Verify Award & Trophy | Iconic Creation Of God Honors Registry"
        description="Verify official awards, trophies, and felicitations conferred at Iconic Creation Of God with authentic citation records and celebrity endorsements."
        canonical="https://registration.jantalive.in/verify-award"
      />
      {/* Ambient Red-Carpet Gold Radial Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(242,193,72,0.12)_0%,rgba(23,19,15,0)_70%)] opacity-80 z-0"></div>

      {/* Hero Portal Banner */}
      <section className="relative z-10 w-full px-margin-mobile lg:px-margin pt-12 pb-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high border border-primary/30 shadow-sm mb-space-md">
          <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            military_tech
          </span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
            Official Honors & Laurels Crypt
          </span>
        </div>

        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-normal max-w-4xl font-semibold">
          Award Verification <span className="text-primary italic font-serif">Portal</span>
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-sm leading-relaxed">
          Verify prestigious awards, crystal trophies, and jury honors officially conferred at the grand stage of Iconic Creation Of God 2026.
        </p>

        {/* Stat Ribbon / Security Micro-Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm w-full max-w-4xl mt-space-xl text-left">
          <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider block">Security Standard</span>
            <span className="font-title-lg text-title-lg text-primary font-semibold mt-space-xs block flex items-center gap-1">
              <span className="material-symbols-outlined text-base">verified_user</span> SHA-256 Gilt
            </span>
          </div>
          <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider block">Archived Laurels</span>
            <span className="font-title-lg text-title-lg text-on-surface font-semibold mt-space-xs block">Official Honours</span>
          </div>
          <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider block">Official Registry</span>
            <span className="font-title-lg text-title-lg text-tertiary font-semibold mt-space-xs block">Janta Live News</span>
          </div>
          <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider block">Authentication</span>
            <span className="font-title-lg text-title-lg text-primary font-semibold mt-space-xs block flex items-center gap-1">
              <span className="material-symbols-outlined text-base">lock</span> Instant Seal
            </span>
          </div>
        </div>
      </section>

      {/* Main Portal Section */}
      <section className="relative z-10 w-full px-margin-mobile lg:px-margin pb-space-xl max-w-6xl mx-auto">
        {/* Verification Query Interface Box */}
        <div className="p-space-lg lg:p-space-xl rounded-3xl bg-surface-container border border-outline-variant/40 shadow-2xl relative overflow-hidden">
          {/* Mode Toggle Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md mb-space-lg pb-space-md border-b border-surface-variant/40">
            <div className="flex items-center gap-space-xs p-1 rounded-full bg-surface-container-low border border-outline-variant/30 max-w-max">
              <button
                type="button"
                onClick={() => handleModeSwitch('award')}
                className={`px-space-md py-1.5 rounded-full font-label-md text-label-md uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  lookupMode === 'award'
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Search by Award No.</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('cert')}
                className={`px-space-md py-1.5 rounded-full font-label-md text-label-md uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  lookupMode === 'cert'
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>Search by Certificate No.</span>
              </button>
            </div>

            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-primary text-sm">lock_clock</span>
              Official Registry Sync: Active
            </div>
          </div>

          {/* Search Query Form */}
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-end">
            <div className="lg:col-span-5 flex flex-col gap-space-xs">
              <label className="font-label-md text-label-md uppercase tracking-wider text-tertiary flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-base">workspace_premium</span>
                {lookupMode === 'award' ? 'Unique Award Number *' : 'Linked Certificate Number *'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={primaryInput}
                  onChange={(e) => setPrimaryInput(e.target.value)}
                  placeholder={lookupMode === 'award' ? 'e.g. ICG-AWD-2026-992' : 'e.g. ICG-2026-CERT-0412'}
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 shadow-inner placeholder:text-outline/40 tracking-wider uppercase font-semibold"
                />
              </div>
            </div>

            {lookupMode === 'award' && (
              <div className="lg:col-span-4 flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md uppercase tracking-wider text-outline flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  Linked Certificate (Optional)
                </label>
                <input
                  type="text"
                  value={secondaryInput}
                  onChange={(e) => setSecondaryInput(e.target.value)}
                  placeholder="e.g. ICG-2026-CERT-0412"
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 shadow-inner placeholder:text-outline/40 tracking-wider uppercase"
                />
              </div>
            )}

            <div className={lookupMode === 'award' ? 'lg:col-span-3 flex' : 'lg:col-span-7 flex'}>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-space-md rounded-full bg-primary text-on-primary font-label-lg text-label-lg uppercase font-bold tracking-wider hover:bg-primary-fixed-dim shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">verified</span>
                <span>{loading ? 'Verifying Crypt...' : 'Verify Award Record'}</span>
              </button>
            </div>
          </form>

          {/* Quick Preset Buttons */}
          <div className="mt-space-md pt-space-sm flex flex-wrap items-center justify-between gap-space-sm text-outline font-body-sm text-body-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">
                Quick Test Samples:
              </span>
              <button
                onClick={() => fillSample('ICG-AWD-2026-992', 'award')}
                className="text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant"
              >
                Pooja Kashyap (Best MUA Trophy)
              </button>
              <span className="text-outline-variant">•</span>
              <button
                onClick={() => fillSample('ICG-AWD-2026-884', 'award')}
                className="text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant"
              >
                Rohan Mehra (Mr. Runway Distinction)
              </button>
              <span className="text-outline-variant">•</span>
              <button
                onClick={() => fillSample('ICG-AWD-2026-REV', 'award')}
                className="text-on-surface-variant hover:text-secondary transition-colors underline decoration-outline-variant"
              >
                Revoked Sample
              </button>
              <span className="text-outline-variant">•</span>
              <button
                onClick={() => fillSample('ICG-AWD-2026-000', 'award')}
                className="text-on-surface-variant hover:text-error transition-colors underline decoration-outline-variant"
              >
                Invalid Sample
              </button>
            </div>
            <a href="#audit-log" className="hover:text-primary transition-colors flex items-center gap-1 font-label-sm text-label-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">history_edu</span>
              Review Audit Log
            </a>
          </div>
        </div>

        {/* Live Result Area */}
        <div className="mt-space-xl" id="results-display-area">
          {/* 1. AUTHENTICATED AWARD RECORD */}
          {status === 'verified' && record && (
            <div
              id="award-citation-card"
              className="rounded-3xl bg-surface-container border border-primary/40 shadow-2xl overflow-hidden transition-all duration-500"
            >
              {/* Top Banner */}
              <div className="relative bg-gradient-to-r from-primary-container via-surface-container-high to-primary-container px-space-md lg:px-space-xl py-space-sm flex flex-col md:flex-row items-center justify-between gap-space-sm shadow-sm overflow-hidden">
                <div className="flex items-center gap-space-sm z-10">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm font-bold">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg uppercase tracking-widest text-on-surface font-bold">
                      Officially Verified Award Record
                    </span>
                    <span className="font-label-sm text-label-sm text-on-primary-container tracking-wide font-medium">
                      Authenticated by Janta Live News & Deven Jha Productions Council
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs z-10">
                  <span className="px-space-sm py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1 font-bold">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Ledger Active • ID: {record.id}
                  </span>
                </div>
              </div>

              {/* Certificate & Trophy Showcase Grid */}
              <div className="p-space-lg lg:p-space-xl grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                {/* Left Column: Visual Laurels & Awardee Avatar */}
                <div className="lg:col-span-4 flex flex-col gap-space-md">
                  <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-lg aspect-[4/5] flex items-center justify-center border border-primary/20">
                    {record.recipientPhotoUrl ? (
                      <img
                        src={record.recipientPhotoUrl}
                        alt={record.recipientName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-surface-container text-primary font-display-lg text-6xl">
                        {record.recipientName.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-space-md left-space-md p-space-xs rounded-full bg-surface/90 backdrop-blur-md border border-primary/30 shadow-md flex items-center gap-2 px-3">
                      <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                        military_tech
                      </span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                        Trophy Laureate
                      </span>
                    </div>

                    <div className="absolute bottom-space-md left-space-md right-space-md text-left">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary block font-semibold">
                        Official Laureate
                      </span>
                      <h3 className="font-headline-md text-headline-md text-on-surface font-semibold leading-tight mt-1">
                        {record.recipientName}
                      </h3>
                      <span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                        {record.category}
                      </span>
                    </div>
                  </div>

                  {/* Paired Credential Box */}
                  {record.associatedCertificateNumber && (
                    <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between text-outline">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider">Paired Certificate</span>
                        <LinkIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-body-md text-body-md text-on-surface font-semibold tracking-wider font-mono">
                          {record.associatedCertificateNumber}
                        </span>
                        <Link
                          to={`/verify-certificate?id=${record.associatedCertificateNumber}`}
                          className="text-primary hover:text-primary-fixed font-label-sm text-label-sm uppercase tracking-wider underline font-bold"
                        >
                          Inspect Cert →
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Cryptographic QR */}
                  <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-space-md">
                    <QRCodeDisplay
                      value={`${window.location.origin}/verify-award?award=${record.id}`}
                      size={56}
                      className="bg-white p-1 rounded-xl"
                      darkColor="#090604"
                      lightColor="#ffffff"
                    />
                    <div className="flex flex-col text-left">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">
                        Cryptographic Seal
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Scan with smartphone camera to verify instant authenticity.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Citation & Ledger Details */}
                <div className="lg:col-span-8 flex flex-col justify-between gap-space-lg">
                  <div>
                    <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-widest mb-space-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">stars</span>
                      <span>Grand Award Title & Distinction</span>
                    </div>

                    <h2 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface font-semibold tracking-tight">
                      {record.awardTitle}
                    </h2>

                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
                      Conferred in public gala assembly before esteemed jury panels for exemplary creative brilliance, precision runway aesthetics, and exceptional contribution to the luxury beauty and fashion discipline.
                    </p>

                    {/* Detailed Attribute Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-lg">
                      <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Conferred Laureate</span>
                        <span className="font-title-lg text-title-lg text-on-surface font-semibold mt-1">{record.recipientName}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Delhi NCR Chapter</span>
                      </div>

                      <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Unique Award Reference</span>
                        <span className="font-title-lg text-title-lg text-primary font-semibold mt-1 tracking-wider font-mono">{record.id}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Trophy Category A-Gold</span>
                      </div>

                      <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Competition Category</span>
                        <span className="font-title-lg text-title-lg text-on-surface font-semibold mt-1">{record.category}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{record.eventName}</span>
                      </div>

                      <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Conferment Date & Stage</span>
                        <span className="font-title-lg text-title-lg text-on-surface font-semibold mt-1">{record.eventDate}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Delhi / NCR</span>
                      </div>

                      <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Guest of Honour</span>
                        <span className="font-title-lg text-title-lg text-tertiary font-semibold mt-1">{record.guestOfHonour}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Bollywood Actress</span>
                      </div>

                      <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Honorable Organizers</span>
                        <span className="font-title-lg text-title-lg text-on-surface font-semibold mt-1">{record.organizers}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Founders, Iconic Creation Of God</span>
                      </div>
                    </div>

                    {/* Media Endorsement */}
                    <div className="mt-space-md p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-primary text-xl">verified</span>
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Official Media Presentation</span>
                          <span className="font-body-md text-body-md text-on-surface font-medium">{record.presenters}</span>
                        </div>
                      </div>
                      <span className="px-space-sm py-1 rounded bg-surface-container text-tertiary font-label-sm text-label-sm uppercase font-semibold">
                        100% Validated
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons Ribbon */}
                  <div className="flex flex-wrap items-center gap-space-sm pt-space-md border-t border-surface-variant/40">
                    <button
                      onClick={handleDownloadPdf}
                      className="px-space-lg py-3 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-gold-glow flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Award Citation PDF</span>
                    </button>
                    <button
                      onClick={() => pdfService.printPage()}
                      className="px-space-lg py-3 rounded-full bg-surface-container-high border border-outline-variant/40 text-on-surface font-label-md text-label-md uppercase font-semibold hover:bg-surface-bright transition-all duration-300 flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Award Record</span>
                    </button>
                    {record.associatedCertificateNumber && (
                      <Link
                        to={`/verify-certificate?id=${record.associatedCertificateNumber}`}
                        className="px-space-lg py-3 rounded-full bg-surface-container-low border border-primary/30 text-tertiary font-label-md text-label-md uppercase font-semibold hover:text-primary transition-all duration-300 flex items-center gap-2"
                      >
                        <FileCheck className="w-4 h-4" />
                        <span>Verify Associated Certificate</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. INVALID STATE */}
          {status === 'unverified' && (
            <div className="rounded-3xl bg-surface-container border border-error/40 p-space-lg lg:p-space-xl shadow-2xl transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-space-lg">
                <div className="w-20 h-20 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 shadow-lg">
                  <XCircle className="w-10 h-10" />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-error-container/30 text-error font-label-sm text-label-sm uppercase tracking-wider max-w-max mb-space-xs self-center md:self-start">
                    <span>Attention: Unregistered Reference</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    Award Record Not Found in Crypt
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-2xl">
                    We could not authenticate an award record matching the query <span className="text-error font-semibold uppercase">"{primaryInput}"</span>. Please re-check the identifier engraved upon your physical trophy plate or award citation scroll.
                  </p>
                  <div className="mt-space-md flex flex-wrap items-center justify-center md:justify-start gap-space-sm">
                    <button
                      onClick={() => fillSample('ICG-AWD-2026-992', 'award')}
                      className="px-space-md py-2 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-md text-label-md uppercase hover:bg-surface-bright transition-colors"
                    >
                      Load Verified Sample
                    </button>
                    <Link
                      to="/contact"
                      className="px-space-md py-2 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1 shadow-md"
                    >
                      <span className="material-symbols-outlined text-sm">support_agent</span>
                      Contact Verification Secretariat
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. REVOKED STATE */}
          {status === 'revoked' && record && (
            <div className="rounded-3xl bg-surface-container border border-error p-space-lg lg:p-space-xl shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-space-lg">
                <div className="w-20 h-20 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 shadow-lg">
                  <ShieldAlert className="w-10 h-10" />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-error-container/30 text-error font-label-sm text-label-sm uppercase tracking-wider max-w-max mb-space-xs self-center md:self-start">
                    <span>Notice: Award Revoked</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    Award Officially Revoked & Nullified
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-2xl">
                    Award Number <strong className="text-primary font-mono">{record.id}</strong> ({record.awardTitle}) conferred unto <strong className="text-on-surface">{record.recipientName}</strong> has been officially annulled by the Secretariat.
                  </p>
                  <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-lowest border border-error/30 text-body-sm text-on-surface">
                    <span className="font-semibold text-error">Revocation Reason: </span>
                    {record.revocationReason || 'Disciplinary committee action.'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Multi-Tier Standards Bento Cards */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl bg-surface-container-lowest border-t border-outline-variant/30">
        <div className="max-w-6xl mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary block font-semibold">
                Integrity Guarantee
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-space-xs">
                Multi-Tier Authentication Standards
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-xs">
                Understand the authentication markers embedded in every trophy and jury plaque issued by Iconic Creation Of God.
              </p>
            </div>
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">
              <span className="material-symbols-outlined text-primary text-base">shield</span>
              Zero-Tamper Guarantee
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Card 1 */}
            <div className="p-space-lg rounded-3xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-md hover:bg-surface-container-high transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    military_tech
                  </span>
                </div>
                <div className="inline-block px-space-xs py-0.5 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase font-semibold tracking-wider mb-space-xs">
                  State 01 • Valid
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Authenticated Record</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  Instantly returns the full provenance, guest of honour endorsement, candidate portrait, and cryptographic serial tied to the live registry.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md bg-surface-container-lowest/50 rounded-xl p-space-sm flex items-center justify-between border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Gilt Seal Valid
                </span>
                <span className="font-body-sm text-body-sm text-outline font-mono">200 OK</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-space-lg rounded-3xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-md hover:bg-surface-container-high transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-error-container/20 text-error flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-2xl">search_off</span>
                </div>
                <div className="inline-block px-space-xs py-0.5 rounded bg-surface-container-lowest text-error font-label-sm text-label-sm uppercase font-semibold tracking-wider mb-space-xs">
                  State 02 • Void
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Unrecognized Reference</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  Provides actionable error diagnostics, preventing fraudulent counterfeit trophies while guiding holders to the manual arbitration channel.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md bg-surface-container-lowest/50 rounded-xl p-space-sm flex items-center justify-between border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-error font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-error"></span> Unindexed Entry
                </span>
                <span className="font-body-sm text-body-sm text-outline font-mono">404 Void</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-space-lg rounded-3xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-md hover:bg-surface-container-high transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tertiary-container/20 text-tertiary flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-2xl">fingerprint</span>
                </div>
                <div className="inline-block px-space-xs py-0.5 rounded bg-surface-container-lowest text-tertiary font-label-sm text-label-sm uppercase font-semibold tracking-wider mb-space-xs">
                  State 03 • Audit Chain
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Dual Media Audit Seal</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  Every conferred award is simultaneously chronicled by Janta Live News press coverage and Deven Jha Productions broadcast archives.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md bg-surface-container-lowest/50 rounded-xl p-space-sm flex items-center justify-between border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span> Press Indexed
                </span>
                <span className="font-body-sm text-body-sm text-outline font-mono">Synced</span>
              </div>
            </div>
          </div>

          {/* Audit Log Timeline */}
          <div className="p-space-lg lg:p-space-xl rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl" id="audit-log">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm pb-space-md border-b border-surface-variant/40">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-2xl">history_edu</span>
                <div>
                  <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Official Record Status & Audit Log</h3>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Live chronological register of verified authentications</span>
                </div>
              </div>
              <span className="px-space-md py-1 rounded-full bg-surface-container-low text-primary border border-primary/30 font-label-sm text-label-sm uppercase tracking-wider font-bold">
                Registry Server: Delhi-NCR-01
              </span>
            </div>

            <div className="flex flex-col gap-space-sm mt-space-md">
              <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">verified</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-body-md text-body-md text-on-surface font-semibold font-mono">ICG-AWD-2026-992</span>
                      <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-label-sm text-label-sm uppercase font-bold">
                        Pooja Kashyap
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Conferment: Best Makeup Artist & Creative Transformation
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md text-outline font-label-sm text-label-sm">
                  <span>Timestamp: 21-DEC-2026 22:45 IST</span>
                  <span className="text-primary font-semibold uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">lock</span> Sealed
                  </span>
                </div>
              </div>

              <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">verified</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-body-md text-body-md text-on-surface font-semibold font-mono">ICG-AWD-2026-884</span>
                      <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-label-sm text-label-sm uppercase font-bold">
                        Rohan Mehra
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Conferment: Mr. Iconic Elegance Runway Distinction
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md text-outline font-label-sm text-label-sm">
                  <span>Timestamp: 21-DEC-2026 21:18 IST</span>
                  <span className="text-primary font-semibold uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">lock</span> Sealed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
