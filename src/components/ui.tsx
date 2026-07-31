import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { Star, type LucideIcon } from 'lucide-react';
import { useRouter, type Route } from '@/lib/router';

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
  light,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} animate-fade-up`}>
      {eyebrow && (
        <span className={`heading-eyebrow ${light ? 'text-gold-300' : ''}`}>
          <span className="h-px w-6 bg-gold-400" />
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] ${light ? 'text-white' : 'text-charcoal-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-charcoal-100/80' : 'text-charcoal-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------- Button ---------- */
type ButtonProps = {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost';
  to?: Route;
  icon?: LucideIcon;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', to, icon: Icon, children, className = '', ...rest }: ButtonProps) {
  const { navigate } = useRouter();
  const base =
    variant === 'gold' ? 'btn-gold' :
    variant === 'outline' ? 'btn-outline' :
    variant === 'ghost' ? 'btn-ghost' :
    'btn-primary';
  const cls = `${base} ${className}`;
  if (to) {
    return (
      <button className={cls} onClick={() => navigate(to)} {...rest}>
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </button>
    );
  }
  return (
    <button className={cls} {...rest}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

/* ---------- Badge / Chip ---------- */
export function Badge({
  children,
  color = 'gold',
}: {
  children: ReactNode;
  color?: 'gold' | 'blush' | 'emerald' | 'charcoal';
}) {
  const map = {
    gold: 'chip-gold',
    blush: 'chip-blush',
    emerald: 'chip-emerald',
    charcoal: 'inline-flex items-center gap-1.5 rounded-full bg-charcoal-100 px-3 py-1 text-xs font-semibold text-charcoal-700',
  };
  return <span className={map[color]}>{children}</span>;
}

/* ---------- Star rating ---------- */
export function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < Math.round(rating) ? 'fill-gold-400 text-gold-400' : 'text-charcoal-200'}
        />
      ))}
    </div>
  );
}

/* ---------- Card ---------- */
export function Card({
  children,
  className = '',
  hover,
  glass,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}) {
  return (
    <div className={`${glass ? 'glass-card' : 'bg-white rounded-2xl border border-charcoal-100 shadow-soft'} ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Stat ---------- */
export function Stat({ value, label, light }: { value: string; label: string; light?: boolean }) {
  return (
    <div className="text-center">
      <div className={`font-serif text-3xl sm:text-4xl ${light ? 'text-white' : 'text-charcoal-900'}`}>{value}</div>
      <div className={`mt-1 text-xs uppercase tracking-wider ${light ? 'text-charcoal-100/70' : 'text-charcoal-400'}`}>{label}</div>
    </div>
  );
}

/* ---------- Eyebrow ---------- */
export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`heading-eyebrow ${light ? 'text-gold-300' : ''}`}>
      <span className="h-px w-6 bg-gold-400" />
      {children}
    </span>
  );
}

/* ---------- Skeleton ---------- */
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

/* ---------- Section wrapper ---------- */
export function Section({
  children,
  className = '',
  id,
  light,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  light?: boolean;
}) {
  return (
    <section id={id} className={`section-pad py-16 sm:py-24 ${light ? 'bg-charcoal-900' : ''} ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
