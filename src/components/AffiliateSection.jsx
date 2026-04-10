import React from "react";

const PARTNERS = [
  { name: "Binance", tagline: "World's Largest Exchange", desc: "Zero-fee DCA into Bitcoin. Set up automatic recurring buys.", cta: "Start DCA on Binance →", url: "https://www.binance.com/en/activity/referral-entry/CPA?fromActivityPage=true&ref=CPA_00XXXXXXXX", badge: "Most Popular", badgeColor: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30", icon: "🟡", why: "Best for: Regular DCA buyers" },
  { name: "Coinbase", tagline: "Most Trusted US Exchange", desc: "Regulated, insured, beginner-friendly. Perfect for first-time BTC buyers.", cta: "Get $10 Free on Coinbase →", url: "https://www.coinbase.com/join/XXXXXXX", badge: "Beginner Friendly", badgeColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30", icon: "🔵", why: "Best for: US users, beginners" },
  { name: "Ledzer", tagline: "Hardware Wallet #1", desc: "Not your keys, not your coins. Keep your BTC safe from exchange hacks.", cta: "Secure Your Bitcoin →", url: "https://shop.ledger.com/?r=XXXXXXX", badge: "Security Essential", badgeColor: "bg-purple-500/20 text-purple-400 border border-purple-500/30", icon: "🔐", why: "Best for: Long-term HODLers" },
  { name: "TradingView", tagline: "Pro Charts & Analysis", desc: "Track Bitcoin's bear market recovery in real-time with professional charting tools.", cta: "Get TradingView Pro →", url: "https://www.tradingview.com/?aff_id=XXXXXXX", badge: "For Traders", badgeColor: "bg-green-500/20 text-green-400 border border-green-500/30", icon: "📊", why: "Best for: Active traders" },
];

export default function AffiliateSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">🏦 Bear Market Toolkit</h2>
        <p className="text-slate-400 text-center mb-2">Tools used by serious Bitcoin investors during bear markets.</p>
        <p className="text-slate-600 text-center text-xs mb-12">Affiliate disclosure: We may earn a commission when you sign up through our links.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {PARTNERS.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer sponsored" className="card-dark p-6 flex flex-col hover:border-slate-600 hover:scale-[1.01] transition-all duration-200 group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.icon}</span>
                  <div>
                    <h3 className="font-black text-white text-lg group-hover:text-yellow-400 transition-colors">{p.name}</h3>
                    <p className="text-slate-400 text-sm">{p.tagline}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${p.badgeColor} whitespace-nowrap`}>{p.badge}</span>
              </div>
              <p className="text-slate-400 text-sm mb-4 flex-1 leading-relaxed">{p.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs">{p.why}</span>
                <span className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-xl font-semibold transition-colors">{p.cta}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
