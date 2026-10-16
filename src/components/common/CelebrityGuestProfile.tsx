import React from 'react';
import { Link } from 'react-router-dom';
import { CELEBRITY_PROFILE } from '../../assets/constants';
import { Film, Tv, Sparkles, Award, ArrowRight } from 'lucide-react';

interface CelebrityGuestProfileProps {
  showCta?: boolean;
  className?: string;
}

export const CelebrityGuestProfile: React.FC<CelebrityGuestProfileProps> = ({
  showCta = true,
  className = '',
}) => {
  return (
    <section className={`w-full py-space-xl ${className}`} id="celebrity-guest">
      <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-surface-container-lowest p-space-lg lg:p-space-xl border border-primary/40 overflow-hidden shadow-2xl">
          {/* Ambient Royal Gold Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/15 blur-[110px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full pointer-events-none"></div>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-space-lg">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-primary/10 border border-primary/30 mb-space-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                Guest of Honour • VIP Felicitator
              </span>
            </div>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-semibold">
              Meet Our Celebrity Guest – <span className="text-primary italic font-serif">Jividha Sharma</span>
            </h2>
            <p className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-semibold mt-1">
              Bollywood & Indian Cinema Actress
            </p>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Celebrity Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden p-2 bg-gradient-to-b from-primary/50 via-surface-container-high to-surface-container-lowest shadow-2xl">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-surface-container">
                  <img
                    src={CELEBRITY_PROFILE.photo}
                    alt={CELEBRITY_PROFILE.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="font-headline-md text-headline-md text-primary font-bold block">
                      {CELEBRITY_PROFILE.name}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest font-semibold block mt-0.5">
                      {CELEBRITY_PROFILE.designation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction and Filmography Credits */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              {/* Introduction Box */}
              <div className="p-space-md lg:p-space-lg rounded-2xl bg-surface-container/70 border border-outline-variant/30 backdrop-blur-sm">
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                  {CELEBRITY_PROFILE.introduction}
                </p>
              </div>

              {/* Two Clean Columns on Desktop & Stacked on Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {/* Column 1: Famous Movies */}
                <div className="p-space-md rounded-2xl bg-surface-container-high/60 border border-primary/20 shadow-sm flex flex-col gap-space-sm">
                  <div className="flex items-center gap-2 text-primary pb-1 border-b border-outline-variant/30">
                    <Film className="w-5 h-5 text-primary shrink-0" />
                    <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                      Famous Movies
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface">
                    {CELEBRITY_PROFILE.famousMovies.map((movie) => (
                      <li
                        key={movie.title}
                        className="flex items-center justify-between py-1 px-2 rounded-lg bg-surface-container-lowest/70 border border-outline-variant/20"
                      >
                        <span className="font-semibold text-on-surface">{movie.title}</span>
                        <span className="font-label-sm text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                          {movie.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Famous TV Serials */}
                <div className="p-space-md rounded-2xl bg-surface-container-high/60 border border-secondary/20 shadow-sm flex flex-col gap-space-sm">
                  <div className="flex items-center gap-2 text-secondary pb-1 border-b border-outline-variant/30">
                    <Tv className="w-5 h-5 text-secondary shrink-0" />
                    <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                      Famous TV Serials
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface">
                    {CELEBRITY_PROFILE.famousTvSerials.map((serial) => (
                      <li
                        key={serial.title}
                        className="flex items-center justify-between py-1 px-2 rounded-lg bg-surface-container-lowest/70 border border-outline-variant/20"
                      >
                        <span className="font-semibold text-on-surface">{serial.title}</span>
                        <span className="font-label-sm text-xs font-bold text-secondary px-2 py-0.5 rounded bg-secondary/10">
                          {serial.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Event Felicitation Note & CTA */}
              <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-space-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-title-sm text-title-sm text-on-surface font-bold block">
                      Trophy & Sash Felicitation
                    </span>
                    <span className="text-xs text-on-surface-variant block">
                      Winners will be personally conferred and photographed with Jividha Sharma.
                    </span>
                  </div>
                </div>

                {showCta && (
                  <Link
                    to="/register"
                    className="shrink-0 inline-flex items-center gap-2 px-space-lg py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold shadow-gold-glow hover:bg-primary transition-all"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
