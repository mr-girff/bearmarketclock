import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useBitcoinData from "./hooks/useBitcoinData";

const HomePage = lazy(() => import("./pages/HomePage"));
const DCAPage = lazy(() => import("./pages/DCAPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const FearGreedPage = lazy(() => import("./pages/FearGreedPage"));
const SurvivalGuidePage = lazy(() => import("./pages/SurvivalGuidePage"));
const BottomIndicatorsPage = lazy(() => import("./pages/BottomIndicatorsPage"));
const RainbowChartPage = lazy(() => import("./pages/RainbowChartPage"));
const BlogIndexPage = lazy(() => import("./pages/BlogIndexPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const data = useBitcoinData();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage data={data} />} />
          <Route path="/dca-calculator" element={<DCAPage />} />
          <Route path="/history" element={<HistoryPage data={data} />} />
          <Route path="/fear-greed" element={<FearGreedPage fearGreed={data?.fearGreed} fearGreedLabel={data?.fearGreedLabel} />} />
          <Route path="/survival-guide" element={<SurvivalGuidePage />} />
          <Route path="/bottom-indicators" element={<BottomIndicatorsPage data={data} />} />
          <Route path="/rainbow-chart" element={<RainbowChartPage price={data?.price} />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center text-center px-4">
              <div>
                <div className="text-6xl mb-4">🐻</div>
                <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
                <p className="text-slate-400 mb-6">This page does not exist.</p>
                <a href="/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
