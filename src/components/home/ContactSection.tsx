import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { EnquiryForm } from '@/components/EnquiryForm';
import { SectionHeading } from '@/components/ui';

export function ContactSection() {
  const { navigate } = useRouter();
  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left: info */}
          <div>
            <SectionHeading
              eyebrow="Let’s talk"
              title={<>Begin your <span className="gold-text">Weddon</span> journey</>}
              subtitle="Tell us about your day and a dedicated planner will reach out within 24 hours with initial ideas — no obligation, no pressure."
            />

            <div className="mt-8 space-y-3">
              {[
                { icon: Mail, label: 'Email us', value: 'hello@weddon.com', sub: 'We reply within 24 hours' },
                { icon: Phone, label: 'Call us', value: '+91 81244 72943 / +91 90031 19026', sub: 'Mon–Sat, 10am–8pm IST' },
                { icon: MapPin, label: 'Visit the studio', value: 'Nungambakkam High Road, Chennai', sub: 'By appointment' },
                { icon: Clock, label: 'Response time', value: 'Under 24 hours', sub: 'Every single day' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-soft">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold-600">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-charcoal-400">{c.label}</div>
                    <div className="font-serif text-base text-charcoal-900">{c.value}</div>
                    <div className="text-xs text-charcoal-500">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => navigate('packages')} className="mt-8 btn-outline">
              Or browse packages first <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right: form */}
          <div className="lg:sticky lg:top-24">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
