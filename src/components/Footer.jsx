import React from "react";

export default function Footer() {
  return (
    <footer className="border-t porder-white/5 py-12 px-4 mt-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🐻</span>
              <span className="font-black text-white">Bear Market Clock</span>
            </div>
            <p className="text-slate-500 text-sm">Real-time Bitcoin bear market tracker.</p>
          </div>
          <div className="text-slate-600 text-xs text-center md:text-right">
            <p>Not financial advice. Data from CoinGecko & Alternative.me.</p>
            <p className="mt-1">Affiliate disclosure: we may earn commissions from links.</p>
            <p className="mt-2">{new Date().getFullYear()} BearMarketClock.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
