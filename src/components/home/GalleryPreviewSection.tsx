import { ArrowRight } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { GALLERY } from '@/data/content';
import { SectionHeading } from '@/components/ui';

export function GalleryPreviewSection() {
  const { navigate } = useRouter();
  return (
    <section className="bg-charcoal-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl section-pad">
        <SectionHeading
          center
          light
          eyebrow="Moments"
          title={<>A glimpse of <span className="gold-text">forever</span></>}
          subtitle="Real weddings, real emotions — captured by our photographer network."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {GALLERY.map((g, i) => (
            <button
              key={g.id}
              onClick={() => navigate('gallery')}
              className={`group relative overflow-hidden rounded-2xl animate-fade-up ${g.span ? 'col-span-2 row-span-2' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img
                src={g.image}
                alt={g.title}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${g.span ? 'h-full min-h-[280px]' : 'h-40 sm:h-52'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                <div className="text-xs font-medium text-gold-300">{g.category}</div>
                <div className="font-serif text-sm text-white sm:text-base">{g.title}</div>
              </div>
              <ArrowRight className="absolute right-3 top-3 h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button onClick={() => navigate('gallery')} className="btn-gold">View full gallery</button>
        </div>
      </div>
    </section>
  );
}
