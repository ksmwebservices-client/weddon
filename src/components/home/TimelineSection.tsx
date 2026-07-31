import { useRouter } from '@/lib/router';
import { TIMELINE } from '@/data/content';
import { SectionHeading } from '@/components/ui';
import { iconFor } from '@/components/icons';

export function TimelineSection() {
  const { navigate } = useRouter();
  return (
    <section className="bg-gradient-to-b from-white to-blush-50/50 section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="The journey"
          title={<>Your wedding, <span className="gold-text">on a timeline</span></>}
          subtitle="A proven 5-phase plan that keeps everything on track — powered by our AI assistant and a dedicated planner."
        />

        <div className="relative mt-14">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {TIMELINE.map((step, i) => {
              const Icon = iconFor(step.icon);
              return (
                <div
                  key={step.phase}
                  className="group relative animate-fade-up"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div className="flex items-center justify-center">
                    <div className="relative z-10 flex h-18 w-18 items-center justify-center rounded-2xl border border-gold-200 bg-white shadow-soft transition-all duration-500 group-hover:shadow-gold group-hover:border-gold-400">
                      <Icon className="h-7 w-7 text-gold-500" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal-900 text-[10px] font-bold text-gold-400">{step.phase}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gold-600">{step.months}</div>
                    <h3 className="mt-1 font-serif text-lg text-charcoal-900">{step.title}</h3>
                    <ul className="mt-3 space-y-1.5 text-left">
                      {step.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-charcoal-500">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button onClick={() => navigate('ai-planner')} className="btn-gold">Generate your custom timeline</button>
        </div>
      </div>
    </section>
  );
}
