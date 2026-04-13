import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TOOLS = [
  { emoji: "📊", title: "DCA Calculator", desc: "Backtest dollar-cost averaging through any bear market", href: "/dca-calculator", cta: "Calculate Now" },
  { emoji: "😱", title: "Fear & Greed Index", desc: "Real-time crypto sentiment analysis", href: "/fear-greed", cta: "Check Sentiment" },
  { emoji: "🌈", title: "Rainbow Chart", desc: "Bitcoin long-term valuation bands", href: "/rainbow-chart", cta: "View Chart" },
  { emoji: "📡", title: "Bottom Indicators", desc: "On-chain signals that historically mark BTC bottoms", href: "/bottom-indicators", cta: "See Indicators" },
  { emoji: "📜", title: "Bear Market History", desc: "Every Bitcoin bear market — depth, duration, and recovery", href: "/history", cta: "Explore History" },
  { emoji: "🛡️", title: "Survival Guide", desc: "How to navigate and profit from bear markets", href: "/survival-guide", cta: "Read Guide" },
];

const FAQS = [
  { q: "How long do Bitcoin bear markets last?", a: "Historically, Bitcoin bear markets have lasted 12–18 months from peak to trough. The 2018 bear lasted ~12 months, the 2022 bear lasted ~13 months." },
  { q: "How much does Bitcoin drop in a bear market?", a: "Bitcoin typically drops 70–85% from its all-time high in major bear markets. The 2018 bear saw an 84% drop, 2022 saw a 77% drop." },
  { q: "Is dollar-cost averaging good in a bear market?", a: "Yes — DCA is one of the most effective strategies in bear markets. By buying fixed amounts regularly, you automatically acquire more BTC when prices are lower, reducing your average cost basis." },
  { q: "What signals the end of a Bitcoin bear market?", a: "Common bottom indicators include: MVRV ratio below 1, Puell Multiple in green zone, Pi Cycle Bottom signal, miner capitulation, and Fear & Greed Index in Extreme Fear for 30+ days." },
  { q: "Should I buy Bitcoin during a bear market?", a: "Historically, buying Bitcoin during bear markets has produced the best long-term returns. However, past performance doesn't guarantee future results. Always invest only what you can afford to lose." },
];

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
      <div className="text-2xl font-bold text-red-400 mb-1">{value}</div>
      <div className="text-white text-sm font-medium">{label}</div>
      {sub && <div className="text-slate-500 text-xs mt-1">{sub}</div>}
    </div>
  );
}

export default function HomePage() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Bitcoin Bear Market Clock — Track BTC Bear Markets in Real Time";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Real-time Bitcoin bear market tracker. See if we're in a bear market, how deep it is, and when it might end. Free tools: DCA calculator, fear & greed index, bottom indicators.");

    fetch("/api/price").then(r => r.json()).then(d => {
      setPrice(d.price);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const ath = 109000;
  const drawdown = price ? (((price - ath) / ath) * 100).toFixed(1) : null;
  const isBear = drawdown && parseFloat(drawdown) < -20;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-red-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {loading ? "Fetching live BTC price..." : isBear ? "Bitcoin Bear Market Active" : "Bitcoin Market Tracker"}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            Bitcoin<br /><span className="text-red-400">Bear Market</span><br />Clock
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Real-time tracker for Bitcoin bear markets. Know where we are, how deep we've fallen, and what to do next.
          </p>
          {price && (
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                <div className="text-3xl font-bold text-white">${Number(price).toLocaleString()}</div>
                <div className="text-slate-400 text-sm">BTC Live Price</div>
              </div>
              {drawdown && (
                <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                  <div className={`text-3xl font-bold ${isBear ? "text-red-400" : "text-green-400"}`}>{drawdown}%</div>
                  <div className="text-slate-400 text-sm">From ATH (${(ath/1000).toFixed(0)}K)</div>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dca-calculator" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors text-lg">
              DCA Calculator →
            </Link>
            <Link to="/bottom-indicators" className="bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors text-lg border border-white/20">
              Bottom Indicators
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Avg Bear Duration" value="13 mo" sub="Historical average" />
          <StatCard label="Avg Bear Drawdown" value="-80%" sub="From peak to trough" />
          <StatCard label="Avg Recovery Time" value="2–3 yr" sub="To new ATH" />
          <StatCard label="Bear Markets Since 2011" value="5" sub="All recovered" />
        </div>
        <div className="text-center">
          <Link to="/history" className="text-red-400 hover:text-red-300 text-sm">
            View full bear market history →
          </Link>
        </div>
      </section>

      {/* Tools grid */}
      <section className="px-4 pb-20 max-w-5xl mx-auto">
        <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">Free Bitcoin Bear Market Tools</h2>
        <p className="text-slate-400 mb-8">Everything you need to navigate a Bitcoin bear market — completely free.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map((tool, i) => (
            <Link key={i} to={tool.href} className="group bg-white/5 border border-white/10 hover:border-red-500/30 rounded-2xl p-6 transition-all hover:bg-white/8 flex flex-col">
              <div className="text-3xl mb-3">{tool.emoji}</div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-400 transition-colors">{tool.title}</h3>
              <p className="text-slate-400 text-sm flex-1 mb-4">{tool.desc}</p>
              <span className="text-red-400 text-sm font-medium">{tool.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* What is bear market */}
      <section className="px-4 pb-20 max-w-3xl mx-auto">
        <h2 className="text-white font-bold text-2xl md:text-3xl mb-4">What Is a Bitcoin Bear Market?</h2>
        <div className="prose-blog">
          <p>A <strong>Bitcoin bear market</strong> is typically defined as a decline of 20% or more from a recent peak, sustained over an extended period. In Bitcoin's history, major bear markets have seen price drops of <strong>70–85% from all-time highs</strong>.</p>
          <p>Bitcoin has experienced five major bear markets since 2011. Despite each bear market feeling catastrophic in the moment, every single one has ultimately resolved into a new bull market and new all-time highs.</p>
          <p>Understanding where we are in the bear market cycle — and having the right tools and strategies — is the difference between panic selling at the bottom and accumulating at historically profitable prices.</p>
        </div>
        <Link to="/history" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-medium mt-4">
          View all Bitcoin bear markets →
        </Link>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-20 max-w-3xl mx-auto">
        <h2 className="text-white font-bold text-2xl md:text-3xl mb-8">Bitcoin Bear Market FAQ</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-500/20 rounded-3xl p-10">
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-3">Stop Guessing. Start Tracking.</h2>
          <p className="text-slate-400 mb-6">Use our free tools to make data-driven decisions during the bear market.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dca-calculator" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-7 py-3 rounded-xl transition-colors">DCA Calculator</Link>
            <Link to="/survival-guide" className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-3 rounded-xl transition-colors">Survival Guide</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
