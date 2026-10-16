import React from 'react';
import { Link } from 'react-router-dom';
import { VENUE_VIDEO_DETAILS } from '../../assets/constants';
import { MapPin, Calendar, Clock, Ticket, Utensils, Sparkles, AlertCircle } from 'lucide-react';

interface VenueVideoSectionProps {
  className?: string;
}

export const VenueVideoSection: React.FC<VenueVideoSectionProps> = ({ className = '' }) => {
  return (
    <section className={`w-full py-space-xl ${className}`} id="event-venue">
      <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-surface-container-lowest p-space-lg lg:p-space-xl border border-primary/40 overflow-hidden shadow-2xl">
          {/* Ambient Spotlight */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none"></div>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-space-xl">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-primary/10 border border-primary/30 mb-space-sm shadow-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                {VENUE_VIDEO_DETAILS.sectionBadge}
              </span>
            </div>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-semibold">
              {VENUE_VIDEO_DETAILS.sectionTitle}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl mx-auto">
              Get an exclusive walkthrough of the luxury banquet hall and gala stage selected for Iconic Creation Of God 2026.
            </p>
          </div>

          {/* Video Player + Information Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Left: Responsive HTML5 Video Player */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/40 bg-black aspect-video group">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={VENUE_VIDEO_DETAILS.posterUrl}
                  className="w-full h-full object-cover"
                  title="Explore the Banquet Hall for Iconic Creation Of God 2026"
                  aria-label="Video walkthrough of the banquet hall venue for Iconic Creation Of God 2026"
                >
                  <source src={VENUE_VIDEO_DETAILS.videoUrl} type="video/mp4" />
                  <p className="p-4 text-center text-sm text-white">
                    Your browser does not support HTML5 video playback. You can download or view the video directly at{' '}
                    <a
                      href={VENUE_VIDEO_DETAILS.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-primary"
                    >
                      this link
                    </a>.
                  </p>
                </video>
              </div>

              {/* Floor Layout Quick Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm font-body-sm text-body-sm text-on-surface pt-1">
                <div className="flex items-center gap-2 p-space-sm rounded-xl bg-surface-container border border-outline-variant/30">
                  <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Ground Floor:</strong> Grand Stage & Ramp</span>
                </div>
                <div className="flex items-center gap-2 p-space-sm rounded-xl bg-surface-container border border-outline-variant/30">
                  <Utensils className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>First Floor:</strong> Royal Lunch Buffet</span>
                </div>
              </div>
            </div>

            {/* Right: English & Hindi Venue Description + CTA */}
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              {/* Card Title */}
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider block">
                  Official Venue Announcement
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold mt-1">
                  {VENUE_VIDEO_DETAILS.cardTitle}
                </h3>
              </div>

              {/* English Description Box */}
              <div className="p-space-md rounded-2xl bg-surface-container/70 border border-outline-variant/30 text-on-surface space-y-3 font-body-md text-body-md leading-relaxed">
                {VENUE_VIDEO_DETAILS.englishDescription.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Hindi Announcement Box */}
              <div className="p-space-md rounded-2xl bg-surface-container-high/60 border border-primary/30 text-on-surface space-y-2 font-body-md text-body-md leading-relaxed">
                <div className="flex items-center gap-2 text-primary pb-1 border-b border-outline-variant/30">
                  <span className="material-symbols-outlined text-sm font-bold">translate</span>
                  <span className="font-label-sm text-xs uppercase tracking-wider font-bold">
                    स्थान एवं व्यवस्था संदेश (Hindi)
                  </span>
                </div>
                {VENUE_VIDEO_DETAILS.hindiDescription.map((para, idx) => (
                  <p key={idx} className="text-on-surface font-medium">
                    {para}
                  </p>
                ))}
              </div>

              {/* Book Your Seat Button */}
              <div className="pt-2">
                <Link
                  to="/register"
                  className="w-full inline-flex items-center justify-center gap-2 px-space-xl py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold shadow-gold-glow hover:bg-primary transition-all duration-300 transform hover:-translate-y-0.5 text-center"
                >
                  <Ticket className="w-5 h-5" />
                  <span>Book Your Seat</span>
                </Link>
                <p className="text-center text-xs text-on-surface-variant mt-2">
                  Limited VIP, Audition, and Masterclass passes available. Registration closes once hall capacity is reached.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
