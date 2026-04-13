import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "🐻 Live Clock" },
  { to: "/dca-calculator", label: "DCA Calculator" },
  { to: "/history", label: "History" },
  { to: "/fear-greed", label: "Fear & Greed" },
  { to: "/bottom-indicators", label: "Indicators" },
  { to: "/survival-guide", label: "Survival Guide" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
          <span>🐻</span>
          <span className="hidden sm:inline">BearMarketClock</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                (link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to))
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden text-slate-400 hover:text-white p-2" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0a0a0f] border-b border-white/10 px-4 pb-4">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block py-3 text-slate-300 hover:text-white border-b border-white/5 text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
