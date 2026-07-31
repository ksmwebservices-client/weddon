import { ArrowRight, Crown, Sparkles, Gem } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { IMAGES } from '@/data/content';
import { SectionHeading } from '@/components/ui';

const RENTALS = [
  { name: 'Polki Heritage Set', price: '₹3,200/day', image: IMAGES.jewelryGold, tag: 'Couture' },
  { name: 'Temple Jewelry Crown', price: '₹2,800/day', image: IMAGES.jewelryVelvet, tag: 'Statement' },
  { name: 'Kundan Kaleera Set', price: '₹1,800/day', image: IMAGES.jewelryBride, tag: 'Bridal' },
  { name: 'Pearl & Gold Maang Tikka', price: '₹1,200/day', image: IMAGES.jewelrySet, tag: 'Accent' },
];

export function RentalCollectionSection() {
  const { navigate } = useRouter();
  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Left copy */}
          <div>
            <SectionHeading
              eyebrow="Bridal accessories rental"
              title={<>Couture jewelry, <span className="gold-text">on your terms</span></>}
              subtitle="Why buy when you can rent the extraordinary? Wear heirloom-grade polki, kundan, and temple jewelry — delivered, insured, and collected at your door."
            />

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: Crown, label: '500+ pieces', sub: 'Curated collection' },
                { icon: Gem, label: 'Insured', sub: 'Worry-free wear' },
                { icon: Sparkles, label: 'Doorstep', sub: 'Delivery & pickup' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-charcoal-100 bg-white p-4 text-center shadow-soft">
                  <s.icon className="mx-auto h-6 w-6 text-gold-500" />
                  <div className="mt-2 text-sm font-semibold text-charcoal-900">{s.label}</div>
                  <div className="text-xs text-charcoal-400">{s.sub}</div>
                </div>
              ))}
            </div>

            <button onClick={() => navigate('rentals')} className="mt-8 btn-primary">
              Browse the collection <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right grid */}
          <div className="grid grid-cols-2 gap-4">
            {RENTALS.map((r, i) => (
              <div
                key={r.name}
                className={`group relative overflow-hidden rounded-2xl border border-charcoal-100 shadow-soft transition-all duration-500 hover:shadow-luxe animate-fade-up ${i % 2 === 1 ? 'translate-y-6' : ''}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={r.image} alt={r.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gold-700 backdrop-blur">{r.tag}</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <div>
                    <div className="text-sm font-semibold text-charcoal-900">{r.name}</div>
                    <div className="text-xs text-gold-600">{r.price}</div>
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
