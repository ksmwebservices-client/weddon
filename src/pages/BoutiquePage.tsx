import { useState } from 'react';
import { Heart, ShoppingBag, Filter, Star } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading, Button } from '@/components/ui';
import { IMAGES } from '@/data/content';
import { EnquiryForm } from '@/components/EnquiryForm';

type Product = { id: string; name: string; designer: string; price: number; image: string; tag: string; category: string };

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Ivory Lace Gown', designer: 'Maison Couture', price: 78000, image: IMAGES.brideLace, tag: 'Gown', category: 'Gowns' },
  { id: 'p2', name: 'Crimson Bridal Lehenga', designer: 'Aria Edit', price: 145000, image: IMAGES.brideJewelry, tag: 'Lehenga', category: 'Lehengas' },
  { id: 'p3', name: 'Pearl Tiara Dress', designer: 'Maison Couture', price: 92000, image: IMAGES.brideTiara, tag: 'Gown', category: 'Gowns' },
  { id: 'p4', name: 'Veil & Candle Set', designer: 'Atelier Blush', price: 64000, image: IMAGES.brideCandle, tag: 'Gown', category: 'Gowns' },
  { id: 'p5', name: 'Lace Couture Gown', designer: 'Maison Couture', price: 112000, image: IMAGES.brideEarring, tag: 'Gown', category: 'Gowns' },
  { id: 'p6', name: 'Heritage Red Lehenga', designer: 'Aria Edit', price: 168000, image: IMAGES.jewelryBride, tag: 'Lehenga', category: 'Lehengas' },
  { id: 'p7', name: 'Blush Pleated Gown', designer: 'Atelier Blush', price: 58000, image: IMAGES.brideVeil, tag: 'Gown', category: 'Gowns' },
  { id: 'p8', name: 'Polki Heritage Set', designer: 'Heirloom Atelier', price: 42000, image: IMAGES.jewelryGold, tag: 'Jewelry', category: 'Jewelry' },
];

const CATS = ['All', 'Gowns', 'Lehengas', 'Jewelry'];

export function BoutiquePage() {
  const [cat, setCat] = useState('All');
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);

  const filtered = PRODUCTS.filter((p) => cat === 'All' || p.category === cat);
  const toggleWish = (id: string) => setWishlisted((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <>
      <PageHeader
        eyebrow="The boutique"
        title={<>Couture for <span className="gold-text">your moment</span></>}
        subtitle="Designer lehengas, gowns, and jewelry — bespoke tailoring and curated collections."
        image={IMAGES.brideTiara}
        crumb="Boutique"
      />

      <Section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading title={<>The <span className="gold-text">collection</span></>} />
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-charcoal-400" />
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${cat === c ? 'bg-charcoal-900 text-white' : 'bg-charcoal-50 text-charcoal-600 hover:bg-charcoal-100'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <div key={p.id} className="group overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="relative h-72 overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gold-700 backdrop-blur">{p.tag}</span>
                <button onClick={() => toggleWish(p.id)} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-all hover:scale-110">
                  <Heart className={`h-4.5 w-4.5 ${wishlisted.has(p.id) ? 'fill-blush-500 text-blush-500' : 'text-charcoal-600'}`} />
                </button>
              </div>
              <div className="p-4">
                <div className="text-xs text-charcoal-400">{p.designer}</div>
                <h3 className="font-serif text-base text-charcoal-900">{p.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-charcoal-900">₹{p.price.toLocaleString('en-IN')}</span>
                  <span className="flex items-center gap-1 text-xs text-charcoal-500"><Star className="h-3 w-3 fill-gold-400 text-gold-400" /> 4.9</span>
                </div>
                <button onClick={() => setShowForm(true)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-charcoal-900 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-charcoal-800">
                  <ShoppingBag className="h-3.5 w-3.5" /> Enquire to buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative h-80 overflow-hidden rounded-3xl">
            <img src={IMAGES.brideLace} alt="Bespoke" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="Bespoke" title={<>Made just <span className="gold-text">for you</span></>} subtitle="Our ateliers craft bespoke couture from sketch to final fitting. Bring your inspiration — we bring it to life." />
            <div className="mt-6 space-y-3">
              {['3 design consultations', 'Fabric & embroidery selection', '4–6 fittings over 8 weeks', 'Complimentary alterations'].map((s) => (
                <div key={s} className="flex items-center gap-2.5 text-sm text-charcoal-700"><span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> {s}</div>
              ))}
            </div>
            <Button variant="gold" onClick={() => setShowForm(true)} className="mt-8">Book a bespoke consultation</Button>
          </div>
        </div>
      </Section>

      {showForm && (
        <Section className="!pt-0">
          <div className="mx-auto max-w-2xl">
            <EnquiryForm service="Boutique" title="Enquire about a piece" subtitle="Tell us which piece caught your eye and we’ll arrange a fitting." />
          </div>
        </Section>
      )}
    </>
  );
}
