import { Mail, Phone, MapPin, Clock, Heart } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/ui';
import { EnquiryForm } from '@/components/EnquiryForm';
import { IMAGES } from '@/data/content';

export function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let’s plan your <span className="gold-text">forever</span></>}
        subtitle="A dedicated planner will reach out within 24 hours — no obligation, no pressure."
        image={IMAGES.coupleSofa}
        crumb="Contact"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Info */}
          <div>
            <h2 className="font-serif text-3xl text-charcoal-900">Reach us directly</h2>
            <p className="mt-2 text-charcoal-500">Prefer to talk first? Here’s how. Or fill out the form and we’ll come to you.</p>

            <div className="mt-8 space-y-3">
              {[
                { icon: Mail, label: 'Email', value: 'hello@weddon.com', sub: 'Replies within 24 hours' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210', sub: 'Mon–Sat, 10am–8pm IST' },
                { icon: MapPin, label: 'Studio', value: 'Bandra West, Mumbai 400050', sub: 'By appointment' },
                { icon: Clock, label: 'Response', value: 'Under 24 hours', sub: 'Every single day' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-soft">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold-600"><c.icon className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-charcoal-400">{c.label}</div>
                    <div className="font-serif text-base text-charcoal-900">{c.value}</div>
                    <div className="text-xs text-charcoal-500">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-charcoal-100 shadow-soft">
              <div className="flex items-center gap-3 bg-charcoal-900 p-5 text-white">
                <Heart className="h-5 w-5 text-gold-400" fill="currentColor" />
                <div>
                  <div className="font-serif text-lg">Weddon Studio</div>
                  <div className="text-xs text-charcoal-300">Bandra West, Mumbai</div>
                </div>
              </div>
              <div className="grid h-48 place-items-center bg-charcoal-50 text-sm text-charcoal-400">
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-gold-400" />
                  <p className="mt-2">Map preview · Bandra West, Mumbai 400050</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:sticky lg:top-24">
            <EnquiryForm />
          </div>
        </div>
      </Section>
    </>
  );
}
