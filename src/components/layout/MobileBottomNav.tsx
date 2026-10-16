import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  House, 
  CalendarDays, 
  ClipboardList, 
  BadgeCheck, 
  Menu, 
  X, 
  Info, 
  Award, 
  Image, 
  Phone, 
  HelpCircle,
  Sparkles,
  Sun,
  Moon,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const MobileBottomNav: React.FC = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Close sheet on route changes
  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMoreOpen(false);
      }
    };
    if (moreOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [moreOpen]);

  // Active state determinations
  const isHomeActive = location.pathname === '/';
  const isEventActive = location.pathname.startsWith('/event');
  const isRegisterActive = location.pathname.startsWith('/register');
  const isVerifyActive = location.pathname.startsWith('/verify-certificate');
  
  // Routes contained inside the "More" bottom sheet
  const moreRoutes = ['/about', '/verify-award', '/gallery', '/contact', '/faq', '/privacy-policy', '/terms'];
  const isMoreRouteActive = moreRoutes.some((route) => location.pathname.startsWith(route));
  const isMoreActive = moreOpen || isMoreRouteActive;

  const moreLinks = [
    {
      label: 'About Us',
      path: '/about',
      description: 'Vision, organizers & royal heritage',
      icon: Info,
    },
    {
      label: 'Award Verification',
      path: '/verify-award',
      description: 'Official candidate accolades portal',
      icon: Award,
    },
    {
      label: 'Runway Gallery',
      path: '/gallery',
      description: 'Celebrity moments & gala couture',
      icon: Image,
    },
    {
      label: 'Contact Us',
      path: '/contact',
      description: 'Direct inquiries & coordination desk',
      icon: Phone,
    },
    {
      label: 'Frequently Asked Questions',
      path: '/faq',
      description: 'Audition guidelines, eligibility & fees',
      icon: HelpCircle,
    },
  ];

  return (
    <>
      {/* Floating Bottom Navigation Bar (Mobile only, < 768px) */}
      <div 
        className="fixed inset-x-0 z-40 flex justify-center md:hidden pointer-events-none px-3 sm:px-4"
        style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <nav
          aria-label="Mobile Navigation Bar"
          className="w-full max-w-[420px] mx-auto pointer-events-auto rounded-full bg-[var(--bottom-nav-bg)] backdrop-blur-xl border border-[var(--bottom-nav-border)] shadow-[0_8px_32px_rgba(0,0,0,0.28),0_2px_8px_rgba(212,166,46,0.12)] p-1.5 xs:p-2 box-border transition-all duration-200"
        >
          <div className="grid grid-cols-5 items-center justify-items-center gap-1">
            
            {/* 1. Home */}
            <Link
              to="/"
              aria-label="Home"
              aria-current={isHomeActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-full py-1 rounded-2xl transition-all duration-200 group ${
                isHomeActive 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-primary active:scale-95'
              }`}
            >
              <House className={`w-5 h-5 transition-transform duration-200 ${isHomeActive ? 'scale-110 stroke-[2.2]' : 'group-hover:scale-105'}`} />
              <span className={`text-[9px] xs:text-[10px] tracking-wide mt-0.5 leading-tight ${isHomeActive ? 'font-bold text-primary' : 'font-medium'}`}>
                Home
              </span>
              {isHomeActive && (
                <span className="w-1 h-1 rounded-full bg-primary mt-0.5 animate-in zoom-in duration-200"></span>
              )}
            </Link>

            {/* 2. Event */}
            <Link
              to="/event"
              aria-label="Event"
              aria-current={isEventActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-full py-1 rounded-2xl transition-all duration-200 group ${
                isEventActive 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-primary active:scale-95'
              }`}
            >
              <CalendarDays className={`w-5 h-5 transition-transform duration-200 ${isEventActive ? 'scale-110 stroke-[2.2]' : 'group-hover:scale-105'}`} />
              <span className={`text-[9px] xs:text-[10px] tracking-wide mt-0.5 leading-tight ${isEventActive ? 'font-bold text-primary' : 'font-medium'}`}>
                Event
              </span>
              {isEventActive && (
                <span className="w-1 h-1 rounded-full bg-primary mt-0.5 animate-in zoom-in duration-200"></span>
              )}
            </Link>

            {/* 3. Register (Tasteful Gold Highlight / Centerpiece) */}
            <Link
              to="/register"
              aria-label="Register Now"
              aria-current={isRegisterActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-full py-1.5 px-1 rounded-2xl bg-gradient-to-r from-primary-container via-primary to-primary-container text-black font-bold shadow-gold-glow active:scale-95 transition-all duration-200 ${
                isRegisterActive 
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-[var(--card-bg)] scale-[1.04]' 
                  : 'hover:shadow-gold-high hover:scale-[1.02]'
              }`}
            >
              <ClipboardList className="w-5 h-5 text-black stroke-[2.3]" />
              <span className="text-[9px] xs:text-[10px] tracking-wider uppercase font-bold text-black mt-0.5 leading-tight">
                Register
              </span>
            </Link>

            {/* 4. Verify */}
            <Link
              to="/verify-certificate"
              aria-label="Certificate Verification"
              aria-current={isVerifyActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-full py-1 rounded-2xl transition-all duration-200 group ${
                isVerifyActive 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-primary active:scale-95'
              }`}
            >
              <BadgeCheck className={`w-5 h-5 transition-transform duration-200 ${isVerifyActive ? 'scale-110 stroke-[2.2]' : 'group-hover:scale-105'}`} />
              <span className={`text-[9px] xs:text-[10px] tracking-wide mt-0.5 leading-tight ${isVerifyActive ? 'font-bold text-primary' : 'font-medium'}`}>
                Verify
              </span>
              {isVerifyActive && (
                <span className="w-1 h-1 rounded-full bg-primary mt-0.5 animate-in zoom-in duration-200"></span>
              )}
            </Link>

            {/* 5. More */}
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              aria-label="More navigation options"
              aria-expanded={moreOpen}
              aria-haspopup="dialog"
              className={`flex flex-col items-center justify-center w-full py-1 rounded-2xl transition-all duration-200 group ${
                isMoreActive 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-primary active:scale-95'
              }`}
            >
              <Menu className={`w-5 h-5 transition-transform duration-200 ${isMoreActive ? 'scale-110 stroke-[2.2]' : 'group-hover:scale-105'}`} />
              <span className={`text-[9px] xs:text-[10px] tracking-wide mt-0.5 leading-tight ${isMoreActive ? 'font-bold text-primary' : 'font-medium'}`}>
                More
              </span>
              {isMoreActive && (
                <span className="w-1 h-1 rounded-full bg-primary mt-0.5 animate-in zoom-in duration-200"></span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* More Navigation Menu Bottom Sheet */}
      {moreOpen && (
        <>
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
            onClick={() => setMoreOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="More navigation menu"
            className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-[var(--card-bg)] border-t border-[var(--border-color)] rounded-t-3xl shadow-2xl p-5 animate-in slide-in-from-bottom duration-250 max-h-[85vh] overflow-y-auto"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
          >
            {/* Top Drag Handle Indicator */}
            <div className="w-12 h-1 rounded-full bg-outline-variant/50 mx-auto mb-4" />

            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-color)]/50 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <div>
                  <h3 className="font-serif font-bold text-base text-on-surface leading-tight">
                    Explore Iconic Creation
                  </h3>
                  <p className="text-[11px] text-on-surface-variant leading-tight">
                    Quick navigation & official portals
                  </p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-full bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sheet Navigation Links */}
            <div className="flex flex-col gap-2">
              {moreLinks.map((item) => {
                const IconComponent = item.icon;
                const active = location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 group ${
                      active
                        ? 'bg-primary-container text-black font-bold shadow-sm'
                        : 'bg-surface-container/50 border border-[var(--border-color)]/40 text-on-surface hover:border-primary/40 hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        active 
                          ? 'bg-black text-primary' 
                          : 'bg-surface-container text-primary group-hover:scale-105'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`text-xs font-semibold leading-tight truncate ${active ? 'text-black font-bold' : 'text-on-surface'}`}>
                          {item.label}
                        </span>
                        <span className={`text-[10px] leading-tight truncate mt-0.5 ${active ? 'text-black/80' : 'text-on-surface-variant'}`}>
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${active ? 'text-black' : 'text-on-surface-variant'}`} />
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions: Theme Toggle inside More Sheet */}
            <div className="pt-4 mt-4 border-t border-[var(--border-color)]/50 flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">
                Website Theme
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/60 text-xs font-semibold text-primary transition-all active:scale-95"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-primary" />
                    <span>Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-primary" />
                    <span>Switch to Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
