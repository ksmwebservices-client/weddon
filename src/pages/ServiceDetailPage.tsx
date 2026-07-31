import { Check, ArrowRight, Star, Quote } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading, Button, StarRating } from '@/components/ui';
import { EnquiryForm } from '@/components/EnquiryForm';
import { VENDORS, IMAGES, CATERING_MENUS, type ServiceCategory } from '@/data/content';
import { iconFor } from '@/components/icons';
import { useRouter, type Route } from '@/lib/router';

const ROUTE_TO_CATEGORY: Record<string, ServiceCategory> = {
  'bridal-makeover': { slug: 'bridal-makeover', title: 'Bridal Makeover', short: 'Hair & makeup', description: 'Signature bridal looks crafted by celebrity artists — HD makeup, draping, and trial sessions.', icon: 'Sparkles', image: IMAGES.brideJewelry, accent: 'blush', startingPrice: 15000, vendors: 86 },
  photography: { slug: 'photography', title: 'Photography', short: 'Candid & film', description: 'Cinematic candid photography and film coverage that captures every emotion.', icon: 'Camera', image: IMAGES.coupleVeil, accent: 'charcoal', startingPrice: 45000, vendors: 124 },
  decoration: { slug: 'decoration', title: 'Decoration', short: 'Florals & stage', description: 'Bespoke floral stage, mandap, and venue decor that transforms spaces.', icon: 'Flower2', image: IMAGES.tableRoses, accent: 'emerald', startingPrice: 85000, vendors: 97 },
  catering: { slug: 'catering', title: 'Catering', short: 'Gourmet menus', description: 'Multi-cuisine gourmet catering with live counters and bespoke menus.', icon: 'UtensilsCrossed', image: IMAGES.foodBuffet, accent: 'emerald', startingPrice: 650, vendors: 73 },
  'dj-entertainment': { slug: 'dj-entertainment', title: 'DJ & Entertainment', short: 'Music & lights', description: 'Top DJs, live bands, sangeet choreography, and immersive lighting.', icon: 'Music', image: IMAGES.djStage, accent: 'charcoal', startingPrice: 28000, vendors: 64 },
  travel: { slug: 'travel', title: 'Travel & Honeymoon', short: 'Getaways', description: 'Wedding guest logistics and curated honeymoon escapes worldwide.', icon: 'Plane', image: IMAGES.honeymoonMaldives, accent: 'emerald', startingPrice: 12000, vendors: 38 },
  honeymoon: { slug: 'travel', title: 'Honeymoon Packages', short: 'Curated escapes', description: 'Curated honeymoon escapes — Maldives, Bali, Europe, and beyond.', icon: 'Plane', image: IMAGES.honeymoonSunset, accent: 'emerald', startingPrice: 12000, vendors: 38 },
};

const CAT_TO_VENDOR: Record<string, string[]> = {
  'bridal-makeover': ['Bridal Makeover'],
  photography: ['Photography'],
  decoration: ['Decoration'],
  catering: ['Catering'],
  'dj-entertainment': ['DJ & Entertainment'],
  travel: ['Travel & Honeymoon'],
  honeymoon: ['Travel & Honeymoon'],
};

