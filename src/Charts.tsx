import { useState, useEffect, useRef } from "react";
import type { RefObject } from "react";

const DATA = {
  q1Distribution: [
    { score: 1, label: "Strongly\nDisagree", count: 2, pct: 8 },
    { score: 2, label: "Disagree", count: 3, pct: 12 },
    { score: 3, label: "Neutral", count: 3, pct: 12 },
    { score: 4, label: "Agree", count: 3, pct: 12 },
    { score: 5, label: "Strongly\nAgree", count: 14, pct: 56 },
  ],
  means: [
    { id: "Q1", label: "Too Frequent", mean: 3.96, sd: 1.4, color: "#3B82F6" },
    { id: "Q2", label: "Irrelevant", mean: 3.8, sd: 1.12, color: "#3B82F6" },
    { id: "Q3", label: "Want Control", mean: 4.36, sd: 0.91, color: "#3B82F6" },
    {
      id: "Q4",
      label: "Control\nSufficient",
      mean: 2.84,
      sd: 1.4,
      color: "#F59E0B",
      surprise: true,
    },
    { id: "Q5", label: "Neg. Impact", mean: 3.72, sd: 1.46, color: "#3B82F6" },
    { id: "Q6", label: "Ignore", mean: 4.16, sd: 1.18, color: "#3B82F6" },
    {
      id: "Q7",
      label: "Better\nControl",
      mean: 4.24,
      sd: 1.05,
      color: "#3B82F6",
    },
  ],
  scatter: {
    points: [
      [5, 5],
      [5, 3],
      [1, 2],
      [2, 2],
      [3, 5],
      [5, 4],
      [5, 2],
      [5, 5],
      [5, 5],
      [3, 5],
      [5, 3],
      [4, 4],
      [4, 5],
      [5, 5],
      [5, 4],
      [5, 5],
      [5, 5],
      [5, 5],
      [5, 1],
      [2, 5],
      [4, 5],
      [4, 5],
      [4, 4],
      [5, 1],
      [3, 4],
      [1, 3],
      [2, 1],
      [5, 4],
    ],
    r: 0.342,
    p: 0.095,
  },
};

function useInView<T extends Element>(ref: RefObject<T | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

interface AnimatedBarProps {
  value: number;
  max: number;
  color: string;
  delay: number;
  animate: boolean;
}

function AnimatedBar({ value, max, color, delay, animate }: AnimatedBarProps) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth((value / max) * 100), delay);
      return () => clearTimeout(t);
    }
  }, [animate, value, max, delay]);
  return (
    <div
      style={{
        background: "#1a2035",
        borderRadius: 4,
        height: 36,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: 4,
          background: color,
          width: `${width}%`,
          transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: `0 0 20px ${color}55`,
        }}
      />
    </div>
  );
}

function Chart1({ animate }: { animate: boolean }) {
  const max = 14;
  return (
    <div>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "#64748b",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Q1 Distribution
        </span>
        <span
          style={{ fontSize: 11, color: "#334155", fontFamily: "monospace" }}
        >
          n=25 · mean=3.96 · mode=5
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {DATA.q1Distribution.map((d, i) => (
          <div
            key={d.score}
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 52px 44px",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: d.score === 5 ? "#f87171" : "#94a3b8",
                textAlign: "right",
              }}
            >
              {d.label.replace("\n", " ")}
            </div>
            <AnimatedBar
              value={d.count}
              max={max}
              color={d.score === 5 ? "#ef4444" : "#3b82f6"}
              delay={i * 100}
              animate={animate}
            />
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                color: "#e2e8f0",
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              {d.count}
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#475569",
                textAlign: "right",
              }}
            >
              {d.pct}%
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 16,
          padding: "8px 12px",
          background: "#ef444415",
          borderLeft: "2px solid #ef4444",
          borderRadius: "0 4px 4px 0",
        }}
      >
        <span
          style={{ fontFamily: "monospace", fontSize: 11, color: "#fca5a5" }}
        >
          56% strongly agree — notification overload is confirmed
        </span>
      </div>
    </div>
  );
}

