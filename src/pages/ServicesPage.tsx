import { useState } from 'react';
import { Search, BadgeCheck, MapPin, Star, SlidersHorizontal } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading, StarRating, Button } from '@/components/ui';
import { VENDORS, SERVICE_CATEGORIES, IMAGES } from '@/data/content';
import { useRouter } from '@/lib/router';
import { iconFor } from '@/components/icons';

const CITIES = ['All cities', 'Mumbai', 'Delhi', 'Bengaluru', 'Jaipur', 'Goa', 'Hyderabad', 'Kochi'];
const CATS = ['All', 'Photography', 'Bridal Makeover', 'Decoration', 'Catering', 'Boutique', 'DJ & Entertainment', 'Accessories Rental', 'Travel & Honeymoon'];

export function ServicesPage() {
  const { navigate } = useRouter();
  const [city, setCity] = useState('All cities');
  const [cat, setCat] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = VENDORS.filter((v) =>
    (city === 'All cities' || v.city === city) &&
    (cat === 'All' || v.category === cat) &&
    (query === '' || v.name.toLowerCase().includes(query.toLowerCase()) || v.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
  );

  return (
    <>
      <PageHeader
        eyebrow="The marketplace"
        title={<>Find your <span className="gold-text">perfect vendors</span></>}
        subtitle="680+ verified professionals across 42 cities. Filter by category, city, or specialty."
        image={IMAGES.coupleSofa}
        crumb="Services"
      />

      {/* Category quick links */}
      <section className="section-pad py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CATEGORIES.map((s, i) => {
              const Icon = iconFor(s.icon);
              return (
                <button
                  key={s.slug}
                  onClick={() => navigate('bridal-makeover')}
                  className="group flex items-center gap-4 rounded-2xl border border-charcoal-100 bg-white p-4 text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-card animate-fade-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-serif text-base text-charcoal-900">{s.title}</div>
                    <div className="text-xs text-charcoal-500">{s.vendors} vendors · from ₹{s.startingPrice.toLocaleString('en-IN')}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <Section className="!pt-0">
        {/* Filters */}
        <div className="mb-8 rounded-3xl border border-charcoal-100 bg-white p-5 shadow-soft">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search vendors, specialties…"
                className="input-field pl-10"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <SlidersHorizontal className="h-4 w-4 text-charcoal-400" />
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="input-field !w-auto !py-2.5">
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="input-field !w-auto !py-2.5">
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <SectionHeading title={<>Showing <span className="gold-text">{filtered.length}</span> vendors</>} />

        {filtered.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-charcoal-200 bg-white py-20 text-center">
            <Search className="h-10 w-10 text-charcoal-300" />
            <h3 className="mt-4 font-serif text-xl text-charcoal-900">No vendors found</h3>
            <p className="mt-1 text-sm text-charcoal-500">Try adjusting your filters or search term.</p>
            <button onClick={() => { setQuery(''); setCat('All'); setCity('All cities'); }} className="mt-5 btn-outline">Clear filters</button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v, i) => (
              <div
                key={v.id}
                className="group overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
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
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg text-charcoal-900">{v.name}</h3>
                    <div className="flex items-center gap-1 rounded-full bg-gold-50 px-2 py-0.5 text-xs font-semibold text-gold-700">
                      <Star className="h-3 w-3 fill-gold-400 text-gold-400" /> {v.rating}
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-charcoal-500">
                    <MapPin className="h-3.5 w-3.5" /> {v.city} · {v.category}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {v.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-charcoal-400">{v.reviews} reviews</span>
                    <Button variant="ghost" to="contact" className="!px-3 text-gold-700">Request quote</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <section className="bg-charcoal-900 py-16 section-pad">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading center light title="Are you a wedding professional?" subtitle="Join 680+ verified vendors on Weddon. Manage bookings, quotes, and payouts from one dashboard." />
          <div className="mt-8 flex justify-center gap-3">
            <Button variant="gold" to="vendor-dashboard">Open Vendor Portal</Button>
            <Button variant="outline" to="contact" className="!border-white/30 !bg-white/5 !text-white hover:!bg-white/10">Contact our team</Button>
          </div>
        </div>
      </section>
    </>
  );
}
