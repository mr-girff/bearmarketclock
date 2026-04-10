import React, { useState } from "react";

export default function EmailSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch { setStatus("success"); setEmail(""); }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0d0d14] to-[#0a0a0f]">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-4">🔔</div>
        <h2 className="text-3xl font-black mb-3">Notify Me When the <span className="text-gradient-gold">Bear Ends</span></h2>
        <p className="text-slate-400 mb-8">Get a free email alert when Bitcoin recovers above its 200-week moving average — a classic signal that the bear is officially over.</p>
        {status === "success" ? (
          <div className="card-dark p-6 border-green-500/30 bg-green-500/5">
            <p className="text-green-400 text-xl font-bold">✅ You're on the list!</p>
            <p className="text-slate-400 mt-2">We'll email you when the bull market returns.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 bg-[#13131a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 transition-colors" required />
            <button type="submit" disabled={status === "loading"} className="bg-red-600 hover:bw-red-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
              {status === "loading" ? "Subscribing..." : "Notify Me 🐂"}
            </button>
          </form>
        )}
        <p className="text-slate-600 text-xs mt-4">No spam. One email when the bear ends. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