function Chart2({ animate }: { animate: boolean }) {
  const maxMean = 5;
  return (
    <div>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "#64748b",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Mean Scores · All Questions
        </span>
        <span
          style={{ fontSize: 11, color: "#334155", fontFamily: "monospace" }}
        >
          ±1 SD shown
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {DATA.means.map((q, i) => {
          const [barW, setBarW] = useState(0);
          useEffect(() => {
            if (animate) {
              const t = setTimeout(
                () => setBarW((q.mean / maxMean) * 100),
                i * 80,
              );
              return () => clearTimeout(t);
            }
          }, [animate]);
          const sdLeft = Math.max(0, ((q.mean - q.sd) / maxMean) * 100);
          const sdRight = Math.min(100, ((q.mean + q.sd) / maxMean) * 100);
          return (
            <div
              key={q.id}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 72px 1fr 48px",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#475569",
                  textAlign: "right",
                }}
              >
                {q.id}
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: q.surprise ? "#fbbf24" : "#64748b",
                  lineHeight: 1.3,
                }}
              >
                {q.label.replace("\n", " ")}
                {q.surprise && (
                  <span
                    style={{ display: "block", color: "#f59e0b", fontSize: 9 }}
                  >
                    ★ surprise
                  </span>
                )}
              </div>
              <div style={{ position: "relative", height: 28 }}>
                {/* SD range */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: `${sdLeft}%`,
                    width: `${sdRight - sdLeft}%`,
                    height: 4,
                    background: q.surprise ? "#78350f44" : "#1e3a5f",
                    borderRadius: 2,
                    transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
                {/* Mean bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    borderRadius: 4,
                    background: q.surprise
                      ? "linear-gradient(90deg, #d97706, #fbbf24)"
                      : "linear-gradient(90deg, #1d4ed8, #3b82f6)",
                    width: `${barW}%`,
                    transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: `${i * 80}ms`,
                    boxShadow: q.surprise
                      ? "0 0 16px #f59e0b66"
                      : "0 0 12px #3b82f655",
                  }}
                />
                {/* Neutral line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "60%",
                    width: 1,
                    height: "100%",
                    background: "#334155",
                    zIndex: 2,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: "center",
                  color: q.surprise ? "#fbbf24" : "#e2e8f0",
                }}
              >
                {q.mean}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 14,
          display: "flex",
          gap: 20,
          padding: "8px 0",
          borderTop: "1px solid #1e293b",
        }}
      >
        <span
          style={{ fontFamily: "monospace", fontSize: 10, color: "#475569" }}
        >
          │ neutral (3.0) at 60%
        </span>
        <span
          style={{ fontFamily: "monospace", fontSize: 10, color: "#f59e0b" }}
        >
          ★ Q4 is the only question below neutral
        </span>
      </div>
    </div>
  );
}

function Chart3({ animate }: { animate: boolean }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const W = 360,
    H = 260,
    PAD = 40;
  const toX = (v: number) => PAD + ((v - 1) / 4) * (W - PAD * 2);
  const toY = (v: number) => H - PAD - ((v - 1) / 4) * (H - PAD * 2);
  const r = 0.342;
  const slope = r * 1.0;
  const intercept = 3.0 - slope * 3.0;
  const x1 = 1,
    x2 = 5;
  const y1 = slope * x1 + intercept;
  const y2 = slope * x2 + intercept;

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setDrawn(true), 200);
      return () => clearTimeout(t);
    }
  }, [animate]);

  const jitter = (v: number, seed: number) =>
    v + (((seed * 9301 + 49297) % 233280) / 233280 - 0.5) * 0.22;

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "#64748b",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Q1 × Q5 Correlation
        </span>
        <span
          style={{ fontFamily: "monospace", fontSize: 11, color: "#334155" }}
        >
          r=0.342 · p=0.095
        </span>
      </div>
      <svg
        ref={svgRef}
        width={W}
        height={H}
        style={{ width: "100%", maxWidth: W }}
      >
        {/* Grid */}
        {[1, 2, 3, 4, 5].map((v) => (
          <g key={v}>
            <line
              x1={toX(v)}
              y1={PAD}
              x2={toX(v)}
              y2={H - PAD}
              stroke="#1e293b"
              strokeWidth={1}
            />
            <line
              x1={PAD}
              y1={toY(v)}
              x2={W - PAD}
              y2={toY(v)}
              stroke="#1e293b"
              strokeWidth={1}
            />
            <text
              x={toX(v)}
              y={H - PAD + 14}
              textAnchor="middle"
              fill="#475569"
              fontSize={10}
              fontFamily="monospace"
            >
              {v}
            </text>
            <text
              x={PAD - 8}
              y={toY(v) + 4}
              textAnchor="end"
              fill="#475569"
              fontSize={10}
              fontFamily="monospace"
            >
              {v}
            </text>
          </g>
        ))}
        {/* Regression line */}
        <line
          x1={toX(x1)}
          y1={toY(y1)}
          x2={toX(x2)}
          y2={toY(y2)}
          stroke="#ef4444"
          strokeWidth={2}
          strokeDasharray={drawn ? "none" : "400"}
          strokeDashoffset={drawn ? 0 : 400}
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)",
          }}
          opacity={0.85}
        />
        {/* Points */}
        {DATA.scatter.points.map(([x, y], i) => (
          <circle
            key={i}
            cx={toX(jitter(x, i * 17))}
            cy={toY(jitter(y, i * 31))}
            r={drawn ? 4.5 : 0}
            fill="#3b82f6"
            fillOpacity={0.7}
            style={{ transition: `r 0.3s ease ${i * 25}ms` }}
          />
        ))}
        {/* Axis labels */}
        <text
          x={W / 2}
          y={H - 2}
          textAnchor="middle"
          fill="#64748b"
          fontSize={10}
          fontFamily="monospace"
        >
          Q1: Too Frequent
        </text>
        <text
          x={10}
          y={H / 2}
          textAnchor="middle"
          fill="#64748b"
          fontSize={10}
          fontFamily="monospace"
          transform={`rotate(-90, 10, ${H / 2})`}
        >
          Q5: Neg. Impact
        </text>
        {/* r label */}
        <rect
          x={W - PAD - 90}
          y={PAD}
          width={86}
          height={32}
          rx={4}
          fill="#0f172a"
          stroke="#1e293b"
        />
        <text
          x={W - PAD - 47}
          y={PAD + 12}
          textAnchor="middle"
          fill="#ef4444"
          fontSize={10}
          fontFamily="monospace"
        >
          r = 0.342
        </text>
        <text
          x={W - PAD - 47}
          y={PAD + 24}
          textAnchor="middle"
          fill="#64748b"
          fontSize={10}
          fontFamily="monospace"
        >
          p = 0.095
        </text>
      </svg>
      <div
        style={{
          marginTop: 8,
          padding: "8px 12px",
          background: "#1e293b",
          borderRadius: 4,
        }}
      >
        <span
          style={{ fontFamily: "monospace", fontSize: 11, color: "#94a3b8" }}
        >
          Moderate positive trend — marginal significance (p just above 0.05)
        </span>
      </div>
    </div>
  );
}

