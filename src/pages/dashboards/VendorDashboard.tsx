import { useState } from 'react';
import {
  LayoutDashboard, User, Images, CalendarDays, CheckCircle2, FileText,
  Wallet, Star, BarChart3, TrendingUp, Eye, MessageSquare, ArrowRight,
  DollarSign, Clock, Briefcase,
} from 'lucide-react';
import { DashboardShell, DashboardHeader, StatCard, Card, type NavItem } from '@/components/dashboards/DashboardShell';
import { IMAGES, MOBILE_NAV_VENDOR } from '@/data/content';
import { DashboardBottomNav } from '@/components/Layout';

const NAV: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, key: 'overview' },
  { label: 'Profile', icon: User, key: 'profile' },
  { label: 'Portfolio', icon: Images, key: 'portfolio' },
  { label: 'Booking Calendar', icon: CalendarDays, key: 'calendar' },
  { label: 'Availability', icon: CheckCircle2, key: 'availability' },
  { label: 'Quotations', icon: FileText, key: 'quotations' },
  { label: 'Payouts', icon: Wallet, key: 'payouts' },
  { label: 'Reviews', icon: Star, key: 'reviews' },
  { label: 'Analytics', icon: BarChart3, key: 'analytics' },
];

export function VendorDashboard() {
  const [active, setActive] = useState('overview');
  return (
    <DashboardShell nav={NAV} active={active} setActive={setActive} brand="Weddon" brandSub="Vendor Portal" bottomNav={<DashboardBottomNav items={MOBILE_NAV_VENDOR} active={active} onSelect={setActive} />}>
      {active === 'overview' && <Overview />}
      {active === 'profile' && <Profile />}
      {active === 'portfolio' && <Portfolio />}
      {active === 'calendar' && <Calendar />}
      {active === 'availability' && <Availability />}
      {active === 'quotations' && <Quotations />}
      {active === 'payouts' && <Payouts />}
      {active === 'reviews' && <Reviews />}
      {active === 'analytics' && <Analytics />}
    </DashboardShell>
  );
}

