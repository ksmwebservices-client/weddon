import { useState } from 'react';
import {
  LayoutDashboard, CalendarCheck, ListChecks, Wallet, FileText, Bell,
  Heart, Sparkles, MessageSquare, CheckCircle2, Clock, Upload, Download,
  TrendingUp, ArrowRight, Star,
} from 'lucide-react';
import { DashboardShell, DashboardHeader, StatCard, Card, type NavItem } from '@/components/dashboards/DashboardShell';
import { useRouter } from '@/lib/router';
import { IMAGES, PACKAGES, MOBILE_NAV_CUSTOMER } from '@/data/content';
import { DashboardBottomNav } from '@/components/Layout';

const NAV: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, key: 'overview' },
  { label: 'Bookings', icon: CalendarCheck, key: 'bookings' },
  { label: 'Wedding Checklist', icon: ListChecks, key: 'checklist' },
  { label: 'Event Timeline', icon: Clock, key: 'timeline' },
  { label: 'Payments', icon: Wallet, key: 'payments' },
  { label: 'Document Vault', icon: FileText, key: 'documents' },
  { label: 'Notifications', icon: Bell, key: 'notifications' },
  { label: 'Wishlist', icon: Heart, key: 'wishlist' },
  { label: 'AI Planner', icon: Sparkles, key: 'ai' },
  { label: 'Chat Support', icon: MessageSquare, key: 'support' },
];

export function CustomerDashboard() {
  const [active, setActive] = useState('overview');

  return (
    <DashboardShell nav={NAV} active={active} setActive={setActive} brand="Weddon" brandSub="Customer Portal" bottomNav={<DashboardBottomNav items={MOBILE_NAV_CUSTOMER} active={active} onSelect={setActive} />}>
      {active === 'overview' && <Overview />}
      {active === 'bookings' && <Bookings />}
      {active === 'checklist' && <Checklist />}
      {active === 'timeline' && <Timeline />}
      {active === 'payments' && <Payments />}
      {active === 'documents' && <Documents />}
      {active === 'notifications' && <Notifications />}
      {active === 'wishlist' && <Wishlist />}
      {active === 'ai' && <AISection />}
      {active === 'support' && <Support />}
      {active === 'account' && <Account />}
    </DashboardShell>
  );
}

function Account() {
  const { navigate } = useRouter();
  return (
    <>
      <DashboardHeader title="My Profile" subtitle="Manage your account details." action={<button onClick={() => navigate('home')} className="btn-outline">Sign out</button>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient text-2xl font-bold text-charcoal-900">A</div>
            <h3 className="mt-3 font-serif text-xl text-charcoal-900">Aanya Sharma</h3>
            <div className="text-xs text-charcoal-400">aanya@email.com</div>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-blush-50 px-3 py-1 text-xs font-semibold text-blush-700">Aura Package</span>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <h3 className="font-serif text-lg text-charcoal-900">Account details</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[{ label: 'Full name', value: 'Aanya Sharma' }, { label: 'Email', value: 'aanya@email.com' }, { label: 'Phone', value: '+91 98765 43210' }, { label: 'City', value: 'Mumbai' }].map((f) => (
              <label key={f.label} className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">{f.label}</span><input className="input-field" defaultValue={f.value} /></label>
            ))}
          </div>
          <button className="mt-4 btn-gold">Save changes</button>
        </Card>
      </div>
    </>
  );
}