export default function Charts() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref);

  const charts = [
    {
      id: "01",
      title: "Response Distribution",
      sub: "Q1: Notifications too frequent",
      component: <Chart1 animate={inView && active === 0} />,
    },
    {
      id: "02",
      title: "Mean Scores",
      sub: "All 7 questions · ±1 SD",
      component: <Chart2 animate={inView && active === 1} />,
    },
    {
      id: "03",
      title: "Correlation Plot",
      sub: "Q1 × Q5 scatter",
      component: <Chart3 animate={inView && active === 2} />,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080e1a",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        width: "100%",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Syne:wght@400;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #080e1a; } ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ width: "100%", maxWidth: 720, marginBottom: 40 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 3,
              height: 40,
              background: "linear-gradient(180deg, #3b82f6, #1d4ed8)",
              borderRadius: 2,
            }}
          />
          <div>
            <div
              style={{
                fontSize: 11,
                color: "#475569",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              TSIS 3 · Freedom SuperApp · KBTU 2026
            </div>
            <div
              style={{
                fontSize: 24,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color: "#f1f5f9",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginTop: 4,
              }}
            >
              Push Notification Survey
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", gap: 24, marginTop: 16, paddingLeft: 19 }}
        >
          {[
            ["n = 25", "clean responses"],
            ["3.96", "Q1 mean"],
            ["4.36", "Q3 highest"],
            ["2.84", "Q4 surprise"],
          ].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>
                {val}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#475569",
                  letterSpacing: "0.08em",
                }}
              >
                {lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab nav */}
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          display: "flex",
          gap: 2,
          marginBottom: 2,
        }}
      >
        {charts.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              flex: 1,
              padding: "10px 0",
              background: active === i ? "#0f172a" : "transparent",
              border: "none",
              borderTop: `2px solid ${active === i ? "#3b82f6" : "transparent"}`,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: active === i ? "#3b82f6" : "#334155",
                letterSpacing: "0.15em",
              }}
            >
              CHART {c.id}
            </div>
            <div
              style={{
                fontSize: 12,
                color: active === i ? "#e2e8f0" : "#475569",
                marginTop: 2,
                fontWeight: active === i ? 600 : 400,
              }}
            >
              {c.title}
            </div>
          </button>
        ))}
      </div>

      {/* Chart panel */}
      <div
        ref={ref}
        style={{
          width: "100%",
          maxWidth: 720,
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "0 0 8px 8px",
          padding: 32,
          minHeight: 360,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#334155",
            letterSpacing: "0.1em",
            marginBottom: 24,
          }}
        >
          {charts[active].sub.toUpperCase()}
        </div>
        {charts[active].component}
      </div>

      {/* Footer note */}
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 10, color: "#1e3a5f" }}>
          30 raw → 5 removed (2 straight-liners, 3 speeders) → n=25
        </span>
        <span style={{ fontSize: 10, color: "#1e3a5f" }}>Likert 1–5</span>
      </div>
    </div>
  );
}
