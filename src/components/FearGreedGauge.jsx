import React from "react";

const LABELS = [
  { range: [0, 24], label: "Extreme Fear", color: "#ef4444", emoji: "😱" },
  { range: [25, 44], label: "Fear", color: "#f97316", emoji: "😰" },
  { range: [45, 55], label: "Neutral", color: "#eab308", emoji: "🙀" },
  { range: [56, 74], label: "Greed", color: "#84cc16", emoji: "🤍" },
  { range: [75, 100], label: "Extreme Greed", color: "#22c55e", emoji: "🤍0���" },
];

function getInfo(value) {
  return LABELS.find(({ range: [lo, hi] }) => value >= lo && value <= hi);
}

export default function FearGreedGauge({ value = 50, label = "Neutral", loading }) {
  const info = getInfo(value);
  const color = info?.color || "#eab308";
  const emoji = info?.emoji || "🙀";

  // SVG arc gauge
  const radius = 70;
  const cx = 100, cy = 100;
  const circumference = Math.PI * radius; // half circle
  const progress = (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 8 200 120" width="240">
        {/* Background arc */}
        <path
          d="M 15 100 A 85 85 0 0 1 185 100"
          fill="none"
          stroke="#1f2a37"
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d="M 15 100 A 85 85 0 0 1 185 100"
          fill="none"
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
        { /* Value text */}
        <text x="100" y="94" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold">
          {loading ? "-" : value}
        </text>
      </svg>

      <div className="text-center -mt-2">
        <p className="text-2xl font-bold" style={{ color }}>
          {emoji} {label}
        </p>
        <p className="text-xs text-gray-500 mt-1">Fear &amp; Greed Index</p>
      </div>
    </div>
  );
}
