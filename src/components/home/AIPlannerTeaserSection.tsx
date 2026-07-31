import { Sparkles, ArrowRight, Bot, MessageSquare } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { IMAGES } from '@/data/content';
import { SectionHeading } from '@/components/ui';

const TOOLS = [
  'Budget planner', 'Checklist generator', 'Timeline creator', 'Color theme recommender',
  'Vendor recommendations', 'Bridal look suggestions', 'Seating planner', 'Invitation generator',
];

export function AIPlannerTeaserSection() {
  const { navigate } = useRouter();
  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-charcoal-gradient p-8 shadow-luxe sm:p-12 lg:p-16">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-emeraldx-400/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="heading-eyebrow text-gold-300">
                <span className="h-px w-6 bg-gold-400" /> Meet Aria
              </span>
              <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl lg:text-[2.75rem] leading-[1.1]">
                Your AI wedding planner, <span className="gold-text">available 24/7</span>
              </h2>
              <p className="mt-4 max-w-lg text-charcoal-200">
                Aria builds your budget, generates your checklist, designs your timeline, recommends colors and vendors, suggests bridal looks, plans seating, and drafts your invitations — all from a conversation.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {TOOLS.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-charcoal-100 backdrop-blur">
                    <Sparkles className="h-3 w-3 text-gold-400" /> {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => navigate('ai-planner')} className="btn-gold">
                  Try Aria Free <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => navigate('customer-dashboard')} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                  <MessageSquare className="h-4 w-4" /> See it in your dashboard
                </button>
              </div>
            </div>

            {/* Chat mockup */}
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient">
                    <Bot className="h-4.5 w-4.5 text-charcoal-900" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Aria</div>
                    <div className="flex items-center gap-1.5 text-xs text-emeraldx-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emeraldx-400" /> AI Wedding Assistant
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gold-gradient px-3.5 py-2.5 text-sm text-charcoal-900">
                      We have a ₹6L budget for 250 guests in Udaipur. Help?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/90 px-3.5 py-2.5 text-sm text-charcoal-700">
                      For ₹6L / 250 guests in Udaipur, I recommend the <strong>Aura</strong> package base with these allocations: Venue & Catering ₹2.4L, Decor ₹0.9L, Photography ₹0.7L, Attire & Makeup ₹0.8L, Entertainment ₹0.5L, Buffer ₹0.7L. Shall I build the full breakdown?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[70%] rounded-2xl rounded-br-md bg-gold-gradient px-3.5 py-2.5 text-sm text-charcoal-900">
                      Yes, and suggest a color theme.
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/90 px-3.5 py-2.5 text-sm text-charcoal-700">
                      Done — budget saved. For a Udaipur winter wedding, I suggest <strong>“Sunset Rose”</strong>: blush + champagne gold + deep emerald accents. It complements marble architecture beautifully. Opening the palette now…
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating image chip */}
              <div className="absolute -bottom-6 -right-4 hidden h-28 w-28 overflow-hidden rounded-2xl border-2 border-white/20 shadow-luxe sm:block">
                <img src={IMAGES.tableRoses} alt="Decor" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
