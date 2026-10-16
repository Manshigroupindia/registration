import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_ASSETS, EVENT_DETAILS } from '../assets/constants';
import { Sparkles, Calendar, Clock, MapPin, Award, CheckCircle2, Video, Camera, ArrowRight } from 'lucide-react';

export const EventActivities: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Header */}
      <section className="relative w-full bg-surface-container-lowest py-20 px-margin-mobile lg:px-margin border-b border-outline-variant/30 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-primary/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high border border-primary/30 mb-space-md shadow-sm">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              The Grand Agenda
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-semibold">
            Event & <span className="text-primary italic">Activities</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-space-md leading-relaxed">
            Four pillars of creative excellence staged seamlessly in Delhi NCR. Discover the comprehensive program of masterclasses, competitive catwalks, and celebrity coronations.
          </p>

          <div className="mt-space-lg flex flex-wrap items-center justify-center gap-space-lg font-label-md text-label-md text-on-surface">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{EVENT_DETAILS.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{EVENT_DETAILS.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{EVENT_DETAILS.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Activity 1: Makeup Seminar */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto">
        <div className="p-space-lg lg:p-space-xl rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest font-bold">
              <span className="material-symbols-outlined text-base">auto_fix_high</span>
              <span>Morning Session • 10:00 AM – 1:00 PM</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
              I. Luxury Makeup Artistry Seminar
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Curated for professional makeup artists, salon founders, and aspiring beauty creators. Renowned celebrity artists demonstrate real-time high-definition bridal sculpting, airbrushing techniques, and editorial camera-ready aesthetics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm font-body-sm text-body-sm text-on-surface pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>HD Cinematic Bridal Contouring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Product Formulation & Vanity Secrets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Live Model Demo with Stage Lighting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Official Masterclass Certificate Conferment</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-primary font-label-md text-label-md uppercase font-bold hover:underline"
              >
                <span>Register for Seminar Pass</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-primary/20">
              <img
                src={BRAND_ASSETS.poojaKashyap}
                alt="Makeup Masterclass"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block">
                  Industry Masterclass
                </span>
                <span className="font-title-lg text-title-lg text-on-surface font-bold">
                  Bridal & High-Fashion Artistry
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity 2: Live Makeup Battle */}
      <section className="w-full bg-surface-container-low py-space-xl border-y border-outline-variant/30">
        <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto">
          <div className="p-space-lg lg:p-space-xl rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div className="lg:col-span-5 order-last lg:order-first">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-primary/20">
                <img
                  src={BRAND_ASSETS.categoryMrs}
                  alt="Live Makeup Competition"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block">
                    Competitive Arena
                  </span>
                  <span className="font-title-lg text-title-lg text-on-surface font-bold">
                    Raw Creativity & Live Model Metamorphosis
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-base">brush</span>
                <span>Midday Arena • 1:30 PM – 3:30 PM</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
                II. Live Makeup Competition
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Step onto the competitive stage where creativity is judged under strict timers and high-intensity production lights. Stylists transform live models evaluated by industry stalwarts on technical blend, symmetry, theme execution, and final ramp presentation.
              </p>
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-body-sm text-body-sm flex flex-col gap-1">
                <span className="font-bold text-primary">Jury Evaluation Pillars:</span>
                <span>Skin preparation (25%), Creative Theme Translation (25%), Cleanliness & Speed (25%), Catwalk Presence (25%).</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 text-primary font-label-md text-label-md uppercase font-bold hover:underline"
                >
                  <span>Enrol as Makeup Contestant</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity 3: Fashion Runway (Mr, Miss, Mrs) */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto">
        <div className="p-space-lg lg:p-space-xl rounded-3xl bg-surface-container border border-primary/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest font-bold">
              <span className="material-symbols-outlined text-base">styler</span>
              <span>Afternoon Runway • 3:30 PM – 5:00 PM</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
              III. The Grand Fashion Runway Pageant
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Models take to the red-carpet ramp in three sovereign categories: Mr, Miss, and Mrs. Featuring ethnic haute couture, bespoke designer wear, and high-fashion evening gowns under theatrical illumination and live camera broadcast.
            </p>
            <div className="grid grid-cols-3 gap-space-sm">
              <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 text-center">
                <span className="font-label-sm text-label-sm uppercase text-primary font-bold block">Mr Category</span>
                <span className="text-xs text-outline">Sharp Couture</span>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 text-center">
                <span className="font-label-sm text-label-sm uppercase text-primary font-bold block">Miss Category</span>
                <span className="text-xs text-outline">Runway Poise</span>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 text-center">
                <span className="font-label-sm text-label-sm uppercase text-primary font-bold block">Mrs Category</span>
                <span className="text-xs text-outline">Empowerment</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-primary font-label-md text-label-md uppercase font-bold hover:underline"
              >
                <span>Register for Model Runway</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-primary/20">
              <img
                src={BRAND_ASSETS.heroRunway}
                alt="Fashion Runway Ramp"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block">
                  Delhi NCR Runway Ramp
                </span>
                <span className="font-title-lg text-title-lg text-on-surface font-bold">
                  The National Ramp Walk
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity 4: Grand Award Show & Celebrity Coronation */}
      <section className="w-full bg-surface-container-low py-space-xl border-t border-outline-variant/30">
        <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto">
          <div className="p-space-lg lg:p-space-xl rounded-3xl bg-surface-container border border-primary/40 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div className="lg:col-span-5 order-last lg:order-first">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/40">
                <img
                  src={BRAND_ASSETS.celebrityJivitha}
                  alt="Jivitha Sharma Felicitation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="font-headline-md text-headline-md text-primary font-bold block">
                    Jivitha Sharma
                  </span>
                  <span className="font-label-sm text-label-sm uppercase text-on-surface tracking-widest font-semibold">
                    Guest of Honour & VIP Felicitator
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-base">workspace_premium</span>
                <span>Twilight Coronation • 5:00 PM – 6:00 PM</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
                IV. The Grand Award Show & Coronation
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                The pinnacle of Iconic Creation Of God. Winners across Mr, Miss, Mrs, and Makeup Competition tracks are crowned on the sovereign gala stage. Bollywood actress <strong>Jivitha Sharma</strong> personally confers the royal sashes, certificates, and crystal trophies before live broadcast cameras.
              </p>
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2 font-body-sm text-body-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary shrink-0" />
                  <span>National Media Interviews by Janta Live News</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-primary shrink-0" />
                  <span>Casting announcement shortlists for short film ‘Devi And Diva’</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-primary shrink-0" />
                  <span>Official red-carpet celebrity photo call & portfolio distribution</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-space-lg py-3 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold shadow-gold-glow hover:bg-primary transition-all"
                >
                  <span>Submit Audition Nomination</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
