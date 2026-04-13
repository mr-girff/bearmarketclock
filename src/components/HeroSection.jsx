import React from "react";
import BtcChartBackground from "./BtcChartBackground";

function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function StatCard({ label, value, sub, color }) {
  return (
    <div className="card-dark p-5 flex flex-col items-center backdrop-blur-sm bg-[#13131a]/80">
      <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function HeroSection({ data }) {
  const { price, ath, drawdown, isBearMarket, daysSinceAth, bearProgress, loading } = data;

  const statusColor = isBearMarket ? "text-red-500" : "text-green-400";
  const statusText = isBearMarket ? "YES — BEAR MARKET 🐫" : "NOT YET — STILL RECOVERING 📈";
  const statusBg = isBearMarket ? "border-red-500/30 bg-red-500/5" : "border-green-500/30 bg-green-500/5";

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 text-center relative overflow-hidden">

      {/* Background: ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl transition-colors duration-1000 ${isBearMarket ? "bg-red-600/6" : "bg-green-600/5"}`} />
      </div>

      {/* Background: 90-day price chart */}
      <div className="absolute inset-0 pointer-events-none">
        <BtcChartBackground isBearMarket={isBearMarket} />
      </div>

      {/* Bottom fade so chart bleeds into page */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0a0a0f)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6 bg-[#13131a]/90 border border-[#1e1e2e] rounded-full px-4 py-1.5 text-sm text-slate-400 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 blink" />
          Live data \u00b7 Updated every 30s
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 drop-shadow-lg">
          Are We In A{" "}
          <span className="text-gradient-red">Bear Market?</span>
        </h1>

        <div className={`border-2 rounded-2xl px-8 md:px-16 py-6 mb-10 ${statusBg} card-glow backdrop-blur-sm`}>
          <p className={`text-3xl md:text-5xl font-black ${statusColor}`}>
            {loading ? "Loading..." : statusText}
          </p>
          {isBearMarket && daysSinceAth && (
            <p className="text-slate-400 mt-2 text-lg">
              Day <span className="text-white font-bold">{daysSinceAth}</span> of this bear market
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-10">
          <StatCard label="Current BTC Price" value={loading ? "..." : fmt(price)} sub="USD" color="text-white" />
          <StatCard label="All-Time High" value={loading ? "..." : fmt(ath)} sub="USD peak" color="text-yellow-400" />
          <StatCard
            label="Down from ATH"
            value={loading ? "..." : `${drawdown?.toFixed(1)}%`}
            sub={loading ? "" : `${fmt(price)} \u2192 ${fmt(ath)}`}
            color="text-red-400"
          />
        </div>

        {isBearMarket && (
          <div className="w-full max-w-3xl mb-6">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Bear Market Progress</span>
              <span>{bearProgress?.toFixed(0)}% of avg duration (376 days)</span>
            </div>
            <div className="w-full bg-[#1e1e2e] rounded-full h-4 overflow-hidden">
              <div
                className="h-full rounded-full progress-shimmer transition-all duration-1000"
                style={{ width: `${bearProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>ATH Peak</span>
              <span>Historical Avg Bottom</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
