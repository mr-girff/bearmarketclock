import { useEffect, useRef, useState } from "react";

// Smooth catmull-rom spline through points
function catmullRomPath(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function BtcChartBackground({ isBearMarket }) {
  const [points, setPoints] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const pathRef = useRef(null);

  const W = 1440, H = 420;
  const PAD_X = 0, PAD_Y = 60;

  useEffect(() => {
    fetch("/api/history")
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data) || data.length < 2) return;
        const closes = data.map(d => d.c);
        const minP = Math.min(...closes);
        const maxP = Math.max(...closes);
        const range = maxP - minP || 1;
        const mapped = data.map((d, i) => ({
          x: PAD_X + (i / (data.length - 1)) * (W - PAD_X * 2),
          y: PAD_Y + (1 - (d.c - minP) / range) * (H - PAD_Y * 2),
        }));
        setPoints(mapped);
        setTimeout(() => setLoaded(true), 50);
      })
      .catch(() => {});
  }, []);

  if (points.length < 2) return null;

  const linePath = catmullRomPath(points);
  const last = points[points.length - 1];
  const first = points[0];
  const fillPath = `${linePath} L ${last.x} ${H} L ${first.x} ${H} Z`;

  const lineColor = isBearMarket ? "#ef4444" : "#22c55e";
  const gradId = isBearMarket ? "bearGrad" : "bullGrad";
  const gradStop1 = isBearMarket ? "rgba(239,68,68,0.25)" : "rgba(34,197,94,0.20)";
  const gradStop2 = isBearMarket ? "rgba(239,68,68,0.04)" : "rgba(34,197,94,0.03)";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradStop1} />
          <stop offset="100%" stopColor={gradStop2} />
        </linearGradient>
        {/* Clip path for left-to-right draw animation */}
        <clipPath id="drawClip">
          <rect x="0" y="0" width={W} height={H}>
            <animate
              attributeName="width"
              from="0"
              to={W}
              dur="2.2s"
              begin="0.2s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
              keyTimes="0;1"
            />
          </rect>
        </clipPath>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Subtle grid lines */}
      {[0.25, 0.5, 0.75].map(y => (
        <line
          key={y}
          x1={0} y1={PAD_Y + y * (H - PAD_Y * 2)}
          x2={W} y2={PAD_Y + y * (H - PAD_Y * 2)}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1"
          strokeDasharray="6 8"
        />
      ))}

      {/* Fill area under curve */}
      <path d={fillPath} fill={`url(#${gradId})`} clipPath="url(#drawClip)" />

      {/* Main line */}
      <path
        d={linePath}
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#glow)"
        clipPath="url(#drawClip)"
        style={{ opacity: 0.7 }}
      />

      {/* Pulsing dot at latest price */}
      <g clipPath="url(#drawClip)">
        <circle cx={last.x} cy={last.y} r="5" fill={lineColor} opacity="0.9" />
        <circle cx={last.x} cy={last.y} r="10" fill="none" stroke={lineColor} strokeWidth="1.5" opacity="0.4">
          <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
