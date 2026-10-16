import React from 'react';
import { CertificateRecord } from '../../types';
import { QRCodeDisplay } from '../common/QRCodeDisplay';

interface PrintableCertificateProps {
  certificate: CertificateRecord;
  id?: string;
}

export const PrintableCertificate: React.FC<PrintableCertificateProps> = ({
  certificate,
  id = 'printable-certificate-canvas',
}) => {
  const verificationUrl = `${window.location.origin}/verify-certificate?id=${encodeURIComponent(certificate.id)}`;

  return (
    <div
      id={id}
      className="relative w-full max-w-4xl mx-auto rounded-2xl bg-surface-container-lowest p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.9),0_0_28px_rgba(212,166,46,0.18)] overflow-hidden border border-primary/30"
    >
      {/* Corner Decorative Flourishes */}
      <div className="absolute top-4 left-4 text-primary/40 pointer-events-none">
        <svg fill="none" height="40" viewBox="0 0 40 40" width="40">
          <path d="M0 0H40V4H4V40H0V0Z" fill="currentColor"></path>
        </svg>
      </div>
      <div className="absolute top-4 right-4 text-primary/40 pointer-events-none">
        <svg fill="none" height="40" viewBox="0 0 40 40" width="40">
          <path d="M40 0H0V4H36V40H40V0Z" fill="currentColor"></path>
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 text-primary/40 pointer-events-none">
        <svg fill="none" height="40" viewBox="0 0 40 40" width="40">
          <path d="M0 40H40V36H4V0H0V40Z" fill="currentColor"></path>
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 text-primary/40 pointer-events-none">
        <svg fill="none" height="40" viewBox="0 0 40 40" width="40">
          <path d="M40 40H0V36H36V0H40V40Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Certificate Inner Sheet with Gold Tint Background */}
      <div className="relative w-full rounded-xl bg-gradient-to-b from-surface-container-low via-surface to-surface-container-low p-6 sm:p-10 flex flex-col items-center text-center border border-outline-variant/40">
        
        {/* Subtle Watermark Glyph in Center */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
          <span className="material-symbols-outlined text-[260px] text-primary">award_star</span>
        </div>

        {/* Top Presenter Header */}
        <div className="flex items-center gap-space-sm mb-space-sm">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            military_tech
          </span>
          <span className="font-label-sm text-label-sm tracking-widest uppercase text-tertiary font-bold">
            Janta Live News • Deven Jha Productions
          </span>
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            military_tech
          </span>
        </div>

        {/* Certificate Title */}
        <h2 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-primary font-bold tracking-wider uppercase mt-1">
          Certificate of Pageant Distinction
        </h2>
        <p className="font-label-md text-label-md uppercase tracking-widest text-outline mt-space-xs">
          This supreme accolade is solemnly presented unto
        </p>

        {/* Candidate Golden Name Display */}
        <div className="my-space-md">
          <span className="font-display-lg text-display-lg-mobile sm:text-display-lg text-on-surface font-semibold tracking-wide italic block">
            {certificate.recipientName}
          </span>
          <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-space-xs"></div>
        </div>

        {/* Testimony Statement */}
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl leading-relaxed">
          In solemn testimony of extraordinary stage charisma, sartorial mastery, and runway discipline exhibited during the grand gala of <strong className="text-primary font-semibold">{certificate.eventName}</strong>, having been declared:
        </p>

        {/* Conferred Category Tag */}
        <div className="mt-space-md px-space-lg py-2 rounded-full bg-surface-container-highest border border-primary/40 shadow-md">
          <span className="font-title-lg text-title-lg text-primary tracking-wider uppercase font-bold">
            {certificate.title}
          </span>
        </div>

        {/* Dual Signatures & Seal Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-end gap-space-md mt-space-xl pt-space-md">
          {/* Signee 1: Deven Jha */}
          <div className="flex flex-col items-center">
            <div className="h-12 flex items-center justify-center">
              <span className="font-headline-md text-headline-md italic text-primary/90 tracking-widest font-serif font-bold">
                Deven Jha
              </span>
            </div>
            <div className="w-36 h-0.5 bg-outline-variant my-space-xs"></div>
            <span className="font-label-md text-label-md text-on-surface font-semibold">Deven Jha</span>
            <span className="font-label-sm text-label-sm uppercase text-outline">Founder & Producer</span>
          </div>

          {/* Central Medallion Seal */}
          <div className="flex flex-col items-center justify-center order-first sm:order-none mb-space-sm sm:mb-0">
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-tertiary-fixed p-1 shadow-[0_0_20px_rgba(242,193,72,0.35)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-surface-container-lowest flex flex-col items-center justify-center text-center p-1">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span className="text-[8px] uppercase tracking-tighter text-tertiary leading-none mt-0.5 font-bold">
                  OFFICIAL SEAL
                </span>
                <span className="text-[7px] text-outline leading-none">2026</span>
              </div>
            </div>
          </div>

          {/* Signee 2: Ritu Jha */}
          <div className="flex flex-col items-center">
            <div className="h-12 flex items-center justify-center">
              <span className="font-headline-md text-headline-md italic text-primary/90 tracking-widest font-serif font-bold">
                Ritu Jha
              </span>
            </div>
            <div className="w-36 h-0.5 bg-outline-variant my-space-xs"></div>
            <span className="font-label-md text-label-md text-on-surface font-semibold">Ritu Jha</span>
            <span className="font-label-sm text-label-sm uppercase text-outline">Managing Director</span>
          </div>
        </div>

        {/* Bottom Serial Watermark & Live Scannable QR Code */}
        <div className="w-full mt-space-lg pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm bg-surface-container-low/60 rounded-lg p-space-sm border border-outline-variant/30">
          <div className="flex items-center gap-space-sm text-left">
            <QRCodeDisplay
              value={verificationUrl}
              size={52}
              className="bg-white p-1 rounded"
              darkColor="#090604"
              lightColor="#ffffff"
            />
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Permanent Authenticity Index
              </span>
              <span className="font-body-sm text-body-sm text-outline font-mono">
                {certificate.hashSeal || `HASH://icg.org/verify/${certificate.id}`}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline block">
              Certificate Number
            </span>
            <span className="font-label-md text-label-md text-tertiary font-mono font-bold">
              {certificate.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
