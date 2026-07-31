import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Route =
  | 'home'
  | 'about'
  | 'services'
  | 'packages'
  | 'bridal-makeover'
  | 'rentals'
  | 'boutique'
  | 'photography'
  | 'decoration'
  | 'catering'
  | 'dj-entertainment'
  | 'travel'
  | 'honeymoon'
  | 'shop'
  | 'gallery'
  | 'testimonials'
  | 'blog'
  | 'offers'
  | 'contact'
  | 'login'
  | 'vendor-login'
  | 'admin-login'
  | 'customer-dashboard'
  | 'vendor-dashboard'
  | 'admin'
  | 'ai-planner';

type RouterContextType = {
  route: Route;
  navigate: (route: Route) => void;
};

const RouterContext = createContext<RouterContextType | null>(null);

const VALID_ROUTES: Route[] = [
  'home', 'about', 'services', 'packages', 'bridal-makeover', 'rentals',
  'boutique', 'photography', 'decoration', 'catering', 'dj-entertainment',
  'travel', 'honeymoon', 'shop', 'gallery', 'testimonials', 'blog', 'offers',
  'contact', 'login', 'vendor-login', 'admin-login', 'customer-dashboard', 'vendor-dashboard', 'admin', 'ai-planner',
];

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '') as Route;
  return VALID_ROUTES.includes(hash) ? hash : 'home';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseHash());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (next: Route) => {
    window.location.hash = `/${next}`;
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
