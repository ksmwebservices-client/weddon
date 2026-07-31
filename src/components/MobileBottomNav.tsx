import {
  Home, Search, CalendarPlus, Heart, User, LayoutDashboard, CalendarCheck,
  MessageSquare, Wallet, CalendarDays, Images, Target, Bell, Settings, type LucideIcon,
} from 'lucide-react';
import { useRouter, type Route } from '@/lib/router';
import { MOBILE_NAV_LANDING } from '@/data/content';
import { useBooking } from '@/lib/booking-context';

const ICONS: Record<string, LucideIcon> = {
  Home, Search, CalendarPlus, Heart, User, LayoutDashboard, CalendarCheck,
  MessageSquare, Wallet, CalendarDays, Images, Target, Bell, Settings,
};

/* ---------- Landing bottom nav ---------- */
export function LandingBottomNav() {
  const { route, navigate } = useRouter();
  const { openBooking } = useBooking();
  return (
    <BottomNavShell>
      {MOBILE_NAV_LANDING.map((item) => {
        const Icon = ICONS[item.icon] ?? Home;
        const isActive = route === item.route;
        const onClick = () => {
          if (item.label === 'Book') { openBooking(); return; }
          navigate(item.route as Route);
        };
        return (
          <NavButton key={item.label} icon={Icon} label={item.label} active={isActive} onClick={onClick} highlight={item.label === 'Book'} />
        );
      })}
    </BottomNavShell>
  );
}

/* ---------- Dashboard bottom navs ---------- */
export function DashboardBottomNav({ items, active, onSelect }: { items: { label: string; icon: string; key: string }[]; active: string; onSelect: (key: string) => void }) {
  return (
    <BottomNavShell>
      {items.map((item) => {
        const Icon = ICONS[item.icon] ?? Home;
        return (
          <NavButton key={item.key} icon={Icon} label={item.label} active={active === item.key} onClick={() => onSelect(item.key)} />
        );
      })}
    </BottomNavShell>
  );
}

/* ---------- Shell + button ---------- */
function BottomNavShell({ children }: { children: React.ReactNode }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 lg:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      <div className="mx-auto flex max-w-md items-center justify-around gap-1 rounded-2xl border border-white/15 bg-maroon-glass p-1.5 shadow-luxe backdrop-blur-xl">
        {children}
      </div>
    </nav>
  );
}

function NavButton({ icon: Icon, label, active, onClick, highlight }: { icon: LucideIcon; label: string; active: boolean; onClick: () => void; highlight?: boolean }) {
  if (highlight) {
    return (
      <button onClick={onClick} className="flex flex-1 flex-col items-center gap-0.5 py-1.5" aria-label={label}>
        <span className="flex h-10 w-10 -translate-y-3 items-center justify-center rounded-full bg-gold-gradient text-charcoal-900 shadow-gold ring-4 ring-maroon-800">
          <Icon className="h-5 w-5" />
        </span>
        <span className="-mt-2.5 text-[9px] font-semibold text-gold-300">{label}</span>
      </button>
    );
  }
  return (
    <button onClick={onClick} className="flex flex-1 flex-col items-center gap-0.5 py-1.5 transition-transform" aria-label={label}>
      <Icon className={`h-5 w-5 transition-colors ${active ? 'text-gold-300' : 'text-white/60'}`} />
      <span className={`text-[9px] font-medium transition-colors ${active ? 'text-gold-300' : 'text-white/55'}`}>{label}</span>
      {active && <span className="mt-0.5 h-1 w-1 rounded-full bg-gold-400" />}
    </button>
  );
}
