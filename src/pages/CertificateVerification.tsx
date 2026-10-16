import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { certificateService } from '../services/certificateService';
import { pdfService } from '../services/pdfService';
import { CertificateRecord, VerificationStatus } from '../types';
import { PrintableCertificate } from '../components/certificate/PrintableCertificate';
import { 
  ShieldCheck, 
  Search, 
  FileDown, 
  Printer, 
  Share2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  HelpCircle,
  Headphones
} from 'lucide-react';

export const CertificateVerification: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('id') || 'ICG-2026-CERT-0849';

  const [inputVal, setInputVal] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<VerificationStatus | 'idle'>('idle');
  const [record, setRecord] = useState<CertificateRecord | null>(null);
  const [message, setMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const runVerification = async (queryId: string) => {
    if (!queryId.trim()) return;
    setLoading(true);
    const res = await certificateService.verify(queryId);
    setLoading(false);
    setStatus(res.status);
    setRecord(res.record || null);
    setMessage(res.message || '');
  };

  useEffect(() => {
    if (initialQuery) {
      runVerification(initialQuery);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ id: inputVal.trim() });
    runVerification(inputVal.trim());
  };

  const setPreset = (presetId: string) => {
    setInputVal(presetId);
    setSearchParams({ id: presetId });
    runVerification(presetId);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/verify-certificate?id=${encodeURIComponent(inputVal.trim())}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadPdf = async () => {
    if (!record) return;
    await pdfService.downloadElementAsPdf('printable-certificate-canvas', `${record.id}_Certificate.pdf`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Top Stage Ambient Accent */}
      <div className="relative w-full overflow-hidden px-margin-mobile lg:px-margin py-space-xl">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-primary/10 via-primary-container/5 to-transparent blur-3xl rounded-full"></div>

        {/* Header & Verification Console */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high border border-primary/30 shadow-md mb-space-md">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Official Ledger Repository
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary tracking-wide text-center font-semibold">
            Certificate Verification Ledger
          </h1>

          <p className="font-body-lg text-body-md lg:text-body-lg text-on-surface-variant max-w-2xl mt-space-sm text-center">
            Authenticate authentic credentials and certificates issued by Iconic Creation Of God — presented by Janta Live News & Deven Jha Productions.
          </p>

          {/* Search Console Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full mt-space-lg p-space-sm bg-surface-container-low border border-outline-variant/40 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-space-sm"
          >
            <div className="flex-1 w-full flex items-center gap-space-sm px-space-md py-space-sm bg-surface-container rounded-xl">
              <Search className="w-5 h-5 text-tertiary shrink-0" />
              <input
                id="cert-input"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter Certificate Identifier (e.g., ICG-2026-CERT-0849)"
                className="w-full bg-transparent font-body-md text-on-surface placeholder:text-outline focus:outline-none tracking-wider uppercase font-semibold"
              />
            </div>

            <button
              id="btn-verify"
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-space-xl py-space-md rounded-xl bg-gradient-to-r from-primary-fixed to-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-bold shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-space-xs shrink-0 disabled:opacity-50"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{loading ? 'Verifying...' : 'Verify Credential'}</span>
            </button>
          </form>

          {/* Preset Buttons for Quick Testing */}
          <div className="mt-space-md flex flex-wrap items-center justify-center gap-space-xs">
            <span className="font-label-sm text-label-sm uppercase text-outline mr-space-xs tracking-widest">
              Simulator Preset:
            </span>
            <button
              onClick={() => setPreset('ICG-2026-CERT-0849')}
              className={`px-space-md py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all border ${
                inputVal === 'ICG-2026-CERT-0849' && status === 'verified'
                  ? 'bg-primary-container text-on-primary-container border-primary font-bold shadow-sm'
                  : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Verified Record
            </button>
            <button
              onClick={() => setPreset('ICG-2026-REV-0112')}
              className={`px-space-md py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all border ${
                inputVal === 'ICG-2026-REV-0112'
                  ? 'bg-secondary-container text-on-secondary-container border-secondary font-bold shadow-sm'
                  : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Under Review
            </button>
            <button
              onClick={() => setPreset('ICG-2026-CERT-VOID')}
              className={`px-space-md py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all border ${
                inputVal === 'ICG-2026-CERT-VOID'
                  ? 'bg-error-container text-on-error-container border-error font-bold shadow-sm'
                  : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Revoked Record
            </button>
            <button
              onClick={() => setPreset('ICG-INVALID-9999')}
              className={`px-space-md py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all border ${
                inputVal === 'ICG-INVALID-9999'
                  ? 'bg-error-container text-on-error-container border-error font-bold shadow-sm'
                  : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Unverified / Invalid
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Dossier Section */}
      <section className="w-full px-margin-mobile lg:px-margin pb-space-xl">
        <div className="max-w-7xl mx-auto">
          {/* VERIFIED DOSSIER */}
          {status === 'verified' && record && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start" id="state-verified-view">
              
              {/* Left Column: Detailed Verified Credentials Card */}
              <div className="lg:col-span-5 flex flex-col gap-space-md">
                <div className="p-space-lg rounded-3xl bg-surface-container border border-primary/40 shadow-xl flex flex-col gap-space-md relative overflow-hidden">
                  <div className="pointer-events-none absolute -right-20 -bottom-20 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>

                  {/* Status Pill Header */}
                  <div className="flex items-center justify-between gap-space-sm flex-wrap">
                    <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-highest text-primary border border-primary/40">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                      <span className="font-label-sm text-label-sm tracking-widest uppercase font-bold">
                        VERIFIED & AUTHENTIC ACCREDITATION
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase text-outline">Ledger v4.8</span>
                  </div>

                  {/* Recipient Overview */}
                  <div className="flex items-center gap-space-md p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-sm">
                    {record.recipientPhotoUrl ? (
                      <img
                        src={record.recipientPhotoUrl}
                        alt={record.recipientName}
                        className="w-16 h-16 rounded-full object-cover shrink-0 shadow-md border-2 border-primary/40"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-xl border-2 border-primary/40">
                        {record.recipientName.charAt(0)}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                        Recipient
                      </span>
                      <h3 className="font-headline-md text-headline-md text-on-surface truncate font-bold">
                        {record.recipientName}
                      </h3>
                      <span className="font-body-sm text-body-sm text-tertiary truncate">
                        {record.category}
                      </span>
                    </div>
                  </div>

                  {/* Key-Value Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm font-body-sm text-body-sm">
                    <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Pageant Title</span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">{record.title}</span>
                    </div>
                    <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Unique Identifier</span>
                      <span className="font-label-md text-label-md text-primary font-mono font-bold mt-1">{record.id}</span>
                    </div>
                    <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Event Date</span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">{record.eventDate}</span>
                    </div>
                    <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Conferred Date</span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">{record.issueDate}</span>
                    </div>
                    <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20 sm:col-span-2 flex flex-col">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Honorable Organizers</span>
                      <span className="font-body-md text-body-md text-on-surface font-semibold mt-1">{record.organizers}</span>
                    </div>
                    <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20 sm:col-span-2 flex flex-col">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Executive Presenters</span>
                      <span className="font-body-md text-body-md text-on-surface font-semibold mt-1">{record.presenters}</span>
                    </div>
                  </div>

                  {/* Cryptographic Seal Badge */}
                  <div className="p-space-md rounded-2xl bg-surface-container-highest border border-primary/20 shadow-inner flex items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 text-primary">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          enhanced_encryption
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                          256-Bit Cryptographic Seal
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate font-mono">
                          {record.hashSeal || 'SHA256: 9e88be138a0f98c4d'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Security Trail */}
                  <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm px-space-xs">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-primary">history</span> Verified {record.verificationCount || 1} times
                    </span>
                    <span>Central Node: New Delhi / NCR</span>
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-lg flex flex-col sm:flex-row gap-space-sm">
                  <button
                    onClick={handleDownloadPdf}
                    className="flex-1 py-3 px-space-md rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold hover:bg-primary hover:text-on-primary shadow-gold-glow transition-all flex items-center justify-center gap-space-xs"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={() => pdfService.printPage()}
                    className="flex-1 py-3 px-space-md rounded-full bg-surface-container-high border border-outline-variant/40 text-on-surface font-label-md text-label-md uppercase font-semibold hover:bg-surface-variant transition-all flex items-center justify-center gap-space-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Hardcopy</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full bg-surface-container-high border border-outline-variant/40 text-on-surface hover:text-primary transition-all flex items-center justify-center shrink-0"
                    title="Copy Verified URL"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                {copied && (
                  <div className="text-center font-label-sm text-label-sm text-primary font-bold animate-pulse">
                    ✓ Verified Ledger link copied to clipboard!
                  </div>
                )}
              </div>

              {/* Right Column: High-Res Printable Preview */}
              <div className="lg:col-span-7 flex flex-col gap-space-sm">
                <div className="flex items-center justify-between px-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
                    Digital Archival Specimen (Live Render)
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Standard Gala Edition
                  </span>
                </div>

                {/* Live Certificate Component */}
                <PrintableCertificate certificate={record} id="printable-certificate-canvas" />
              </div>
            </div>
          )}

          {/* UNVERIFIED / INVALID STATE */}
          {status === 'unverified' && (
            <div className="max-w-3xl mx-auto py-space-lg" id="state-unverified-view">
              <div className="p-space-xl rounded-3xl bg-surface-container border border-error/40 shadow-2xl flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-space-md shadow-lg">
                  <XCircle className="w-10 h-10" />
                </div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-error font-bold mb-space-xs">
                  Record Not Found in Public Ledger
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
                  Unverified Certificate Identifier
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mt-space-sm">
                  {message || 'The credential ID you entered does not match any authenticated pageant award or contestant registration issued by Iconic Creation Of God.'}
                </p>

                <div className="w-full p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 mt-space-lg text-left flex items-start gap-space-sm">
                  <AlertTriangle className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Possible Reasons:</span>
                    <ul className="font-body-sm text-body-sm text-on-surface-variant list-disc list-inside mt-1 space-y-1">
                      <li>Typographical error in serial prefix (e.g., must match <code className="text-primary font-mono">ICG-2026-CERT-XXXX</code>)</li>
                      <li>The physical certificate is counterfeit or issued without production authority</li>
                      <li>Candidate registration is currently undergoing manual secretariat verification</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-space-sm mt-space-lg">
                  <button
                    onClick={() => setPreset('ICG-2026-CERT-0849')}
                    className="px-space-lg py-3 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold hover:bg-primary transition-all shadow-md"
                  >
                    Try Demo Valid ID
                  </button>
                  <Link
                    to="/contact"
                    className="px-space-lg py-3 rounded-full bg-surface-container-high border border-outline-variant/40 text-on-surface font-label-md text-label-md uppercase font-semibold hover:bg-surface-variant transition-all"
                  >
                    Contact Secretariat
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* UNDER REVIEW STATE */}
          {status === 'under_review' && record && (
            <div className="max-w-3xl mx-auto py-space-lg" id="state-review-view">
              <div className="p-space-xl rounded-3xl bg-surface-container border border-secondary/40 shadow-2xl flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-space-md shadow-lg animate-pulse">
                  <Clock className="w-10 h-10" />
                </div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold mb-space-xs">
                  Certification Ledger Audit in Progress
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
                  Accreditation Conformation Pending
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mt-space-sm">
                  Candidate record for <strong className="text-primary">{record.recipientName}</strong> is currently undergoing official verification by the Executive Board of Janta Live News & Deven Jha Productions. Digital issuance will unlock upon jury seal completion.
                </p>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-space-sm mt-space-lg text-left">
                  <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-primary text-xl">fact_check</span>
                    <span className="font-label-sm text-label-sm uppercase text-outline mt-1">Stage 1</span>
                    <span className="font-label-md text-label-md text-on-surface font-bold">Jury Score Audit</span>
                    <span className="font-body-sm text-body-sm text-primary font-semibold mt-1">Completed</span>
                  </div>
                  <div className="p-space-md rounded-2xl bg-surface-container-low border border-secondary/40 flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-secondary text-xl">signature</span>
                    <span className="font-label-sm text-label-sm uppercase text-outline mt-1">Stage 2</span>
                    <span className="font-label-md text-label-md text-on-surface font-bold">Secretariat Sign-off</span>
                    <span className="font-body-sm text-body-sm text-secondary font-semibold mt-1">In Review</span>
                  </div>
                  <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/20 opacity-60 flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-outline text-xl">token</span>
                    <span className="font-label-sm text-label-sm uppercase text-outline mt-1">Stage 3</span>
                    <span className="font-label-md text-label-md text-on-surface font-bold">Digital Key Conferred</span>
                    <span className="font-body-sm text-body-sm text-outline mt-1">Pending</span>
                  </div>
                </div>

                <button
                  onClick={() => setPreset('ICG-2026-CERT-0849')}
                  className="mt-space-lg px-space-lg py-2.5 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-md text-label-md uppercase font-semibold hover:bg-surface-variant transition-all"
                >
                  Return to Sample Verified Record
                </button>
              </div>
            </div>
          )}

          {/* REVOKED STATE */}
          {status === 'revoked' && record && (
            <div className="max-w-3xl mx-auto py-space-lg" id="state-revoked-view">
              <div className="p-space-xl rounded-3xl bg-surface-container border border-error shadow-2xl flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-space-md shadow-lg">
                  <XCircle className="w-10 h-10" />
                </div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-error font-bold mb-space-xs">
                  Official Revocation Notice
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
                  Credential Officially Revoked
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mt-space-sm">
                  The certificate <strong className="text-primary font-mono">{record.id}</strong> conferred unto <strong className="text-on-surface">{record.recipientName}</strong> has been nullified by the Executive Secretariat.
                </p>

                <div className="w-full p-space-md rounded-2xl bg-surface-container-low border border-error/30 mt-space-md text-left">
                  <span className="font-label-sm text-label-sm uppercase text-error font-bold block">
                    Revocation Grounds:
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface mt-1">
                    {record.revocationReason || 'Annulled due to failure to meet attendance and credential criteria.'}
                  </p>
                </div>

                <div className="flex gap-space-sm mt-space-lg">
                  <button
                    onClick={() => setPreset('ICG-2026-CERT-0849')}
                    className="px-space-lg py-2.5 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-md text-label-md uppercase font-semibold"
                  >
                    View Valid Specimen
                  </button>
                  <Link
                    to="/contact"
                    className="px-space-lg py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold"
                  >
                    Contact Secretariat
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Discrepancy & Concierge Assistance Section */}
      <section className="w-full bg-surface-container-lowest border-t border-outline-variant/30 px-margin-mobile lg:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center">
          <div className="md:col-span-8 flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-primary">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
                Discrepancy Resolution Protocol
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Experiencing Verification Anomalies or Name Spelling Discrepancies?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              The Central Registry of Iconic Creation Of God maintains strict physical-to-digital record concordance. If your issued paper certificate contains differing titles, misspelled candidate names, or misplaced verification numbers, contact our dedicated secretariat directly for expedited re-issuance.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-space-sm justify-center">
            <Link
              to="/contact"
              className="w-full py-space-md px-space-lg rounded-xl bg-surface-container-high border border-outline-variant/40 text-on-surface hover:text-primary font-label-md text-label-md uppercase tracking-wider font-semibold text-center shadow-md hover:bg-surface-variant transition-all flex items-center justify-center gap-space-xs"
            >
              <Headphones className="w-5 h-5 text-primary" />
              <span>Contact Concierge Secretariat</span>
            </Link>
            <div className="flex items-center justify-center gap-space-md text-outline font-label-sm text-label-sm uppercase tracking-widest pt-space-xs">
              <span>Priority Line: 10AM - 7PM IST</span>
              <span>•</span>
              <span>Delhi NCR</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
