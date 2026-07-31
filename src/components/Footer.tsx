import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { useRouter, type Route } from '@/lib/router';
import { FOOTER_LINKS, BRAND } from '@/data/content';
import { useBooking } from '@/lib/booking-context';

export function Footer() {
  const { navigate } = useRouter();
  const { openBooking } = useBooking();

  return (
    <footer className="bg-charcoal-900 text-charcoal-100">
      {/* CTA band */}
      <div className="section-pad">
        <div className="mx-auto max-w-7xl -translate-y-20 rounded-3xl bg-maroon-gradient p-8 shadow-luxe sm:p-12">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="font-serif text-2xl text-white sm:text-3xl">One promise. Endless memories.</h3>
              <p className="mt-2 text-gold-100/80">Book a complimentary consultation with a Weddon planner today.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => openBooking()} className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-charcoal-900 transition-transform hover:scale-105">
                Book Consultation
              </button>
              <button onClick={() => navigate('packages')} className="rounded-full border border-gold-300/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
                View Packages
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-pad -mt-6 pb-24 lg:pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <img src={BRAND.logoIcon} alt="Weddon" className="h-11 w-11 rounded-lg bg-white object-contain p-0.5 shadow-gold" />
                <span className="font-serif text-xl font-bold text-white">Weddon</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal-300">
                {BRAND.tagline}. A complete wedding planning & management platform — bridal & groom makeover, accessories & jewellery rental, boutique, photography, decoration, catering, DJ, travel, honeymoon, invitations, and an AI assistant in one place.
              </p>
              {/* Social */}
              <div className="mt-5 flex gap-2">
                <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-800 text-emeraldx-300 transition-colors hover:bg-emeraldx-500 hover:text-white" aria-label="WhatsApp">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-800 text-charcoal-300 transition-colors hover:bg-gold-400 hover:text-charcoal-900" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-800 text-charcoal-300 transition-colors hover:bg-gold-400 hover:text-charcoal-900" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-800 text-charcoal-300 transition-colors hover:bg-gold-400 hover:text-charcoal-900" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">{heading}</h4>
                <ul className="mt-4 space-y-2.5">
                  {links.map((l) => (
                    <li key={l.label}>
                      <button
                        onClick={() => navigate(l.route as Route)}
                        className="text-sm text-charcoal-300 transition-colors hover:text-white"
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="my-10 h-px bg-charcoal-700/60" />

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 text-sm text-charcoal-300">
              <Mail className="h-4 w-4 text-gold-400" /> hello@weddon.com
            </div>
            <div className="flex items-center gap-3 text-sm text-charcoal-300">
              <Phone className="h-4 w-4 text-gold-400" /> +91 98765 43210
            </div>
            <div className="flex items-center gap-3 text-sm text-charcoal-300">
              <MapPin className="h-4 w-4 text-gold-400" /> Bandra West, Mumbai 400050
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-charcoal-700/60 pt-6 text-xs text-charcoal-400 sm:flex-row">
            <p>© 2026 Weddon. {BRAND.tagline}</p>
            <div className="flex gap-5">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-charcoal-200">Privacy</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-charcoal-200">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
