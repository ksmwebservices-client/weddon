import { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';
import { useRouter, type Route } from '@/lib/router';

type Msg = { role: 'ai' | 'user'; text: string; actions?: { label: string; route: Route }[] };

const QUICK_PROMPTS = [
  'Plan my budget',
  'Suggest a color theme',
  'Find a photographer',
  'Generate a checklist',
];

function aiReply(input: string): Msg {
  const q = input.toLowerCase();
  if (q.includes('budget')) {
    return {
      role: 'ai',
      text: 'I can build a tailored budget. For a 300-guest wedding, a healthy split is: Venue & Catering 40%, Decor & Flowers 15%, Photography & Film 12%, Attire & Makeup 13%, Entertainment 8%, Travel & Stay 7%, Misc 5%. Want me to open the full budget planner?',
      actions: [{ label: 'Open Budget Planner', route: 'ai-planner' }],
    };
  }
  if (q.includes('color') || q.includes('theme')) {
    return {
      role: 'ai',
      text: 'Based on a summer daytime wedding, I recommend a “Champagne & Blush” palette — champagne gold accents, blush pink florals, ivory linens, and emerald greenery. It photographs beautifully and suits both mandap and reception.',
      actions: [{ label: 'See Color Themes', route: 'ai-planner' }],
    };
  }
  if (q.includes('photo') || q.includes('vendor')) {
    return {
      role: 'ai',
      text: 'Our top-rated photographers include Aria Studios (Mumbai, 4.9★) and Lustre Bridal (Delhi, 4.8★). I can show you the full vendor marketplace with verified reviews.',
      actions: [{ label: 'Browse Vendors', route: 'services' }],
    };
  }
  if (q.includes('checklist')) {
    return {
      role: 'ai',
      text: 'Here’s a starter checklist: 1) Set budget 2) Pick date 3) Book venue 4) Lock photographer 5) Finalize decor 6) Bridal trials 7) Send invites 8) Plan seating. The full 60-point checklist lives in your planner.',
      actions: [{ label: 'Open Checklist', route: 'ai-planner' }],
    };
  }
  return {
    role: 'ai',
    text: 'I’m your Weddon AI assistant. I can help with budgeting, checklists, timelines, color themes, vendor picks, bridal looks, seating, and invitations. What would you like to start with?',
    actions: [{ label: 'Open AI Planner', route: 'ai-planner' }],
  };
}

export function AIChatbot() {
  const { navigate } = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: 'ai',
      text: 'Hi! I’m Aria, your AI wedding assistant. Ask me anything about planning your big day.',
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, aiReply(text)]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-900 text-gold-400 shadow-luxe transition-transform hover:scale-110 sm:bottom-6 sm:right-6"
        aria-label="AI Assistant"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-gold-400/40 animate-pulse-ring" />}
        {open ? <X className="h-6 w-6 relative" /> : <Sparkles className="h-6 w-6 relative" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm animate-scale-in sm:right-6">
          <div className="overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-luxe">
            {/* Header */}
            <div className="flex items-center gap-3 bg-charcoal-900 p-4 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient">
                <Bot className="h-5 w-5 text-charcoal-900" />
              </div>
              <div>
                <div className="text-sm font-semibold">Aria · AI Wedding Assistant</div>
                <div className="flex items-center gap-1.5 text-xs text-emeraldx-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emeraldx-400" /> Online now
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 space-y-3 overflow-y-auto bg-charcoal-50/50 p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-charcoal-900 text-white rounded-br-md'
                        : 'bg-white text-charcoal-700 shadow-soft rounded-bl-md'
                    }`}
                  >
                    {m.text}
                    {m.actions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.actions.map((a) => (
                          <button
                            key={a.label}
                            onClick={() => { navigate(a.route); setOpen(false); }}
                            className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700 transition-colors hover:bg-gold-200"
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-soft">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-300" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-300" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-300" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick prompts */}
            {msgs.length <= 2 && (
              <div className="flex flex-wrap gap-2 border-t border-charcoal-100 p-3">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="rounded-full bg-blush-50 px-3 py-1.5 text-xs font-medium text-blush-700 transition-colors hover:bg-blush-100"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-charcoal-100 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Aria anything…"
                className="flex-1 rounded-full bg-charcoal-50 px-4 py-2.5 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
              />
              <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-charcoal-900 transition-transform hover:scale-105">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
