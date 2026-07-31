import { type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter, type Route } from '@/lib/router';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  crumb,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image: string;
  crumb: string;
}) {
  const { navigate } = useRouter();
  return (
    <section className="relative h-[44vh] min-h-[360px] overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end section-pad pb-10">
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-charcoal-100/80">
          <button onClick={() => navigate('home')} className="hover:text-white">Home</button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gold-300">{crumb}</span>
        </nav>
        <span className="heading-eyebrow text-gold-300">
          <span className="h-px w-6 bg-gold-400" /> {eyebrow}
        </span>
        <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl lg:text-6xl leading-[1.05]">{title}</h1>
        {subtitle && <p className="mt-4 max-w-xl text-charcoal-100/85">{subtitle}</p>}
      </div>
    </section>
  );
}

export type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image: string;
  crumb: string;
  cta?: { label: string; route: Route };
};
