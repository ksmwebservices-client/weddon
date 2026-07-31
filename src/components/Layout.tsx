import { type ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AIChatbot } from '@/components/AIChatbot';
import { BookingModal } from '@/components/BookingModal';
import { LandingBottomNav, DashboardBottomNav } from '@/components/MobileBottomNav';
import { useRouter } from '@/lib/router';
import { MOBILE_NAV_CUSTOMER, MOBILE_NAV_VENDOR, MOBILE_NAV_ADMIN } from '@/data/content';

type Shell = 'landing' | 'customer' | 'vendor' | 'admin';

function useShell(): Shell {
  const { route } = useRouter();
  if (route === 'customer-dashboard') return 'customer';
  if (route === 'vendor-dashboard') return 'vendor';
  if (route === 'admin') return 'admin';
  return 'landing';
}

export function Layout({ children }: { children: ReactNode }) {
  const shell = useShell();

  if (shell === 'customer' || shell === 'vendor' || shell === 'admin') {
    // Dashboards render full-screen; bottom nav is injected by each dashboard via DashboardBottomNav
    return (
      <div className="min-h-screen bg-charcoal-50 pb-24 lg:pb-0">
        {children}
        <AIChatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pb-20 lg:pb-0">{children}</main>
      <Footer />
      <AIChatbot />
      <LandingBottomNav />
      <BookingModal />
    </div>
  );
}

/* Re-export for dashboards to place their own bottom nav */
export { DashboardBottomNav, MOBILE_NAV_CUSTOMER, MOBILE_NAV_VENDOR, MOBILE_NAV_ADMIN };
