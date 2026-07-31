import { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldAlert, LockKeyhole } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { BRAND } from '@/data/content';

export function AdminLoginPage() {
  const { navigate } = useRouter();
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: any credentials route to admin ERP
    navigate('admin');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-maroon-gradient px-4">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-luxe">
          <div className="bg-charcoal-900 p-6 text-center">
            <img src={BRAND.logoIcon} alt="Weddon" className="mx-auto h-12 w-12 rounded-lg bg-white object-contain p-1 shadow-gold" />
            <h1 className="mt-3 font-serif text-2xl text-white">Weddon Admin</h1>
            <p className="mt-1 text-xs text-gold-200">Restricted access · ERP Dashboard</p>
          </div>
          <div className="p-7">
            <div className="mb-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">
              <ShieldAlert className="h-4 w-4 shrink-0" /> Authorized personnel only. All access is logged.
            </div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-charcoal-100 px-3 py-1.5 text-xs font-semibold text-charcoal-700">
              <LockKeyhole className="h-3.5 w-3.5" /> Administrator
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">Admin email</span>
                <div className="relative"><Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" /><input type="email" className="input-field pl-10" required placeholder="admin@weddon.com" /></div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">Password</span>
                <div className="relative"><Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" /><input type="password" className="input-field pl-10" required placeholder="••••••••" /></div>
              </label>
              {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
              <button type="submit" className="btn-gold w-full">Sign in to ERP <ArrowRight className="h-4 w-4" /></button>
            </form>
            <button onClick={() => navigate('home')} className="mt-5 block w-full text-center text-xs font-medium text-charcoal-500 hover:text-charcoal-700">← Back to site</button>
          </div>
        </div>
      </div>
    </div>
  );
}
