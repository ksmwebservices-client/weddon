import { useState, type ReactNode } from 'react';
import { CheckCircle2, Loader2, AlertCircle, Send } from 'lucide-react';
import { useEnquiry } from '@/lib/hooks';

export function EnquiryForm({
  service,
  compact,
  title = 'Plan your perfect wedding',
  subtitle = 'Tell us about your day — a planner will reach out within 24 hours.',
}: {
  service?: string;
  compact?: boolean;
  title?: string;
  subtitle?: string;
}) {
  const { submit, loading, error, success, reset } = useEnquiry();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    wedding_date: '',
    city: '',
    budget: '',
    guests: '',
    message: '',
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      wedding_date: form.wedding_date || undefined,
      city: form.city || undefined,
      service: service,
      budget: form.budget || undefined,
      guests: form.guests ? Number(form.guests) : undefined,
      message: form.message || 'General enquiry',
      source: 'website',
    });
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-emeraldx-200 bg-emeraldx-50 p-8 text-center animate-scale-in">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emeraldx-500 text-white">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-serif text-2xl text-charcoal-900">Enquiry received!</h3>
        <p className="mt-2 max-w-sm text-sm text-charcoal-600">
          Thank you, {form.name.split(' ')[0]}. A Weddon planner will personally reach out within 24 hours to start designing your celebration.
        </p>
        <button onClick={reset} className="mt-5 btn-outline">Send another enquiry</button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-charcoal-100 bg-white p-6 shadow-card sm:p-8">
      {!compact && (
        <div className="mb-6">
          <h3 className="font-serif text-2xl text-charcoal-900">{title}</h3>
          <p className="mt-1.5 text-sm text-charcoal-500">{subtitle}</p>
        </div>
      )}
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required>
          <input className="input-field" required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Aanya Sharma" />
        </Field>
        <Field label="Email" required>
          <input type="email" className="input-field" required value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" />
        </Field>
        <Field label="Phone">
          <input className="input-field" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98765 43210" />
        </Field>
        <Field label="Wedding date">
          <input type="date" className="input-field" value={form.wedding_date} onChange={(e) => set('wedding_date', e.target.value)} />
        </Field>
        <Field label="City">
          <input className="input-field" value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Mumbai" />
        </Field>
        <Field label="Guests">
          <input type="number" min="1" className="input-field" value={form.guests} onChange={(e) => set('guests', e.target.value)} placeholder="300" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Budget range">
            <select className="input-field" value={form.budget} onChange={(e) => set('budget', e.target.value)}>
              <option value="">Select a range</option>
              <option>Under ₹2,00,000</option>
              <option>₹2,00,000 – ₹5,00,000</option>
              <option>₹5,00,000 – ₹15,00,000</option>
              <option>₹15,00,000 – ₹50,00,000</option>
              <option>Above ₹50,00,000</option>
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Tell us about your day">
            <textarea className="input-field min-h-[100px] resize-none" value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="We're dreaming of a winter destination wedding…" />
          </Field>
        </div>

        {error && (
          <div className="sm:col-span-2 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <div className="sm:col-span-2">
          <button type="submit" disabled={loading} className="btn-gold w-full">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Submit Enquiry</>}
          </button>
          <p className="mt-3 text-center text-xs text-charcoal-400">No spam. We reply within 24 hours, every day.</p>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">
        {label} {required && <span className="text-blush-500">*</span>}
      </span>
      {children}
    </label>
  );
}
