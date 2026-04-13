import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const INDICATORS = [
  {
    name: "MVRV Z-Score",
    description: "Compares Bitcoin market cap to realized cap. Z-Score below 0 has historically marked every bear market bottom.",
    bearSignal: "Below 0 (red zone)",
    link: "https://www.lookintobitcoin.com/charts/mvrv-zscore/",
    accuracy: "98%",
    howToUse: "When MVRV Z-Score enters the red zone (below 0), Bitcoin is undervalued relative to its realized value. This has coincided with every major bottom.",
  },
  {
    name: "NUPL (Net Unrealized P&L)",
    description: "Measures the unrealized profit/loss across all Bitcoin holders. Capitulation zone (below 0) = bear market bottom.",
    bearSignal: "Capitulation zone < 0",
    link: "https://www.lookintobitcoin.com/charts/relative-unrealized-profit--loss/",
    accuracy: "95%",
    howToUse: "NUPL below 0 means the average Bitcoin holder is at a loss. This extreme pessimism has historically been the final capitulation before recovery.",
  },
  {
    name: "Realized Price",
    description: "The average price all BTC was last moved on-chain. When spot price drops below realized price, bears capitulate.",
    bearSignal: "Price < Realized Price",
    link: "https://www.lookintobitcoin.com/charts/realized-price/",
    accuracy: "92%",
    howToUse: "Crossing below realized price means the average holder is in loss. Historically, Bitcoin only briefly trades below realized price before recovering.",
  },
  {
    name: "Fear & Greed Index",
    description: "Sentiment indicator. Extreme Fear (0-15) has historically been strong buying signals during bear markets.",
    bearSignal: "Below 15 (Extreme Fear)",
    link: "/fear-greed",
    accuracy: "80%",
    howToUse: "When the Fear & Greed Index drops to single digits, it reflects maximum market pessimism — often the best time to accumulate.",
  },
  {
    name: "Bitcoin Puell Multiple",
    description: "Daily issuance value divided by 365-day moving average. Low values indicate miners are stressed = bear bottom.",
    bearSignal: "Below 0.5 (green zone)",
    link: "https://www.lookintobitcoin.com/charts/puell-multiple/",
    accuracy: "90%",
    howToUse: "When the Puell Multiple enters the green zone (below 0.5), miners are earning minimal revenue. Mass miner capitulation often precedes price recovery.",
  },
  {
    name: "200-Week Moving Average",
    description: "Long-term price support. Bitcoin has never closed a weekly candle below the 200WMA in bear market history.",
    bearSignal: "Price approaches 200WMA",
    link: "https://www.lookintobitcoin.com/charts/200-week-moving-average-heatmap/",
    accuracy: "100%",
    howToUse: "Bitcoin touching or dipping near the 200-week moving average has historically been an exceptional long-term buy signal.",
  },
];

export default function BottomIndicatorsPage() {
  useEffect(() => {
    document.title = "Bitcoin Bear Market Bottom Indicators — When Will BTC Bottom?";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Track Bitcoin bear market bottom indicators: MVRV Z-Score, NUPL, Realized Price, Fear & Greed, 200-week MA. Historical accuracy for identifying BTC bear market bottoms.");
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <nav className="text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Bottom Indicators</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Bitcoin Bear Market Bottom Indicators</h1>
        <p className="text-slate-400 text-lg mb-4">The 6 on-chain and market indicators that have historically identified Bitcoin bear market bottoms with high accuracy.</p>
        <div className="text-sm text-yellow-400/80 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 mb-10">
          Disclaimer: These indicators are educational tools, not financial advice. Past performance does not guarantee future results.
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {INDICATORS.map((ind, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-white font-bold text-lg">{ind.name}</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium">{ind.accuracy}</span>
              </div>
              <p className="text-slate-400 text-sm mb-3">{ind.description}</p>
              <div className="bg-white/5 rounded-xl p-3 mb-3">
                <div className="text-xs text-slate-500 mb-1">Bear Market Bottom Signal</div>
                <div className="text-sm text-red-400 font-medium">{ind.bearSignal}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 mb-4">
                <div className="text-xs text-slate-500 mb-1">How To Use</div>
                <p className="text-xs text-slate-400 leading-relaxed">{ind.howToUse}</p>
              </div>
              <a href={ind.link} target={ind.link.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
                 className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors">
                View Chart →
              </a>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold text-xl mb-4">Historical Confluence at Past Bottoms</h2>
          <div className="space-y-4">
            {[
              { date: "November 2022 (~$15.5k)", signals: ["MVRV Z-Score at -0.4", "NUPL at capitulation", "Fear & Greed at 20", "Price below Realized Price", "Puell Multiple at 0.3"] },
              { date: "December 2018 (~$3,100)", signals: ["MVRV Z-Score at -0.5", "NUPL deep negative", "Fear & Greed at 8", "200WMA touched"] },
            ].map((event, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4">
                <div className="text-white font-semibold mb-2">{event.date}</div>
                <div className="flex flex-wrap gap-2">
                  {event.signals.map((s, j) => (
                    <span key={j} className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link to="/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Live Bear Clock</Link>
          <Link to="/fear-greed" className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Fear & Greed Index</Link>
        </div>
      </div>
    </div>
  );
}
