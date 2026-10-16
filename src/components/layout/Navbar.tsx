import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND_ASSETS } from '../../assets/constants';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  ChevronDown, 
  Award, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [verifyDropdownOpen, setVerifyDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on route changes
  useEffect(() => {
    setVerifyDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setVerifyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVerifyDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isVerifyActive =
    location.pathname.startsWith('/verify-certificate') ||
    location.pathname.startsWith('/verify-award');

  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 transition-colors duration-200 bg-[var(--navbar-bg)] backdrop-blur-xl border-b border-[var(--navbar-border)] shadow-[0_2px_18px_rgba(0,0,0,0.15)] box-border">
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 box-border">
        
        {/* Left Section: Event Wordmark & Emblem */}
        <div className="flex-1 min-w-0 flex items-center justify-start">
          <Link 
            to="/" 
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-lg p-0.5 sm:p-1 max-w-full min-w-0"
            aria-label="Iconic Creation Of God - Home"
          >
            <img
              alt="Iconic Creation Of God Emblem"
              className="h-8 sm:h-9 w-auto shrink-0 object-contain transition-transform group-hover:scale-105"
              src={BRAND_ASSETS.emblem}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-serif tracking-wide sm:tracking-wider text-primary leading-tight font-semibold text-xs xs:text-sm sm:text-base lg:text-[16px] xl:text-[17px] truncate sm:whitespace-nowrap">
                ICONIC CREATION OF GOD
              </span>
              <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-normal sm:tracking-widest uppercase text-on-surface-variant font-medium truncate sm:whitespace-nowrap">
                MR / MISS / MRS • JANTA LIVE & DEVEN JHA
              </span>
            </div>
          </Link>
        </div>

        {/* Center Section: Desktop Navigation Links (Large Screens) */}
        <nav 
          className="hidden xl:flex items-center justify-center shrink-0 gap-0.5 2xl:gap-1.5 mx-1"
          aria-label="Primary Navigation"
        >
          {/* Home */}
          <Link
            to="/"
            className={`text-[11px] 2xl:text-xs font-semibold uppercase tracking-wider px-2.5 2xl:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
              isActive('/')
                ? 'bg-primary-container text-black font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/60'
            }`}
          >
            Home
          </Link>

          {/* About Us */}
          <Link
            to="/about"
            className={`text-[11px] 2xl:text-xs font-semibold uppercase tracking-wider px-2.5 2xl:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
              isActive('/about')
                ? 'bg-primary-container text-black font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/60'
            }`}
          >
            About Us
          </Link>

          {/* Event & Activities */}
          <Link
            to="/event"
            className={`text-[11px] 2xl:text-xs font-semibold uppercase tracking-wider px-2.5 2xl:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
              isActive('/event')
                ? 'bg-primary-container text-black font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/60'
            }`}
          >
            Event & Activities
          </Link>

          {/* Registration */}
          <Link
            to="/register"
            className={`text-[11px] 2xl:text-xs font-semibold uppercase tracking-wider px-2.5 2xl:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
              isActive('/register')
                ? 'bg-primary-container text-black font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/60'
            }`}
          >
            Registration
          </Link>

          {/* Verification Dropdown for Clean Horizontal Balance */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setVerifyDropdownOpen((prev) => !prev)}
              onMouseEnter={() => setVerifyDropdownOpen(true)}
              className={`flex items-center gap-1 text-[11px] 2xl:text-xs font-semibold uppercase tracking-wider px-2.5 2xl:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                isVerifyActive
                  ? 'bg-primary-container text-black font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/60'
              }`}
              aria-expanded={verifyDropdownOpen}
              aria-haspopup="true"
            >
              <span>Verifications</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${verifyDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {verifyDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-1.5 w-60 rounded-xl bg-surface-container border border-outline-variant/60 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setVerifyDropdownOpen(false)}
              >
                <Link
                  to="/verify-certificate"
                  onClick={() => setVerifyDropdownOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium tracking-wide transition-colors ${
                    isActive('/verify-certificate')
                      ? 'text-primary font-bold bg-surface-container-high'
                      : 'text-on-surface hover:text-primary hover:bg-surface-container-high'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>Certificate Verification</span>
                </Link>

                <Link
                  to="/verify-award"
                  onClick={() => setVerifyDropdownOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium tracking-wide transition-colors ${
                    isActive('/verify-award')
                      ? 'text-primary font-bold bg-surface-container-high'
                      : 'text-on-surface hover:text-primary hover:bg-surface-container-high'
                  }`}
                >
                  <Award className="w-4 h-4 text-primary shrink-0" />
                  <span>Award Verification</span>
                </Link>
              </div>
            )}
          </div>

          {/* Gallery */}
          <Link
            to="/gallery"
            className={`text-[11px] 2xl:text-xs font-semibold uppercase tracking-wider px-2.5 2xl:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
              isActive('/gallery')
                ? 'bg-primary-container text-black font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/60'
            }`}
          >
            Gallery
          </Link>

          {/* Contact Us */}
          <Link
            to="/contact"
            className={`text-[11px] 2xl:text-xs font-semibold uppercase tracking-wider px-2.5 2xl:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
              isActive('/contact')
                ? 'bg-primary-container text-black font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/60'
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Right Section: Desktop Theme Toggle + Register Now CTA (hidden on mobile, visible on desktop md:) */}
        <div className="hidden md:flex flex-1 min-w-0 items-center justify-end gap-2 sm:gap-3 shrink-0">
          
          {/* Theme Toggle Button (Desktop only) */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 md:p-2.5 rounded-full bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 shrink-0"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-primary animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-primary animate-in spin-in-180 duration-300" />
            )}
          </button>

          {/* Register Now Primary CTA (Desktop only) */}
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-primary-container via-primary to-primary-container text-black font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-gold-glow hover:shadow-gold-high hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0 whitespace-nowrap"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </header>
  );
};
