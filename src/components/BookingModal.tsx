import { useEffect, useState } from 'react';
import {
  X, Check, ArrowRight, ArrowLeft, Loader2, CheckCircle2, Upload, Sparkles,
  CalendarDays, MapPin, Users, Wallet, PartyPopper, FileText, ImageIcon,
} from 'lucide-react';
import { useBooking } from '@/lib/booking-context';
import { useEnquiry } from '@/lib/hooks';
import { SERVICE_CATEGORIES, PACKAGES } from '@/data/content';

const STEPS = [
  { label: 'Service', icon: Sparkles },
  { label: 'Package', icon: FileText },
  { label: 'Date', icon: CalendarDays },
  { label: 'Location', icon: MapPin },
  { label: 'Guests', icon: Users },
  { label: 'Budget', icon: Wallet },
  { label: 'Requirements', icon: PartyPopper },
  { label: 'Inspiration', icon: ImageIcon },
  { label: 'Review', icon: Check },
];

export function BookingModal() {
  const { open, closeBooking, presetService } = useBooking();
  const { submit, loading, error, success, reset } = useEnquiry();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    service: '',
    pkg: '',
    wedding_date: '',
    location: '',
    guests: '',
    budget: '',
    requirements: '',
    name: '',
    email: '',
    phone: '',
    images: [] as string[],
  });

  useEffect(() => {
    if (open) {
      setStep(0);
      reset();
      setForm((f) => ({ ...f, service: presetService ?? f.service }));
    }
  }, [open, presetService, reset]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  if (!open) return null;

  const set = (k: keyof typeof form, v: string | string[]) => setForm((f) => ({ ...f, [k]: v }));

  const canNext = () => {
    switch (step) {
      case 0: return !!form.service;
      case 1: return !!form.pkg;
      case 2: return !!form.wedding_date;
      case 3: return !!form.location;
      case 4: return !!form.guests;
      case 5: return !!form.budget;
      case 6: return true;
      case 7: return true;
      case 8: return !!form.name && !!form.email;
      default: return true;
    }
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async () => {
    await submit({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      wedding_date: form.wedding_date || undefined,
      city: form.location || undefined,
      service: `${form.service}${form.pkg ? ` · ${form.pkg}` : ''}`,
      budget: form.budget || undefined,
      guests: form.guests ? Number(form.guests) : undefined,
      message: form.requirements || 'Booking enquiry via modal',
      source: 'booking-modal',
    });
  };

  const close = () => { closeBooking(); };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-maroon-900/60 backdrop-blur-sm animate-fade-in" onClick={close} />

      {/* Panel */}
      <div className="relative w-full max-w-2xl animate-slide-up-in sm:animate-scale-in">
        <div className="max-h-[92vh] overflow-hidden rounded-t-3xl border border-maroon-200/20 bg-white shadow-luxe sm:rounded-3xl">
          {/* Header */}
          <div className="relative bg-maroon-gradient px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient">
                  <Sparkles className="h-4.5 w-4.5 text-charcoal-900" />
                </span>
                <div>
                  <h2 className="font-serif text-lg text-white sm:text-xl">Book Your Wedding</h2>
                  <p className="text-xs text-gold-200">A planner will craft your quote within 24 hours</p>
                </div>
              </div>
              <button onClick={close} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Stepper */}
            {!success && (
              <div className="mt-4 flex items-center gap-1 overflow-x-auto no-scrollbar">
                {STEPS.map((s, i) => {
                  const done = i < step;
                  const active = i === step;
                  return (
                    <div key={s.label} className="flex shrink-0 items-center gap-1">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                        done ? 'bg-gold-gradient text-charcoal-900' :
                        active ? 'bg-white text-maroon-700 ring-2 ring-gold-400' :
                        'bg-white/15 text-white/60'
                      }`}>
                        {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                      </div>
                      {i < STEPS.length - 1 && <div className={`h-0.5 w-4 rounded ${done ? 'bg-gold-400' : 'bg-white/20'}`} />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto p-5 sm:p-7">
            {success ? (
              <SuccessView name={form.name} onClose={close} />
            ) : (
              <>
                {/* Step title */}
                <div className="mb-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                    Step {step + 1} of {STEPS.length}
                  </div>
                  <h3 className="mt-1 font-serif text-xl text-charcoal-900">{STEPS[step].label}</h3>
                </div>

                {step === 0 && (
                  <ChoiceGrid
                    value={form.service}
                    onChange={(v) => set('service', v)}
                    options={SERVICE_CATEGORIES.map((s) => ({ value: s.title, label: s.title, sub: s.short }))}
                  />
                )}
                {step === 1 && (
                  <ChoiceGrid
                    value={form.pkg}
                    onChange={(v) => set('pkg', v)}
                    options={PACKAGES.map((p) => ({ value: p.name, label: p.name, sub: `${p.tagline} · ₹${Math.round(p.price / 1000)}K` }))}
                  />
                )}
                {step === 2 && (
                  <Field label="When is your wedding day?">
                    <input type="date" value={form.wedding_date} onChange={(e) => set('wedding_date', e.target.value)} className="input-field" />
                  </Field>
                )}
                {step === 3 && (
                  <Field label="Where is the wedding? (City / Venue)">
                    <input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="e.g. The Grand Palace, Udaipur" className="input-field" />
                  </Field>
                )}
                {step === 4 && (
                  <Field label="Estimated guest count">
                    <input type="number" min="1" value={form.guests} onChange={(e) => set('guests', e.target.value)} placeholder="e.g. 300" className="input-field" />
                  </Field>
                )}
                {step === 5 && (
                  <ChoiceGrid
                    value={form.budget}
                    onChange={(v) => set('budget', v)}
                    options={[
                      { value: 'Under ₹2,00,000', label: 'Under ₹2L', sub: 'Intimate' },
                      { value: '₹2,00,000 – ₹5,00,000', label: '₹2L – ₹5L', sub: 'Standard' },
                      { value: '₹5,00,000 – ₹15,00,000', label: '₹5L – ₹15L', sub: 'Premium' },
                      { value: '₹15,00,000 – ₹50,00,000', label: '₹15L – ₹50L', sub: 'Luxury' },
                      { value: 'Above ₹50,00,000', label: 'Above ₹50L', sub: 'Royale' },
                    ]}
                  />
                )}
                {step === 6 && (
                  <Field label="Special requirements or preferences">
                    <textarea value={form.requirements} onChange={(e) => set('requirements', e.target.value)} placeholder="Tell us about your dream day — themes, must-haves, cultural preferences…" className="input-field min-h-[120px] resize-none" />
                  </Field>
                )}
                {step === 7 && (
                  <div>
                    <p className="text-sm text-charcoal-500 mb-4">Upload inspiration images (optional). Drag or tap to add mood-board references.</p>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {form.images.map((img, i) => (
                        <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-charcoal-200">
                          <img src={img} alt="" className="h-full w-full object-cover" />
                          <button onClick={() => set('images', form.images.filter((_, idx) => idx !== i))} className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal-900/70 text-white opacity-0 transition-opacity group-hover:opacity-100">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => set('images', [...form.images, 'https://images.pexels.com/photos/16120244/pexels-photo-16120244.jpeg?auto=compress&cs=tinysrgb&h=200&w=200'])}
                        className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-charcoal-200 text-charcoal-400 transition-colors hover:border-gold-300 hover:text-gold-600"
                      >
                        <Upload className="h-6 w-6" />
                        <span className="text-[10px] font-medium">Add</span>
                      </button>
                    </div>
                  </div>
                )}
                {step === 8 && (
                  <div className="space-y-4">
                    <p className="text-sm text-charcoal-500">Last step — your contact details so a planner can reach you.</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Full name" required>
                        <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Aanya Sharma" className="input-field" />
                      </Field>
                      <Field label="Email" required>
                        <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" className="input-field" />
                      </Field>
                    </div>
                    <Field label="Phone">
                      <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98765 43210" className="input-field" />
                    </Field>
                    {/* Summary */}
                    <div className="rounded-2xl border border-charcoal-100 bg-charcoal-50/50 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wide text-charcoal-400 mb-2">Your booking summary</div>
                      <dl className="grid gap-2 text-sm sm:grid-cols-2">
                        <SummaryRow label="Service" value={form.service} />
                        <SummaryRow label="Package" value={form.pkg} />
                        <SummaryRow label="Date" value={form.wedding_date} />
                        <SummaryRow label="Location" value={form.location} />
                        <SummaryRow label="Guests" value={form.guests} />
                        <SummaryRow label="Budget" value={form.budget} />
                      </dl>
                    </div>
                    {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer actions */}
          {!success && (
            <div className="flex items-center justify-between border-t border-charcoal-100 p-4 sm:px-7">
              <button onClick={back} disabled={step === 0 || loading} className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-charcoal-600 transition-colors hover:bg-charcoal-50 disabled:opacity-40">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < STEPS.length - 1 ? (
                <button onClick={next} disabled={!canNext()} className="flex items-center gap-2 rounded-full bg-charcoal-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-charcoal-800 disabled:opacity-40">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={onSubmit} disabled={loading || !canNext()} className="flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-semibold text-charcoal-900 transition-all hover:shadow-gold disabled:opacity-40">
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <><CheckCircle2 className="h-4 w-4" /> Submit Booking</>}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessView({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center py-6 text-center animate-scale-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emeraldx-500 text-white">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h3 className="mt-4 font-serif text-2xl text-charcoal-900">Booking request received!</h3>
      <p className="mt-2 max-w-sm text-sm text-charcoal-600">
        Thank you{name ? `, ${name.split(' ')[0]}` : ''}. Your request is now in our queue. A dedicated planner will prepare your personalized <strong>quotation</strong> and reach out within 24 hours.
      </p>
      {/* Quotation flow teaser */}
      <div className="mt-6 w-full max-w-sm space-y-2 text-left">
        {[
          { label: 'Quotation request received', done: true },
          { label: 'Planner preparing your quote', done: false },
          { label: 'Review & approve your quote', done: false },
          { label: 'Booking confirmation', done: false },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-xl border border-charcoal-100 p-3">
            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${s.done ? 'bg-emeraldx-500 text-white' : 'border border-charcoal-300'}`}>
              {s.done && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span className={`text-sm ${s.done ? 'text-charcoal-700' : 'text-charcoal-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="mt-6 btn-gold">Done</button>
    </div>
  );
}

function ChoiceGrid({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string; sub: string }[] }) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
              selected ? 'border-gold-400 bg-gold-50 ring-2 ring-gold-200' : 'border-charcoal-200 bg-white hover:border-charcoal-300'
            }`}
          >
            <div>
              <div className={`text-sm font-semibold ${selected ? 'text-gold-800' : 'text-charcoal-900'}`}>{o.label}</div>
              <div className="text-xs text-charcoal-500">{o.sub}</div>
            </div>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${selected ? 'bg-gold-gradient text-charcoal-900' : 'border border-charcoal-300'}`}>
              {selected && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">
        {label} {required && <span className="text-blush-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-charcoal-400">{label}</dt>
      <dd className="font-medium text-charcoal-900">{value || '—'}</dd>
    </div>
  );
}