// Extra per-service showcase content
const SHOWCASE: Record<string, { highlights: { title: string; desc: string }[]; gallery: string[]; testimonials: { quote: string; name: string }[] }> = {
  'bridal-makeover': {
    highlights: [
      { title: 'HD & Airbrush Makeup', desc: 'Flawless, long-wear finishes that photograph beautifully under any lighting.' },
      { title: 'Saree & Lehenga Draping', desc: 'Perfect pleats and fall in any style — traditional to contemporary.' },
      { title: 'Hair Styling', desc: 'Updos, loose waves, floral braids, and extensions for volume.' },
      { title: 'Trial Session', desc: 'A full run-through weeks before so your look is locked in.' },
    ],
    gallery: [IMAGES.brideJewelry, IMAGES.brideEarring, IMAGES.brideTiara, IMAGES.brideVeil, IMAGES.brideLace, IMAGES.brideCandle],
    testimonials: [
      { quote: 'My trial was magical — they understood exactly the soft glam I wanted. Lasted 14 hours without a touch-up.', name: 'Sneha, Delhi' },
      { quote: 'Four looks across three days, each one better than the last. Worth every rupee.', name: 'Priya, Mumbai' },
    ],
  },
  photography: {
    highlights: [
      { title: 'Cinematic Candid', desc: 'Unposed, emotional storytelling — the moments you didn’t see happen.' },
      { title: 'Traditional Coverage', desc: 'Every ritual and family combo, beautifully framed.' },
      { title: 'Pre-Wedding Films', desc: 'Cinematic short films at your chosen locations.' },
      { title: 'Same-Day Edits', desc: 'A highlight reel screened at your reception, the same evening.' },
    ],
    gallery: [IMAGES.coupleVeil, IMAGES.coupleEmbrace, IMAGES.coupleSunny, IMAGES.couplePark, IMAGES.coupleOcean, IMAGES.coupleGarden],
    testimonials: [
      { quote: 'They captured a tear I didn’t even know I shed. The film made my father cry.', name: 'Rahul, Bengaluru' },
      { quote: 'Same-day edit at the reception was the highlight of the night. Unreal.', name: 'Ananya, Jaipur' },
    ],
  },
  decoration: {
    highlights: [
      { title: 'Mandap Design', desc: 'Suspended florals, crystal cascades, or minimalist greenery — your vision.' },
      { title: 'Stage & Backdrop', desc: 'Statement backdrops that frame your reception perfectly.' },
      { title: 'Table & Centerpieces', desc: 'Layered florals, candle scapes, and curated tablescapes.' },
      { title: 'Eco-Florals', desc: 'Sustainable, compostable installations without compromising beauty.' },
    ],
    gallery: [IMAGES.tableRoses, IMAGES.tableFlorals, IMAGES.banquet, IMAGES.tableReception, IMAGES.reception2, IMAGES.reception3],
    testimonials: [
      { quote: 'The mandap looked like it was floating on flowers. Guests gasped walking in.', name: 'Kavya, Udaipur' },
      { quote: 'They reused florals across two events — sustainable and stunning.', name: 'Aditya, Goa' },
    ],
  },
  catering: {
    highlights: [
      { title: 'Multi-Cuisine Menus', desc: 'North Indian, South Indian, pan-Asian, Continental, and live counters.' },
      { title: 'Live Stations', desc: 'Pasta, chaat, dosa, teppanyaki — theatre on a plate.' },
      { title: 'Custom Menus', desc: 'Family recipes and dietary accommodations woven in.' },
      { title: 'Dessert & Cake', desc: 'Multi-tier cakes, dessert bars, and midnight treats.' },
    ],
    gallery: [IMAGES.foodBuffet, IMAGES.foodBanquet, IMAGES.foodCharcuterie, IMAGES.foodBoard],
    testimonials: [
      { quote: 'The live pasta station was a hit. Food never ran out for 400 guests.', name: 'Vikram, Chennai' },
      { quote: 'They recreated my grandmother’s biryani recipe. Emotional and delicious.', name: 'Fatima, Hyderabad' },
    ],
  },
  'dj-entertainment': {
    highlights: [
      { title: 'Headliner DJs', desc: 'Bollywood, EDM, retro, and bespoke sets mixed for your crowd.' },
      { title: 'Live Bands', desc: 'Acoustic sets for the ceremony, full band for the reception.' },
      { title: 'Sangeet Choreography', desc: 'Professional choreographers for your family performances.' },
      { title: 'Immersive Lighting', desc: 'Intelligent lighting, lasers, and cold spark fountains.' },
    ],
    gallery: [IMAGES.djStage, IMAGES.djNight, IMAGES.djConcert, IMAGES.djLive],
    testimonials: [
      { quote: 'The dance floor never emptied. Cold sparks for our first dance — goosebumps.', name: 'Karan, Mumbai' },
      { quote: 'They choreographed three family dances. We looked like pros.', name: 'Isha, Delhi' },
    ],
  },
  travel: {
    highlights: [
      { title: 'Guest Logistics', desc: 'Group bookings, shuttle coordination, and room blocks managed end-to-end.' },
      { title: 'Honeymoon Curation', desc: 'Maldives, Bali, Santorini, Swiss Alps — your dream escape, booked.' },
      { title: 'Visa & Transfers', desc: 'Visa support, airport pickups, and seamless transfers.' },
      { title: 'Concierge On Trip', desc: '24/7 support while you travel — changes handled instantly.' },
    ],
    gallery: [IMAGES.honeymoonMaldives, IMAGES.honeymoonSunset, IMAGES.honeymoonPalms, IMAGES.honeymoonBeach],
    testimonials: [
      { quote: 'They moved 80 guests across three hotels without a single hiccup.', name: 'Rohan, Jaipur' },
      { quote: 'Our Maldives honeymoon was pure magic. Every transfer was waiting.', name: 'Neha, Kochi' },
    ],
  },
  honeymoon: {
    highlights: [
      { title: 'Maldives Overwater', desc: '5 nights in an overwater villa with private dining and spa.' },
      { title: 'Bali Bliss', desc: 'Ubud + Seminyak split with temple tours and beach clubs.' },
      { title: 'European Grand Tour', desc: 'Paris, Swiss Alps, and Amalfi — a honeymoon of a lifetime.' },
      { title: 'Royal Rajasthan', desc: 'Udaipur + Jaisalmer palace stays for a regal start.' },
    ],
    gallery: [IMAGES.honeymoonSunset, IMAGES.honeymoonMaldives, IMAGES.honeymoonBeach, IMAGES.honeymoonPalms],
    testimonials: [
      { quote: 'The Royale package honeymoon was the trip of our lives. Zero planning on our end.', name: 'Meera & Arjun' },
      { quote: 'Bali was breathtaking. They even arranged a private sunset dinner.', name: 'Tara & Dev' },
    ],
  },
};

