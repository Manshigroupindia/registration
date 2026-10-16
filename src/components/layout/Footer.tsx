import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_ASSETS, EVENT_DETAILS } from '../../assets/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 text-on-surface">
      <div className="w-full px-margin-mobile lg:px-margin pt-space-xl pb-28 md:pb-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl mb-space-xl">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <Link to="/" className="flex items-center gap-space-md">
              <img
                alt="Iconic Creation Of God Royal Emblem"
                className="h-10 w-auto object-contain"
                src={BRAND_ASSETS.emblem}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-headline-md text-headline-md text-primary tracking-wide">
                Iconic Creation Of God
              </span>
            </Link>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg leading-relaxed">
              Iconic Creation Of God – A Celebration of Beauty, Talent, Fashion & Creativity presented by Janta Live News & Deven Jha Productions. Delhi NCR’s quintessential coronation gala honouring national excellence and high couture.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs flex-wrap">
              <div className="p-space-sm rounded-full bg-surface-container text-tertiary">
                <span className="material-symbols-outlined text-base">stars</span>
              </div>
              <div className="p-space-sm rounded-full bg-surface-container text-tertiary">
                <span className="material-symbols-outlined text-base">award_star</span>
              </div>
              <div className="p-space-sm rounded-full bg-surface-container text-tertiary">
                <span className="material-symbols-outlined text-base">live_tv</span>
              </div>
              <div className="p-space-sm rounded-full bg-surface-container text-tertiary">
                <span className="material-symbols-outlined text-base">theater_comedy</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h4 className="font-label-lg text-label-lg uppercase tracking-widest text-primary mb-space-xs">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><Link className="hover:text-primary transition-colors" to="/">Home</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/about">About Us</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/event">Event & Activities</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/register">Registration</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/verify-certificate">Certificate Verification</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/verify-award">Award Verification</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/gallery">Gallery</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/faq">Frequently Asked Questions</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Organizers & Partners Column */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/30">
              <h4 className="font-label-lg text-label-lg uppercase tracking-widest text-primary mb-space-xs">
                Honorable Organizers
              </h4>
              <p className="font-title-lg text-title-lg text-on-surface font-semibold">
                Deven Jha & Ritu Jha
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                Visionaries behind the grand celebration of high-couture pageantry and talent excellence.
              </p>
            </div>

            <div className="flex flex-col gap-space-xs">
              <h5 className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
                Media & Production Partners
              </h5>
              <div className="flex flex-wrap items-center gap-space-sm text-on-surface font-label-md text-label-md">
                <span className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container text-on-surface border border-outline-variant/30">
                  <span className="material-symbols-outlined text-sm text-primary">campaign</span> Janta Live News
                </span>
                <span className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container text-on-surface border border-outline-variant/30">
                  <span className="material-symbols-outlined text-sm text-primary">movie</span> Deven Jha Productions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-space-lg border-t border-surface-variant/40 flex flex-col sm:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-on-surface-variant">
          <p>
            © 2026 Iconic Creation Of God. All rights reserved. Presented by Janta Live News & Deven Jha Productions.
          </p>
          <div className="flex items-center gap-space-lg font-label-sm text-label-sm uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:text-primary transition-colors" to="/terms">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
