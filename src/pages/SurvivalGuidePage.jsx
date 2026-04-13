import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    emoji: "🧠", title: "Mental Preparation",
    items: [
      { title: "Reframe the narrative", body: "A bear market is not the end — it's a clearance sale. Every major bear in Bitcoin history was followed by a new ATH. Your job is to survive to participate in the next bull run." },
      { title: "Detach from daily price", body: "Checking the price 20 times a day increases stress without improving returns. Set a weekly review schedule. Your long-term thesis doesn't change with the daily close." },
      { title: "Ignore social media FUD", body: "Bear markets produce maximum negative sentiment. Critics who called for $0 BTC were wrong every single time. Filter your information diet ruthlessly." },
      { title: "Accept drawdowns as normal", body: "Bitcoin has dropped 50%+ seven times in its history. Every single time it recovered and made new highs. Temporary drawdowns are part of the deal." },
    ]
  },
  {
    emoji: "💰", title: "Financial Strategy",
    items: [
      { title: "Only invest what you can lose", body: "Never invest borrowed money or funds you'll need within 1-2 years in Bitcoin. Bear markets can last 12-18 months. Ensure your basic financial stability first." },
      { title: "Dollar-cost average (DCA)", body: "The most battle-tested strategy for bear markets. Set a fixed monthly amount and buy regardless of price. This removes emotion and lowers your average cost basis." },
      { title: "Keep 6 months emergency fund", body: "Before buying more Bitcoin during a dip, ensure you have 3-6 months of living expenses in cash. Being forced to sell Bitcoin during a crash is devastating." },
      { title: "Avoid leverage and margin", body: "Leverage amplifies losses. During bear markets, liquidations are cascading and brutal. If you're using leverage, reduce or eliminate it immediately." },
    ]
  },
  {
    emoji: "🔐", title: "Security & Custody",
    items: [
      { title: "Move to cold storage", body: "If you're holding more than you can afford to lose, move Bitcoin to a hardware wallet (Ledger, Trezor). Bear markets bring exchange hacks and FTX-style collapses." },
      { title: "Use reputable exchanges", body: "Not your keys, not your coins. If you keep funds on exchanges, stick to the largest regulated ones (Coinbase, Kraken, Gemini)." },
      { title: "Enable all security features", body: "Activate 2FA on all crypto accounts. Use authenticator apps, never SMS. Set withdrawal whitelists. Bear markets attract scammers and hackers." },
      { title: "Backup your seed phrase", body: "Write your hardware wallet seed phrase on paper, store in multiple secure locations. Never store it digitally." },
    ]
  },
  {
    emoji: "🚀", title: "Positioning For Recovery",
    items: [
      { title: "Watch the Fear & Greed Index", body: "Historically, the best buying opportunities occurred when the index dropped below 10-15 (Extreme Fear). These moments feel terrible but have been consistently profitable entries." },
      { title: "Track on-chain bottom signals", body: "MVRV Z-Score below 0, NUPL in Capitulation zone, and Realized Price crossover have all historically signaled bear market bottoms with remarkable accuracy." },
      { title: "Set a rebalancing plan", body: "Decide in advance what % of your portfolio you want in Bitcoin at various price levels. Having a plan prevents panic selling." },
      { title: "Stay liquid for opportunities", body: "The deepest part of the bear market often creates the best risk/reward opportunities. Keeping some cash reserve (10-20%) lets you take advantage of capitulation events." },
    ]
  },
];

export default function SurvivalGuidePage() {
  useEffect(() => {
    document.title = "Bitcoin Bear Market Survival Guide — How to Survive a Crypto Crash";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Complete Bitcoin bear market survival guide. Mental preparation, DCA strategies, security tips, and how to position yourself for the next bull run. Tested advice from every cycle.");
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Survival Guide</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Bitcoin Bear Market Survival Guide</h1>
        <p className="text-slate-400 text-lg mb-10">The complete playbook for navigating a crypto bear market — mentally, financially, and strategically. Lessons from 6 bear market cycles.</p>

        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🐻</div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">The Most Important Fact</h2>
              <p className="text-slate-300">Bitcoin has experienced 6 major bear markets (-52% to -94% drawdowns). <strong className="text-white">All 5 completed ones recovered to new all-time highs.</strong> Survival is the only strategy that matters.</p>
            </div>
          </div>
        </div>

        {SECTIONS.map((section, si) => (
          <div key={si} className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span>{section.emoji}</span><span>{section.title}</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {section.items.map((item, ii) => (
                <div key={ii} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-4 flex-wrap">
          <Link to="/dca-calculator" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Calculate Your DCA</Link>
          <Link to="/bottom-indicators" className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Check Bottom Indicators</Link>
        </div>
      </div>
    </div>
  );
}