function Overview() {
  const { navigate } = useRouter();
  const pkg = PACKAGES[1];
  const tasks = [
    { label: 'Book venue', done: true },
    { label: 'Lock photographer', done: true },
    { label: 'Catering tasting', done: true },
    { label: 'Bridal makeup trial', done: false },
    { label: 'Finalize decor theme', done: false },
    { label: 'Send save-the-dates', done: false },
  ];
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <>
      <DashboardHeader
        title="Welcome back, Aanya"
        subtitle="Your wedding is in 187 days. Here’s where things stand."
        action={<button onClick={() => navigate('ai-planner')} className="btn-gold"><Sparkles className="h-4 w-4" /> Ask Aria</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Clock} label="Days to wedding" value="187" change="On track" accent="gold" />
        <StatCard icon={CheckCircle2} label="Checklist progress" value="58%" change="+12%" accent="emerald" />
        <StatCard icon={Wallet} label="Budget used" value="₹2.1L" change="35%" accent="blush" />
        <StatCard icon={CalendarCheck} label="Vendors booked" value="9 / 12" accent="charcoal" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Wedding project card */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gold-600">Your package</div>
              <h3 className="mt-1 font-serif text-2xl text-charcoal-900">{pkg.name} — {pkg.tagline}</h3>
            </div>
            <span className="chip-gold">Active</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div><div className="text-xs text-charcoal-400">Wedding date</div><div className="font-semibold text-charcoal-900">Apr 18, 2027</div></div>
            <div><div className="text-xs text-charcoal-400">Venue</div><div className="font-semibold text-charcoal-900">The Grand Palace, Udaipur</div></div>
            <div><div className="text-xs text-charcoal-400">Guests</div><div className="font-semibold text-charcoal-900">280</div></div>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm"><span className="text-charcoal-600">Overall progress</span><span className="font-semibold text-charcoal-900">58%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-charcoal-100"><div className="h-full rounded-full bg-gold-gradient" style={{ width: '58%' }} /></div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => navigate('packages')} className="btn-outline !py-2 text-xs">View package</button>
            <button onClick={() => navigate('contact')} className="btn-ghost !py-2 text-xs">Request change</button>
          </div>
        </Card>

        {/* Checklist preview */}
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-charcoal-900">Checklist</h3>
            <span className="text-xs text-charcoal-400">{doneCount}/{tasks.length}</span>
          </div>
          <div className="mt-4 space-y-2.5">
            {tasks.map((t) => (
              <div key={t.label} className="flex items-center gap-2.5">
                <span className={`flex h-5 w-5 items-center justify-center rounded-md ${t.done ? 'bg-emeraldx-500 text-white' : 'border border-charcoal-300'}`}>
                  {t.done && <CheckCircle2 className="h-3 w-3" />}
                </span>
                <span className={`text-sm ${t.done ? 'text-charcoal-400 line-through' : 'text-charcoal-700'}`}>{t.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Upcoming + payments */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-serif text-lg text-charcoal-900">Upcoming milestones</h3>
          <div className="mt-4 space-y-3">
            {[
              { date: 'Dec 12', title: 'Bridal makeup trial', type: 'Bridal' },
              { date: 'Jan 05', title: 'Decor final walkthrough', type: 'Planning' },
              { date: 'Feb 20', title: 'Save-the-dates deadline', type: 'Logistics' },
            ].map((m) => (
              <div key={m.title} className="flex items-center gap-4 rounded-xl border border-charcoal-100 p-3">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                  <span className="text-[10px] uppercase">{m.date.split(' ')[0]}</span>
                  <span className="font-serif text-base leading-none">{m.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-charcoal-900">{m.title}</div>
                  <div className="text-xs text-charcoal-400">{m.type}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-charcoal-900">Payment tracking</h3>
            <TrendingUp className="h-5 w-5 text-emeraldx-600" />
          </div>
          <div className="mt-4 space-y-3">
            {[
              { label: 'Booking advance (25%)', amount: '₹1,06,250', status: 'Paid' },
              { label: 'Mid payment (50%)', amount: '₹2,12,500', status: 'Due Jan 18' },
              { label: 'Final balance (25%)', amount: '₹1,06,250', status: 'Due Apr 11' },
            ].map((p) => (
              <div key={p.label} className="flex items-center justify-between rounded-xl border border-charcoal-100 p-3">
                <div>
                  <div className="text-sm font-medium text-charcoal-700">{p.label}</div>
                  <div className="text-xs text-charcoal-400">{p.amount}</div>
                </div>
                <span className={`chip ${p.status === 'Paid' ? '!bg-emeraldx-100 !text-emeraldx-700' : ''}`}>{p.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-charcoal-100"><div className="h-full rounded-full bg-emeraldx-500" style={{ width: '25%' }} /></div>
        </Card>
      </div>
    </>
  );
}

function Bookings() {
  const bookings = [
    { id: 'b1', vendor: 'Aria Studios', service: 'Photography', date: 'Apr 18–20, 2027', status: 'Confirmed', amount: '₹85,000' },
    { id: 'b2', vendor: 'Lustre Bridal', service: 'Bridal Makeover', date: 'Apr 18, 2027', status: 'Confirmed', amount: '₹28,000' },
    { id: 'b3', vendor: 'Verdant Florals', service: 'Decoration', date: 'Apr 17–19, 2027', status: 'Pending', amount: '₹1,20,000' },
    { id: 'b4', vendor: 'Saffron Platter', service: 'Catering', date: 'Apr 18, 2027', status: 'Confirmed', amount: '₹2,38,000' },
    { id: 'b5', vendor: 'Pulse Nights', service: 'DJ & Entertainment', date: 'Apr 18, 2027', status: 'Pending', amount: '₹42,000' },
  ];
  return (
    <>
      <DashboardHeader title="Bookings" subtitle="All your vendor bookings in one place." />
      <div className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-charcoal-100 bg-charcoal-50/50 text-left text-xs uppercase tracking-wide text-charcoal-500">
              <tr><th className="p-4">Vendor</th><th className="p-4">Service</th><th className="p-4">Date</th><th className="p-4">Amount</th><th className="p-4">Status</th></tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-charcoal-50 last:border-0 hover:bg-charcoal-50/30">
                  <td className="p-4 font-medium text-charcoal-900">{b.vendor}</td>
                  <td className="p-4 text-charcoal-600">{b.service}</td>
                  <td className="p-4 text-charcoal-600">{b.date}</td>
                  <td className="p-4 font-semibold text-charcoal-900">{b.amount}</td>
                  <td className="p-4"><span className={b.status === 'Confirmed' ? 'chip-emerald' : 'chip-gold'}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Checklist() {
  const groups = [
    { phase: '12–10 months out', items: ['Set the budget', 'Shortlist dates', 'Book planner', 'Reserve venue'] },
    { phase: '9–6 months out', items: ['Lock photographer', 'Finalize decor theme', 'Catering tasting', 'Bridal trial'] },
    { phase: '5–3 months out', items: ['Boutique fittings', 'Send save-the-dates', 'Finalize menu', 'Book DJ'] },
    { phase: '2–1 months out', items: ['Seating plan', 'Rehearsal dinner', 'Confirm vendors', 'Book honeymoon'] },
    { phase: 'Wedding week', items: ['Mehndi & sangeet', 'Ceremony day', 'Reception gala', 'Relax & enjoy'] },
  ];
  const [done, setDone] = useState<Set<string>>(new Set(['Set the budget', 'Shortlist dates', 'Book planner', 'Reserve venue', 'Lock photographer', 'Finalize decor theme', 'Catering tasting']));
  const toggle = (i: string) => setDone((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const total = groups.reduce((a, g) => a + g.items.length, 0);
  const pct = Math.round((done.size / total) * 100);
  return (
    <>
      <DashboardHeader title="Wedding Checklist" subtitle="Track every task — powered by Aria." />
      <Card className="mb-6">
        <div className="flex items-center justify-between text-sm"><span className="font-semibold text-charcoal-900">{done.size} of {total} complete</span><span className="text-gold-700">{pct}%</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-charcoal-100"><div className="h-full rounded-full bg-gold-gradient transition-all" style={{ width: `${pct}%` }} /></div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map((g) => (
          <Card key={g.phase}>
            <div className="text-xs font-semibold uppercase tracking-wide text-gold-600">{g.phase}</div>
            <div className="mt-3 space-y-2">
              {g.items.map((item) => (
                <button key={item} onClick={() => toggle(item)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${done.has(item) ? 'border-emeraldx-200 bg-emeraldx-50' : 'border-charcoal-100 hover:border-charcoal-200'}`}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-md ${done.has(item) ? 'bg-emeraldx-500 text-white' : 'border border-charcoal-300'}`}>{done.has(item) && <CheckCircle2 className="h-3 w-3" />}</span>
                  <span className={`text-sm ${done.has(item) ? 'text-charcoal-400 line-through' : 'text-charcoal-700'}`}>{item}</span>
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function Timeline() {
  const events = [
    { time: '4:00 PM', title: 'Baraat arrival', venue: 'Grand Palace Lawn' },
    { time: '5:30 PM', title: 'Jaimala (garland exchange)', venue: 'Main Mandap' },
    { time: '7:00 PM', title: 'Pheras & vows', venue: 'Main Mandap' },
    { time: '9:00 PM', title: 'Dinner & live counters', venue: 'Banquet Hall' },
    { time: '10:30 PM', title: 'First dance & reception', venue: 'Grand Ballroom' },
    { time: '11:30 PM', title: 'DJ set & celebrations', venue: 'Grand Ballroom' },
  ];
  return (
    <>
      <DashboardHeader title="Event Timeline" subtitle="Your wedding day, minute by minute." />
      <Card>
        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-gold-300 to-transparent" />
          <div className="space-y-5">
            {events.map((e, i) => (
              <div key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="absolute -left-[1.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-gold-400 bg-white" />
                <div className="flex items-center justify-between rounded-xl border border-charcoal-100 p-4">
                  <div>
                    <div className="text-xs font-semibold text-gold-600">{e.time}</div>
                    <div className="font-serif text-base text-charcoal-900">{e.title}</div>
                    <div className="text-xs text-charcoal-400">{e.venue}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}

function Payments() {
  const payments = [
    { id: 'p1', label: 'Booking advance', date: 'Aug 02, 2026', amount: '₹1,06,250', method: 'UPI', status: 'Paid' },
    { id: 'p2', label: 'Photography deposit', date: 'Sep 14, 2026', amount: '₹25,000', method: 'Card', status: 'Paid' },
    { id: 'p3', label: 'Bridal makeover deposit', date: 'Oct 01, 2026', amount: '₹8,000', method: 'Net banking', status: 'Paid' },
    { id: 'p4', label: 'Mid payment', date: 'Jan 18, 2027', amount: '₹2,12,500', method: '—', status: 'Upcoming' },
    { id: 'p5', label: 'Final balance', date: 'Apr 11, 2027', amount: '₹1,06,250', method: '—', status: 'Upcoming' },
  ];
  const paid = payments.filter((p) => p.status === 'Paid').reduce((a, p) => a + Number(p.amount.replace(/[^0-9]/g, '')), 0);
  return (
    <>
      <DashboardHeader title="Payments" subtitle="Track every installment and invoice." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Total paid" value={`₹${(paid / 100000).toFixed(1)}L`} accent="emerald" />
        <StatCard icon={Clock} label="Upcoming" value="₹3.18L" accent="gold" />
        <StatCard icon={TrendingUp} label="Budget used" value="35%" accent="blush" />
      </div>
      <Card className="mt-6">
        <h3 className="font-serif text-lg text-charcoal-900">Payment history</h3>
        <div className="mt-4 space-y-2">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-charcoal-100 p-4">
              <div>
                <div className="text-sm font-semibold text-charcoal-900">{p.label}</div>
                <div className="text-xs text-charcoal-400">{p.date} · {p.method}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-charcoal-900">{p.amount}</span>
                <span className={p.status === 'Paid' ? 'chip-emerald' : 'chip-gold'}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Documents() {
  const docs = [
    { name: 'Wedding contract.pdf', size: '2.4 MB', date: 'Aug 02, 2026' },
    { name: 'Venue booking receipt.pdf', size: '1.1 MB', date: 'Aug 15, 2026' },
    { name: 'Photography agreement.pdf', size: '3.2 MB', date: 'Sep 14, 2026' },
    { name: 'Bridal trial photos.zip', size: '48 MB', date: 'Dec 12, 2026' },
    { name: 'Guest list.xlsx', size: '420 KB', date: 'Jan 05, 2027' },
  ];
  return (
    <>
      <DashboardHeader title="Document Vault" subtitle="All your wedding documents, secure in one place." action={<button className="btn-gold"><Upload className="h-4 w-4" /> Upload</button>} />
      <Card>
        <div className="space-y-2">
          {docs.map((d) => (
            <div key={d.name} className="flex items-center justify-between rounded-xl border border-charcoal-100 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blush-100 text-blush-700"><FileText className="h-5 w-5" /></div>
                <div>
                  <div className="text-sm font-semibold text-charcoal-900">{d.name}</div>
                  <div className="text-xs text-charcoal-400">{d.size} · {d.date}</div>
                </div>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg text-charcoal-500 hover:bg-charcoal-100"><Download className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Notifications() {
  const notifs = [
    { icon: CheckCircle2, title: 'Aria Studios confirmed your booking', time: '2h ago', color: 'emerald' },
    { icon: Bell, title: 'Bridal makeup trial reminder — Dec 12', time: '5h ago', color: 'gold' },
    { icon: Wallet, title: 'Mid payment due in 38 days', time: '1d ago', color: 'blush' },
    { icon: Sparkles, title: 'Aria generated 3 new bridal look suggestions', time: '2d ago', color: 'gold' },
    { icon: Star, title: 'Verdant Florals left you a message', time: '3d ago', color: 'charcoal' },
  ];
  return (
    <>
      <DashboardHeader title="Notifications" subtitle="Stay on top of every update." />
      <Card>
        <div className="space-y-2">
          {notifs.map((n, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-charcoal-100 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${n.color === 'emerald' ? 'bg-emeraldx-100 text-emeraldx-700' : n.color === 'gold' ? 'bg-gold-100 text-gold-700' : n.color === 'blush' ? 'bg-blush-100 text-blush-700' : 'bg-charcoal-100 text-charcoal-700'}`}>
                <n.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-charcoal-900">{n.title}</div>
                <div className="text-xs text-charcoal-400">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Wishlist() {
  const items = [
    { name: 'Polki Heritage Set', price: '₹3,200/day', image: IMAGES.jewelryGold },
    { name: 'Ivory Lace Gown', price: '₹78,000', image: IMAGES.brideLace },
    { name: 'Crimson Bridal Lehenga', price: '₹1,45,000', image: IMAGES.brideJewelry },
    { name: 'Pearl Tiara Dress', price: '₹92,000', image: IMAGES.brideTiara },
  ];
  return (
    <>
      <DashboardHeader title="Wishlist" subtitle="Pieces you’ve saved from the boutique and rentals." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.name} className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft">
            <div className="relative h-40 overflow-hidden"><img src={i.image} alt={i.name} className="h-full w-full object-cover" /><Heart className="absolute right-3 top-3 h-5 w-5 fill-blush-500 text-blush-500" /></div>
            <div className="p-4"><div className="font-serif text-sm text-charcoal-900">{i.name}</div><div className="mt-1 text-xs text-gold-700">{i.price}</div></div>
          </div>
        ))}
      </div>
    </>
  );
}

function AISection() {
  const { navigate } = useRouter();
  return (
    <>
      <DashboardHeader title="AI Wedding Planner" subtitle="Aria is ready to help with every detail." action={<button onClick={() => navigate('ai-planner')} className="btn-gold">Open full planner <ArrowRight className="h-4 w-4" /></button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Wallet, label: 'Budget Planner' },
          { icon: ListChecks, label: 'Checklist' },
          { icon: Sparkles, label: 'Color Themes' },
          { icon: Heart, label: 'Bridal Looks' },
        ].map((t) => (
          <button key={t.label} onClick={() => navigate('ai-planner')} className="flex items-center gap-3 rounded-2xl border border-charcoal-100 bg-white p-5 text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700"><t.icon className="h-5 w-5" /></div>
            <span className="text-sm font-semibold text-charcoal-900">{t.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function Support() {
  return (
    <>
      <DashboardHeader title="Chat Support" subtitle="Talk to your planner or Aria, anytime." />
      <Card>
        <div className="h-80 space-y-3 overflow-y-auto rounded-2xl bg-charcoal-50/60 p-4">
          <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm text-charcoal-700 shadow-soft">Hi Aanya! I’m Priya, your dedicated planner. How can I help today?</div></div>
          <div className="flex justify-end"><div className="max-w-[80%] rounded-2xl rounded-br-md bg-charcoal-900 px-3.5 py-2.5 text-sm text-white">Hi Priya — can we move the decor walkthrough to Jan 8?</div></div>
          <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm text-charcoal-700 shadow-soft">Of course! I’ll check with Verdant Florals and confirm by tomorrow morning. Anything else?</div></div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex gap-2">
          <input placeholder="Type a message…" className="input-field flex-1" />
          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient text-charcoal-900"><ArrowRight className="h-4 w-4" /></button>
        </form>
      </Card>
    </>
  );
}
