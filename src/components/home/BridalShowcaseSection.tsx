import { Sparkles, ArrowRight, Palette, Eye } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { IMAGES } from '@/data/content';
import { SectionHeading } from '@/components/ui';

const LOOKS = [
  { name: 'The Royal Bride', desc: 'Traditional red & gold with statement polki', image: IMAGES.brideJewelry, artist: 'Celebrity HD Makeup' },
  { name: 'Soft Glam', desc: 'Dewy skin, nude tones, flutter lashes', image: IMAGES.brideEarring, artist: 'Airbrush Specialist' },
  { name: 'Modern Ivory', desc: 'Minimal lace with pearl accents', image: IMAGES.brideTiara, artist: 'Editorial Artist' },
];

export function BridalShowcaseSection() {
  const { navigate } = useRouter();
  return (
    <section className="relative overflow-hidden bg-charcoal-900 py-16 sm:py-24">
      {/* Decorative */}
      <div className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full bg-blush-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl section-pad">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <SectionHeading
              light
              eyebrow="Bridal makeover"
              title={<>Your <span className="gold-text">signature look</span>, crafted by celebrity artists</>}
              subtitle="HD makeup, airbrush, draping, and trial sessions — designed around your features, outfit, and lighting. Every look is built to last from the first ritual to the last photo."
            />

            <div className="mt-8 space-y-3">
              {[
                { icon: Palette, title: 'Personalized color analysis', desc: 'Tones matched to your outfit, venue lighting & skin.' },
                { icon: Sparkles, title: 'Multi-look packages', desc: 'Mehndi, sangeet, ceremony & reception — up to 4 looks.' },
                { icon: Eye, title: 'Trial before the day', desc: 'A full trial session weeks ahead so there are no surprises.' },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-gradient text-charcoal-900">
                    <f.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{f.title}</div>
                    <div className="text-xs text-charcoal-300">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => navigate('bridal-makeover')} className="mt-8 btn-gold">
              Explore Bridal Makeover <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right: look grid */}
          <div className="grid grid-cols-2 gap-4">
            {LOOKS.map((look, i) => (
              <div
                key={look.name}
                className={`group relative overflow-hidden rounded-3xl ${i === 0 ? 'row-span-2 h-full' : 'h-48'}`}
              >
                <img src={look.image} alt={look.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="font-serif text-lg text-white">{look.name}</div>
                  <div className="text-xs text-charcoal-200">{look.desc}</div>
                  <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-gold-400/90 px-2 py-0.5 text-[10px] font-semibold text-charcoal-900">
                    {look.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
