import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '@/data/content';
import { SectionHeading } from '@/components/ui';

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-gradient-to-b from-blush-50/50 to-white section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          center
          eyebrow="Good to know"
          title={<>Frequently asked <span className="gold-text">questions</span></>}
          subtitle="Everything you need to know before you begin. Still curious? Chat with Aria."
        />

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'border-gold-300 bg-white shadow-card' : 'border-charcoal-100 bg-white/60'}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-serif text-base text-charcoal-900 sm:text-lg">{faq.q}</span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${isOpen ? 'bg-gold-gradient text-charcoal-900 rotate-180' : 'bg-charcoal-100 text-charcoal-600'}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
