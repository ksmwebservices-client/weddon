import { type ReactNode, useState } from 'react';
import { LogOut, Menu, X, type LucideIcon } from 'lucide-react';
import { useRouter, type Route } from '@/lib/router';
import { BRAND } from '@/data/content';

export type NavItem = { label: string; icon: LucideIcon; key: string };

export function DashboardShell({
  nav,
  active,
  setActive,
  brand,
  brandSub,
  children,
  bottomNav,
}: {
  nav: NavItem[];
  active: string;
  setActive: (k: string) => void;
  brand: string;
  brandSub: string;
  children: ReactNode;
  bottomNav?: ReactNode;
}) {
  const { navigate } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 p-5">
        <img src={BRAND.logoIcon} alt="Weddon" className="h-10 w-10 rounded-lg bg-white object-contain p-0.5 shadow-gold" />
        <div>
          <div className="font-serif text-lg font-bold text-charcoal-900">{brand}</div>
          <div className="text-[10px] uppercase tracking-wider text-gold-600">{brandSub}</div>
        </div>
      </div>
      <nav className="mt-2 flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => { setActive(item.key); setMobileOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-charcoal-900 text-white shadow-soft' : 'text-charcoal-600 hover:bg-charcoal-100'}`}
            >
              <item.icon className={`h-4.5 w-4.5 ${isActive ? 'text-gold-400' : 'text-charcoal-400'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-charcoal-100 p-3">
        <button onClick={() => navigate('home')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-charcoal-600 transition-colors hover:bg-charcoal-100">
          <LogOut className="h-4.5 w-4.5 text-charcoal-400" /> Back to site
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-charcoal-50">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-charcoal-100 bg-white lg:block">
        <div className="sticky top-0 h-screen">{Sidebar}</div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-luxe animate-slide-down">{Sidebar}</div>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-charcoal-100 bg-white/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button onClick={() => setMobileOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-lg text-charcoal-700 hover:bg-charcoal-100 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden text-sm text-charcoal-400 lg:block">Welcome back — here’s your overview.</div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient text-sm font-bold text-charcoal-900">A</div>
            <button onClick={() => navigate('home')} className="flex h-9 w-9 items-center justify-center rounded-lg text-charcoal-500 hover:bg-charcoal-100 lg:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 pb-24 sm:p-6 lg:pb-8 lg:p-8">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      {bottomNav}
    </div>
  );
}

export function DashboardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-serif text-2xl text-charcoal-900 sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-charcoal-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, change, accent = 'gold' }: { icon: LucideIcon; label: string; value: string; change?: string; accent?: 'gold' | 'emerald' | 'blush' | 'charcoal' }) {
  const bg = {
    gold: 'bg-gold-100 text-gold-700',
    emerald: 'bg-emeraldx-100 text-emeraldx-700',
    blush: 'bg-blush-100 text-blush-700',
    charcoal: 'bg-charcoal-100 text-charcoal-700',
  }[accent];
  return (
    <div className="rounded-2xl border border-charcoal-100 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}><Icon className="h-5 w-5" /></div>
        {change && <span className="text-xs font-semibold text-emeraldx-600">{change}</span>}
      </div>
      <div className="mt-4 font-serif text-2xl text-charcoal-900">{value}</div>
      <div className="text-xs text-charcoal-400">{label}</div>
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-charcoal-100 bg-white p-5 shadow-soft ${className}`}>{children}</div>;
}

export { type Route };
