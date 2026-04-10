import React from "react";
import { BEAR_MARKETS } from "../hooks/useBitcoinData";

function fmt(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function HistoricalTable({ data }) {
  const { drawdown, daysSinceAth, price, ath, athDate, isBearMarket } = data;

  const current = isBearMarket
    ? {
        name: "Current Bear 🔴",
        athDate: athDate ? athDate.slice(0, 10) : "—",
        ath: ath,
        bottomDate: "???",
        bottom: "???",
        drawdown: drawdown?.toFixed(1),
        durationDays: daysSinceAth,
        recovered: false,
        isCurrent: true,
      }
    : null;

  const allMarkets = current ? [...BEAR_MARKETS, current] : BEAR_MARKETS;

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
        📊 Every Bitcoin{" "}
        <span className="text-gradient-red">Bear Market</span>
      </h2>
      <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
        History always repeats. Bears end. Patience wins.
      </p>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1e1e2e] text-slate-400">
              <th className="text-left py-3 px-4">Bear Market</th>
              <th className="text-right py-3 px-4">ATH Price</th>
              <th className="text-right py-3 px-4">Bottom Price</th>
              <th className="text-right py-3 px-4">Drawdown</th>
              <th className="text-right py-3 px-4">Duration</th>
              <th className="text-right py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {allMarkets.map((bear) => (
              <tr
                key={bear.name}
                className={`border-b border-[#1e1e2e] hover:bg-[#13131a] transition-colors ${bear.isCurrent ? "bg-red-500/5" : ""}`}
              >
                <td className="py-4 px-4 font-semibold">{bear.name}</td>
                <td className="py-4 px-4 text-right text-yellow-400">
                  {typeof bear.ath === "number" ? fmt(bear.ath) : bear.ath}
                </td>
                <td className="py-4 px-4 text-right text-red-400">
                  {typeof bear.bottom === "number" ? fmt(bear.bottom) : bear.bottom}
                </td>
                <td className="py-4 px-4 text-right font-bold text-red-500">
                  {typeof bear.drawdown === "number" ? `${bear.drawdown}%` : `${bear.drawdown}%`}
                </td>
                <td className="py-4 px-4 text-right">{bear.durationDays} days</td>
                <td className="py-4 px-4 text-right">
                  {bear.recovered ? (
                    <span className="text-green-400 font-semibold">✅ Recovered</span>
                  ) : (
                    <span className="text-red-400 font-semibold blink">🔴 Ongoing</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {allMarkets.map((bear) => (
          <div key={bear.name} className={`card-dark p-4 ${bear.isCurrent ? "border-red-500/40" : ""}`}>
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold">{bear.name}</span>
              {bear.recovered ? (
                <span className="text-green-400 text-sm">✅ Done</span>
              ) : (
                <span className="text-red-400 text-sm blink">🔴 Live</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><p className="text-slate-500">ATH</p><p className="text-yellow-400 font-semibold">{typeof bear.ath === "number" ? fmt(bear.ath) : bear.ath}</p></div>
              <div><p className="text-slate-500">Bottom</p><p className="text-red-400 font-semibold">{typeof bear.bottom === "number" ? fmt(bear.bottom) : bear.bottom}</p></div>
              <div><p className="text-slate-500">Drawdown</p><p className="text-red-500 font-bold">{bear.drawdown}%</p></div>
              <div><p className="text-slate-500">Duration</p><p className="font-semibold">{bear.durationDays} days</p></div>
            </div>
          </div>
        ))}
      </div>

      {/* Key insight */}
      <div className="mt-10 card-dark p-6 border-yellow-500/20 bg-yellow-500/5 text-center">
        <p className="text-yellow-400 text-xl font-bold mb-2">🔑 The Pattern</p>
        <p className="text-slate-300">
          Every single bear market ended. Average drawdown: <span className="text-red-400 font-bold">-85%</span>.
          Average duration: <span className="text-white font-bold">328 days</span>.
          After every bear, Bitcoin made <span className="text-green-400 font-bold">new all-time highs</span>.
        </p>
      </div>
    </section>
  );
}
