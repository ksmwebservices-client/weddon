import { useState } from 'react';
import { Check, X, Crown, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading, Button } from '@/components/ui';
import { PACKAGES, IMAGES } from '@/data/content';
import { EnquiryForm } from '@/components/EnquiryForm';
import { useRouter } from '@/lib/router';

const COMPARISON_ROWS = [
  { feature: 'Event duration', values: ['2 days', '3 days', '5 days'] },
  { feature: 'Guest capacity', values: ['150', '400', '1000'] },
  { feature: 'Dedicated planner', values: [true, true, true] },
  { feature: 'Planner seniority', values: ['Dedicated', 'Senior + team', 'Lead + full crew'] },
  { feature: 'Bridal looks', values: ['1', '3', '4 + celebrity artist'] },
  { feature: 'Cinematic film', values: [false, true, true] },
  { feature: 'Stage & mandap decor', values: [true, true, true] },
  { feature: 'Designer floral install', values: [false, false, true] },
  { feature: 'DJ & sangeet night', values: [false, true, true] },
  { feature: 'Live gourmet stations', values: [false, false, true] },
  { feature: 'Accessories rental', values: [false, true, true] },
  { feature: 'Guest travel coordination', values: [false, true, true] },
  { feature: 'Boutique couture styling', values: [false, false, true] },
  { feature: 'Luxury honeymoon', values: [false, false, true] },
  { feature: '24/7 concierge', values: [false, false, true] },
];

export function PackagesPage() {
  const { navigate } = useRouter();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Wedding packages"
        title={<>Packages for <span className="gold-text">every celebration</span></>}
        subtitle="Transparent pricing, fully customizable. Compare side-by-side and request a tailored quote."
        image={IMAGES.coupleGarland}
        crumb="Packages"
      />

      {/* Cards */}
      <section className="section-pad py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-soft transition-all duration-500 hover:shadow-luxe animate-fade-up ${pkg.popular ? 'border-gold-300 shadow-gold lg:scale-[1.03]' : 'border-charcoal-100'}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {pkg.popular && (
                  <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-charcoal-900 px-3 py-1 text-xs font-semibold text-gold-400">
                    <Crown className="h-3.5 w-3.5" /> Popular
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold-500" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">{pkg.tagline}</span>
                </div>
                <h3 className="mt-2 font-serif text-3xl text-charcoal-900">{pkg.name}</h3>
                <div className="mt-3 flex items-end gap-2">
                  <span className="font-serif text-4xl text-charcoal-900">₹{pkg.price.toLocaleString('en-IN')}</span>
                  {pkg.originalPrice && <span className="mb-1 text-sm text-charcoal-400 line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>}
                </div>
                <div className="mt-1 text-xs text-charcoal-500">{pkg.duration} · {pkg.guestRange}</div>

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
                  onClick={() => setShowForm(true)}
                  className={`mt-6 w-full rounded-full py-3 text-sm font-semibold transition-all ${pkg.popular ? 'bg-gold-gradient text-charcoal-900 hover:shadow-gold' : 'bg-charcoal-900 text-white hover:bg-charcoal-800'}`}
                >
                  Request {pkg.name} quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <Section className="!pt-0">
        <SectionHeading center title={<>Compare <span className="gold-text">side by side</span></>} subtitle="Every detail, laid out clearly. No surprises, no hidden costs." />

        <div className="mt-10 overflow-x-auto rounded-3xl border border-charcoal-100 shadow-soft">
          <table className="w-full min-w-[640px] border-collapse bg-white">
            <thead>
              <tr className="border-b border-charcoal-100">
                <th className="p-5 text-left text-sm font-semibold text-charcoal-500">Feature</th>
                {PACKAGES.map((p) => (
                  <th key={p.id} className="p-5 text-center">
                    <div className={`font-serif text-lg ${p.popular ? 'text-gold-700' : 'text-charcoal-900'}`}>{p.name}</div>
                    <div className="text-xs font-normal text-charcoal-400">{p.tagline}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? 'bg-charcoal-50/40' : ''}>
                  <td className="p-4 text-sm font-medium text-charcoal-700">{row.feature}</td>
                  {row.values.map((v, j) => (
                    <td key={j} className="p-4 text-center text-sm">
                      {typeof v === 'boolean' ? (
                        v ? <Check className="mx-auto h-5 w-5 text-emeraldx-600" /> : <X className="mx-auto h-5 w-5 text-charcoal-300" />
                      ) : (
                        <span className="text-charcoal-700">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-charcoal-50/60">
                <td className="p-4 text-sm font-bold text-charcoal-900">Starting price</td>
                {PACKAGES.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <div className="font-serif text-lg text-charcoal-900">₹{Math.round(p.price / 1000)}K</div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Quote form */}
      {showForm && (
        <Section className="!pt-0">
          <div className="mx-auto max-w-2xl">
            <EnquiryForm service="Packages comparison" />
          </div>
        </Section>
      )}

      {!showForm && (
        <Section className="!pt-0">
          <div className="rounded-3xl bg-blush-gradient p-8 text-center sm:p-12">
            <SectionHeading center title="Not sure which package fits?" subtitle="Share your vision and we’ll recommend the right tier — and tailor it to your budget." />
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={() => setShowForm(true)} className="btn-gold">Request a tailored quote</button>
              <Button variant="outline" to="ai-planner">Ask the AI planner</Button>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
