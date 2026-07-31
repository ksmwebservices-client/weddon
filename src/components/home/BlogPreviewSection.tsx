import { ArrowRight, Clock } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { BLOG_POSTS } from '@/data/content';
import { SectionHeading } from '@/components/ui';

export function BlogPreviewSection() {
  const { navigate } = useRouter();
  return (
    <section className="section-pad py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="The journal"
            title={<>Weddon <span className="gold-text">blog</span></>}
            subtitle="Trends, guides, and behind-the-scenes stories from the world of weddings."
          />
          <button onClick={() => navigate('blog')} className="btn-outline shrink-0">
            All articles <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <button
              key={post.id}
              onClick={() => navigate('blog')}
              className="group overflow-hidden rounded-3xl border border-charcoal-100 bg-white text-left shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gold-700 backdrop-blur">{post.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-charcoal-400">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                </div>
                <h3 className="mt-2 font-serif text-lg leading-snug text-charcoal-900 group-hover:text-gold-700">{post.title}</h3>
                <p className="mt-2 text-sm text-charcoal-500">{post.excerpt}</p>
                <div className="mt-4 text-xs font-medium text-charcoal-500">By {post.author}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
