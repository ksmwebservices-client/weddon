import { Heart, Award, Users, Globe, Sparkles, Target } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading, Stat } from '@/components/ui';
import { IMAGES, STATS } from '@/data/content';

const VALUES = [
  { icon: Heart, title: 'Joy first', desc: 'Couples should enjoy their wedding. We handle the rest.' },
  { icon: Award, title: 'Excellence', desc: '2,400 weddings refined our craft to a science.' },
  { icon: Sparkles, title: 'Innovation', desc: 'AI-assisted planning meets human artistry.' },
  { icon: Target, title: 'Transparency', desc: 'Clear pricing, honest timelines, no surprises.' },
];

const TEAM = [
  { name: 'Aanya Mehta', role: 'Founder & Lead Planner', image: IMAGES.brideJewelry },
  { name: 'Rohan Kapoor', role: 'Head of Vendor Network', image: IMAGES.coupleSmiling },
  { name: 'Ishita Rao', role: 'Creative Director', image: IMAGES.brideEarring },
  { name: 'Vikram Shah', role: 'Head of Technology', image: IMAGES.coupleSofa },
];

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Weddon"
        title={<>Every wedding, <span className="gold-text">beautifully managed</span></>}
        subtitle="We built Weddon because planning a wedding shouldn’t feel like a second job."
        image={IMAGES.coupleSofa}
        crumb="About"
      />

      {/* Story */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative h-80 overflow-hidden rounded-3xl shadow-luxe sm:h-96">
            <img src={IMAGES.coupleGarland} alt="Weddon story" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="Our story" title={<>From one wedding to <span className="gold-text">2,400+</span></>} />
            <div className="mt-4 space-y-4 text-charcoal-600">
              <p>Weddon began in 2018 when our founder, Aanya, planned her sister’s wedding and discovered just how fragmented the industry was — a dozen vendors, scattered spreadsheets, and zero visibility.</p>
              <p>Today, Weddon is a full-service luxury platform that brings planning, a vetted marketplace, couture, rentals, and an AI assistant under one elegant roof. We’ve managed celebrations across 42 cities and counting.</p>
              <p>Our promise is simple: every wedding, beautifully managed — so your only job is to be present for the moments that matter.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <section className="bg-charcoal-900 py-16 section-pad">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => <Stat key={s.label} value={s.value} label={s.label} light />)}
        </div>
      </section>

      {/* Values */}
      <Section>
        <SectionHeading center title={<>What we <span className="gold-text">stand for</span></>} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div key={v.title} className="rounded-3xl border border-charcoal-100 bg-white p-6 text-center shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-gold-600"><v.icon className="h-6 w-6" /></div>
              <h3 className="mt-3 font-serif text-lg text-charcoal-900">{v.title}</h3>
              <p className="mt-1 text-sm text-charcoal-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section className="!pt-0">
        <SectionHeading center title={<>The people behind <span className="gold-text">Weddon</span></>} subtitle="Senior planners, artists, and technologists obsessed with your big day." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t, i) => (
            <div key={t.name} className="group overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="relative h-64 overflow-hidden">
                <img src={t.image} alt={t.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-serif text-lg text-charcoal-900">{t.name}</h3>
                <div className="text-xs text-gold-600">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Mission band */}
      <section className="bg-blush-gradient py-16 section-pad">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center gap-4">
            <Users className="h-6 w-6 text-gold-600" /><Globe className="h-6 w-6 text-gold-600" /><Heart className="h-6 w-6 text-gold-600" />
          </div>
          <SectionHeading center title="Our mission" subtitle="To make world-class wedding planning accessible, transparent, and genuinely joyful — for every couple, everywhere." />
        </div>
      </section>
    </>
  );
}
