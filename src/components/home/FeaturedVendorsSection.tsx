import { MapPin, BadgeCheck, ArrowRight } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { VENDORS } from '@/data/content';
import { SectionHeading, StarRating } from '@/components/ui';

export function FeaturedVendorsSection() {
  const { navigate } = useRouter();
  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="The marketplace"
            title={<>Featured <span className="gold-text">vendors</span></>}
            subtitle="A vetted network of 680+ professionals — rated, reviewed, and ready for your date."
          />
          <button onClick={() => navigate('services')} className="btn-outline shrink-0">
            All vendors <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VENDORS.filter((v) => v.featured).map((v, i) => (
            <button
              key={v.id}
              onClick={() => navigate('services')}
              className="group overflow-hidden rounded-3xl border border-charcoal-100 bg-white text-left shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={v.image} alt={v.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {v.verified && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-emeraldx-700 backdrop-blur">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
                <div className="absolute right-3 top-3 rounded-full bg-charcoal-900/70 px-2.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur">
                  ₹{v.priceFrom.toLocaleString('en-IN')}+
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg text-charcoal-900">{v.name}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-charcoal-500">
                  <MapPin className="h-3.5 w-3.5" /> {v.city} · {v.category}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StarRating rating={v.rating} />
                    <span className="text-xs font-medium text-charcoal-600">{v.rating}</span>
                    <span className="text-xs text-charcoal-400">({v.reviews})</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
