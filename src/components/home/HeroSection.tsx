import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Play, Star } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { HERO_SLIDES, STATS } from '@/data/content';
import { Button, Stat } from '@/components/ui';
import { useBooking } from '@/lib/booking-context';

export function HeroSection() {
  const { navigate } = useRouter();
  const { openBooking } = useBooking();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Cinematic background slider */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${i === slide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={s.image}
              alt={s.label}
              className={`h-full w-full object-cover ${i === slide ? 'animate-ken-burns' : ''}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-hero-overlay" />
        {/* Subtle maroon tint at top for header legibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-maroon-900/60 to-transparent" />
      </div>

      {/* Floating decor */}
      <div className="pointer-events-none absolute top-1/4 right-[8%] hidden h-32 w-32 rounded-full bg-gold-400/20 blur-3xl lg:block animate-float" />
      <div className="pointer-events-none absolute bottom-1/4 left-[6%] hidden h-40 w-40 rounded-full bg-blush-300/20 blur-3xl lg:block animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center section-pad pt-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md animate-fade-up">
            <Sparkles className="h-3.5 w-3.5 text-gold-300" />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/90">Luxury Wedding Platform</span>
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-white animate-fade-up sm:text-6xl lg:text-7xl" style={{ animationDelay: '80ms' }}>
            One Promise.
            <br />
            <span className="gold-text">Endless Memories.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-100/90 animate-fade-up" style={{ animationDelay: '160ms' }}>
            Weddon is a complete wedding planning & management platform — bridal & groom makeover, accessories & jewellery rental, boutique, photography, decoration, catering, DJ, travel, honeymoon, invitations, and an AI assistant.
          </p>

          <div className="mt-9 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <Button variant="gold" onClick={() => openBooking()} icon={ArrowRight}>Book Consultation</Button>
            <button
              onClick={() => navigate('gallery')}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <Play className="h-4 w-4" fill="currentColor" /> View Gallery
            </button>
          </div>

          {/* Rating row */}
          <div className="mt-10 flex items-center gap-5 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <div className="text-sm text-charcoal-100/80">
              <span className="font-semibold text-white">4.9/5</span> from 2,400+ couples
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 gap-1.5 sm:flex">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-8 bg-gold-400' : 'w-1.5 bg-white/40'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Stats bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-charcoal-900/40 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 section-pad py-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} light />
          ))}
        </div>
      </div>
    </section>
  );
}
