import { Quote, Star } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading, Stat, StarRating } from '@/components/ui';
import { IMAGES, STATS } from '@/data/content';

const MORE = [
  { id: 'm1', name: 'Diya & Ram', role: 'Bloom Package', city: 'Pune', quote: 'Our intimate wedding felt like a movie. The team handled everything so we could be present.', rating: 5, image: IMAGES.couplePark },
  { id: 'm2', name: 'Sara & Imran', role: 'Aura Package', city: 'Hyderabad', quote: 'The AI checklist was a lifesaver. We never missed a single deadline.', rating: 5, image: IMAGES.coupleEmbrace },
  { id: 'm3', name: 'Naina & Yash', role: 'Royale Package', city: 'Udaipur', quote: 'A 5-day destination wedding managed flawlessly. The honeymoon was the cherry on top.', rating: 5, image: IMAGES.coupleSofa },
  { id: 'm4', name: 'Tara & Dev', role: 'Aura Package', city: 'Goa', quote: 'Bali honeymoon was breathtaking. Every transfer was waiting for us.', rating: 5, image: IMAGES.coupleSunny },
  { id: 'm5', name: 'Riya & Aman', role: 'Bloom Package', city: 'Chennai', quote: 'They understood our vision before we said it. Worth every rupee.', rating: 5, image: IMAGES.coupleVeil },
  { id: 'm6', name: 'Zara & Zayan', role: 'Royale Package', city: 'Mumbai', quote: 'The celebrity makeup artist was incredible. Four looks, each better than the last.', rating: 5, image: IMAGES.brideJewelry },
];

export function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Love stories"
        title={<>2,400 couples and <span className="gold-text">counting</span></>}
        subtitle="We measure success in happy tears, not just bookings. Here’s what our couples say."
        image={IMAGES.coupleSmiling}
        crumb="Testimonials"
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => <Stat key={s.label} value={s.value} label={s.label} />)}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {MORE.map((t, i) => (
            <div key={t.id} className="break-inside-avoid rounded-3xl border border-charcoal-100 bg-white p-6 shadow-soft transition-all hover:shadow-card animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <Quote className="h-8 w-8 text-blush-200" />
              <div className="mt-3 flex"><StarRating rating={t.rating} size={16} /></div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-700">“{t.quote}”</p>
              <div className="mt-5 flex items-center gap-3 border-t border-charcoal-100 pt-4">
                <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-serif text-base text-charcoal-900">{t.name}</div>
                  <div className="text-xs text-charcoal-500">{t.role} · {t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-charcoal-900 py-16 section-pad">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-6 w-6 fill-gold-400 text-gold-400" />)}</div>
          <SectionHeading center light title="4.9 out of 5 — from 2,400+ couples" subtitle="Rated across Google, Weddon, and verified vendor reviews." />
        </div>
      </section>
    </>
  );
}
