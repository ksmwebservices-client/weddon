import { Quote } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { TESTIMONIALS } from '@/data/content';
import { SectionHeading, StarRating } from '@/components/ui';

export function TestimonialsSection() {
  const { navigate } = useRouter();
  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="Love notes"
          title={<>Couples who said <span className="gold-text">“I do”</span> with us</>}
          subtitle="2,400+ weddings and counting. Here are a few of our favourites."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className="group relative overflow-hidden rounded-3xl border border-charcoal-100 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <Quote className="absolute right-5 top-5 h-10 w-10 text-blush-100" />
              <StarRating rating={t.rating} size={16} />
              <p className="mt-4 text-sm leading-relaxed text-charcoal-700">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-charcoal-100 pt-4">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-serif text-base text-charcoal-900">{t.name}</div>
                  <div className="text-xs text-charcoal-500">{t.role} · {t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button onClick={() => navigate('testimonials')} className="btn-outline">Read more love stories</button>
        </div>
      </div>
    </section>
  );
}
