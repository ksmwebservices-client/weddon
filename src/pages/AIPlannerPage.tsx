import { useState } from 'react';
import {
  Sparkles, Wallet, ListChecks, CalendarRange, Palette, Users, Crown,
  Mail, Bot, ArrowRight, Check, RefreshCw, Send,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading, Button } from '@/components/ui';
import { IMAGES, SERVICE_CATEGORIES } from '@/data/content';
import { useRouter } from '@/lib/router';

type Tool = 'chat' | 'budget' | 'checklist' | 'timeline' | 'colors' | 'vendors' | 'looks' | 'seating' | 'invitations';

const TOOLS: { id: Tool; label: string; icon: typeof Sparkles; desc: string }[] = [
  { id: 'chat', label: 'AI Chat', icon: Bot, desc: 'Ask Aria anything' },
  { id: 'budget', label: 'Budget Planner', icon: Wallet, desc: 'Allocate your spend' },
  { id: 'checklist', label: 'Checklist', icon: ListChecks, desc: '60-point list' },
  { id: 'timeline', label: 'Timeline', icon: CalendarRange, desc: 'Month-by-month' },
  { id: 'colors', label: 'Color Themes', icon: Palette, desc: 'Palette recommender' },
  { id: 'vendors', label: 'Vendors', icon: Users, desc: 'Smart matches' },
  { id: 'looks', label: 'Bridal Looks', icon: Crown, desc: 'Look suggestions' },
  { id: 'invitations', label: 'Invitations', icon: Mail, desc: 'Draft generator' },
];

