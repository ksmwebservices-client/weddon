import { ArrowUpRight } from 'lucide-react';
import { useRouter, type Route } from '@/lib/router';
import { SERVICE_CATEGORIES } from '@/data/content';
import { SectionHeading } from '@/components/ui';
import { iconFor } from '@/components/icons';

const ACCENT: Record<string, string> = {
  gold: 'from-gold-400 to-gold-600 text-charcoal-900',
  blush: 'from-blush-300 to-blush-500 text-white',
  emerald: 'from-emeraldx-400 to-emeraldx-600 text-white',
  charcoal: 'from-charcoal-600 to-charcoal-800 text-white',
};

const ROUTE_MAP: Record<string, Route> = {
  'bridal-makeover': 'bridal-makeover',
  'bridal-accessories-rental': 'rentals',
  boutique: 'boutique',
  photography: 'photography',
  decoration: 'decoration',
  catering: 'catering',
  'dj-entertainment': 'dj-entertainment',
  travel: 'honeymoon',
};

export function ServiceCategoriesSection() {
  const { navigate } = useRouter();
  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="What we do"
          title={<>One platform, <span className="gold-text">every service</span></>}
          subtitle="From the first blueprint to the last dance — every wedding service, curated and managed under one roof."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((s, i) => {
            const Icon = iconFor(s.icon);
            return (
              <button
                key={s.slug}
                onClick={() => navigate(ROUTE_MAP[s.slug] ?? 'services')}
                className="group relative overflow-hidden rounded-3xl border border-charcoal-100 bg-white text-left shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={s.image} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent" />
                  <div className={`absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${ACCENT[s.accent]} shadow-lg`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg text-charcoal-900">{s.title}</h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-charcoal-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-500" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal-500">{s.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="font-semibold text-charcoal-700">From ₹{s.startingPrice.toLocaleString('en-IN')}</span>
                    <span className="text-charcoal-400">{s.vendors} vendors</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
