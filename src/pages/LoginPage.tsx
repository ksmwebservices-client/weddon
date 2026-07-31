import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { IMAGES, BRAND } from '@/data/content';
import { useBooking } from '@/lib/booking-context';

export function LoginPage() {
  const { navigate } = useRouter();
  const { openBooking } = useBooking();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('customer-dashboard');
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={IMAGES.coupleOcean} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-maroon-900/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center section-pad py-12">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-luxe backdrop-blur-xl lg:grid-cols-2">
          {/* Left: brand panel */}
          <div className="relative hidden flex-col justify-between p-10 lg:flex">
            <div>
              <div className="flex items-center gap-2.5">
                <img src={BRAND.logoIcon} alt="Weddon" className="h-11 w-11 rounded-lg bg-white object-contain p-0.5 shadow-gold" />
                <span className="font-serif text-2xl font-bold text-white">Weddon</span>
              </div>
              <h2 className="mt-10 font-serif text-3xl text-white leading-tight">
                One Promise.<br /><span className="gold-text">Endless Memories.</span>
              </h2>
              <p className="mt-4 max-w-xs text-sm text-charcoal-200">Your planning, vendors, payments, and AI assistant — all in one elegant place.</p>
            </div>
            <div className="space-y-3">
              {[
                { icon: Sparkles, text: 'AI wedding planner included' },
                { icon: ShieldCheck, text: '680+ verified vendors' },
                { icon: Heart, text: '2,400+ happy couples' },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-3 text-sm text-charcoal-100">
                  <f.icon className="h-5 w-5 text-gold-400" /> {f.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form — customer only */}
          <div className="bg-white p-8 sm:p-10">
            <div className="flex items-center gap-1 rounded-full bg-charcoal-100 p-1">
              <button onClick={() => setMode('login')} className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${mode === 'login' ? 'bg-white text-charcoal-900 shadow-soft' : 'text-charcoal-500'}`}>Sign in</button>
              <button onClick={() => setMode('register')} className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${mode === 'register' ? 'bg-white text-charcoal-900 shadow-soft' : 'text-charcoal-500'}`}>Create account</button>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blush-50 px-3 py-1.5 text-xs font-semibold text-blush-700">
              <Heart className="h-3.5 w-3.5" /> Customer Account
            </div>

            <h2 className="mt-5 font-serif text-2xl text-charcoal-900">
              {mode === 'login' ? 'Welcome back' : 'Join Weddon'}
            </h2>
            <p className="mt-1 text-sm text-charcoal-500">
              {mode === 'login' ? 'Sign in to access your wedding dashboard.' : 'Create your customer account in seconds.'}
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              {mode === 'register' && (
                <Field icon={User} label="Full name">
                  <input className="input-field pl-10" required placeholder="Your name" />
                </Field>
              )}
              <Field icon={Mail} label="Email">
                <input type="email" className="input-field pl-10" required placeholder="you@email.com" />
              </Field>
              <Field icon={Lock} label="Password">
                <input type="password" className="input-field pl-10" required placeholder="••••••••" />
              </Field>

              {mode === 'login' && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-charcoal-500"><input type="checkbox" className="rounded border-charcoal-300" /> Remember me</label>
                  <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-gold-700 hover:text-gold-800">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="btn-gold w-full">
                {mode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-charcoal-400">
              <span className="h-px flex-1 bg-charcoal-100" /> or <span className="h-px flex-1 bg-charcoal-100" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => navigate('customer-dashboard')} className="rounded-xl border border-charcoal-200 py-2.5 text-sm font-medium text-charcoal-700 transition-colors hover:bg-charcoal-50">Continue as guest</button>
              <button onClick={() => openBooking()} className="rounded-xl border border-charcoal-200 py-2.5 text-sm font-medium text-charcoal-700 transition-colors hover:bg-charcoal-50">Book consultation</button>
            </div>

            <p className="mt-6 text-center text-xs text-charcoal-400">
              Are you a vendor? Visit <button onClick={() => navigate('vendor-login')} className="font-semibold text-gold-700 hover:underline">/vendor</button> to sign in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, children }: { icon: typeof Mail; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">{label}</span>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
        {children}
      </div>
    </label>
  );
}
