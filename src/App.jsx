import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HistoricalTable from "./components/HistoricalTable";
import FearGreedGauge from "./components/FearGreedGauge";
import DCACalculator from "./components/DCACalculator";
import BearInsights from "./components/BearInsights";
import AffiliateSection from "./components/AffiliateSection";
import EmailSubscribe from "./components/EmailSubscribe";
import Footer from "./components/Footer";
import { useBitcoinData } from "./hooks/useBitcoinData";

export default function App() {
  const data = useBitcoinData();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200">
      <Navbar />
      <HeroSection data={data} />
      <div id="history"><HistoricalTable data={data} /></div>
      <FearGreedGauge fearGreed={data.fearGreed} fearGreedLabel={data.fearGreedLabel} />
      <div id="calculator"><DCACalculator currentPrice={data.price} /></div>
      <div id="guide"><BearInsights /></div>
      <div id="tools"><AffiliateSection /></div>
      <EmailSubscribe />
      <Footer />
    </div>
  );
}
