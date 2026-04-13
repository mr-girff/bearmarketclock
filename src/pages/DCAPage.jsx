import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function formatCurrency(n) {
  if (!n && n !== 0) return "-";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
function formatPct(n) {
  if (!n && n !== 0) return "-";
  return (n >= 0 ? "+" : "") + n.toFixed(1) + "%";
}

const PRESETS = [
  { label: "$50/month", amount: 50 },
  { label: "$100/month", amount: 100 },
  { label: "$200/month", amount: 200 },
  { label: "$500/month", amount: 500 },
];

const PERIODS = [
  { label: "2022 Bear (Jan 2022–Dec 2022)", startPrice: 47000, endPrice: 16500, months: 12 },
  { label: "2021–2022 Full Bear (Nov 2021–Nov 2022)", startPrice: 68000, endPrice: 15500, months: 13 },
  { label: "2018 Bear (Jan 2018–Dec 2018)", startPrice: 14000, endPrice: 3200, months: 12 },
  { label: "Custom", startPrice: null, endPrice: null, months: 12 },
];

function simulateDCA(monthlyAmount, months, startPrice, endPrice) {
  if (!monthlyAmount || !months || !startPrice || !endPrice) return null;
  const priceStep = (endPrice - startPrice) / (months - 1);
  let totalBTC = 0;
  let totalInvested = 0;
  const rows = [];
  for (let i = 0; i < months; i++) {
    const price = Math.max(1, startPrice + priceStep * i);
    const btc = monthlyAmount / price;
    totalBTC += btc;
    totalInvested += monthlyAmount;
    rows.push({ month: i + 1, price: Math.round(price), btc: btc.toFixed(6), cumBTC: totalBTC.toFixed(6), cumInvested: totalInvested, avgCost: Math.round(totalInvested / totalBTC) });
  }
  const finalValue = totalBTC * endPrice;
  const profit = finalValue - totalInvested;
  const roi = ((finalValue - totalInvested) / totalInvested) * 100;
  return { rows, totalBTC, totalInvested, finalValue, profit, roi, avgCost: totalInvested / totalBTC };
}

export default function DCAPage() {
  const [amount, setAmount] = useState(100);
  const [periodIdx, setPeriodIdx] = useState(0);
  const [customStart, setCustomStart] = useState(40000);
  const [customEnd, setCustomEnd] = useState(20000);
  const [customMonths, setCustomMonths] = useState(12);

  useEffect(() => {
    document.title = "Bitcoin DCA Calculator — Dollar Cost Average Backtest";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Free Bitcoin DCA calculator. Backtest dollar cost averaging strategies during Bitcoin bear markets. See exactly how much BTC you would have accumulated and your returns.");
  }, []);

  const period = PERIODS[periodIdx];
  const isCustom = periodIdx === PERIODS.length - 1;
  const startPrice = isCustom ? customStart : period.startPrice;
  const endPrice = isCustom ? customEnd : period.endPrice;
  const months = isCustom ? customMonths : period.months;
  const result = simulateDCA(amount, months, startPrice, endPrice);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">DCA Calculator</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Bitcoin DCA Calculator</h1>
        <p className="text-slate-400 text-lg mb-10">Backtest dollar-cost averaging through any Bitcoin bear market. See how consistent buying beats trying to time the market.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">Monthly Investment</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {PRESETS.map(p => (
                <button key={p.amount} onClick={() => setAmount(p.amount)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${amount === p.amount ? "bg-red-600 text-white" : "bg-white/10 text-slate-300 hover:bg-white/15"}`}>{p.label}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">$</span>
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white w-full" placeholder="Custom amount" min="1" />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">Bear Market Period</h2>
            <div className="space-y-2">
              {PERIODS.map((p, i) => (
                <button key={i} onClick={() => setPeriodIdx(i)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${periodIdx === i ? "bg-red-600/30 text-white border border-red-500/30" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{p.label}</button>
              ))}
            </div>
          </div>
        </div>

        {isCustom && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <h2 className="text-white font-semibold mb-4">Custom Period</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-slate-400 text-sm block mb-1">Start Price ($)</label>
                <input type="number" value={customStart} onChange={e => setCustomStart(Number(e.target.value))} className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white w-full" />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-1">End Price ($)</label>
                <input type="number" value={customEnd} onChange={e => setCustomEnd(Number(e.target.value))} className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white w-full" />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-1">Months</label>
                <input type="number" value={customMonths} onChange={e => setCustomMonths(Number(e.target.value))} className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white w-full" min="1" max="60" />
              </div>
            </div>
          </div>
        )}

        {result && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Invested", value: formatCurrency(result.totalInvested), color: "text-white" },
                { label: "BTC Accumulated", value: result.totalBTC.toFixed(5) + " BTC", color: "text-orange-400" },
                { label: "Avg Cost Basis", value: formatCurrency(result.avgCost), color: "text-blue-400" },
                { label: "ROI at Period End", value: formatPct(result.roi), color: result.roi >= 0 ? "text-green-400" : "text-red-400" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                  <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-slate-400 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-white font-semibold mb-4">Month-by-Month Breakdown</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-white/10">
                      <th className="text-left pb-3">Month</th>
                      <th className="text-right pb-3">BTC Price</th>
                      <th className="text-right pb-3">BTC Bought</th>
                      <th className="text-right pb-3">Total BTC</th>
                      <th className="text-right pb-3">Avg Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                        <td className="py-2 text-slate-400">{row.month}</td>
                        <td className="py-2 text-right text-white">{formatCurrency(row.price)}</td>
                        <td className="py-2 text-right text-orange-400">{row.btc}</td>
                        <td className="py-2 text-right text-white">{row.cumBTC}</td>
                        <td className="py-2 text-right text-blue-400">{formatCurrency(row.avgCost)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-2">Key DCA Insight</h2>
          <p className="text-slate-300 text-sm">DCA works because you automatically buy more Bitcoin when prices are low. The deeper the bear market, the more BTC you accumulate per dollar — turning fear into opportunity through mathematical discipline.</p>
        </div>
      </div>
    </div>
  );
}
