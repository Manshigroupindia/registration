import React, { useState } from 'react';
import { BRAND_ASSETS } from '../assets/constants';
import { Image, X, ZoomIn, Sparkles } from 'lucide-react';
import { SEO } from '../components/common/SEO';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Runway' | 'Red Carpet' | 'Masterclass' | 'Awards' | 'Celebrity';
  imageUrl: string;
  description: string;
}

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Runway' | 'Red Carpet' | 'Masterclass' | 'Awards' | 'Celebrity'>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Grand Velvet Runway Stage',
      category: 'Runway',
      imageUrl: BRAND_ASSETS.heroRunway,
      description: 'Atmospheric Delhi NCR stage illuminated with golden spotlights and haute couture catwalk ramp.',
    },
    {
      id: 'gal-2',
      title: 'Bollywood Guest of Honour Jivitha Sharma',
      category: 'Celebrity',
      imageUrl: BRAND_ASSETS.celebrityJivitha,
      description: 'Acclaimed actress Jivitha Sharma gracing the red carpet as VIP Felicitator.',
    },
    {
      id: 'gal-3',
      title: 'Mr Iconic Pageant Titleholder Showcase',
      category: 'Runway',
      imageUrl: BRAND_ASSETS.categoryMr,
      description: 'Distinguished male finalist in bespoke velvet bandhgala showcasing sovereign runway command.',
    },
    {
      id: 'gal-4',
      title: 'Miss Iconic Couture Gown Ramp Walk',
      category: 'Runway',
      imageUrl: BRAND_ASSETS.categoryMiss,
      description: 'Miss category model gracefully walking in champagne gold crystal embellished gown.',
    },
    {
      id: 'gal-5',
      title: 'Mrs Iconic Royal Grace & Stature',
      category: 'Runway',
      imageUrl: BRAND_ASSETS.categoryMrs,
      description: 'Celebrating mature Indian grace, ethnic heritage, and contemporary women empowerment.',
    },
    {
      id: 'gal-6',
      title: 'Award Laureate Pooja Kashyap',
      category: 'Awards',
      imageUrl: BRAND_ASSETS.poojaKashyap,
      description: 'Conferred with the Best Makeup Artist & Creative Transformation Trophy of the Year.',
    },
    {
      id: 'gal-7',
      title: 'Aarav Malhotra — Runner Up Felicitation',
      category: 'Awards',
      imageUrl: BRAND_ASSETS.aaravMalhotra,
      description: 'Ceremonial accreditation and certificate handover on the grand stage.',
    },
    {
      id: 'gal-8',
      title: '‘Devi And Diva’ Film Production Clapperboard',
      category: 'Red Carpet',
      imageUrl: BRAND_ASSETS.deviAndDiva,
      description: 'Exclusive casting audition spotlight for the upcoming cinematic short film.',
    },
    {
      id: 'gal-9',
      title: 'Grand Ballroom & VIP Reception Zone',
      category: 'Red Carpet',
      imageUrl: BRAND_ASSETS.galaBallroom,
      description: 'Delhi NCR luxury venue decorated with imperial chandeliers and red carpet arrivals.',
    },
  ];

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeFilter);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <SEO
        title="Official Media Gallery | Iconic Creation Of God Runway & Gala"
        description="Browse high-resolution photographs, runway moments, celebrity appearances, and award ceremony highlights from Iconic Creation Of God events."
        canonical="https://registration.jantalive.in/gallery"
      />
      {/* Header */}
      <section className="relative w-full bg-surface-container-lowest py-20 px-margin-mobile lg:px-margin border-b border-outline-variant/30 text-center overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high border border-primary/30 mb-space-md shadow-sm">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              photo_library
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Visual Archives
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-semibold">
            Gala & Runway <span className="text-primary italic">Gallery</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-sm">
            Glimpses of high-fashion couture, celebrity moments, makeup transformations, and pageant honors from Iconic Creation Of God.
          </p>

          {/* Filter Bar */}
          <div className="mt-space-lg flex flex-wrap items-center justify-center gap-2">
            {(['All', 'Runway', 'Red Carpet', 'Celebrity', 'Awards'] as const).map((cat) => {
              const active = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-space-md py-2 rounded-full font-label-md text-label-md uppercase tracking-wider transition-all border ${
                    active
                      ? 'bg-primary-container text-on-primary-container border-primary font-bold shadow-gold-glow'
                      : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {cat === 'All' ? 'All Visuals' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-3xl bg-surface-container overflow-hidden border border-outline-variant/30 shadow-xl cursor-pointer hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-lowest">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase font-bold border border-primary/20">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-space-md flex flex-col gap-1">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-surface-container rounded-3xl border border-primary/40 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface-container-lowest/80 text-on-surface hover:text-primary flex items-center justify-center border border-outline-variant/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[70vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-space-lg bg-surface-container flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                {selectedItem.category} Archive
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                {selectedItem.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
