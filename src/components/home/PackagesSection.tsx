import { Check, ArrowRight, Crown } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { PACKAGES, type Package } from '@/data/content';
import { SectionHeading, Button } from '@/components/ui';

export function PackagesSection() {
  const { navigate } = useRouter();

  return (
    <section className="bg-gradient-to-b from-blush-50/60 to-white section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="Wedding packages"
          title={<>Choose your <span className="gold-text">celebration</span></>}
          subtitle="Three thoughtfully crafted tiers — each fully customizable. Transparent pricing, no hidden costs."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} onSelect={() => navigate('packages')} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg, index, onSelect }: { pkg: Package; index: number; onSelect: () => void }) {
  const accentBg =
    pkg.accent === 'gold' ? 'bg-gold-gradient' :
    pkg.accent === 'blush' ? 'bg-blush-gradient' :
    pkg.accent === 'emerald' ? 'bg-emerald-gradient' :
    'bg-charcoal-gradient';

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border bg-white shadow-soft transition-all duration-500 hover:shadow-luxe animate-fade-up ${
        pkg.popular ? 'lg:-translate-y-4 border-gold-300 shadow-gold lg:scale-[1.03]' : 'border-charcoal-100 hover:-translate-y-1.5'
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {pkg.popular && (
        <div className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-charcoal-900 px-3 py-1 text-xs font-semibold text-gold-400">
          <Crown className="h-3.5 w-3.5" /> Most popular
        </div>
      )}
      <div className={`relative h-40 ${accentBg}`}>
        <img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover opacity-90 mix-blend-overlay" />
        <div className="absolute inset-0 bg-charcoal-900/20" />
        <div className="absolute bottom-4 left-5 text-white">
          <div className="font-serif text-3xl">{pkg.name}</div>
          <div className="text-sm text-white/80">{pkg.tagline}</div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-end gap-2">
          <span className="font-serif text-3xl text-charcoal-900">₹{Math.round(pkg.price / 1000)}K</span>
          {pkg.originalPrice && (
            <span className="mb-1 text-sm text-charcoal-400 line-through">₹{Math.round(pkg.originalPrice / 1000)}K</span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs text-charcoal-500">
          <span>{pkg.duration}</span><span>·</span><span>{pkg.guestRange}</span>
        </div>

        <ul className="mt-5 space-y-2.5">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-charcoal-700">
              <span className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${pkg.popular ? 'bg-gold-100 text-gold-700' : 'bg-emeraldx-100 text-emeraldx-700'}`}>
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          className={`mt-6 w-full rounded-full py-3 text-sm font-semibold transition-all ${
            pkg.popular
              ? 'bg-gold-gradient text-charcoal-900 hover:shadow-gold'
              : 'bg-charcoal-900 text-white hover:bg-charcoal-800'
          }`}
        >
          Explore {pkg.name} <ArrowRight className="inline h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function PackagesCta() {
  return (
    <div className="mt-10 text-center">
      <Button variant="outline" to="packages">Compare all packages</Button>
    </div>
  );
}
