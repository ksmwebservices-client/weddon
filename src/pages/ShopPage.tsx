import { useState } from 'react';
import { ShoppingBag, Search, Heart, Star } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading } from '@/components/ui';
import { IMAGES } from '@/data/content';

type Item = { id: string; name: string; price: number; image: string; cat: string; rating: number };

const ITEMS: Item[] = [
  { id: 's1', name: 'Gold Leaf Invitations (set of 100)', price: 12000, image: IMAGES.ritualClose, cat: 'Invitations', rating: 4.8 },
  { id: 's2', name: 'Rose Petal Confetti Cones', price: 1800, image: IMAGES.tableRoses, cat: 'Decor', rating: 4.7 },
  { id: 's3', name: 'Bridal Clutch — Ivory', price: 4500, image: IMAGES.brideLace, cat: 'Accessories', rating: 4.9 },
  { id: 's4', name: 'Ring Pillow — Blush', price: 2200, image: IMAGES.brideCandle, cat: 'Accessories', rating: 4.6 },
  { id: 's5', name: 'Welcome Gift Hamper', price: 3500, image: IMAGES.foodCharcuterie, cat: 'Gifting', rating: 4.8 },
  { id: 's6', name: 'Scented Candle Favors (set of 50)', price: 6500, image: IMAGES.brideCandle, cat: 'Favors', rating: 4.7 },
  { id: 's7', name: 'Floral Boutonniere Set', price: 1500, image: IMAGES.tableFlorals, cat: 'Decor', rating: 4.9 },
  { id: 's8', name: 'Custom Monogram Signage', price: 8800, image: IMAGES.banquet, cat: 'Signage', rating: 4.8 },
];

const CATS = ['All', 'Invitations', 'Decor', 'Accessories', 'Gifting', 'Favors', 'Signage'];

export function ShopPage() {
  const [cat, setCat] = useState('All');
  const [query, setQuery] = useState('');
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<string[]>([]);

  const filtered = ITEMS.filter((i) => (cat === 'All' || i.cat === cat) && (query === '' || i.name.toLowerCase().includes(query.toLowerCase())));
  const toggleWish = (id: string) => setWishlisted((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const addToCart = (id: string) => setCart((c) => [...c, id]);

  return (
    <>
      <PageHeader
        eyebrow="The wedding shop"
        title={<>Everything for <span className="gold-text">the big day</span></>}
        subtitle="Invitations, favors, signage, and accessories — curated and shipped to your door."
        image={IMAGES.tableReception}
        crumb="Wedding Shop"
      />

      <Section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the shop…" className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${cat === c ? 'bg-charcoal-900 text-white' : 'bg-charcoal-50 text-charcoal-600 hover:bg-charcoal-100'}`}>{c}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-gold-50 px-4 py-2 text-sm font-semibold text-gold-700">
            <ShoppingBag className="h-4 w-4" /> {cart.length} in cart
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-charcoal-200 py-20 text-center">
            <Search className="h-10 w-10 text-charcoal-300" />
            <h3 className="mt-4 font-serif text-xl text-charcoal-900">Nothing found</h3>
            <p className="mt-1 text-sm text-charcoal-500">Try a different search or category.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((item, i) => (
              <div key={item.id} className="group overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gold-700 backdrop-blur">{item.cat}</span>
                  <button onClick={() => toggleWish(item.id)} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-all hover:scale-110">
                    <Heart className={`h-4.5 w-4.5 ${wishlisted.has(item.id) ? 'fill-blush-500 text-blush-500' : 'text-charcoal-600'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-xs text-charcoal-500"><Star className="h-3 w-3 fill-gold-400 text-gold-400" /> {item.rating}</div>
                  <h3 className="mt-1 font-serif text-sm leading-snug text-charcoal-900">{item.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-semibold text-charcoal-900">₹{item.price.toLocaleString('en-IN')}</span>
                    <button onClick={() => addToCart(item.id)} className="rounded-full bg-charcoal-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-charcoal-800">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
