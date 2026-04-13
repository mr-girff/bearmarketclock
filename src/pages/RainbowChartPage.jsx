import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const RAINBOW_BANDS = [
  { label: "Maximum Bubble Territory", color: "#ef4444", note: "Take profits aggressively" },
  { label: "Sell. Seriously, SELL!", color: "#f97316", note: "Strong sell signal" },
  { label: "FOMO Intensifies", color: "#f59e0b", note: "Caution zone" },
  { label: "Is This a Bubble?", color: "#eab308", note: "Getting expensive" },
  { label: "HODL!", color: "#84cc16", note: "Hold your position" },
  { label: "Still Cheap", color: "#22c55e", note: "Good entry zone" },
  { label: "Accumulate", color: "#06b6d4", note: "Strong buy zone" },
  { label: "BUY!", color: "#3b82f6", note: "Excellent entry" },
  { label: "Basically a Fire Sale", color: "#8b5cf6", note: "Once-in-a-cycle opportunity" },
];

export default function RainbowChartPage({ price }) {
  useEffect(() => {
    document.title = "Bitcoin Rainbow Chart 2026 — Logarithmic Price Valuation";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Bitcoin Rainbow Chart 2026. See where BTC price sits on the historical logarithmic price rainbow. Is Bitcoin cheap or expensive based on long-term trend?");
  }, []);

  const currentPrice = price || 82000;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <nav className="text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Rainbow Chart</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Bitcoin Rainbow Chart</h1>
        <p className="text-slate-400 text-lg mb-4">Logarithmic regression-based price bands providing historical context for Bitcoin valuation.</p>
        <div className="text-sm text-yellow-400/80 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 mb-8">
          The Rainbow Chart is a simplified visual guide. View the original at{" "}
          <a href="https://www.blockchaincenter.net/en/bitcoin-rainbow-chart/" className="underline" target="_blank" rel="noopener noreferrer">BlockchainCenter.net</a>.
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="text-center mb-6">
            <div className="text-slate-400 text-sm mb-1">Current Bitcoin Price</div>
            <div className="text-4xl font-black text-white">${currentPrice.toLocaleString()}</div>
          </div>
          <div className="space-y-2">
            {RAINBOW_BANDS.map((band, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: band.color + "15", borderLeft: `4px solid ${band.color}` }}>
                <span className="font-medium text-sm" style={{ color: band.color }}>{band.label}</span>
                <span className="text-slate-400 text-xs">{band.note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-3">About the Bitcoin Rainbow Chart</h2>
          <p className="text-slate-400 text-sm mb-3">
            The Bitcoin Rainbow Chart was created to visualize long-term price trends using logarithmic regression.
            Each colored band represents a different valuation zone. In every major bear market, Bitcoin has reached
            the bottom bands (blue/purple), historically representing strong long-term buying opportunities.
          </p>
          <p className="text-slate-400 text-sm">
            Important: This is a fun visual tool, not a precise trading indicator. Always combine with fundamental
            and on-chain analysis like MVRV Z-Score and NUPL.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <a href="https://www.blockchaincenter.net/en/bitcoin-rainbow-chart/" target="_blank" rel="noopener noreferrer"
             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            View Full Chart →
          </a>
          <Link to="/bottom-indicators" className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            More Indicators
          </Link>
        </div>
      </div>
    </div>
  );
}
