import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown, CalendarPlus } from 'lucide-react';
import { useRouter, type Route } from '@/lib/router';
import { NAV_LINKS, BRAND, SERVICE_CATEGORIES } from '@/data/content';
import { iconFor } from '@/components/icons';
import { useBooking } from '@/lib/booking-context';

const ROUTE_MAP: Record<string, Route> = {
  'bridal-makeover': 'bridal-makeover',
  'groom-makeover': 'bridal-makeover',
  'bridal-accessories-rental': 'rentals',
  'bridal-jewellery-rental': 'rentals',
  boutique: 'boutique',
  photography: 'photography',
  videography: 'photography',
  drone: 'photography',
  decoration: 'decoration',
  catering: 'catering',
  'dj-entertainment': 'dj-entertainment',
  travel: 'honeymoon',
  invitation: 'shop',
  'flower-decoration': 'decoration',
  'return-gifts': 'shop',
  'luxury-cars': 'honeymoon',
  'wedding-shopping': 'shop',
  'event-hosts': 'dj-entertainment',
  'guest-management': 'contact',
};

const TOP_LINKS: { label: string; route: Route }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Services', route: 'services' },
  { label: 'Packages', route: 'packages' },
  { label: 'Boutique', route: 'boutique' },
  { label: 'Rentals', route: 'rentals' },
  { label: 'Gallery', route: 'gallery' },
  { label: 'Blog', route: 'blog' },
];

export function Navbar() {
  const { route, navigate } = useRouter();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [route]);

  const go = (r: Route) => {
    navigate(r);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-maroon-glass shadow-luxe backdrop-blur-xl'
          : 'bg-maroon-800/70 backdrop-blur-md'
      }`}
    >
      <nav className="section-pad mx-auto flex h-16 max-w-7xl items-center justify-between sm:h-20">
        {/* Logo */}
        <button onClick={() => go('home')} className="flex items-center gap-2.5 group">
          <img
            src={BRAND.logoIcon}
            alt="Weddon"
            className="h-10 w-10 rounded-lg bg-white object-contain p-0.5 shadow-gold transition-transform group-hover:scale-110 sm:h-11 sm:w-11"
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              Weddon
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-gold-300">
              One Promise. Endless Memories.
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {TOP_LINKS.map((link) => {
            const isActive = route === link.route;
            const isServices = link.label === 'Services';
            if (isServices) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`group flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-gold-300' : 'text-white/85 hover:text-gold-300'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {/* Gold active underline */}
                  <span className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gold-400 transition-all duration-300 ${isActive ? 'w-6' : 'w-0'}`} />
                  {servicesOpen && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                      <div className="grid max-h-[70vh] w-[580px] grid-cols-2 gap-1 overflow-y-auto rounded-2xl border border-maroon-200/20 bg-white p-3 shadow-luxe animate-slide-down">
                        {SERVICE_CATEGORIES.map((s) => {
                          const Icon = iconFor(s.icon);
                          return (
                            <button
                              key={s.slug}
                              onClick={() => go(ROUTE_MAP[s.slug] ?? 'services')}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-charcoal-700 transition-colors hover:bg-blush-50 hover:text-charcoal-900"
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold-soft text-gold-600">
                                <Icon className="h-4 w-4" />
                              </span>
                              {s.title}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => go('services')}
                          className="col-span-2 mt-1 rounded-xl bg-charcoal-50 px-3 py-2.5 text-center text-sm font-semibold text-charcoal-800 transition-colors hover:bg-charcoal-100"
                        >
                          View all services
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <div key={link.label} className="relative">
                <button
                  onClick={() => go(link.route)}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-gold-300' : 'text-white/85 hover:text-gold-300'
                  }`}
                >
                  {link.label}
                </button>
                <span className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gold-400 transition-all duration-300 ${isActive ? 'w-6' : 'w-0'}`} />
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => go('login')}
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:text-gold-300 sm:block"
          >
            Sign in
          </button>
          <button onClick={() => openBooking()} className="hidden items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-charcoal-900 shadow-gold transition-all hover:scale-105 hover:shadow-luxe sm:inline-flex">
            <CalendarPlus className="h-4 w-4" />
            Book Consultation
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden">
          <div className="mx-4 mb-4 max-h-[80vh] overflow-y-auto rounded-3xl border border-maroon-200/20 bg-white p-4 shadow-luxe animate-slide-down">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.route}
                  onClick={() => go(l.route as Route)}
                  className="rounded-xl px-3 py-2.5 text-left text-sm font-medium text-charcoal-700 transition-colors hover:bg-charcoal-50"
                >
                  {l.label}
                </button>
              ))}
              <div className="my-2 h-px bg-charcoal-100" />
              {SERVICE_CATEGORIES.slice(0, 10).map((s) => (
                <button
                  key={s.slug}
                  onClick={() => go(ROUTE_MAP[s.slug] ?? 'services')}
                  className="rounded-xl px-3 py-2 text-left text-sm text-charcoal-500 transition-colors hover:bg-blush-50"
                >
                  {s.title}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => go('login')} className="btn-outline flex-1">Sign in</button>
              <button onClick={() => { setMobileOpen(false); openBooking(); }} className="btn-gold flex-1">Book Now</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
