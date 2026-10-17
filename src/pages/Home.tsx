import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_ASSETS, EVENT_DETAILS, CONTACT_DETAILS } from '../assets/constants';
import { SEO } from '../components/common/SEO';
import { CelebrityGuestProfile } from '../components/common/CelebrityGuestProfile';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <SEO
        title="Iconic Creation Of God | Mr, Miss & Mrs"
        description="Celebrate talent, confidence and achievement at Iconic Creation Of God — Mr/Miss/Mrs, presented by Janta Live News & Deven Jha Productions. Explore event details and register online."
        canonical="https://registration.jantalive.in/"
      />
      {/* HERO SECTION: Atmospheric Red Carpet Stage */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest pt-20 pb-space-xl">
        {/* Ambient Golden Runway Spotlights */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-primary/15 blur-[140px] rounded-full"></div>
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-secondary-container/15 blur-[160px] rounded-full"></div>
        </div>

        <div className="relative w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Super Title Badge */}
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high border border-primary/30 shadow-lg mb-space-lg">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Presented by Janta Live News & Deven Jha Productions
            </span>
          </div>

          {/* Main Page Title & Subheading */}
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface uppercase max-w-5xl leading-tight">
            Iconic Creation <span className="italic font-normal text-primary">Of God</span>
          </h1>

          <div className="mt-space-xs flex items-center justify-center gap-space-md">
            <span className="h-px w-12 bg-primary/40"></span>
            <p className="font-headline-md text-headline-md text-primary tracking-widest uppercase font-light">
              Mr • Miss • Mrs
            </p>
            <span className="h-px w-12 bg-primary/40"></span>
          </div>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-md">
            A Celebration of Beauty, Talent, Fashion & Creativity. Delhi NCR’s quintessential runway extravaganza honouring sovereign distinction and visionary artistry.
          </p>

          {/* Key Details Strip */}
          <div className="mt-space-xl w-full max-w-4xl p-space-md rounded-2xl md:rounded-full bg-surface-container/85 backdrop-blur-md border border-outline-variant/40 shadow-2xl flex flex-col md:flex-row items-center justify-around gap-space-md">
            <div className="flex items-center gap-space-sm text-on-surface">
              <span className="material-symbols-outlined text-primary text-2xl">calendar_month</span>
              <div className="text-left">
                <span className="block font-label-sm text-label-sm uppercase text-outline">Date</span>
                <span className="font-label-lg text-label-lg font-semibold">{EVENT_DETAILS.date}</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-surface-variant"></div>
            <div className="flex items-center gap-space-sm text-on-surface">
              <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
              <div className="text-left">
                <span className="block font-label-sm text-label-sm uppercase text-outline">Venue</span>
                <span className="font-label-lg text-label-lg font-semibold">{EVENT_DETAILS.location}</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-surface-variant"></div>
            <div className="flex items-center gap-space-sm text-on-surface">
              <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
              <div className="text-left">
                <span className="block font-label-sm text-label-sm uppercase text-outline">Timing</span>
                <span className="font-label-lg text-label-lg font-semibold">{EVENT_DETAILS.time}</span>
              </div>
            </div>
          </div>

          {/* Hero Actions */}
          <div className="mt-space-xl flex flex-wrap items-center justify-center gap-space-md">
            <Link
              to="/register"
              className="inline-flex items-center gap-space-xs px-space-xl py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase font-bold shadow-gold-glow hover:bg-primary hover:text-on-primary transition-all duration-300"
            >
              <span>Register for the Event</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
            <a
              href="#pillars"
              className="inline-flex items-center gap-space-xs px-space-xl py-3.5 rounded-full bg-surface-container-high text-on-surface border border-outline-variant/30 font-label-lg text-label-lg uppercase font-medium hover:bg-surface-variant transition-colors"
            >
              <span>Explore the Event</span>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </a>
          </div>
        </div>

        {/* Hero Visual Splendor Stage Overlap */}
        <div className="relative w-full max-w-6xl mx-auto px-margin-mobile lg:px-margin mt-space-xl">
          <div className="relative h-[380px] lg:h-[460px] rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
            <img
              src={BRAND_ASSETS.heroRunway}
              alt="Grand fashion runway stage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-end justify-between gap-space-md">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                  Coronation • Runway • Honours
                </span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
                  The Grandest Realm of Indian Pageantry
                </h3>
              </div>
              <div className="px-space-md py-space-sm rounded-xl bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/40">
                <span className="font-label-sm text-label-sm text-primary uppercase block font-semibold">
                  Media Partner
                </span>
                <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                  Live Broadcast by Janta Live News
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT INTRODUCTION: The Four Pillars */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto" id="pillars">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-space-xl mb-space-xl">
          <div className="max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              Unfolding Grandeur
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs font-semibold">
              An Odyssey of High Couture, Artistry & Stature
            </h2>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            Iconic Creation Of God unites India’s emerging fashion luminaries, makeup visionaries, and aspiring icons across four sovereign dimensions of industry excellence.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Pillar 1 */}
          <div className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-md hover:-translate-y-1 transition-transform duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
                <span className="material-symbols-outlined text-2xl">auto_fix_high</span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Dimension I</span>
              <h3 className="font-title-lg text-title-lg text-on-surface mt-1 mb-space-xs font-bold">
                Makeup Seminar
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Masterclasses conducted by celebrated industry icons covering luxury bridal aesthetics, HD cinematic sculpting, and avant-garde editorial transformation artistry.
              </p>
            </div>
            <div className="pt-space-md mt-space-md border-t border-surface-variant/40">
              <Link to="/event" className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold flex items-center gap-1 hover:underline">
                Hands-on Curation <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-md hover:-translate-y-1 transition-transform duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
                <span className="material-symbols-outlined text-2xl">brush</span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Dimension II</span>
              <h3 className="font-title-lg text-title-lg text-on-surface mt-1 mb-space-xs font-bold">
                Makeup Competition
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Live competitive arena celebrating raw creativity and precision. Stylists demonstrate live model metamorphoses assessed by seasoned Bollywood and media juries.
              </p>
            </div>
            <div className="pt-space-md mt-space-md border-t border-surface-variant/40">
              <Link to="/event" className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold flex items-center gap-1 hover:underline">
                Trophy Recognition <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-md hover:-translate-y-1 transition-transform duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
                <span className="material-symbols-outlined text-2xl">styler</span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Dimension III</span>
              <h3 className="font-title-lg text-title-lg text-on-surface mt-1 mb-space-xs font-bold">
                Fashion Runway
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                A grand runway pageant highlighting regal couture, ethnic majesty, and contemporary high-fashion modeling beneath dazzling production lighting.
              </p>
            </div>
            <div className="pt-space-md mt-space-md border-t border-surface-variant/40">
              <Link to="/event" className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold flex items-center gap-1 hover:underline">
                Designer Showcase <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-md hover:-translate-y-1 transition-transform duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Dimension IV</span>
              <h3 className="font-title-lg text-title-lg text-on-surface mt-1 mb-space-xs font-bold">
                Grand Award Show
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Prestigious awards felicitation evening honoring top achievers, visionary couturiers, and distinguished talents with national media coverage.
              </p>
            </div>
            <div className="pt-space-md mt-space-md border-t border-surface-variant/40">
              <Link to="/event" className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold flex items-center gap-1 hover:underline">
                Bollywood Felicitation <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT CATEGORIES: Mr, Miss, Mrs */}
      <section className="w-full bg-surface-container-low py-space-xl" id="categories">
        <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              The Crowns of Dignity
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs font-semibold">
              Competition Categories
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              Select your sovereign realm and claim the national spotlight. Dedicated juries assess runway presence, charisma, and intellectual grace.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
            {/* Mr Category */}
            <div className="rounded-2xl bg-surface-container overflow-hidden border border-outline-variant/30 shadow-xl flex flex-col">
              <div className="h-64 relative overflow-hidden">
                <img
                  src={BRAND_ASSETS.categoryMr}
                  alt="Mr Category Candidate"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Category • 01
                  </span>
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Mr Category</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
                    Refined runway modeling, sartorial styling, magnetic stage command, and contemporary poise crafted for the modern gentleman.
                  </p>
                  <div className="flex flex-wrap gap-space-xs my-space-md">
                    <span className="px-space-sm py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface">
                      Runway Walk
                    </span>
                    <span className="px-space-sm py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface">
                      Styling & Suiting
                    </span>
                    <span className="px-space-sm py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface">
                      Screen Presence
                    </span>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="mt-space-md w-full py-3 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-label-md uppercase font-semibold text-center transition-colors"
                >
                  Register for Mr
                </Link>
              </div>
            </div>

            {/* Miss Category */}
            <div className="rounded-2xl bg-surface-container overflow-hidden border border-primary/40 shadow-xl flex flex-col relative">
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-primary-container text-on-primary-container shadow-md">
                <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">
                  Couture Crown
                </span>
              </div>
              <div className="h-64 relative overflow-hidden">
                <img
                  src={BRAND_ASSETS.categoryMiss}
                  alt="Miss Category Candidate"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Category • 02
                  </span>
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Miss Category</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
                    Elegance, couture walking technique, charismatic persona, and dynamic talent showcase highlighting youthful empowerment and style.
                  </p>
                  <div className="flex flex-wrap gap-space-xs my-space-md">
                    <span className="px-space-sm py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface">
                      High Fashion
                    </span>
                    <span className="px-space-sm py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface">
                      Couture Poise
                    </span>
                    <span className="px-space-sm py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface">
                      Artistic Expression
                    </span>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="mt-space-md w-full py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md uppercase font-semibold text-center transition-colors shadow-lg"
                >
                  Register for Miss
                </Link>
              </div>
            </div>

            {/* Mrs Category */}
            <div className="rounded-2xl bg-surface-container overflow-hidden border border-outline-variant/30 shadow-xl flex flex-col">
              <div className="h-64 relative overflow-hidden">
                <img
                  src={BRAND_ASSETS.categoryMrs}
                  alt="Mrs Category Candidate"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Category • 03
                  </span>
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Mrs Category</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
                    Sovereign grace, inspirational leadership, contemporary sophistication, and unshakeable poise celebrating the journey of accomplished women.
                  </p>
                  <div className="flex flex-wrap gap-space-xs my-space-md">
                    <span className="px-space-sm py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface">
                      Grace & Stature
                    </span>
                    <span className="px-space-sm py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface">
                      Empowerment
                    </span>
                    <span className="px-space-sm py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface">
                      Ethnic Splendor
                    </span>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="mt-space-md w-full py-3 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-label-md uppercase font-semibold text-center transition-colors"
                >
                  Register for Mrs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CELEBRITY GUEST SPOTLIGHT: Jividha Sharma Profile */}
      <CelebrityGuestProfile />

      {/* EXCLUSIVE OPPORTUNITY: 'Devi And Diva' */}
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto">
          <div className="p-space-lg lg:p-space-xl rounded-3xl bg-surface-container-high border border-outline-variant/40 relative overflow-hidden shadow-xl">
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-xl">movie</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                    Production Spotlight
                  </span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold">
                  Exclusive Short Film Casting: <span className="text-primary italic">‘Devi And Diva’</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Deven Jha Productions announces an exclusive casting prospect through the Iconic Creation Of God pageant. Standout contestants and exceptional makeup artists participating in this edition may be scouted for roles and makeup artistry in the upcoming cinematic short film <em>‘Devi And Diva’</em>.
                </p>
                <div className="p-space-md rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 text-on-surface-variant font-body-sm text-body-sm">
                  <span className="text-primary font-semibold flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-sm">info</span> Organizer Notice
                  </span>
                  Final selection and film assignments remain strictly subject to the sole creative and directorial decisions of the organizers and production house.
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg border border-primary/20">
                  <img
                    src={BRAND_ASSETS.deviAndDiva}
                    alt="Devi And Diva Film Set"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="font-title-lg text-title-lg text-on-surface font-bold">‘Devi And Diva’</span>
                    <span className="block font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                      A Deven Jha Productions Presentation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT SCHEDULE & QUICK FACTS */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-space-md mb-space-lg">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              Ceremony Blueprint
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs font-semibold">
              Event Itinerary & Facts
            </h2>
          </div>
          <span className="font-body-sm text-body-sm text-outline">
            Schedule subject to stage management sequencing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Fact 1 */}
          <div className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-md">
            <div className="flex items-center gap-space-sm mb-space-md">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">event</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Date of Gala</span>
                <h4 className="font-headline-md text-headline-md text-on-surface font-semibold">{EVENT_DETAILS.date}</h4>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Mark your calendar for the single most awaited day of couture talent, model coronations, and live beauty artistry masterclasses.
            </p>
          </div>

          {/* Fact 2 */}
          <div className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-md">
            <div className="flex items-center gap-space-sm mb-space-md">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">location_city</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Destination</span>
                <h4 className="font-headline-md text-headline-md text-on-surface font-semibold">{EVENT_DETAILS.location}</h4>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Conveniently hosted in the premier heart of the National Capital Region, offering expansive runway setups and red-carpet reception zones.
            </p>
          </div>

          {/* Fact 3 */}
          <div className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-md">
            <div className="flex items-center gap-space-sm mb-space-md">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">timelapse</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Duration</span>
                <h4 className="font-headline-md text-headline-md text-on-surface font-semibold">{EVENT_DETAILS.time}</h4>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              An intensive eight-hour immersion starting with the morning makeup seminar, midday competitive walkouts, and the twilight Bollywood Award Show.
            </p>
          </div>
        </div>
      </section>

      {/* ORGANIZERS SECTION: Deven Jha & Ritu Jha */}
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              The Visionaries
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs font-semibold">
              Honorable Organizers
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              Pioneering media excellence, cultural pageantry, and creative platforms for new-generation artists and creators across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl max-w-4xl mx-auto">
            {/* Deven Jha Card */}
            <div className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col sm:flex-row items-center sm:items-start gap-space-md shadow-lg">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-primary/40">
                <img
                  src={BRAND_ASSETS.organizerDeven}
                  alt="Deven Jha – Organizer of Iconic Creation Of God"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Event Organizer & Producer
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-0.5 font-bold">
                  Deven Jha
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  Founder of Deven Jha Productions and media strategist. Dedicated to bringing uncompromised production standards to Indian runway fashion and emerging actors.
                </p>
                <div className="mt-space-sm inline-flex items-center gap-1 font-label-sm text-label-sm text-outline">
                  <span className="material-symbols-outlined text-xs text-primary">verified</span> Verified Organizer
                </div>
              </div>
            </div>

            {/* Ritu Jha Card */}
            <div className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col sm:flex-row items-center sm:items-start gap-space-md shadow-lg">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-primary/40 bg-surface-container-high">
                <img
                  src={BRAND_ASSETS.organizerRitu}
                  alt="Ritu Jha – Event Organizer & Curator of Iconic Creation Of God"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = BRAND_ASSETS.organizerRitu;
                  }}
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Event Organizer & Curator
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-0.5 font-bold">
                  Ritu Jha
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                  Visionary behind the pageant's artistic ethos and talent empowerment modules. Advocating for authentic celebration of women and multifaceted artists across India.
                </p>
                <div className="mt-space-sm inline-flex items-center gap-1 font-label-sm text-label-sm text-outline">
                  <span className="material-symbols-outlined text-xs text-primary">verified</span> Verified Organizer
                </div>
              </div>
            </div>
          </div>

          {/* Organizer Secretariat Contact Bar */}
          <div className="mt-space-lg max-w-4xl mx-auto p-space-md sm:p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-space-md text-center sm:text-left shadow-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block">
                Organizer Secretariat Desk
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                For auditions, nominations &amp; partnerships under Deven Jha &amp; Ritu Jha
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
              <a
                href={CONTACT_DETAILS.phoneTel}
                className="px-3.5 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface hover:text-primary hover:border-primary transition-colors text-xs font-semibold inline-flex items-center gap-1.5"
                title="Call Secretariat"
              >
                <span className="material-symbols-outlined text-sm text-primary">call</span>
                <span>{CONTACT_DETAILS.phoneDisplay}</span>
              </a>
              <a
                href={CONTACT_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-colors text-xs font-semibold inline-flex items-center gap-1.5"
                title="Chat on WhatsApp"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                <span>WhatsApp</span>
              </a>
              <a
                href={CONTACT_DETAILS.emailMailto}
                className="px-3.5 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface hover:text-primary hover:border-primary transition-colors text-xs font-semibold inline-flex items-center gap-1.5"
                title="Send Email"
              >
                <span className="material-symbols-outlined text-sm text-primary">mail</span>
                <span>{CONTACT_DETAILS.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION CTA SECTION */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-5xl mx-auto" id="register">
        <div className="relative rounded-3xl bg-gradient-to-b from-surface-container via-surface-container-high to-surface-container p-space-lg sm:p-space-xl md:p-14 border border-primary/40 shadow-2xl overflow-hidden text-center">
          {/* Ambient Spotlight Background Accent */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/15 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Crown / Star Luxury Badge */}
            <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest/80 border border-primary/30 shadow-md mb-space-md">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                award_star
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                Official Audition &amp; Candidate Portal
              </span>
            </div>

            {/* Main Title */}
            <h2 className="font-headline-xl text-headline-xl text-on-surface uppercase font-semibold tracking-wide">
              Ready to Claim Your <span className="text-primary italic font-normal">Spotlight?</span>
            </h2>

            {/* Short Description */}
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-md max-w-2xl leading-relaxed">
              Step onto Delhi NCR&apos;s grandest coronation stage. Take your place among India&apos;s finest talents and register for the prestigious <strong className="text-on-surface font-semibold">Mr, Miss &amp; Mrs Iconic Creation Of God 2026</strong>, presented by Janta Live News &amp; Deven Jha Productions.
            </p>

            {/* Action Buttons */}
            <div className="mt-space-xl flex flex-col sm:flex-row items-center justify-center gap-space-md w-full sm:w-auto">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-4 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase font-bold tracking-wider hover:bg-primary hover:text-on-primary shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Register Now</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                to="/event"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-4 rounded-full bg-surface-container-high text-on-surface border border-outline-variant/40 font-label-lg text-label-lg uppercase font-semibold hover:bg-surface-variant hover:border-primary/40 active:scale-95 transition-all duration-300"
              >
                <span>Explore Event Details</span>
                <span className="material-symbols-outlined text-base">explore</span>
              </Link>
            </div>

            {/* Small Note */}
            <p className="mt-space-lg inline-flex items-center justify-center gap-1.5 px-space-md py-2 rounded-full bg-surface-container-lowest/60 border border-outline-variant/20 text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              <span>Complete your registration through our official registration portal.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA HANDLES */}
      <section className="w-full bg-surface-container-lowest py-space-xl">
        <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto">
          {/* Social Media Connect */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md text-center">
            <span className="font-label-md text-label-md uppercase tracking-widest text-outline">
              Follow Official Handles:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-space-md">
              <a
                href="https://instagram.com/jantalivenews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container border border-outline-variant/30 text-on-surface hover:text-primary transition-colors font-body-sm text-body-sm"
              >
                <span className="material-symbols-outlined text-primary text-base">photo_camera</span>
                <span>@jantalivenews</span>
              </a>
              <a
                href="https://instagram.com/devenjhaproductions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container border border-outline-variant/30 text-on-surface hover:text-primary transition-colors font-body-sm text-body-sm"
              >
                <span className="material-symbols-outlined text-primary text-base">movie_filter</span>
                <span>@devenjhaproductions</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