function Overview() {
  return (
    <>
      <DashboardHeader title="Aria Studios" subtitle="Photography · Mumbai · Verified vendor" action={<button className="btn-gold"><Briefcase className="h-4 w-4" /> New quote</button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Briefcase} label="Active bookings" value="14" change="+3" accent="gold" />
        <StatCard icon={DollarSign} label="Revenue (YTD)" value="₹18.4L" change="+22%" accent="emerald" />
        <StatCard icon={Star} label="Avg. rating" value="4.9" change="312 reviews" accent="blush" />
        <StatCard icon={Eye} label="Profile views" value="2,840" change="+18%" accent="charcoal" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-charcoal-900">Revenue trend</h3>
            <TrendingUp className="h-5 w-5 text-emeraldx-600" />
          </div>
          <BarChart data={[12, 18, 15, 22, 28, 24, 32, 30, 38]} labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']} />
        </Card>
        <Card>
          <h3 className="font-serif text-lg text-charcoal-900">Upcoming jobs</h3>
          <div className="mt-4 space-y-3">
            {[
              { couple: 'Aanya & Vivaan', date: 'Apr 18', city: 'Udaipur' },
              { couple: 'Meera & Arjun', date: 'May 02', city: 'Jaipur' },
              { couple: 'Sara & Imran', date: 'May 20', city: 'Hyderabad' },
            ].map((j) => (
              <div key={j.couple} className="flex items-center gap-3 rounded-xl border border-charcoal-100 p-3">
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-gold-50 text-gold-700"><span className="text-[9px] uppercase">Apr</span><span className="font-serif text-sm leading-none">{j.date.split(' ')[1]}</span></div>
                <div className="flex-1"><div className="text-sm font-semibold text-charcoal-900">{j.couple}</div><div className="text-xs text-charcoal-400">{j.city}</div></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-serif text-lg text-charcoal-900">Recent enquiries</h3>
          <div className="mt-4 space-y-2">
            {[
              { name: 'Ishita', msg: 'Interested in candid + film for Dec wedding', time: '1h ago' },
              { name: 'Rohan', msg: 'Are you available Feb 14 in Goa?', time: '4h ago' },
              { name: 'Neha', msg: 'Quote for 2-day destination wedding', time: '1d ago' },
            ].map((e) => (
              <div key={e.name} className="flex items-start gap-3 rounded-xl border border-charcoal-100 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-900 text-sm font-bold text-gold-400">{e.name[0]}</div>
                <div className="flex-1"><div className="text-sm font-medium text-charcoal-900">{e.name}</div><div className="text-xs text-charcoal-500">{e.msg}</div><div className="text-[10px] text-charcoal-400">{e.time}</div></div>
                <button className="text-xs font-semibold text-gold-700">Reply</button>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-serif text-lg text-charcoal-900">Payout summary</h3>
          <div className="mt-4 space-y-2">
            {[{ label: 'Available to withdraw', value: '₹2,84,000', status: 'Ready' }, { label: 'In escrow', value: '₹1,20,000', status: 'Pending' }, { label: 'This month', value: '₹3,40,000', status: 'Paid' }].map((p) => (
              <div key={p.label} className="flex items-center justify-between rounded-xl border border-charcoal-100 p-3">
                <div><div className="text-sm font-medium text-charcoal-700">{p.label}</div><div className="text-xs text-charcoal-400">{p.value}</div></div>
                <span className={p.status === 'Ready' ? 'chip-emerald' : p.status === 'Pending' ? 'chip-gold' : 'chip'}>{p.status}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 btn-gold w-full">Withdraw ₹2,84,000</button>
        </Card>
      </div>
    </>
  );
}

function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data);
  return (
    <div className="mt-4">
      <div className="flex h-40 items-end gap-2">
        {data.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-end justify-center" style={{ height: '140px' }}>
              <div className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-gold-500 to-gold-300 transition-all hover:from-gold-600 hover:to-gold-400" style={{ height: `${(v / max) * 100}%` }} />
            </div>
            <span className="text-[10px] text-charcoal-400">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  return (
    <>
      <DashboardHeader title="Profile Management" subtitle="Your public vendor profile — keep it polished." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-gold-100"><img src={IMAGES.coupleVeil} alt="" className="h-full w-full object-cover" /></div>
            <h3 className="mt-3 font-serif text-xl text-charcoal-900">Aria Studios</h3>
            <div className="text-xs text-gold-600">Photography · Mumbai</div>
            <div className="mt-2 flex items-center justify-center gap-1"><Star className="h-4 w-4 fill-gold-400 text-gold-400" /><span className="text-sm font-semibold text-charcoal-900">4.9</span><span className="text-xs text-charcoal-400">(312)</span></div>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-emeraldx-100 px-3 py-1 text-xs font-semibold text-emeraldx-700"><CheckCircle2 className="h-3.5 w-3.5" /> Verified</span>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <h3 className="font-serif text-lg text-charcoal-900">Business details</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[{ label: 'Business name', value: 'Aria Studios' }, { label: 'Category', value: 'Photography' }, { label: 'City', value: 'Mumbai' }, { label: 'Starting price', value: '₹65,000' }, { label: 'Team size', value: '12' }, { label: 'Years active', value: '8' }].map((f) => (
              <label key={f.label} className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">{f.label}</span><input className="input-field" defaultValue={f.value} /></label>
            ))}
          </div>
          <label className="mt-4 block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">About</span><textarea className="input-field min-h-[80px] resize-none" defaultValue="Cinematic candid photography and film coverage across India and destination weddings. 300+ weddings captured." /></label>
          <div className="mt-4 flex gap-3"><button className="btn-gold">Save changes</button><button className="btn-outline">Cancel</button></div>
        </Card>
      </div>
    </>
  );
}

function Portfolio() {
  const shots = [IMAGES.coupleVeil, IMAGES.coupleEmbrace, IMAGES.coupleSunny, IMAGES.couplePark, IMAGES.coupleOcean, IMAGES.coupleGarden, IMAGES.coupleSofa, IMAGES.coupleSmiling];
  return (
    <>
      <DashboardHeader title="Portfolio" subtitle="Showcase your best work — couples browse these first." action={<button className="btn-gold"><Images className="h-4 w-4" /> Add photos</button>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shots.map((s, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl border border-charcoal-100 shadow-soft">
            <img src={s} alt="" className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-48" />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal-900/0 opacity-0 transition-all group-hover:bg-charcoal-900/40 group-hover:opacity-100">
              <button className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-charcoal-900">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Calendar() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  const booked = new Set([4, 11, 17, 18, 24, 28]);
  return (
    <>
      <DashboardHeader title="Booking Calendar" subtitle="April 2027 — your scheduled jobs." />
      <Card>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-charcoal-400">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="py-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            const valid = d > 0 && d <= 30;
            const isBooked = booked.has(d);
            return (
              <div key={i} className={`aspect-square rounded-xl border p-1.5 text-left text-xs transition-all ${!valid ? 'border-transparent text-charcoal-200' : isBooked ? 'border-gold-300 bg-gold-50 text-charcoal-900' : 'border-charcoal-100 text-charcoal-600 hover:border-charcoal-200'}`}>
                {valid && <div className="font-semibold">{d}</div>}
                {isBooked && <div className="mt-1 truncate text-[10px] text-gold-700">Aanya & Vivaan</div>}
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

function Availability() {
  const slots = ['Morning', 'Afternoon', 'Evening'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [grid, setGrid] = useState<Record<string, boolean>>({ 'Sat-Evening': true, 'Sun-Morning': true });
  const toggle = (key: string) => setGrid((g) => { const n = { ...g }; n[key] = !n[key]; return n; });
  return (
    <>
      <DashboardHeader title="Availability" subtitle="Mark when you’re open to take bookings." />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead><tr><th className="p-3 text-left text-xs uppercase text-charcoal-400"></th>{slots.map((s) => <th key={s} className="p-3 text-center text-xs uppercase text-charcoal-400">{s}</th>)}</tr></thead>
            <tbody>
              {days.map((d) => (
                <tr key={d}>
                  <td className="p-3 text-sm font-medium text-charcoal-700">{d}</td>
                  {slots.map((s) => {
                    const key = `${d}-${s}`;
                    const on = grid[key];
                    return <td key={s} className="p-3 text-center"><button onClick={() => toggle(key)} className={`h-9 w-9 rounded-lg transition-all ${on ? 'bg-emeraldx-500 text-white' : 'bg-charcoal-100 text-charcoal-300 hover:bg-charcoal-200'}`}><CheckCircle2 className="mx-auto h-4 w-4" /></button></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function Quotations() {
  const quotes = [
    { id: 'q1', couple: 'Ishita & Kabir', event: 'Beach wedding, Goa', amount: '₹95,000', status: 'Sent', date: 'Dec 02' },
    { id: 'q2', couple: 'Rohan & Diya', event: '2-day destination, Udaipur', amount: '₹1,80,000', status: 'Accepted', date: 'Nov 28' },
    { id: 'q3', couple: 'Neha & Aman', event: 'Reception only, Mumbai', amount: '₹52,000', status: 'Draft', date: 'Dec 04' },
    { id: 'q4', couple: 'Tara & Dev', event: 'Pre-wedding + wedding', amount: '₹1,20,000', status: 'Sent', date: 'Dec 01' },
  ];
  return (
    <>
      <DashboardHeader title="Quotations" subtitle="Send and track quotes to couples." action={<button className="btn-gold"><FileText className="h-4 w-4" /> New quotation</button>} />
      <div className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-charcoal-100 bg-charcoal-50/50 text-left text-xs uppercase text-charcoal-500"><tr><th className="p-4">Couple</th><th className="p-4">Event</th><th className="p-4">Amount</th><th className="p-4">Date</th><th className="p-4">Status</th></tr></thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-b border-charcoal-50 last:border-0 hover:bg-charcoal-50/30">
                <td className="p-4 font-medium text-charcoal-900">{q.couple}</td>
                <td className="p-4 text-charcoal-600">{q.event}</td>
                <td className="p-4 font-semibold text-charcoal-900">{q.amount}</td>
                <td className="p-4 text-charcoal-500">{q.date}</td>
                <td className="p-4"><span className={q.status === 'Accepted' ? 'chip-emerald' : q.status === 'Draft' ? 'chip' : 'chip-gold'}>{q.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Payouts() {
  const payouts = [
    { id: 'po1', label: 'Withdrawal to bank', date: 'Dec 01, 2026', amount: '₹2,40,000', status: 'Paid' },
    { id: 'po2', label: 'Withdrawal to bank', date: 'Nov 01, 2026', amount: '₹1,80,000', status: 'Paid' },
    { id: 'po3', label: 'Withdrawal to bank', date: 'Oct 01, 2026', amount: '₹2,10,000', status: 'Paid' },
  ];
  return (
    <>
      <DashboardHeader title="Payouts" subtitle="Your earnings, paid out monthly." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Available" value="₹2.84L" accent="emerald" />
        <StatCard icon={Clock} label="In escrow" value="₹1.20L" accent="gold" />
        <StatCard icon={DollarSign} label="Total earned" value="₹18.4L" change="+22%" accent="blush" />
      </div>
      <Card className="mt-6">
        <h3 className="font-serif text-lg text-charcoal-900">Payout history</h3>
        <div className="mt-4 space-y-2">
          {payouts.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-charcoal-100 p-4">
              <div><div className="text-sm font-semibold text-charcoal-900">{p.label}</div><div className="text-xs text-charcoal-400">{p.date}</div></div>
              <div className="flex items-center gap-4"><span className="font-semibold text-charcoal-900">{p.amount}</span><span className="chip-emerald">{p.status}</span></div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Reviews() {
  const reviews = [
    { name: 'Aanya & Vivaan', rating: 5, text: 'The film made my father cry. Pure magic.', date: 'Apr 2027' },
    { name: 'Meera & Arjun', rating: 5, text: 'Same-day edit was the highlight of the night.', date: 'May 2027' },
    { name: 'Sara & Imran', rating: 4, text: 'Beautiful work, slightly delayed gallery delivery.', date: 'Jun 2027' },
  ];
  return (
    <>
      <DashboardHeader title="Reviews" subtitle="312 reviews · 4.9 average" />
      <div className="grid gap-4 lg:grid-cols-3">
        {reviews.map((r) => (
          <Card key={r.name}>
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r.rating ? 'fill-gold-400 text-gold-400' : 'text-charcoal-200'}`} />)}</div>
            <p className="mt-3 text-sm text-charcoal-700">“{r.text}”</p>
            <div className="mt-4 border-t border-charcoal-100 pt-3"><div className="font-serif text-sm text-charcoal-900">{r.name}</div><div className="text-xs text-charcoal-400">{r.date}</div></div>
          </Card>
        ))}
      </div>
    </>
  );
}

function Analytics() {
  return (
    <>
      <DashboardHeader title="Analytics" subtitle="Understand your performance." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Eye} label="Profile views" value="2,840" change="+18%" accent="gold" />
        <StatCard icon={MessageSquare} label="Enquiries" value="86" change="+12%" accent="emerald" />
        <StatCard icon={Briefcase} label="Conversion" value="32%" change="+4%" accent="blush" />
        <StatCard icon={Star} label="Response rate" value="98%" accent="charcoal" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card><h3 className="font-serif text-lg text-charcoal-900">Views by month</h3><BarChart data={[180, 240, 200, 320, 380, 340, 420, 400, 360]} labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']} /></Card>
        <Card><h3 className="font-serif text-lg text-charcoal-900">Enquiries by source</h3>
          <div className="mt-4 space-y-3">
            {[{ label: 'Weddon search', pct: 48, color: 'bg-gold-400' }, { label: 'Direct profile', pct: 28, color: 'bg-emeraldx-500' }, { label: 'Referral', pct: 16, color: 'bg-blush-400' }, { label: 'Social', pct: 8, color: 'bg-charcoal-400' }].map((s) => (
              <div key={s.label}><div className="flex justify-between text-sm"><span className="text-charcoal-600">{s.label}</span><span className="font-semibold text-charcoal-900">{s.pct}%</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-charcoal-100"><div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} /></div></div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