export function ServiceDetailPage() {
  const { route, navigate } = useRouter();
  const cat = ROUTE_TO_CATEGORY[route] ?? ROUTE_TO_CATEGORY['bridal-makeover'];
  const Icon = iconFor(cat.icon);
  const show = SHOWCASE[route] ?? SHOWCASE['bridal-makeover'];
  const vendorCats = CAT_TO_VENDOR[cat.slug] ?? [];
  const relatedVendors = VENDORS.filter((v) => vendorCats.includes(v.category));
  const isHoneymoon = route === 'honeymoon' || route === 'travel';

  const nextRoute: Route = route === 'honeymoon' || route === 'travel' ? 'packages' : 'contact';

  return (
    <>
      <PageHeader
        eyebrow={cat.short}
        title={<>{cat.title.split(' ')[0]} <span className="gold-text">{cat.title.split(' ').slice(1).join(' ')}</span></>}
        subtitle={cat.description}
        image={cat.image}
        crumb={cat.title}
      />

      {/* Highlights */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="heading-eyebrow"><span className="h-px w-6 bg-gold-400" /> What’s included</span>
            <h2 className="mt-3 font-serif text-3xl text-charcoal-900 sm:text-4xl">Crafted to <span className="gold-text">perfection</span></h2>
            <p className="mt-3 text-charcoal-500">Every {cat.title.toLowerCase()} engagement includes our signature standards — refined over 2,400 weddings.</p>
            <div className="mt-6 space-y-4">
              {show.highlights.map((h) => (
                <div key={h.title} className="flex items-start gap-4 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-soft">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-serif text-base text-charcoal-900">{h.title}</div>
                    <div className="text-sm text-charcoal-500">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="gold" to={nextRoute} className="mt-8">Get a quote <ArrowRight className="h-4 w-4" /></Button>
          </div>

          {/* Showcase image */}
          <div className="grid grid-cols-2 gap-3">
            {show.gallery.slice(0, 4).map((img, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl shadow-soft ${i === 0 ? 'col-span-2 h-64' : 'h-40'}`}>
                <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery strip */}
      <section className="bg-charcoal-900 py-16 section-pad">
        <div className="mx-auto max-w-7xl">
          <SectionHeading center light title="Recent work" subtitle={`A glimpse of our ${cat.title.toLowerCase()} in action.`} />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {show.gallery.map((img, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl">
                <img src={img} alt="" className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-40" />
                <div className="absolute inset-0 bg-charcoal-900/0 transition-colors group-hover:bg-charcoal-900/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

           {/* Catering showcase — premium menu cards */}
      {route === 'catering' && <CateringShowcase />}

      {/* Related vendors */}
      {relatedVendors.length > 0 && (
        <Section>
          <SectionHeading title={<>Top <span className="gold-text">{cat.title}</span> vendors</>} subtitle="Verified, rated, and ready for your date." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedVendors.map((v, i) => (
              <div key={v.id} className="group overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={v.image} alt={v.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute right-3 top-3 rounded-full bg-charcoal-900/70 px-2.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur">₹{v.priceFrom.toLocaleString('en-IN')}+</div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base text-charcoal-900">{v.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={v.rating} />
                    <span className="text-xs text-charcoal-500">{v.rating} · {v.city}</span>
                  </div>
                  <Button variant="ghost" to="contact" className="mt-3 !px-0 text-gold-700">Request quote →</Button>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Testimonials */}
      <section className="bg-blush-50/60 py-16 section-pad">
        <div className="mx-auto max-w-5xl">
          <SectionHeading center title="Couples share" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {show.testimonials.map((t, i) => (
              <div key={i} className="rounded-3xl border border-charcoal-100 bg-white p-6 shadow-soft">
                <Quote className="h-8 w-8 text-blush-200" />
                <p className="mt-3 text-sm leading-relaxed text-charcoal-700">“{t.quote}”</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex"><StarRating rating={5} /></div>
                  <span className="text-xs font-medium text-charcoal-600">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing + CTA + form */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="heading-eyebrow"><span className="h-px w-6 bg-gold-400" /> Pricing</span>
            <h2 className="mt-3 font-serif text-3xl text-charcoal-900 sm:text-4xl">Starts at <span className="gold-text">₹{cat.startingPrice.toLocaleString('en-IN')}</span></h2>
            <p className="mt-3 text-charcoal-500">Final pricing depends on your guest count, dates, and customization. Request a quote for an exact number.</p>
            <div className="mt-6 space-y-2.5">
              {['Free initial consultation', 'Itemized quote within 48 hours', 'Flexible payment plans', 'No obligation, ever'].map((p) => (
                <div key={p} className="flex items-center gap-2.5 text-sm text-charcoal-700">
                  <Check className="h-4 w-4 text-emeraldx-600" /> {p}
                </div>
              ))}
            </div>
            {!isHoneymoon && (
              <div className="mt-8 rounded-2xl bg-gold-soft p-5">
                <div className="font-serif text-lg text-charcoal-900">Want it as part of a package?</div>
                <p className="mt-1 text-sm text-charcoal-600">Bundling saves up to 20%. See how it fits into Bloom, Aura, or Royale.</p>
                <Button variant="gold" to="packages" className="mt-4">Compare packages</Button>
              </div>
            )}
          </div>
          <div className="lg:sticky lg:top-24">
            <EnquiryForm service={cat.title} />
          </div>
        </div>
      </Section>
    </>
  );
}

function CateringShowcase() {
  return (
    <Section className="!pt-0">
      <SectionHeading
        center
        eyebrow="Catering menus"
        title={<>A feast for <span className="gold-text">every tradition</span></>}
        subtitle="From South Indian breakfasts to Mughlai feasts, live counters, and desserts — curated by master chefs."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATERING_MENUS.map((menu, i) => {
          const Icon = iconFor(menu.icon);
          return (
            <div
              key={menu.category}
              className="group overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-3 bg-maroon-gradient p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient text-charcoal-900">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="font-serif text-lg text-white">{menu.category}</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-2">
                  {menu.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-charcoal-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
