import React from "react";

const INSIGHTS = [
  { emoji: "⏱️", stat: "376 days", label: "Longest bear market", sub: "2021–2022 cycle" },
  { emoji: "📉", stat: "-93.7%", label: "Deepest crash ever", sub: "2011, from $31.91 to $2.01" },
  { emoji: "🔁", stat: "100%", label: "Recovery rate", sub: "All bears eventually ended" },
  { emoji: "🚀", stat: "10x+", label: "Avg gain after bear", sub: "New ATH every cycle" },
  { emoji: "🗓️", stat: "~12mo", label: "Time from halving to peak", sub: "Historical average" },
  { emoji: "😴", stat: "328 days", label: "Average bear duration", sub: "Across all 4 bear cycles" },
];

const STRATEGIES = [
  { title: "DCA (Dollar Cost Average)", desc: "Buy a fixed amount weekly/monthly regardless of price. Historically the most effective strategy for long-term holders.", badge: "Best for beginners", badgeColor: "bg-green-500/20 text-green-400", icon: "📅" },
  { title: "Cold Wallet Storage", desc: "Move your BTC off exchanges. Bear markets see exchanges collapse (Mt.Gox, FTX). Your keys = your coins.", badge: "Security", badgeColor: "bg-blue-500/20 text-blue-400", icon: "🔐" },
  { title: "Ignore the News", desc: "Bear markets produce the most bearish headlines. 'Bitcoin is dead' has been declared 400+ times. Noise.", badge: "Psychology", badgeColor: "bg-purple-500/20 text-purple-400", icon: "🧘" },
  { title: "Track Metrics, Not Price", desc: "Watch on-chain data: MVRV ratio, realized price, exchange outflows. Price is noise; fundamentals matter.", badge: "Advanced", badgeColor: "bg-yellow-500/20 text-yellow-400", icon: "📊" },
];

export default function BearInsights() {
  return (
    <section className="py-20 px-4 bg-[#0d0d14]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
          📚 Bear Market{" "}
          <span className="text-gradient-red">Survival Guide</span>
        </h2>
        <p className="text-slate-400 text-center mb-12">What history teaches us — and what to do right now.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {INSIGHTS.map(item => (
            <div key={item.stat} className="card-dark p-5 text-center hover:border-red-500/30 transition-colors">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="text-2xl font-black text-white mb-1">{item.stat}</div>
              <div className="text-slate-300 text-sm font-medium">{item.label}</div>
              <div className="text-slate-500 text-xs mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
        <h3 className="text-2xl font-black text-center mb-8 text-slate-200">What To Do Right Now</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {STRATEGIES.map(s => (
            <div key={s.title} className="card-dark p-6 hover:border-slate-600 transition-colors">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-white">{s.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.badgeColor}`}>{s.badge}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
