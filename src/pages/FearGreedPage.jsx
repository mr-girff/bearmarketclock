import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const LEVELS = [
  { range: "0-24", label: "Extreme Fear", color: "#ef4444", emoji: "😱", interpretation: "Market is panicking. Historically the best buying opportunities occur at extreme fear levels below 15.", strategy: "Strong accumulation zone for long-term investors using DCA." },
  { range: "25-44", label: "Fear", color: "#f97316", emoji: "😰", interpretation: "Investors are fearful. Sellers outnumber buyers. Often occurs during prolonged downtrends.", strategy: "Good DCA zone. Consider adding to positions gradually." },
  { range: "45-55", label: "Neutral", color: "#eab308", emoji: "😐", interpretation: "Market is balanced. No strong directional signal.", strategy: "Hold existing positions. Continue regular DCA if your strategy calls for it." },
  { range: "56-74", label: "Greed", color: "#84cc16", emoji: "😏", interpretation: "Market becoming overconfident. Risk of pullback increases.", strategy: "Consider taking partial profits. Reduce new buys." },
  { range: "75-100", label: "Extreme Greed", color: "#22c55e", emoji: "🤑", interpretation: "Market is extremely overheated. Historically precedes major corrections.", strategy: "Take significant profits. This zone preceded 70-90% crashes historically." },
];

export default function FearGreedPage({ fearGreed, fearGreedLabel }) {
  useEffect(() => {
    document.title = "Bitcoin Fear and Greed Index — Live & Historical Data";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Bitcoin Fear and Greed Index live tracker. Understand what the index means, how to use it for trading decisions, and historical fear & greed levels during past bear markets.");
  }, []);

  const current = fearGreed ?? 50;
  const currentLevel = LEVELS.find(l => {
    const [min, max] = l.range.split("-").map(Number);
    return current >= min && current <= max;
  }) || LEVELS[2];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Fear & Greed Index</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Bitcoin Fear & Greed Index</h1>
        <p className="text-slate-400 text-lg mb-10">Market sentiment indicator measuring fear and greed in Bitcoin markets. Values range from 0 (Extreme Fear) to 100 (Extreme Greed).</p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">Current Index Value</h2>
            <div className="text-7xl font-black mb-3" style={{ color: currentLevel.color }}>{current}</div>
            <div className="text-2xl mb-1">{currentLevel.emoji}</div>
            <div className="text-xl font-bold" style={{ color: currentLevel.color }}>{fearGreedLabel || currentLevel.label}</div>
            <p className="text-slate-400 text-sm mt-3">{currentLevel.interpretation}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">What To Do Now</h2>
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <div className="text-sm text-slate-400 mb-1">Strategy for {currentLevel.label}</div>
              <p className="text-slate-300 text-sm">{currentLevel.strategy}</p>
            </div>
            <p className="text-sm text-slate-500">
              "Be fearful when others are greedy, and greedy when others are fearful." — Warren Buffett
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-4">Index Scale Explained</h2>
          <div className="space-y-3">
            {LEVELS.map((level, i) => (
              <div key={i} className={`flex items-start gap-4 p-4 rounded-xl ${current >= parseInt(level.range) && current <= parseInt(level.range.split("-")[1]) ? "bg-white/10 ring-1 ring-white/20" : "bg-white/3"}`}>
                <div className="text-2xl">{level.emoji}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold" style={{ color: level.color }}>{level.label}</span>
                    <span className="text-xs text-slate-500">{level.range}/100</span>
                  </div>
                  <p className="text-slate-400 text-sm">{level.interpretation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Link to="/dca-calculator" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">DCA Calculator</Link>
          <Link to="/bottom-indicators" className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Bottom Indicators</Link>
        </div>
      </div>
    </div>
  );
}
