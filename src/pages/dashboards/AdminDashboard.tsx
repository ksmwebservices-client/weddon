import { useState } from 'react';
import {
  LayoutDashboard, Users, Target, Mail, UserCircle, Briefcase, CalendarDays,
  FileText, Boxes, Tags, Package, ShoppingCart, Crown, ShoppingBag, DollarSign,
  CreditCard, Receipt, Megaphone, FileCode, Sparkles, BarChart3, Shield, Settings,
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  CheckCircle2, Clock, AlertCircle, Plus, Search, Star, MessageSquare,
} from 'lucide-react';
import { DashboardShell, DashboardHeader, StatCard, Card, type NavItem } from '@/components/dashboards/DashboardShell';
import { MOBILE_NAV_ADMIN } from '@/data/content';
import { DashboardBottomNav } from '@/components/Layout';

const NAV: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { label: 'CRM', icon: Users, key: 'crm' },
  { label: 'Leads', icon: Target, key: 'leads' },
  { label: 'Enquiries', icon: Mail, key: 'enquiries' },
  { label: 'Customers', icon: UserCircle, key: 'customers' },
  { label: 'Wedding Projects', icon: Briefcase, key: 'projects' },
  { label: 'Bookings', icon: CalendarDays, key: 'bookings' },
  { label: 'Calendar', icon: CalendarDays, key: 'calendar' },
  { label: 'Quotations', icon: FileText, key: 'quotations' },
  { label: 'Vendor Management', icon: Boxes, key: 'vendors' },
  { label: 'Service Categories', icon: Tags, key: 'categories' },
  { label: 'Packages', icon: Package, key: 'packages' },
  { label: 'Inventory', icon: ShoppingCart, key: 'inventory' },
  { label: 'Bridal Rentals', icon: Crown, key: 'rentals' },
  { label: 'Boutique Orders', icon: ShoppingBag, key: 'orders' },
  { label: 'Finance', icon: DollarSign, key: 'finance' },
  { label: 'Payments', icon: CreditCard, key: 'payments' },
  { label: 'Invoices', icon: Receipt, key: 'invoices' },
  { label: 'Marketing', icon: Megaphone, key: 'marketing' },
  { label: 'CMS', icon: FileCode, key: 'cms' },
  { label: 'AI Center', icon: Sparkles, key: 'ai' },
  { label: 'Reports', icon: BarChart3, key: 'reports' },
  { label: 'User Roles', icon: Shield, key: 'roles' },
  { label: 'Settings', icon: Settings, key: 'settings' },
];

export function AdminDashboard() {
  const [active, setActive] = useState('dashboard');
  return (
    <DashboardShell nav={NAV} active={active} setActive={setActive} brand="Weddon" brandSub="Admin ERP" bottomNav={<DashboardBottomNav items={MOBILE_NAV_ADMIN} active={active} onSelect={setActive} />}>
      {active === 'dashboard' && <DashboardView />}
      {active === 'crm' && <CRMView />}
      {active === 'leads' && <LeadsView />}
      {active === 'enquiries' && <EnquiriesView />}
      {active === 'customers' && <CustomersView />}
      {active === 'projects' && <ProjectsView />}
      {active === 'bookings' && <BookingsView />}
      {active === 'calendar' && <CalendarView />}
      {active === 'quotations' && <QuotationsView />}
      {active === 'vendors' && <VendorMgmtView />}
      {active === 'categories' && <CategoriesView />}
      {active === 'packages' && <PackagesMgmtView />}
      {active === 'inventory' && <InventoryView />}
      {active === 'rentals' && <RentalsMgmtView />}
      {active === 'orders' && <OrdersView />}
      {active === 'finance' && <FinanceView />}
      {active === 'payments' && <PaymentsView />}
      {active === 'invoices' && <InvoicesView />}
      {active === 'marketing' && <MarketingView />}
      {active === 'cms' && <CMSView />}
      {active === 'ai' && <AICenterView />}
      {active === 'reports' && <ReportsView />}
      {active === 'roles' && <RolesView />}
      {active === 'settings' && <SettingsView />}
    </DashboardShell>
  );
}

/* ---------- shared chart helpers ---------- */
function LineChart({ data, labels, color = '#D4AF37' }: { data: number[]; labels: string[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 80 - 10}`).join(' ');
  return (
    <div className="mt-4">
      <div className="relative h-44 w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,100 ${pts} 100,100`} fill="url(#fill)" />
          <polyline points={pts} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
          {data.map((v, i) => <circle key={i} cx={(i / (data.length - 1)) * 100} cy={100 - ((v - min) / range) * 80 - 10} r="1.2" fill={color} />)}
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-charcoal-400">{labels.map((l) => <span key={l}>{l}</span>)}</div>
    </div>
  );
}