export function AIPlannerPage() {
  const [tool, setTool] = useState<Tool>('chat');

  return (
    <>
      <PageHeader
        eyebrow="AI Wedding Assistant"
        title={<>Meet <span className="gold-text">Aria</span>, your AI planner</>}
        subtitle="Nine AI tools to plan every detail — from budget to invitations. Free to try."
        image={IMAGES.coupleSofa}
        crumb="AI Planner"
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Tool sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-charcoal-100 bg-white p-3 shadow-soft">
              <div className="flex items-center gap-3 border-b border-charcoal-100 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient"><Bot className="h-5 w-5 text-charcoal-900" /></div>
                <div>
                  <div className="text-sm font-semibold text-charcoal-900">Aria</div>
                  <div className="flex items-center gap-1.5 text-xs text-emeraldx-600"><span className="h-1.5 w-1.5 rounded-full bg-emeraldx-400" /> Online</div>
                </div>
              </div>
              <div className="mt-2 grid gap-1">
                {TOOLS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTool(t.id)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${tool === t.id ? 'bg-charcoal-900 text-white' : 'text-charcoal-600 hover:bg-charcoal-50'}`}
                  >
                    <t.icon className={`h-4.5 w-4.5 ${tool === t.id ? 'text-gold-400' : 'text-charcoal-400'}`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t.label}</div>
                      <div className={`text-xs ${tool === t.id ? 'text-charcoal-300' : 'text-charcoal-400'}`}>{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tool content */}
          <div>
            {tool === 'chat' && <ChatTool />}
            {tool === 'budget' && <BudgetTool />}
            {tool === 'checklist' && <ChecklistTool />}
            {tool === 'timeline' && <TimelineTool />}
            {tool === 'colors' && <ColorsTool />}
            {tool === 'vendors' && <VendorsTool />}
            {tool === 'looks' && <LooksTool />}
            {tool === 'seating' && <SeatingTool />}
            {tool === 'invitations' && <InvitationsTool />}
          </div>
        </div>
      </Section>
    </>
  );
}

function ToolShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-charcoal-100 bg-white p-6 shadow-soft sm:p-8 animate-fade-up">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-gold-500" />
        <div>
          <h2 className="font-serif text-xl text-charcoal-900">{title}</h2>
          <p className="text-sm text-charcoal-500">{subtitle}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function ChatTool() {
  const { navigate } = useRouter();
  const [msgs, setMsgs] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Hi! I’m Aria. I can help with budget, checklists, timelines, colors, vendors, looks, seating, and invitations. What’s on your mind?' },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTimeout(() => setMsgs((m) => [...m, { role: 'ai', text: 'Great question! I’ve noted that. You can explore the dedicated tools in the sidebar for detailed help, or keep chatting here. What else can I help with?' }]), 800);
  };

  return (
    <ToolShell title="Chat with Aria" subtitle="Your 24/7 AI wedding assistant.">
      <div className="h-80 space-y-3 overflow-y-auto rounded-2xl bg-charcoal-50/60 p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${m.role === 'user' ? 'bg-charcoal-900 text-white' : 'bg-white text-charcoal-700 shadow-soft'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-3 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" className="input-field flex-1" />
        <button type="submit" className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient text-charcoal-900"><Send className="h-4 w-4" /></button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {['Plan my budget', 'Suggest a color theme', 'Generate a checklist'].map((p) => (
          <button key={p} onClick={() => send(p)} className="rounded-full bg-blush-50 px-3 py-1.5 text-xs font-medium text-blush-700 hover:bg-blush-100">{p}</button>
        ))}
      </div>
      <Button variant="outline" to="customer-dashboard" className="mt-4">Open in your dashboard</Button>
      {/* keep navigate referenced */}
      <span className="hidden" onClick={() => navigate('home')} />
    </ToolShell>
  );
}

function BudgetTool() {
  const [total, setTotal] = useState(600000);
  const split = [
    { label: 'Venue & Catering', pct: 40, color: 'bg-gold-400' },
    { label: 'Decor & Flowers', pct: 15, color: 'bg-blush-400' },
    { label: 'Photography & Film', pct: 12, color: 'bg-emeraldx-500' },
    { label: 'Attire & Makeup', pct: 13, color: 'bg-charcoal-700' },
    { label: 'Entertainment', pct: 8, color: 'bg-gold-300' },
    { label: 'Travel & Stay', pct: 7, color: 'bg-blush-300' },
    { label: 'Misc / Buffer', pct: 5, color: 'bg-charcoal-400' },
  ];
  return (
    <ToolShell title="AI Budget Planner" subtitle="Enter your total budget — Aria suggests an optimal split.">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">Total budget (₹)</span>
          <input type="number" value={total} onChange={(e) => setTotal(Math.max(0, Number(e.target.value)))} className="input-field" />
        </label>
        <Button variant="gold" icon={RefreshCw}>Recalculate</Button>
      </div>

      <div className="mt-6 flex h-4 w-full overflow-hidden rounded-full">
        {split.map((s) => <div key={s.label} className={s.color} style={{ width: `${s.pct}%` }} />)}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {split.map((s) => (
          <div key={s.label} className="flex items-center justify-between rounded-xl border border-charcoal-100 p-3">
            <div className="flex items-center gap-2.5">
              <span className={`h-3 w-3 rounded-full ${s.color}`} />
              <span className="text-sm text-charcoal-700">{s.label}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-charcoal-900">₹{Math.round((total * s.pct) / 100).toLocaleString('en-IN')}</div>
              <div className="text-xs text-charcoal-400">{s.pct}%</div>
            </div>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function ChecklistTool() {
  const groups = [
    { phase: '12–10 months', items: ['Set the budget', 'Shortlist dates', 'Book planner', 'Reserve venue'] },
    { phase: '9–6 months', items: ['Lock photographer', 'Finalize decor theme', 'Catering tasting', 'Bridal trial'] },
    { phase: '5–3 months', items: ['Boutique fittings', 'Send save-the-dates', 'Finalize menu', 'Book DJ'] },
    { phase: '2–1 months', items: ['Seating plan', 'Rehearsal dinner', 'Confirm vendors', 'Book honeymoon'] },
    { phase: 'Wedding week', items: ['Mehndi & sangeet', 'Ceremony day', 'Reception gala', 'Relax & enjoy'] },
  ];
  const [done, setDone] = useState<Set<string>>(new Set());
  const toggle = (item: string) => setDone((s) => { const n = new Set(s); n.has(item) ? n.delete(item) : n.add(item); return n; });
  const total = groups.reduce((a, g) => a + g.items.length, 0);
  const pct = Math.round((done.size / total) * 100);

  return (
    <ToolShell title="AI Checklist Generator" subtitle="A complete 60-point checklist, personalized to your timeline.">
      <div className="mb-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-charcoal-900">{done.size} of {total} done</span>
          <span className="text-gold-700">{pct}% complete</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-charcoal-100">
          <div className="h-full rounded-full bg-gold-gradient transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="space-y-4">
        {groups.map((g) => (
          <div key={g.phase}>
            <div className="text-xs font-semibold uppercase tracking-wide text-gold-600">{g.phase}</div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {g.items.map((item) => (
                <button key={item} onClick={() => toggle(item)} className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${done.has(item) ? 'border-emeraldx-200 bg-emeraldx-50' : 'border-charcoal-100 bg-white hover:border-charcoal-200'}`}>
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${done.has(item) ? 'bg-emeraldx-500 text-white' : 'border border-charcoal-300'}`}>
                    {done.has(item) && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  <span className={`text-sm ${done.has(item) ? 'text-charcoal-400 line-through' : 'text-charcoal-700'}`}>{item}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function TimelineTool() {
  const events = [
    { month: 'Oct 2026', title: 'Engagement ceremony', type: 'Milestone' },
    { month: 'Nov 2026', title: 'Venue booking & decor trial', type: 'Planning' },
    { month: 'Jan 2027', title: 'Bridal makeup trial', type: 'Bridal' },
    { month: 'Feb 2027', title: 'Save-the-dates sent', type: 'Logistics' },
    { month: 'Apr 2027', title: 'Mehndi & Sangeet', type: 'Celebration' },
    { month: 'Apr 2027', title: 'Wedding ceremony', type: 'The Big Day' },
    { month: 'May 2027', title: 'Reception gala', type: 'Celebration' },
    { month: 'May 2027', title: 'Honeymoon begins', type: 'Travel' },
  ];
  return (
    <ToolShell title="AI Timeline Creator" subtitle="A visual timeline from today to your wedding day.">
      <div className="relative pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-gold-300 via-gold-300 to-transparent" />
        <div className="space-y-5">
          {events.map((e, i) => (
            <div key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="absolute -left-[1.15rem] top-1.5 h-3 w-3 rounded-full border-2 border-gold-400 bg-white" />
              <div className="rounded-xl border border-charcoal-100 bg-white p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gold-600">{e.month}</span>
                  <span className="chip-gold">{e.type}</span>
                </div>
                <div className="mt-1 font-serif text-base text-charcoal-900">{e.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}

function ColorsTool() {
  const palettes = [
    { name: 'Champagne & Blush', colors: ['#F8E8EE', '#D4AF37', '#FFF8F0', '#0F766E'], desc: 'Romantic, timeless, photogenic. Perfect for daytime & marquee weddings.' },
    { name: 'Sunset Rose', colors: ['#E09AAC', '#D4AF37', '#1F2937', '#0F766E'], desc: 'Warm and regal — complements marble architecture and golden hour.' },
    { name: 'Emerald Royale', colors: ['#0F766E', '#D4AF37', '#F8E8EE', '#1F2937'], desc: 'Bold, opulent, heritage. Ideal for palace and fort venues.' },
    { name: 'Ivory Minimal', colors: ['#FFF8F0', '#E5E7EB', '#D4AF37', '#1F2937'], desc: 'Understated luxury. Lets florals and architecture lead.' },
  ];
  return (
    <ToolShell title="AI Color Theme Recommender" subtitle="Palettes matched to your season and venue style.">
      <div className="grid gap-4 sm:grid-cols-2">
        {palettes.map((p) => (
          <div key={p.name} className="rounded-2xl border border-charcoal-100 p-4 shadow-soft transition-all hover:shadow-card">
            <div className="flex gap-2">
              {p.colors.map((c) => <div key={c} className="h-12 flex-1 rounded-lg" style={{ backgroundColor: c }} />)}
            </div>
            <h3 className="mt-3 font-serif text-base text-charcoal-900">{p.name}</h3>
            <p className="mt-1 text-xs text-charcoal-500">{p.desc}</p>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function VendorsTool() {
  const { navigate } = useRouter();
  return (
    <ToolShell title="AI Vendor Recommendations" subtitle="Smart matches based on your budget, city, and style.">
      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICE_CATEGORIES.slice(0, 6).map((s) => (
          <div key={s.slug} className="flex items-center gap-4 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-soft">
            <img src={s.image} alt={s.title} className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="font-serif text-base text-charcoal-900">{s.title}</div>
              <div className="text-xs text-charcoal-500">{s.vendors} matches · from ₹{s.startingPrice.toLocaleString('en-IN')}</div>
              <div className="mt-1.5 flex items-center gap-1 text-xs text-emeraldx-600"><Sparkles className="h-3 w-3" /> 98% style match</div>
            </div>
            <Button variant="ghost" to="services" className="!px-2 text-gold-700"><ArrowRight className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
      <Button variant="outline" to="services" className="mt-5">Browse all vendors</Button>
      <span className="hidden" onClick={() => navigate('home')} />
    </ToolShell>
  );
}

function LooksTool() {
  const looks = [
    { name: 'The Royal Bride', desc: 'Traditional red & gold, statement polki, bold liner', image: IMAGES.brideJewelry },
    { name: 'Soft Glam', desc: 'Dewy skin, nude tones, flutter lashes, loose waves', image: IMAGES.brideEarring },
    { name: 'Modern Ivory', desc: 'Minimal lace, pearl accents, natural flush', image: IMAGES.brideTiara },
  ];
  return (
    <ToolShell title="AI Bridal Look Suggestions" subtitle="Looks matched to your features, outfit, and venue lighting.">
      <div className="grid gap-4 sm:grid-cols-3">
        {looks.map((l) => (
          <div key={l.name} className="group overflow-hidden rounded-2xl border border-charcoal-100 shadow-soft transition-all hover:shadow-luxe">
            <div className="relative h-56 overflow-hidden">
              <img src={l.image} alt={l.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gold-700 backdrop-blur">AI pick</span>
            </div>
            <div className="p-4">
              <h3 className="font-serif text-base text-charcoal-900">{l.name}</h3>
              <p className="mt-1 text-xs text-charcoal-500">{l.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function SeatingTool() {
  const tables = [
    { name: 'Table 1 — Head', seats: 8, filled: 8 },
    { name: 'Table 2 — Family', seats: 10, filled: 9 },
    { name: 'Table 3 — Friends', seats: 10, filled: 10 },
    { name: 'Table 4 — Friends', seats: 10, filled: 7 },
    { name: 'Table 5 — Colleagues', seats: 10, filled: 8 },
    { name: 'Table 6 — Extended', seats: 10, filled: 6 },
  ];
  return (
    <ToolShell title="AI Seating Planner" subtitle="Drag-free smart seating — balanced tables, no awkward pairings.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((t) => (
          <div key={t.name} className="rounded-2xl border border-charcoal-100 bg-white p-4 text-center shadow-soft">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-gold-200 bg-gold-50">
              <div>
                <div className="font-serif text-2xl text-charcoal-900">{t.filled}/{t.seats}</div>
                <div className="text-[10px] text-charcoal-500">seated</div>
              </div>
            </div>
            <div className="mt-3 text-sm font-semibold text-charcoal-900">{t.name}</div>
            <div className="text-xs text-charcoal-400">{t.seats - t.filled} seats open</div>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function InvitationsTool() {
  const [generated, setGenerated] = useState(false);
  const draft = `Together with their families,\nAanya Sharma\n&\nVivaan Kapoor\nrequest the pleasure of your company\nat their wedding celebration\n\nSaturday, the 18th of April, 2026\nat six o'clock in the evening\n\nThe Grand Palace, Udaipur\n\nReception to follow · Black tie`;
  return (
    <ToolShell title="AI Invitation Generator" subtitle="Generate elegant invitation copy in seconds.">
      {!generated ? (
        <div className="text-center">
          <p className="text-sm text-charcoal-500">Aria will draft a formal invitation using your names, date, and venue. Click below to generate a sample.</p>
          <Button variant="gold" onClick={() => setGenerated(true)} icon={Sparkles} className="mt-5">Generate invitation</Button>
        </div>
      ) : (
        <div className="animate-scale-in">
          <div className="rounded-2xl border-2 border-gold-200 bg-gradient-to-b from-gold-50 to-white p-6 text-center">
            <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-charcoal-800">{draft}</pre>
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="gold" icon={RefreshCw} onClick={() => setGenerated(false)}>Regenerate</Button>
            <Button variant="outline" icon={Check}>Save to dashboard</Button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
