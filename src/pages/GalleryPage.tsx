import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/ui';
import { GALLERY, IMAGES } from '@/data/content';

const ALL = GALLERY;
const CATS = ['All', ...Array.from(new Set(ALL.map((g) => g.category)))];

export function GalleryPage() {
  const [cat, setCat] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = ALL.filter((g) => cat === 'All' || g.category === cat);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={<>Real weddings, <span className="gold-text">real moments</span></>}
        subtitle="A curated look at the celebrations we’ve had the honor of managing."
        image={IMAGES.coupleVeil}
        crumb="Gallery"
      />

      <Section>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${cat === c ? 'bg-maroon-700 text-white' : 'bg-charcoal-50 text-charcoal-600 hover:bg-charcoal-100'}`}>{c}</button>
          ))}
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setLightbox(g.image)}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-soft animate-fade-up break-inside-avoid"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <img src={g.image} alt={g.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                <div className="text-xs font-medium text-gold-300">{g.category}</div>
                <div className="font-serif text-base text-white">{g.title}</div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal-900/90 p-4 backdrop-blur animate-fade-in">
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-2xl shadow-luxe" />
          <button onClick={() => setLightbox(null)} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">✕</button>
        </div>
      )}
    </>
  );
}
