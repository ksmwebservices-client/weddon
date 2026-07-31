import { RouterProvider, useRouter } from '@/lib/router';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { PackagesPage } from '@/pages/PackagesPage';
import { ServiceDetailPage } from '@/pages/ServiceDetailPage';
import { BoutiquePage } from '@/pages/BoutiquePage';
import { RentalsPage } from '@/pages/RentalsPage';
import { ShopPage } from '@/pages/ShopPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { TestimonialsPage } from '@/pages/TestimonialsPage';
import { BlogPage } from '@/pages/BlogPage';
import { OffersPage } from '@/pages/OffersPage';
import { ContactPage } from '@/pages/ContactPage';
import { AboutPage } from '@/pages/AboutPage';
import { LoginPage } from '@/pages/LoginPage';
import { VendorLoginPage } from '@/pages/VendorLoginPage';
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { CustomerDashboard } from '@/pages/dashboards/CustomerDashboard';
import { VendorDashboard } from '@/pages/dashboards/VendorDashboard';
import { AdminDashboard } from '@/pages/dashboards/AdminDashboard';
import { AIPlannerPage } from '@/pages/AIPlannerPage';

function Routes() {
  const { route } = useRouter();

  switch (route) {
    case 'home': return <HomePage />;
    case 'services': return <ServicesPage />;
    case 'packages': return <PackagesPage />;
    case 'bridal-makeover':
    case 'photography':
    case 'decoration':
    case 'catering':
    case 'dj-entertainment':
    case 'travel':
    case 'honeymoon':
      return <ServiceDetailPage />;
    case 'boutique': return <BoutiquePage />;
    case 'rentals': return <RentalsPage />;
    case 'shop': return <ShopPage />;
    case 'gallery': return <GalleryPage />;
    case 'testimonials': return <TestimonialsPage />;
    case 'blog': return <BlogPage />;
    case 'offers': return <OffersPage />;
    case 'contact': return <ContactPage />;
    case 'about': return <AboutPage />;
    case 'login': return <LoginPage />;
    case 'vendor-login': return <VendorLoginPage />;
    case 'admin-login': return <AdminLoginPage />;
    case 'customer-dashboard': return <CustomerDashboard />;
    case 'vendor-dashboard': return <VendorDashboard />;
    case 'admin': return <AdminDashboard />;
    case 'ai-planner': return <AIPlannerPage />;
    default: return <HomePage />;
  }
}

export default function App() {
  return (
    <RouterProvider>
      <Layout>
        <Routes />
      </Layout>
    </RouterProvider>
  );
}
