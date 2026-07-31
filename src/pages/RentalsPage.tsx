import { useState } from 'react';
import { Crown, Gem, Sparkles, ShieldCheck, Truck, ArrowRight, Heart } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading, Button } from '@/components/ui';
import { IMAGES } from '@/data/content';
import { EnquiryForm } from '@/components/EnquiryForm';

type Rental = { id: string; name: string; price: number; image: string; tag: string; deposit: number };

const RENTALS: Rental[] = [
  { id: 'r1', name: 'Polki Heritage Set', price: 3200, image: IMAGES.jewelryGold, tag: 'Necklace Set', deposit: 8000 },
  { id: 'r2', name: 'Temple Jewelry Crown', price: 2800, image: IMAGES.jewelryVelvet, tag: 'Crown', deposit: 6000 },
  { id: 'r3', name: 'Kundan Kaleera Set', price: 1800, image: IMAGES.jewelryBride, tag: 'Kaleeras', deposit: 4000 },
  { id: 'r4', name: 'Pearl & Gold Maang Tikka', price: 1200, image: IMAGES.jewelrySet, tag: 'Maang Tikka', deposit: 3000 },
  { id: 'r5', name: 'Bridal Statement Earrings', price: 1500, image: IMAGES.brideEarring, tag: 'Earrings', deposit: 3500 },
  { id: 'r6', name: 'Royal Bridal Jewelry Set', price: 4500, image: IMAGES.jewelryBride, tag: 'Complete Set', deposit: 10000 },
];

export function RentalsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Accessories rental"
        title={<>Couture jewelry, <span className="gold-text">on your terms</span></>}
        subtitle="Rent heirloom-grade polki, kundan, and temple jewelry — delivered, insured, and collected at your door."
        image={IMAGES.jewelryGold}
        crumb="Rentals"
      />

      {/* How it works */}
      <Section>
        <SectionHeading center title={<>How <span className="gold-text">rental works</span></>} subtitle="Four simple steps. No stress, no surprises." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Crown, title: '1 · Browse', desc: 'Pick from 500+ curated pieces.' },
            { icon: ShieldCheck, title: '2 · Reserve', desc: 'Book your dates with a refundable deposit.' },
            { icon: Truck, title: '3 · Doorstep delivery', desc: 'We deliver 2 days before, insured.' },
            { icon: Sparkles, title: '4 · Wear & return', desc: 'We collect the next day. That’s it.' },
          ].map((s, i) => (
            <div key={s.title} className="rounded-3xl border border-charcoal-100 bg-white p-6 text-center shadow-soft animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-gold-600"><s.icon className="h-6 w-6" /></div>
              <div className="mt-3 font-serif text-lg text-charcoal-900">{s.title}</div>
              <div className="text-sm text-charcoal-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Collection */}
      <Section className="!pt-0">
        <div className="flex items-center justify-between">
          <SectionHeading title={<>The <span className="gold-text">collection</span></>} />
          <Button variant="outline" onClick={() => setShowForm(true)}>Can’t find a piece? Ask us</Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RENTALS.map((r, i) => (
            <div key={r.id} className="group overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="relative h-64 overflow-hidden">
                <img src={r.image} alt={r.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gold-700 backdrop-blur">{r.tag}</span>
                <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-all hover:scale-110">
                  <Heart className="h-4.5 w-4.5 text-charcoal-600" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-charcoal-900">{r.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-charcoal-900">₹{r.price.toLocaleString('en-IN')}<span className="text-xs font-normal text-charcoal-400">/day</span></div>
                    <div className="text-xs text-charcoal-400">Deposit ₹{r.deposit.toLocaleString('en-IN')}</div>
                  </div>
                  <button onClick={() => setShowForm(true)} className="rounded-full bg-charcoal-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-charcoal-800">
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Promise band */}
      <section className="bg-charcoal-900 py-12 section-pad">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { icon: ShieldCheck, label: 'Fully insured', sub: 'Worry-free wear' },
            { icon: Truck, label: 'Free delivery', sub: 'Pan-India' },
            { icon: Gem, label: 'Authentic pieces', sub: 'Quality-checked' },
            { icon: Sparkles, label: 'Sanitized', sub: 'Before every rental' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <s.icon className="h-7 w-7 text-gold-400" />
              <div className="mt-2 text-sm font-semibold text-white">{s.label}</div>
              <div className="text-xs text-charcoal-300">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {showForm && (
        <Section className="!pt-0">
          <div className="mx-auto max-w-2xl">
            <EnquiryForm service="Accessories Rental" title="Reserve a piece" subtitle="Tell us which piece and your wedding dates — we’ll confirm availability." />
          </div>
        </Section>
      )}

      <Section className="!pt-0">
        <div className="rounded-3xl bg-blush-gradient p-8 text-center sm:p-12">
          <SectionHeading center title="Rent the extraordinary" subtitle="Why buy what you’ll wear once? Browse 500+ pieces or tell us what you’re looking for." />
          <button onClick={() => setShowForm(true)} className="mt-6 btn-gold">Reserve now <ArrowRight className="h-4 w-4" /></button>
        </div>
      </Section>
    </>
  );
}
