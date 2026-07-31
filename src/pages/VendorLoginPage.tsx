import { useState } from 'react';
import { Mail, Lock, ArrowRight, Briefcase, ShieldCheck } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { IMAGES, BRAND } from '@/data/content';

export function VendorLoginPage() {
  const { navigate } = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('vendor-dashboard');
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img src={IMAGES.coupleVeil} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-maroon-900/75 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center section-pad py-12">
        <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white shadow-luxe">
          <div className="bg-maroon-gradient p-6 text-center">
            <img src={BRAND.logoIcon} alt="Weddon" className="mx-auto h-12 w-12 rounded-lg bg-white object-contain p-1 shadow-gold" />
            <h1 className="mt-3 font-serif text-2xl text-white">Weddon Vendor Portal</h1>
            <p className="mt-1 text-xs text-gold-200">For wedding professionals only</p>
          </div>
          <div className="p-7">
            <div className="flex items-center gap-1 rounded-full bg-charcoal-100 p-1">
              <button onClick={() => setMode('login')} className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${mode === 'login' ? 'bg-white text-charcoal-900 shadow-soft' : 'text-charcoal-500'}`}>Sign in</button>
              <button onClick={() => setMode('register')} className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${mode === 'register' ? 'bg-white text-charcoal-900 shadow-soft' : 'text-charcoal-500'}`}>Apply to join</button>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-charcoal-100 px-3 py-1.5 text-xs font-semibold text-charcoal-700">
              <Briefcase className="h-3.5 w-3.5" /> Vendor Account
            </div>
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              {mode === 'register' && (
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">Business name</span>
                  <input className="input-field" required placeholder="Your studio name" />
                </label>
              )}
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">Email</span>
                <div className="relative"><Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" /><input type="email" className="input-field pl-10" required placeholder="you@studio.com" /></div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">Password</span>
                <div className="relative"><Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" /><input type="password" className="input-field pl-10" required placeholder="••••••••" /></div>
              </label>
              <button type="submit" className="btn-gold w-full">{mode === 'login' ? 'Sign in' : 'Apply now'} <ArrowRight className="h-4 w-4" /></button>
            </form>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-emeraldx-50 px-4 py-3 text-xs text-emeraldx-700">
              <ShieldCheck className="h-4 w-4 shrink-0" /> Vendors are verified before listing. This portal is not linked publicly.
            </div>
            <button onClick={() => navigate('home')} className="mt-5 block w-full text-center text-xs font-medium text-charcoal-500 hover:text-charcoal-700">← Back to Weddon</button>
          </div>
        </div>
      </div>
    </div>
  );
}
