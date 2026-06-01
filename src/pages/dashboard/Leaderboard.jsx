import { motion } from "framer-motion";

export function Leaderboard({ theme, dark }) {
  const E = "#10B981";
  const LIME = "#84CC16";
  const rows = [
    { r: 1, n: "Emma Wilson", pts: 12840, chg: "+2" },
    { r: 2, n: "James Park", pts: 11200, chg: "-1" },
    { r: 3, n: "Luna Chen", pts: 9850, chg: "+3" },
    { r: 4, n: "Carlos Rivera", pts: 8420, chg: "0" },
    { r: 5, n: "Nina Patel", pts: 7890, chg: "+1" },
    { r: 6, n: "Tom Bradley", pts: 6540, chg: "-2" },
    { r: 7, n: "Sophie Martin", pts: 5920, chg: "+4" },
    { r: 8, n: "Asaduzzaman M.", pts: 4820, chg: "+1", me: true },
    { r: 9, n: "Ray Kim", pts: 4200, chg: "0" },
    { r: 10, n: "Maya Singh", pts: 3980, chg: "+2" },
  ];
  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.txt, marginBottom: 4 }}>Leaderboard</h1>
      <p style={{ fontSize: 13, color: theme.muted, marginBottom: 24 }}>Your global eco-warrior ranking.</p>
      {/* podium */}
      <div style={{ padding: 24, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 24 }}>
          {[rows[1], rows[0], rows[2]].map((r, i) => {
            const first = i === 1;
            const h = first ? 80 : i === 0 ? 56 : 44;
            return (
              <div key={r.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                {first && <motion.div style={{ fontSize: 20 }} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>👑</motion.div>}
                <div style={{ width: first ? 52 : 44, height: first ? 52 : 44, borderRadius: "50%", background: first ? `linear-gradient(135deg,${E},${LIME})` : dark ? "rgba(255,255,255,0.1)" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: first ? 18 : 14, color: first ? "#fff" : theme.txt }}>
                  {r.n[0]}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.txt, textAlign: "center", maxWidth: 80 }}>{r.n}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: E }}>{r.pts.toLocaleString()}</div>
                <div style={{ height: h, width: 60, borderRadius: "8px 8px 0 0", background: first ? "rgba(16,185,129,0.15)" : dark ? "rgba(255,255,255,0.05)" : "#f3f4f6", border: `1px solid ${first ? "rgba(16,185,129,0.3)" : theme.border}`, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 8, fontSize: 18 }}>
                  {["🥈", "🥇", "🥉"][i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ borderRadius: 16, overflow: "hidden", background: theme.card, border: `1px solid ${theme.border}` }}>
        {rows.map((r, i) => (
          <motion.div key={r.r} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < rows.length - 1 ? `1px solid ${theme.border}` : "none", background: r.me ? "rgba(16,185,129,0.07)" : "transparent" }}>
            <div style={{ width: 28, fontSize: 14, fontWeight: 700, color: r.r <= 3 ? E : theme.muted }}>
              {r.r <= 3 ? ["🥇", "🥈", "🥉"][r.r - 1] : `#${r.r}`}
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: r.me ? `linear-gradient(135deg,${E},${LIME})` : dark ? "rgba(255,255,255,0.1)" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: r.me ? "#fff" : theme.txt }}>
              {r.n[0]}
            </div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: r.me ? E : theme.txt }}>{r.n}{r.me && " (you)"}</div>
            <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: E }}>{r.pts.toLocaleString()}</div>
            <div style={{ width: 36, fontSize: 12, textAlign: "right", fontWeight: 600, color: r.chg.startsWith("+") ? E : r.chg === "0" ? theme.muted : "#F87171" }}>
              {r.chg === "0" ? "—" : r.chg}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}