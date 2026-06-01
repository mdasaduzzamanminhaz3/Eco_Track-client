import { motion } from "framer-motion";
import { Ic } from "../../components/ui/Icons";
import { Counter } from "../../components/ui/Counter";
import { Pill } from "../../components/ui/Pill";
import { AreaChart } from "../../components/charts/AreaChart";
import { Gauge } from "../../components/charts/Gauge";

export function Overview({ theme, dark, setPage }) {
  const E = "#10B981";
  const chartData = [10, 18, 14, 26, 34, 42, 38, 50, 58, 66, 72, 80, 76];
  const chartLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const picks = [
    { t: "Plastic · 4.2 kg", id: "PCK-3211", s: "Collected" },
    { t: "E-waste · 1.8 kg", id: "PCK-3208", s: "Accepted" },
    { t: "Glass · 6.0 kg", id: "PCK-3201", s: "Pending" },
    { t: "Paper · 12.4 kg", id: "PCK-3197", s: "Collected" },
  ];
  const badges = ["Sprout", "Recycler", "Forest", "Ocean", "Aurora", "Titan"];

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifycontent: "space-between", alignitems: "flex-start", marginbottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.txt, marginBottom: 4 }}>
            Your <span style={{ color: E }}>eco impact</span>
          </h1>
          <p style={{ fontSize: 13, color: theme.muted }}>A live look at the waste you've diverted and the CO₂ you've avoided.</p>
        </div>
        <motion.button onClick={() => setPage("pickup")}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 10, background: E, color: "#fff", border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
          whileHover={{ scale: 1.03, background: "#059669" }} whileTap={{ scale: 0.97 }}>
          <Ic n="plus" s={15} c="#fff" /> New pickup
        </motion.button>
      </div>

      {/* stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 16 }}>
        {[
          { l: "Verified waste", v: 1248, suf: " kg", ic: "recycle" },
          { l: "CO₂ saved", v: 312.4, suf: " kg", ic: "leaf", dec: 1 },
          { l: "Green points", v: 8420, suf: "", ic: "trophy" },
          { l: "Leaderboard rank", v: 14, pre: "#", ic: "trend" },
        ].map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{ padding: 20, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: theme.muted }}>{s.l}</span>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic n={s.ic} s={14} c={E} />
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: theme.txt, marginBottom: 8 }}>
              <Counter to={s.v} suffix={s.suf} decimals={s.dec || 0} prefix={s.pre || ""} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: E, fontWeight: 600 }}>
              <Ic n="trend" s={11} c={E} /> +12.4% vs last week
            </div>
          </motion.div>
        ))}
      </div>

      {/* chart + gauge */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14, marginBottom: 16 }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ padding: 20, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 600, color: theme.txt, marginBottom: 3 }}>Weekly waste diverted</div>
              <div style={{ fontSize: 12, color: theme.muted }}>kg per day, verified by recyclers</div>
            </div>
            <div style={{ fontSize: 12, padding: "4px 12px", borderRadius: 8, background: dark ? "rgba(255,255,255,0.06)" : "#f3f4f6", color: theme.muted }}>This week</div>
          </div>
          <AreaChart data={chartData} labels={chartLabels} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}
          style={{ padding: 20, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: 600, color: theme.txt, marginBottom: 16 }}>Sustainability score</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <Gauge pct={78} />
          </div>
          <div style={{ marginTop: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
              <span style={{ color: theme.muted }}>Next: Forest Guardian</span>
              <span style={{ color: E, fontWeight: 600 }}>780/1000</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: dark ? "rgba(255,255,255,0.07)" : "#e5e7eb", overflow: "hidden" }}>
              <motion.div style={{ height: "100%", borderRadius: 99, background: E }} initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.4 }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* pickups + badges */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
          style={{ padding: 20, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}` }}>
          <div style={{ fontWeight: 600, color: theme.txt, marginBottom: 16 }}>Recent pickup requests</div>
          {picks.map((p, i) => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < picks.length - 1 ? `1px solid ${theme.border}` : "none" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: theme.txt }}>{p.t}</div>
                <div style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>{p.id}</div>
              </div>
              <Pill s={p.s} />
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.37 }}
          style={{ padding: 20, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}` }}>
          <div style={{ fontWeight: 600, color: theme.txt, marginBottom: 16 }}>Achievement badges</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {badges.map((b, i) => (
              <div key={b} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: i < 4 ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.04)", border: `2px solid ${i < 4 ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.07)"}`, opacity: i < 4 ? 1 : 0.35 }}>
                  <Ic n="trophy" s={18} c={i < 4 ? E : "rgba(255,255,255,0.3)"} />
                </div>
                <span style={{ fontSize: 11, color: i < 4 ? theme.txt : theme.muted, fontWeight: 500 }}>{b}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}