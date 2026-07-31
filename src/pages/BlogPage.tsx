import { useState } from 'react';
import { Clock, ArrowRight, Search } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading, Button } from '@/components/ui';
import { BLOG_POSTS, IMAGES } from '@/data/content';

const EXTRA = [
  { id: 'b4', title: 'Sustainable Weddings: How to Go Green Without Losing Glamour', excerpt: 'Compostable florals, digital invites, and local sourcing — the new luxury is responsible.', category: 'Trends', date: 'Jul 06, 2026', readTime: '7 min', image: IMAGES.tableFlorals, author: 'Weddon Editorial' },
  { id: 'b5', title: 'The Ultimate 12-Month Wedding Planning Checklist', excerpt: 'Month by month, everything you need to do — straight from our senior planners.', category: 'Planning', date: 'Jun 28, 2026', readTime: '12 min', image: IMAGES.coupleGarden, author: 'Planner Team' },
  { id: 'b6', title: '5 Honeymoon Destinations Trending in 2026', excerpt: 'Beyond the Maldives — the destinations our couples are choosing this year.', category: 'Travel', date: 'Jun 20, 2026', readTime: '6 min', image: IMAGES.honeymoonSunset, author: 'Azure Escapes' },
];

const ALL = [...BLOG_POSTS, ...EXTRA];
const CATS = ['All', ...Array.from(new Set(ALL.map((b) => b.category)))];

export function BlogPage() {
  const [cat, setCat] = useState('All');
  const [query, setQuery] = useState('');
  const featured = ALL[0];
  const filtered = ALL.filter((b) => (cat === 'All' || b.category === cat) && (query === '' || b.title.toLowerCase().includes(query.toLowerCase())));

  return (
    <>
      <PageHeader
        eyebrow="The journal"
        title={<>Weddon <span className="gold-text">blog</span></>}
        subtitle="Trends, guides, and stories from the world of weddings."
        image={IMAGES.tableFlorals}
        crumb="Blog"
      />

      {/* Featured */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative h-72 overflow-hidden rounded-3xl shadow-luxe sm:h-96">
            <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gold-700 backdrop-blur">Featured · {featured.category}</span>
          </div>
          <div>
            <div className="flex items-center gap-3 text-xs text-charcoal-400">
              <span>{featured.date}</span><span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readTime}</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl text-charcoal-900 sm:text-4xl leading-tight">{featured.title}</h2>
            <p className="mt-4 text-charcoal-600">{featured.excerpt}</p>
            <div className="mt-5 text-sm text-charcoal-500">By {featured.author}</div>
            <Button variant="gold" className="mt-6">Read article <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${cat === c ? 'bg-charcoal-900 text-white' : 'bg-charcoal-50 text-charcoal-600 hover:bg-charcoal-100'}`}>{c}</button>
            ))}
          </div>
          <div className="relative max-w-xs">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles…" className="input-field pl-10" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <div key={post.id} className="group overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up cursor-pointer" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="relative h-52 overflow-hidden">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gold-700 backdrop-blur">{post.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-charcoal-400">
                  <span>{post.date}</span><span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                </div>
                <h3 className="mt-2 font-serif text-lg leading-snug text-charcoal-900 group-hover:text-gold-700">{post.title}</h3>
                <p className="mt-2 text-sm text-charcoal-500">{post.excerpt}</p>
                <div className="mt-4 text-xs font-medium text-charcoal-500">By {post.author}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
