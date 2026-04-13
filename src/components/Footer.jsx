import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 mt-16 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="text-white font-bold mb-4">🐻 Bear Market Clock</div>
            <p className="text-slate-500 text-sm">Track Bitcoin bear markets in real time. Data-driven tools for crypto investors.</p>
          </div>
          <div>
            <div className="text-slate-400 font-semibold text-sm uppercase tracking-wider mb-4">Tools</div>
            <div className="space-y-2">
              <Link to="/" className="block text-slate-500 hover:text-slate-300 text-sm transition-colors">Bear Market Clock</Link>
              <Link to="/dca-calculator" className="block text-slate-500 hover:text-slate-300 text-sm transition-colors">DCA Calculator</Link>
              <Link to="/bottom-indicators" className="block text-slate-500 hover:text-slate-300 text-sm transition-colors">Bottom Indicators</Link>
              <Link to="/rainbow-chart" className="block text-slate-500 hover:text-slate-300 text-sm transition-colors">Rainbow Chart</Link>
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold text-sm uppercase tracking-wider mb-4">Research</div>
            <div className="space-y-2">
              <Link to="/history" className="block text-slate-500 hover:text-slate-300 text-sm transition-colors">Bear Market History</Link>
              <Link to="/fear-greed" className="block text-slate-500 hover:text-slate-300 text-sm transition-colors">Fear & Greed Index</Link>
              <Link to="/survival-guide" className="block text-slate-500 hover:text-slate-300 text-sm transition-colors">Survival Guide</Link>
              <Link to="/blog" className="block text-slate-500 hover:text-slate-300 text-sm transition-colors">Blog</Link>
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold text-sm uppercase tracking-wider mb-4">Disclaimer</div>
            <p className="text-slate-500 text-xs leading-relaxed">Not financial advice. All content is for educational purposes only. Always do your own research before investing.</p>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">© 2026 BearMarketClock.com</p>
          <p className="text-slate-600 text-xs">Data: CoinGecko · Alternative.me · Binance</p>
        </div>
      </div>
    </footer>
  );
}
