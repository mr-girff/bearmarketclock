import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function fmt(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

const EXTENDED_BEARS = [
  { name: "2011 Bear Market", athDate: "Jun 2011", ath: 31.91, bottomDate: "Nov 2011", bottom: 2.01, drawdown: -93.7, durationDays: 163, recoveryDays: 588, recovered: true, cause: "Mt.Gox hack & early market panic" },
  { name: "2014-2015 Bear Market", athDate: "Nov 2013", ath: 1163, bottomDate: "Jan 2015", bottom: 152, drawdown: -86.9, durationDays: 411, recoveryDays: 1064, recovered: true, cause: "Mt.Gox collapse & regulatory fear" },
  { name: "2017-2018 Bear Market", athDate: "Dec 2017", ath: 19891, bottomDate: "Dec 2018", bottom: 3122, drawdown: -83.5, durationDays: 363, recoveryDays: 748, recovered: true, cause: "ICO bubble burst & regulatory crackdown" },
  { name: "2019 Summer Bear", athDate: "Jun 2019", ath: 13800, bottomDate: "Dec 2019", bottom: 6500, drawdown: -52.9, durationDays: 183, recoveryDays: 240, recovered: true, cause: "Libra announcement fallout" },
  { name: "2021-2022 Bear Market", athDate: "Nov 2021", ath: 69000, bottomDate: "Nov 2022", bottom: 15476, drawdown: -77.6, durationDays: 376, recoveryDays: 518, recovered: true, cause: "LUNA/UST collapse & FTX bankruptcy" },
  { name: "2025-2026 Bear Market", athDate: "Jan 2025", ath: 109000, bottomDate: "Ongoing", bottom: null, drawdown: -24.7, durationDays: null, recoveryDays: null, recovered: false, cause: "Post-halving correction & macro uncertainty" },
];

const STATS = [
  { label: "Average Bear Duration", value: "328 days", sub: "Across 5 major bears" },
  { label: "Average Max Drawdown", value: "-79.4%", sub: "From ATH to bottom" },
  { label: "Recovery Rate", value: "100%", sub: "All 5 completed bears recovered" },
  { label: "Avg Recovery Time", value: "632 days", sub: "From bottom to new ATH" },
];

export default function HistoryPage() {
  useEffect(() => {
    document.title = "Bitcoin Bear Market History 2011-2026 — Complete Timeline & Data";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Complete history of all Bitcoin bear markets from 2011 to 2026. Drawdown percentages, duration, causes, and recovery times for every major BTC bear market cycle.");
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <nav className="text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Bear Market History</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Bitcoin Bear Market History (2011–2026)</h1>
        <p className="text-slate-400 text-lg mb-10">Every major Bitcoin bear market — drawdowns, duration, causes, and how long recovery took.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATS.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">{s.value}</div>
              <div className="text-white text-sm font-medium">{s.label}</div>
              <div className="text-slate-500 text-xs mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-12">
          {EXTENDED_BEARS.map((bear, i) => (
            <div key={i} className={`bg-white/5 border rounded-2xl p-6 ${!bear.recovered ? "border-red-500/30" : "border-white/10"}`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-white font-bold text-lg">{bear.name}</h2>
                    {!bear.recovered && <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">Active</span>}
                    {bear.recovered && <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">Recovered</span>}
                  </div>
                  <p className="text-slate-400 text-sm mb-3">Cause: {bear.cause}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-slate-400">ATH: <span className="text-white">{fmt(bear.ath)}</span> ({bear.athDate})</span>
                    <span className="text-slate-400">Bottom: <span className="text-white">{bear.bottom ? fmt(bear.bottom) : "TBD"}</span> ({bear.bottomDate})</span>
                  </div>
                </div>
                <div className="flex gap-6 shrink-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{bear.drawdown}%</div>
                    <div className="text-xs text-slate-500">Max Drawdown</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{bear.durationDays ?? "—"}</div>
                    <div className="text-xs text-slate-500">Days Down</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${bear.recovered ? "text-green-400" : "text-slate-500"}`}>{bear.recoveryDays ?? "—"}</div>
                    <div className="text-xs text-slate-500">Recovery Days</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link to="/dca-calculator" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Try DCA Calculator</Link>
          <Link to="/bottom-indicators" className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-semibold transition-colors">View Bottom Indicators</Link>
        </div>
      </div>
    </div>
  );
}