function Donut({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  let offset = 0;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F1F3F5" strokeWidth="4" />
        {segments.map((s) => {
          const pct = (s.value / total) * 100;
          const el = <circle key={s.label} cx="18" cy="18" r="15.915" fill="none" stroke={s.color} strokeWidth="4" strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={-offset} />;
          offset += pct;
          return el;
        })}
      </svg>
      <div className="space-y-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-charcoal-600">{s.label}</span>
            <span className="font-semibold text-charcoal-900">{Math.round((s.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Kanban({ columns }: { columns: { title: string; color: string; cards: { title: string; sub: string; tag: string }[] }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {columns.map((col) => (
        <div key={col.title} className="rounded-2xl border border-charcoal-100 bg-charcoal-50/50 p-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${col.color}`} /><span className="text-sm font-semibold text-charcoal-900">{col.title}</span></div>
            <span className="text-xs text-charcoal-400">{col.cards.length}</span>
          </div>
          <div className="space-y-2">
            {col.cards.map((c) => (
              <div key={c.title} className="rounded-xl border border-charcoal-100 bg-white p-3 shadow-soft transition-all hover:shadow-card">
                <div className="text-sm font-medium text-charcoal-900">{c.title}</div>
                <div className="mt-0.5 text-xs text-charcoal-400">{c.sub}</div>
                <span className="mt-2 inline-block rounded-full bg-charcoal-100 px-2 py-0.5 text-[10px] font-semibold text-charcoal-600">{c.tag}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: (string | { text: string; tone: 'gold' | 'emerald' | 'blush' | 'charcoal' | 'red' })[][] }) {
  const toneClass = (t: string) => t === 'emerald' ? 'chip-emerald' : t === 'gold' ? 'chip-gold' : t === 'blush' ? 'chip-blush' : t === 'red' ? 'inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700' : 'chip';
  return (
    <div className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-charcoal-100 bg-charcoal-50/50 text-left text-xs uppercase tracking-wide text-charcoal-500">
            <tr>{headers.map((h) => <th key={h} className="p-4 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-charcoal-50 last:border-0 hover:bg-charcoal-50/30">
                {row.map((cell, j) => (
                  <td key={j} className="p-4">
                    {typeof cell === 'string' ? <span className="text-charcoal-700">{cell}</span> : <span className={toneClass(cell.tone)}>{cell.text}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageToolbar({ title, subtitle, cta }: { title: string; subtitle: string; cta?: string }) {
  return <DashboardHeader title={title} subtitle={subtitle} action={cta ? <button className="btn-gold"><Plus className="h-4 w-4" /> {cta}</button> : undefined} />;
}

/* ---------- Views ---------- */
function DashboardView() {
  return (
    <>
      <DashboardHeader title="Admin Overview" subtitle="Wednesday, Dec 4, 2026 — here’s your business at a glance." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="Revenue (MTD)" value="₹84.2L" change="+22%" accent="gold" />
        <StatCard icon={Briefcase} label="Active projects" value="48" change="+8" accent="emerald" />
        <StatCard icon={Target} label="New leads" value="126" change="+18%" accent="blush" />
        <StatCard icon={Users} label="Customers" value="2,418" change="+64" accent="charcoal" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between"><h3 className="font-serif text-lg text-charcoal-900">Revenue & bookings</h3><div className="flex gap-2">{['6M', '1Y', 'All'].map((t, i) => <button key={t} className={`rounded-full px-3 py-1 text-xs font-medium ${i === 1 ? 'bg-charcoal-900 text-white' : 'bg-charcoal-100 text-charcoal-600'}`}>{t}</button>)}</div></div>
          <LineChart data={[42, 55, 48, 68, 72, 84]} labels={['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} />
        </Card>
        <Card>
          <h3 className="font-serif text-lg text-charcoal-900">Revenue by service</h3>
          <div className="mt-4"><Donut segments={[{ label: 'Packages', value: 42, color: '#D4AF37' }, { label: 'Vendors', value: 28, color: '#0F766E' }, { label: 'Boutique', value: 18, color: '#E09AAC' }, { label: 'Rentals', value: 12, color: '#1F2937' }]} /></div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between"><h3 className="font-serif text-lg text-charcoal-900">Lead pipeline</h3><button className="text-xs font-semibold text-gold-700">View all</button></div>
          <div className="mt-4"><Kanban columns={[
            { title: 'New', color: 'bg-charcoal-400', cards: [{ title: 'Ishita Kapoor', sub: 'Beach wedding · Goa', tag: 'Hot' }, { title: 'Rohan Mehta', sub: '2-day · Udaipur', tag: 'Warm' }] },
            { title: 'Contacted', color: 'bg-gold-400', cards: [{ title: 'Neha Singh', sub: 'Reception · Mumbai', tag: 'Follow-up' }] },
            { title: 'Qualified', color: 'bg-blush-400', cards: [{ title: 'Tara & Dev', sub: 'Royale pkg · Jaipur', tag: 'High value' }, { title: 'Vikram Rao', sub: 'Aura pkg · Bengaluru', tag: 'Confirmed' }] },
            { title: 'Won', color: 'bg-emeraldx-500', cards: [{ title: 'Aanya & Vivaan', sub: 'Aura · Udaipur', tag: 'Booked' }, { title: 'Sara & Imran', sub: 'Royale · Hyderabad', tag: 'Booked' }] },
          ]} /></div>
        </Card>
        <Card>
          <h3 className="font-serif text-lg text-charcoal-900">Recent activity</h3>
          <div className="mt-4 space-y-3">
            {[
              { icon: CheckCircle2, text: 'Booking confirmed — Aanya & Vivaan (Aura)', time: '12m ago', color: 'emerald' },
              { icon: CreditCard, text: 'Payment received — ₹1,06,250 from Meera', time: '1h ago', color: 'gold' },
              { icon: AlertCircle, text: 'Vendor response overdue — Pulse Nights', time: '3h ago', color: 'red' },
              { icon: Target, text: 'New lead — destination wedding, Bali', time: '5h ago', color: 'blush' },
              { icon: Receipt, text: 'Invoice #INV-2241 sent to Sara & Imran', time: '8h ago', color: 'charcoal' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${a.color === 'emerald' ? 'bg-emeraldx-100 text-emeraldx-700' : a.color === 'gold' ? 'bg-gold-100 text-gold-700' : a.color === 'red' ? 'bg-red-100 text-red-700' : a.color === 'blush' ? 'bg-blush-100 text-blush-700' : 'bg-charcoal-100 text-charcoal-700'}`}><a.icon className="h-4.5 w-4.5" /></div>
                <div className="flex-1"><div className="text-sm text-charcoal-700">{a.text}</div><div className="text-xs text-charcoal-400">{a.time}</div></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function CRMView() {
  return (
    <>
      <PageToolbar title="CRM" subtitle="Your full customer relationship pipeline." cta="Add contact" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total contacts" value="6,840" accent="gold" />
        <StatCard icon={Target} label="Active leads" value="126" change="+18%" accent="emerald" />
        <StatCard icon={CheckCircle2} label="Won (MTD)" value="38" accent="blush" />
        <StatCard icon={Clock} label="Avg. response" value="4.2h" accent="charcoal" />
      </div>
      <div className="mt-6"><DataTable headers={['Name', 'Stage', 'Value', 'Owner', 'Last contact']} rows={[
        ['Aanya Sharma', { text: 'Won', tone: 'emerald' }, '₹4,25,000', 'Priya', '2h ago'],
        ['Rohan Mehta', { text: 'Qualified', tone: 'gold' }, '₹6,80,000', 'Aakash', '5h ago'],
        ['Neha Singh', { text: 'Contacted', tone: 'blush' }, '₹1,85,000', 'Priya', '1d ago'],
        ['Vikram Rao', { text: 'Qualified', tone: 'gold' }, '₹4,25,000', 'Ishita', '2d ago'],
        ['Tara Reddy', { text: 'New', tone: 'charcoal' }, '₹12,50,000', 'Aakash', '3d ago'],
      ]} /></div>
    </>
  );
}

function LeadsView() {
  return (
    <>
      <PageToolbar title="Leads" subtitle="Kanban view of your sales pipeline." cta="New lead" />
      <div className="mt-2"><Kanban columns={[
        { title: 'New (42)', color: 'bg-charcoal-400', cards: [{ title: 'Ishita Kapoor', sub: 'Beach · Goa', tag: 'Hot' }, { title: 'Rohan Mehta', sub: '2-day · Udaipur', tag: 'Warm' }, { title: 'Karan Joshi', sub: 'Reception · Delhi', tag: 'New' }] },
        { title: 'Contacted (28)', color: 'bg-gold-400', cards: [{ title: 'Neha Singh', sub: 'Mumbai', tag: 'Follow-up' }, { title: 'Aditya Nair', sub: 'Bengaluru', tag: 'Callback' }] },
        { title: 'Qualified (18)', color: 'bg-blush-400', cards: [{ title: 'Tara & Dev', sub: 'Royale · Jaipur', tag: 'High value' }, { title: 'Vikram Rao', sub: 'Aura · Bengaluru', tag: 'Ready' }] },
        { title: 'Won (38)', color: 'bg-emeraldx-500', cards: [{ title: 'Aanya & Vivaan', sub: 'Aura · Udaipur', tag: 'Booked' }, { title: 'Sara & Imran', sub: 'Royale · Hyd', tag: 'Booked' }] },
      ]} /></div>
    </>
  );
}

function EnquiriesView() {
  return (
    <>
      <PageToolbar title="Enquiries" subtitle="All submissions from your website forms." cta="Export" />
      <div className="mb-4 flex items-center gap-3 rounded-2xl border border-charcoal-100 bg-white p-3 shadow-soft">
        <Search className="h-4 w-4 text-charcoal-400" />
        <input placeholder="Search enquiries…" className="flex-1 bg-transparent text-sm outline-none" />
      </div>
      <DataTable headers={['Name', 'Service', 'City', 'Budget', 'Date', 'Status']} rows={[
        ['Ishita Kapoor', 'Photography', 'Goa', '₹5–15L', 'Dec 12', { text: 'New', tone: 'gold' }],
        ['Rohan Mehta', 'Decoration', 'Udaipur', '₹15–50L', 'Dec 10', { text: 'Contacted', tone: 'blush' }],
        ['Neha Singh', 'Packages', 'Mumbai', '₹2–5L', 'Dec 08', { text: 'Qualified', tone: 'gold' }],
        ['Vikram Rao', 'Catering', 'Bengaluru', '₹5–15L', 'Dec 06', { text: 'Won', tone: 'emerald' }],
        ['Tara Reddy', 'Bridal Makeover', 'Jaipur', '₹15–50L', 'Dec 04', { text: 'New', tone: 'gold' }],
        ['Karan Joshi', 'DJ & Entertainment', 'Delhi', '₹2–5L', 'Dec 02', { text: 'Lost', tone: 'red' }],
      ]} />
    </>
  );
}

function CustomersView() {
  return (
    <>
      <PageToolbar title="Customers" subtitle="2,418 customers across 42 cities." cta="Add customer" />
      <DataTable headers={['Customer', 'Package', 'Wedding date', 'City', 'Spend', 'Status']} rows={[
        ['Aanya & Vivaan', 'Aura', 'Apr 18, 2027', 'Udaipur', '₹4,25,000', { text: 'Active', tone: 'emerald' }],
        ['Meera & Arjun', 'Royale', 'May 02, 2027', 'Jaipur', '₹12,50,000', { text: 'Active', tone: 'emerald' }],
        ['Ishita & Kabir', 'Bloom', 'Feb 14, 2027', 'Goa', '₹1,85,000', { text: 'Planning', tone: 'gold' }],
        ['Sara & Imran', 'Royale', 'Jun 20, 2027', 'Hyderabad', '₹12,50,000', { text: 'Active', tone: 'emerald' }],
        ['Tara & Dev', 'Aura', 'Jul 05, 2027', 'Mumbai', '₹4,25,000', { text: 'Lead', tone: 'blush' }],
      ]} />
    </>
  );
}

function ProjectsView() {
  return (
    <>
      <PageToolbar title="Wedding Projects" subtitle="48 active weddings in planning." cta="New project" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[{ name: 'Aanya & Vivaan', pkg: 'Aura', date: 'Apr 18', prog: 58, city: 'Udaipur' }, { name: 'Meera & Arjun', pkg: 'Royale', date: 'May 02', prog: 42, city: 'Jaipur' }, { name: 'Ishita & Kabir', pkg: 'Bloom', date: 'Feb 14', prog: 78, city: 'Goa' }, { name: 'Sara & Imran', pkg: 'Royale', date: 'Jun 20', prog: 35, city: 'Hyderabad' }, { name: 'Tara & Dev', pkg: 'Aura', date: 'Jul 05', prog: 22, city: 'Mumbai' }, { name: 'Vikram & Diya', pkg: 'Aura', date: 'Aug 12', prog: 15, city: 'Bengaluru' }].map((p) => (
          <Card key={p.name}>
            <div className="flex items-center justify-between"><div className="font-serif text-lg text-charcoal-900">{p.name}</div><span className="chip-gold">{p.pkg}</span></div>
            <div className="mt-2 text-xs text-charcoal-400">{p.city} · {p.date}, 2027</div>
            <div className="mt-4"><div className="flex justify-between text-xs"><span className="text-charcoal-500">Progress</span><span className="font-semibold text-charcoal-900">{p.prog}%</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-charcoal-100"><div className="h-full rounded-full bg-gold-gradient" style={{ width: `${p.prog}%` }} /></div></div>
          </Card>
        ))}
      </div>
    </>
  );
}

function BookingsView() {
  return (
    <>
      <PageToolbar title="Bookings" subtitle="All vendor bookings across all weddings." cta="New booking" />
      <DataTable headers={['Couple', 'Vendor', 'Service', 'Date', 'Amount', 'Status']} rows={[
        ['Aanya & Vivaan', 'Aria Studios', 'Photography', 'Apr 18', '₹85,000', { text: 'Confirmed', tone: 'emerald' }],
        ['Aanya & Vivaan', 'Verdant Florals', 'Decoration', 'Apr 17', '₹1,20,000', { text: 'Pending', tone: 'gold' }],
        ['Meera & Arjun', 'Lustre Bridal', 'Makeover', 'May 02', '₹28,000', { text: 'Confirmed', tone: 'emerald' }],
        ['Ishita & Kabir', 'Pulse Nights', 'DJ', 'Feb 14', '₹42,000', { text: 'Pending', tone: 'gold' }],
        ['Sara & Imran', 'Saffron Platter', 'Catering', 'Jun 20', '₹2,38,000', { text: 'Confirmed', tone: 'emerald' }],
      ]} />
    </>
  );
}

function CalendarView() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  const events: Record<number, { label: string; tone: string }[]> = { 4: [{ label: 'Aanya bridal trial', tone: 'gold' }], 11: [{ label: 'Decor walkthrough', tone: 'blush' }], 17: [{ label: 'Aanya & Vivaan', tone: 'emerald' }], 18: [{ label: 'Aanya & Vivaan', tone: 'emerald' }], 24: [{ label: 'Meera & Arjun', tone: 'emerald' }] };
  return (
    <>
      <PageToolbar title="Calendar" subtitle="December 2026 — all events and deadlines." cta="New event" />
      <Card>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-charcoal-400">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="py-2">{d}</div>)}</div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            const valid = d > 0 && d <= 31; const evts = events[d];
            return <div key={i} className={`min-h-[80px] rounded-xl border p-1.5 text-left text-xs ${!valid ? 'border-transparent text-charcoal-200' : 'border-charcoal-100 hover:border-charcoal-200'}`}>{valid && <div className="font-semibold text-charcoal-600">{d}</div>}{evts?.map((e, k) => <div key={k} className={`mt-1 truncate rounded px-1 py-0.5 text-[10px] ${e.tone === 'emerald' ? 'bg-emeraldx-100 text-emeraldx-700' : e.tone === 'gold' ? 'bg-gold-100 text-gold-700' : 'bg-blush-100 text-blush-700'}`}>{e.label}</div>)}</div>;
          })}
        </div>
      </Card>
    </>
  );
}

function QuotationsView() {
  return (
    <>
      <PageToolbar title="Quotations" subtitle="Quotes sent to couples and leads." cta="New quotation" />
      <DataTable headers={['#', 'Couple', 'Package', 'Amount', 'Sent', 'Status']} rows={[
        ['INV-2241', 'Aanya & Vivaan', 'Aura', '₹4,25,000', 'Dec 01', { text: 'Accepted', tone: 'emerald' }],
        ['INV-2242', 'Meera & Arjun', 'Royale', '₹12,50,000', 'Nov 28', { text: 'Accepted', tone: 'emerald' }],
        ['INV-2243', 'Ishita & Kabir', 'Bloom', '₹1,85,000', 'Dec 02', { text: 'Sent', tone: 'gold' }],
        ['INV-2244', 'Tara & Dev', 'Aura', '₹4,25,000', 'Dec 03', { text: 'Draft', tone: 'charcoal' }],
      ]} />
    </>
  );
}

function VendorMgmtView() {
  return (
    <>
      <PageToolbar title="Vendor Management" subtitle="680 verified vendors across 42 cities." cta="Onboard vendor" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Boxes} label="Total vendors" value="680" accent="gold" />
        <StatCard icon={CheckCircle2} label="Verified" value="612" accent="emerald" />
        <StatCard icon={Clock} label="Pending review" value="24" accent="blush" />
        <StatCard icon={Star} label="Avg. rating" value="4.8" accent="charcoal" />
      </div>
      <div className="mt-6"><DataTable headers={['Vendor', 'Category', 'City', 'Bookings', 'Rating', 'Status']} rows={[
        ['Aria Studios', 'Photography', 'Mumbai', '142', '4.9', { text: 'Verified', tone: 'emerald' }],
        ['Lustre Bridal', 'Makeover', 'Delhi', '98', '4.8', { text: 'Verified', tone: 'emerald' }],
        ['Verdant Florals', 'Decoration', 'Bengaluru', '76', '4.9', { text: 'Verified', tone: 'emerald' }],
        ['New Artist Co.', 'Makeover', 'Pune', '0', '—', { text: 'Pending', tone: 'gold' }],
        ['Saffron Platter', 'Catering', 'Jaipur', '121', '4.7', { text: 'Verified', tone: 'emerald' }],
      ]} /></div>
    </>
  );
}

function CategoriesView() {
  return (
    <>
      <PageToolbar title="Service Categories" subtitle="Manage the service taxonomy." cta="Add category" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Bridal Makeover', 'Photography', 'Decoration', 'Catering', 'DJ & Entertainment', 'Boutique', 'Accessories Rental', 'Travel & Honeymoon'].map((c, i) => (
          <Card key={c}>
            <div className="flex items-center justify-between"><div className="font-serif text-base text-charcoal-900">{c}</div><MoreHorizontal className="h-5 w-5 text-charcoal-300" /></div>
            <div className="mt-2 text-xs text-charcoal-400">{[86, 124, 97, 73, 64, 58, 42, 38][i]} vendors</div>
            <div className="mt-3 flex items-center justify-between text-xs"><span className="text-charcoal-500">From ₹{[15000, 45000, 85000, 650, 28000, 35000, 2500, 12000][i].toLocaleString('en-IN')}</span><span className="font-semibold text-emeraldx-600">Active</span></div>
          </Card>
        ))}
      </div>
    </>
  );
}

function PackagesMgmtView() {
  return (
    <>
      <PageToolbar title="Packages" subtitle="Manage your wedding packages and pricing." cta="New package" />
      <DataTable headers={['Package', 'Price', 'Duration', 'Guests', 'Bookings', 'Status']} rows={[
        ['Bloom', '₹1,85,000', '2 days', '150', '428', { text: 'Active', tone: 'emerald' }],
        ['Aura', '₹4,25,000', '3 days', '400', '612', { text: 'Active', tone: 'emerald' }],
        ['Royale', '₹12,50,000', '5 days', '1000', '184', { text: 'Active', tone: 'emerald' }],
      ]} />
    </>
  );
}

function InventoryView() {
  return (
    <>
      <PageToolbar title="Inventory" subtitle="Stock levels for the wedding shop and rentals." cta="Add item" />
      <DataTable headers={['Item', 'Category', 'In stock', 'Reserved', 'Price', 'Status']} rows={[
        ['Gold Leaf Invitations', 'Invitations', '2,400', '180', '₹120', { text: 'In stock', tone: 'emerald' }],
        ['Rose Petal Cones', 'Decor', '320', '40', '₹18', { text: 'In stock', tone: 'emerald' }],
        ['Bridal Clutch — Ivory', 'Accessories', '48', '12', '₹4,500', { text: 'Low', tone: 'gold' }],
        ['Polki Heritage Set', 'Rentals', '6', '2', '₹3,200/day', { text: 'Low', tone: 'gold' }],
        ['Ring Pillow — Blush', 'Accessories', '0', '0', '₹2,200', { text: 'Out', tone: 'red' }],
      ]} />
    </>
  );
}

function RentalsMgmtView() {
  return (
    <>
      <PageToolbar title="Bridal Rentals" subtitle="Track rental pieces, deposits, and returns." cta="Add piece" />
      <DataTable headers={['Piece', 'Daily rate', 'Deposit', 'On rent', 'Available', 'Status']} rows={[
        ['Polki Heritage Set', '₹3,200', '₹8,000', '2', '4', { text: 'Available', tone: 'emerald' }],
        ['Temple Jewelry Crown', '₹2,800', '₹6,000', '1', '5', { text: 'Available', tone: 'emerald' }],
        ['Kundan Kaleera Set', '₹1,800', '₹4,000', '3', '3', { text: 'Available', tone: 'emerald' }],
        ['Royal Bridal Set', '₹4,500', '₹10,000', '2', '0', { text: 'All out', tone: 'red' }],
      ]} />
    </>
  );
}

function OrdersView() {
  return (
    <>
      <PageToolbar title="Boutique Orders" subtitle="Customer orders from the boutique and shop." cta="View all" />
      <DataTable headers={['Order #', 'Customer', 'Item', 'Amount', 'Date', 'Status']} rows={[
        ['ORD-3401', 'Aanya Sharma', 'Ivory Lace Gown', '₹78,000', 'Dec 03', { text: 'Shipped', tone: 'gold' }],
        ['ORD-3402', 'Meera Reddy', 'Crimson Lehenga', '₹1,45,000', 'Dec 02', { text: 'Delivered', tone: 'emerald' }],
        ['ORD-3403', 'Ishita Patel', 'Pearl Tiara Dress', '₹92,000', 'Dec 01', { text: 'Processing', tone: 'blush' }],
        ['ORD-3404', 'Sara Khan', 'Polki Heritage Set', '₹42,000', 'Nov 30', { text: 'Delivered', tone: 'emerald' }],
      ]} />
    </>
  );
}

function FinanceView() {
  return (
    <>
      <PageToolbar title="Finance" subtitle="Financial overview and P&L." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} label="Revenue (YTD)" value="₹8.4Cr" change="+22%" accent="gold" />
        <StatCard icon={TrendingDown} label="Expenses (YTD)" value="₹5.1Cr" change="+8%" accent="blush" />
        <StatCard icon={DollarSign} label="Net profit" value="₹3.3Cr" change="+34%" accent="emerald" />
        <StatCard icon={Receipt} label="Outstanding" value="₹84L" accent="charcoal" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card><h3 className="font-serif text-lg text-charcoal-900">Revenue vs Expenses</h3><LineChart data={[42, 48, 52, 58, 64, 72]} labels={['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} /></Card>
        <Card><h3 className="font-serif text-lg text-charcoal-900">Expense breakdown</h3><div className="mt-4"><Donut segments={[{ label: 'Vendor payouts', value: 52, color: '#D4AF37' }, { label: 'Operations', value: 22, color: '#0F766E' }, { label: 'Marketing', value: 14, color: '#E09AAC' }, { label: 'Tech', value: 12, color: '#1F2937' }]} /></div></Card>
      </div>
    </>
  );
}

function PaymentsView() {
  return (
    <>
      <PageToolbar title="Payments" subtitle="All incoming and outgoing payments." cta="Record payment" />
      <DataTable headers={['Date', 'Customer', 'Type', 'Method', 'Amount', 'Status']} rows={[
        ['Dec 04', 'Aanya Sharma', 'Advance', 'UPI', '₹1,06,250', { text: 'Received', tone: 'emerald' }],
        ['Dec 03', 'Aria Studios', 'Payout', 'Bank', '₹2,40,000', { text: 'Sent', tone: 'gold' }],
        ['Dec 02', 'Meera Reddy', 'Mid payment', 'Card', '₹2,12,500', { text: 'Received', tone: 'emerald' }],
        ['Dec 01', 'Verdant Florals', 'Payout', 'Bank', '₹1,20,000', { text: 'Pending', tone: 'blush' }],
      ]} />
    </>
  );
}

function InvoicesView() {
  return (
    <>
      <PageToolbar title="Invoices" subtitle="Generate and track invoices." cta="New invoice" />
      <DataTable headers={['#', 'Customer', 'Amount', 'Issued', 'Due', 'Status']} rows={[
        ['INV-2241', 'Aanya & Vivaan', '₹4,25,000', 'Dec 01', 'Dec 15', { text: 'Paid', tone: 'emerald' }],
        ['INV-2242', 'Meera & Arjun', '₹12,50,000', 'Nov 28', 'Dec 12', { text: 'Paid', tone: 'emerald' }],
        ['INV-2243', 'Ishita & Kabir', '₹1,85,000', 'Dec 02', 'Dec 16', { text: 'Sent', tone: 'gold' }],
        ['INV-2244', 'Tara & Dev', '₹4,25,000', 'Dec 03', 'Dec 17', { text: 'Overdue', tone: 'red' }],
      ]} />
    </>
  );
}

function MarketingView() {
  return (
    <>
      <PageToolbar title="Marketing" subtitle="Campaigns, channels, and performance." cta="New campaign" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Megaphone} label="Active campaigns" value="8" accent="gold" />
        <StatCard icon={Target} label="CTR" value="4.2%" change="+0.8%" accent="emerald" />
        <StatCard icon={DollarSign} label="Spend (MTD)" value="₹6.2L" accent="blush" />
        <StatCard icon={TrendingUp} label="ROAS" value="3.8x" change="+0.4" accent="charcoal" />
      </div>
      <div className="mt-6"><DataTable headers={['Campaign', 'Channel', 'Spend', 'Revenue', 'ROAS', 'Status']} rows={[
        ['Winter Weddings', 'Instagram', '₹1.8L', '₹7.2L', '4.0x', { text: 'Live', tone: 'emerald' }],
        ['Royale Push', 'Google', '₹2.4L', '₹9.1L', '3.8x', { text: 'Live', tone: 'emerald' }],
        ['Bloom Intro', 'Email', '₹0.4L', '₹2.2L', '5.5x', { text: 'Live', tone: 'emerald' }],
        ['Festive Special', 'Facebook', '₹1.6L', '₹4.0L', '2.5x', { text: 'Paused', tone: 'charcoal' }],
      ]} /></div>
    </>
  );
}

function CMSView() {
  return (
    <>
      <PageToolbar title="CMS" subtitle="Manage website content, pages, and blog." cta="New page" />
      <DataTable headers={['Page', 'URL', 'Last edited', 'Author', 'Status']} rows={[
        ['Home', '/home', '2h ago', 'Ishita', { text: 'Published', tone: 'emerald' }],
        ['Packages', '/packages', '1d ago', 'Aakash', { text: 'Published', tone: 'emerald' }],
        ['Blog: Mandap Trends', '/blog/mandap-trends', '3d ago', 'Editorial', { text: 'Published', tone: 'emerald' }],
        ['Offers', '/offers', '5d ago', 'Ishita', { text: 'Draft', tone: 'charcoal' }],
      ]} />
    </>
  );
}

function AICenterView() {
  return (
    <>
      <PageToolbar title="AI Center" subtitle="Configure and monitor Aria, your AI assistant." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Sparkles} label="Conversations" value="12,840" change="+18%" accent="gold" />
        <StatCard icon={MessageSquare} label="Avg. session" value="6.4 min" accent="emerald" />
        <StatCard icon={CheckCircle2} label="Resolution rate" value="82%" change="+4%" accent="blush" />
        <StatCard icon={Star} label="Satisfaction" value="4.8" accent="charcoal" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card><h3 className="font-serif text-lg text-charcoal-900">AI tool usage</h3>
          <div className="mt-4 space-y-3">
            {[{ label: 'Budget planner', pct: 38, color: 'bg-gold-400' }, { label: 'Checklist', pct: 28, color: 'bg-emeraldx-500' }, { label: 'Color themes', pct: 14, color: 'bg-blush-400' }, { label: 'Vendor recs', pct: 12, color: 'bg-charcoal-400' }, { label: 'Other', pct: 8, color: 'bg-charcoal-300' }].map((s) => (
              <div key={s.label}><div className="flex justify-between text-sm"><span className="text-charcoal-600">{s.label}</span><span className="font-semibold text-charcoal-900">{s.pct}%</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-charcoal-100"><div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} /></div></div>
            ))}
          </div>
        </Card>
        <Card><h3 className="font-serif text-lg text-charcoal-900">Model settings</h3>
          <div className="mt-4 space-y-3">
            {[{ label: 'Model', value: 'GPT-4o mini' }, { label: 'Temperature', value: '0.7' }, { label: 'Language', value: 'English + Hindi' }, { label: 'Knowledge base', value: 'Weddon docs v2.4' }].map((f) => (
              <div key={f.label} className="flex items-center justify-between rounded-xl border border-charcoal-100 p-3"><span className="text-sm text-charcoal-600">{f.label}</span><span className="text-sm font-semibold text-charcoal-900">{f.value}</span></div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function ReportsView() {
  return (
    <>
      <PageToolbar title="Reports" subtitle="Generate and export business reports." cta="Export CSV" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['Revenue Report', 'Lead Conversion', 'Vendor Performance', 'Customer Retention', 'Marketing ROI', 'Booking Forecast'].map((r) => (
          <Card key={r}><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700"><BarChart3 className="h-5 w-5" /></div><div className="flex-1"><div className="font-serif text-base text-charcoal-900">{r}</div><div className="text-xs text-charcoal-400">Updated daily</div></div><button className="text-xs font-semibold text-gold-700">View</button></div></Card>
        ))}
      </div>
      <Card className="mt-6"><h3 className="font-serif text-lg text-charcoal-900">Monthly revenue trend</h3><LineChart data={[38, 42, 48, 52, 58, 64, 72, 84]} labels={['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} /></Card>
    </>
  );
}

function RolesView() {
  return (
    <>
      <PageToolbar title="User Roles" subtitle="Manage team access and permissions." cta="Invite user" />
      <DataTable headers={['Name', 'Email', 'Role', 'Last active', 'Status']} rows={[
        ['Aanya Mehta', 'aanya@weddon.com', 'Super Admin', '2m ago', { text: 'Active', tone: 'emerald' }],
        ['Rohan Kapoor', 'rohan@weddon.com', 'Admin', '1h ago', { text: 'Active', tone: 'emerald' }],
        ['Ishita Rao', 'ishita@weddon.com', 'Editor', '3h ago', { text: 'Active', tone: 'emerald' }],
        ['Vikram Shah', 'vikram@weddon.com', 'Finance', '1d ago', { text: 'Active', tone: 'emerald' }],
        ['Priya Nair', 'priya@weddon.com', 'Planner', '2d ago', { text: 'Inactive', tone: 'charcoal' }],
      ]} />
    </>
  );
}

function SettingsView() {
  return (
    <>
      <PageToolbar title="Settings" subtitle="Platform-wide configuration." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><h3 className="font-serif text-lg text-charcoal-900">General</h3><div className="mt-4 space-y-3">{[{ label: 'Platform name', value: 'Weddon' }, { label: 'Support email', value: 'hello@weddon.com' }, { label: 'Default currency', value: 'INR' }, { label: 'Timezone', value: 'Asia/Kolkata' }].map((f) => <label key={f.label} className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-500">{f.label}</span><input className="input-field" defaultValue={f.value} /></label>)}</div></Card>
        <Card><h3 className="font-serif text-lg text-charcoal-900">Notifications</h3><div className="mt-4 space-y-3">{['New enquiry alerts', 'Booking confirmations', 'Payment received', 'Vendor applications', 'Daily summary email'].map((n) => <label key={n} className="flex items-center justify-between rounded-xl border border-charcoal-100 p-3"><span className="text-sm text-charcoal-700">{n}</span><input type="checkbox" defaultChecked className="h-5 w-5 rounded border-charcoal-300 text-gold-500" /></label>)}</div></Card>
      </div>
    </>
  );
}
