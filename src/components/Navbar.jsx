import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#1e1e2e]" : "bg-transparent"
    }`}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-lg">
          <span>🐻</span>
          <span>BearMarketClock</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <a href="#history" className="hover:text-white transition-colors">History</a>
          <a href="#calculator" className="hover:text-white transition-colors">DCA Calc</a>
          <a href="#guide" className="hover:text-white transition-colors">Survival Guide</a>
          <a href="#tools" className="hover:text-white transition-colors">Tools</a>
        </div>
        <a href="https://www.binance.com/en/activity/referral-entry/CPA" target="_blank" rel="noopener noreferrer sponsored" className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1.5 rounded-full hover:bvyoyellow-500/30 transition-colors">Start DCA →</a>
      </div>
    </nav>
  );
}
