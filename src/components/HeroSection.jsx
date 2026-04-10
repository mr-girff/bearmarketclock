import React from "react";

function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function HeroSection({ data }) {
  const { price, ath, drawdown, isBearMarket, daysSinceAth, bearProgress, loading } = data;

  const statusColor = isBearMarket ? "text-red-500" : "text-green-400";
  const statusText = isBearMarket ? "YES — BEAR MARKET 🐻" : "NOT YET — STILL RECOVERING 🟢";
  const statusBg = isBearMarket ? "border-red-500/30 bg-red-500/5" : "border-green-500/30 bg-green-500/5";

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl" />
      </div>
      <div className="flex items-center gap-2 mb-6 bg-[#13131a] border border-[#1e1e2e] rounded-full px-4 py-1.5 text-sm text-slate-400">
        <span className="w4 h-2 rounded-full bg-red-500 blink" />
        Live data · Updated every 5 min
      </div>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8">
        Are We In A{" "}
        <span className="text-gradient-red">Bear Market?</span>
      </h1>
      <div className={`border-2 rounded-2xl px-8 md:px-16 py-6 mb-10 ${statusBg} card-glow`}>
        <p className={`text-3xl md:text-5xl font-black ${statusColor}`}>
          {loading ? "Loading..." : statusText}
        </p>
        {isBearMarket && daysSinceAth && (
          <p className="text-slate-400 mt-2 text-lg">Day <span className="text-white font-bold">{daysSinceAth}</span> of this bear market</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-10">
        <StatCard label="Current BTC Price" value={loading ? "..." : fmt(price)} sub="USD" color="text-white" />
        <StatCard label="All-Time High" value={loading ? "..." : fmt(ath)} sub="USD peak" color="text-yellow-400" />
        <StatCard label="Down from ATH" value={loading ? "..." : `${drawdown?.toFixed(1)}%`} sub={loading ? "" : `${fmt(price)} → ${fmt(ath)}`} color="text-red-400" />
      </div>
      {isBearMarket && (
        <div className="w-full max-w-3xl mb-6">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Bear Market Progress</span>
            <span>{bearProgress?.toFixed(0)}% of avg duration (376 days)</span>
          </div>
          <div className="w-full bg-[#1e1e2e] rounded-full h-4 overflow-hidden">
            <div className="h-full rounded-full progress-shimmer transition-all duration-1000" style={{ width: `${bearProgress}%` }} />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>ATH Peak</span>
            <span>Historical Avg Bottom (376 days)</span>
          </div>
        </div>
      )}
      <div className="mt-8 text-slate-500 text-sm animate-bounce">↓ See historical comparison</div>
    </section>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div className="card-dark p-6 card-glow flex flex-col items-center text-center">
      <p className="text-slate-400 text-sm mb-2">{label}</p>
      <p className={`text-3xl font-black ${color} mb-1`}>{value}</p>
      <p className="text-slate-500 text-xs">{sub}</p>
    </div>
  );
}
