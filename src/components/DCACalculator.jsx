import React, { useState, useMemo } from "react";

const BEAR_START_DATES = [
  { label: "2022 Jan (Last Bear Start)", value: "2022-01-01", athPrice: 47000 },
  { label: "2021 Nov (ATH)", value: "2021-11-01", athPrice: 68000 },
  { label: "2022 Jun (LUNA Crash)", value: "2022-06-01", athPrice: 30000 },
  { label: "2023 Jan (After FTX)", value: "2023-01-01", athPrice: 16500 },
];

function fmt(n) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n); }

export default function DCACalculator({ currentPrice }) {
  const [monthly, setMonthly] = useState(200);
  const [startDate, setStartDate] = useState(BEAR_START_DATES[0]);

  const results = useMemo(() => {
    if (!currentPrice) return null;
    const start = new Date(startDate.value);
    const now = new Date();
    const months = Math.max(1, (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth());
    const totalInvested = monthly * months;
    const avgPrice = (startDate.athPrice + currentPrice) / 2;
    const btcAccumulated = totalInvested / avgPrice;
    const currentValue = btcAccumulated * currentPrice;
    const pnl = currentValue - totalInvested;
    const pnlPct = (pnl / totalInvested) * 100;
    return { months, totalInvested, btcAccumulated, currentValue, pnl, pnlPct };
  }, [monthly, startDate, currentPrice]);

  const isProfit = results && results.pnl > 0;

  return (
    <section className="py-20 px-4 bg-[#0d0d14]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
          💈 Bear Market DCA{" "}
          <span className="text-gradient-gold">Calculator</span>
        </h2>
        <p className="text-slate-400 text-center mb-12">What if you kept buying through the pain? Let's see.</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-dark p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-200">Your DCA Setup</h3>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Monthly Investment</label>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">$</span>
                <input type="range" min={50} max={5000} step={50} value={monthly} onChange={e => setMonthly(Number(e.target.value))} className="flex-1 accent-red-500" />
                <span className="text-white font-bold w-20 text-right">{fmt(monthly)}</span>
              </div>
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Start Date</label>
              <div className="space-y-2">
                {BEAR_START_DATES.map(d => (
                  <button key={d.value} onClick={() => setStartDate(d)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${startDate.value === d.value ? "bg-red-500/20 border border-red-500/40 text-red-300" : "bg-[#1e1e2e] text-slate-400 hover:bg-[#2a2a3a]"}`}>{d.label} <span className="text-slate-500">({fmt(d.athPrice)})</span></button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {results ? (
              <>
                <div className={`card-dark p-6 border ${isProfit ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                  <p className="text-slate-400 text-sm mb-1">Portfolio Value Today</p>
                  <p className={`text-4xl font-black ${isProfit ? "text-green-400" : "text-red-400"}`}>{fmt(results.currentValue)}</p>
                  <p className={`text-lg font-semibold mt-1 ${isProfit ? "text-green-500" : "text-red-500"}`}>{isProfit ? "+" : ""}{fmt(results.pnl)} ({results.pnlPct.toFixed(1)}%)</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="card-dark p-4"><p>Total Invested</p><p className="text-xl font-bold text-white">{fmt(results.totalInvested)}</p></div>
                  <div className="card-dark p-4"><p className="text-slate-400 text-xs mb-1">BTC Accumulated</p><p className="text-xl font-bold text-yellow-400">{results.btcAccumulated.toFixed(4)} BTC</p></div>
                  <div className="card-dark p-4"><p className="text-slate-400 text-xs mb-1">Months DCA'd</p><p className="text-xl font-bold text-white">{results.months}</p></div>
                  <div className="card-dark p-4"><p className="text-slate-400 text-xs mb-1">Current BTC Price</p><p className="text-xl font-bold text-white">{currentPrice ? fmt(currentPrice) : "..."}</p></div>
                </div>
              </>
            ) : (
              <div className="card-dark p-6 text-center text-slate-400">Loading price data...</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
