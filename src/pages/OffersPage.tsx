import { useState } from 'react';
import { Copy, Check, Tag } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading, Button } from '@/components/ui';
import { OFFERS, IMAGES } from '@/data/content';

const ACCENT_BG: Record<string, string> = {
  gold: 'from-gold-400 to-gold-600',
  charcoal: 'from-charcoal-700 to-charcoal-900',
  emerald: 'from-emeraldx-500 to-emeraldx-700',
};

export function OffersPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (code: string) => { navigator.clipboard?.writeText(code); setCopied(code); setTimeout(() => setCopied(null), 2000); };

  return (
    <>
      <PageHeader
        eyebrow="Offers"
        title={<>Special <span className="gold-text">savings</span></>}
        subtitle="Seasonal offers, early-bird discounts, and bundle savings for your celebration."
        image={IMAGES.coupleGarland}
        crumb="Offers"
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {OFFERS.map((o, i) => (
            <div key={o.id} className="group relative overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className={`relative h-32 bg-gradient-to-br ${ACCENT_BG[o.accent]} p-5`}>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{o.badge}</span>
                <h3 className="mt-3 font-serif text-2xl text-white">{o.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-charcoal-600">{o.desc}</p>
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-gold-300 bg-gold-50 px-4 py-3">
                  <Tag className="h-4 w-4 text-gold-600" />
                  <span className="font-mono text-sm font-bold text-charcoal-900">{o.code}</span>
                  <button onClick={() => copy(o.code)} className="ml-auto flex items-center gap-1 text-xs font-semibold text-gold-700 hover:text-gold-800">
                    {copied === o.code ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
                  </button>
                </div>
                <Button variant="gold" to="contact" className="mt-5 w-full">Claim this offer</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-3xl bg-charcoal-gradient p-8 text-center sm:p-12">
          <SectionHeading center light title="Bundle and save more" subtitle="Combine catering + decor + photography from our marketplace and save up to 20%." />
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="gold" to="packages">View packages</Button>
            <Button variant="outline" to="contact" className="!border-white/30 !bg-white/5 !text-white hover:!bg-white/10">Talk to a planner</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
