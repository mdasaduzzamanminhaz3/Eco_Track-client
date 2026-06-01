import { motion } from "framer-motion";
import { Ic } from "../../components/ui/Icons";

export function MapView({ theme, dark }) {
  const E = "#10B981";
  const centers = [
    { n: "GreenCycle Hub", d: "0.8 km", t: "Plastic, Paper", r: 4.8 },
    { n: "EcoRecycle Center", d: "1.4 km", t: "Metal, Glass", r: 4.6 },
    { n: "Nature's Loop", d: "2.1 km", t: "Organic, Plastic", r: 4.9 },
    { n: "Urban Green Co.", d: "3.2 km", t: "All types", r: 4.7 },
  ];
  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.txt, marginBottom: 4 }}>Map</h1>
      <p style={{ fontSize: 13, color: theme.muted, marginBottom: 24 }}>Find verified recyclers near your location.</p>
      <div style={{ display: "flex", gap: 16, height: 420 }}>
        <div style={{ width: 240, flexShrink: 0, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: 12, borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8, background: dark ? "rgba(255,255,255,0.05)" : "#f9fafb" }}>
              <Ic n="search" s={13} c={theme.muted} />
              <input placeholder="Search recyclers…" style={{ background: "transparent", border: "none", outline: "none", fontSize: 12, color: theme.txt, flex: 1 }} />
            </div>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 8 }}>
            {centers.map(c => (
              <motion.div key={c.n} style={{ padding: 12, borderRadius: 10, marginBottom: 6, background: dark ? "rgba(255,255,255,0.03)" : "#f9fafb", border: `1px solid ${theme.border}`, cursor: "pointer" }}
                whileHover={{ background: "rgba(16,185,129,0.07)" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.txt, marginBottom: 3 }}>{c.n}</div>
                <div style={{ fontSize: 11, color: theme.muted }}>📍 {c.d} · ⭐ {c.r}</div>
                <div style={{ fontSize: 11, color: E, marginTop: 4 }}>{c.t}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, borderRadius: 16, background: dark ? "rgba(16,185,129,0.04)" : "#f0fdf4", border: `1px solid ${theme.border}`, position: "relative", overflow: "hidden" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }}>
            <defs><pattern id="gm" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M 36 0 L 0 0 0 36" fill="none" stroke={E} strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#gm)" />
          </svg>
          {[{ x: "40%", y: "48%", l: "You", p: true }, { x: "62%", y: "28%", l: "GreenCycle" }, { x: "70%", y: "58%", l: "EcoRecycle" }, { x: "28%", y: "65%", l: "Nature's Loop" }].map(pin => (
            <motion.div key={pin.l} style={{ position: "absolute", left: pin.x, top: pin.y, transform: "translate(-50%,-100%)", display: "flex", flexDirection: "column", alignItems: "center" }}
              animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: Math.random() * 2 }}>
              <div style={{ padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, marginBottom: 3, background: pin.p ? E : dark ? "#0e1f12" : "#fff", color: pin.p ? "#fff" : E, border: `1px solid ${pin.p ? E : "rgba(16,185,129,0.4)"}`, whiteSpace: "nowrap" }}>{pin.l}</div>
              <Ic n="location" s={pin.p ? 24 : 18} c={E} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}