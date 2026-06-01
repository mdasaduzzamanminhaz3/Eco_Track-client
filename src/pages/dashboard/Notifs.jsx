import { motion } from "framer-motion";

export function Notifs({ theme }) {
  const E = "#10B981";
  const ns = [
    { e: "✅", t: "Pickup collected!", d: "Marcus collected your plastic waste (PCK-3211). +345 Green Points earned!", time: "2 min ago", r: false },
    { e: "♻️", t: "New recycler nearby", d: "A verified recycler is now available in your area.", time: "1 hr ago", r: false },
    { e: "🏆", t: "Achievement unlocked!", d: "You earned the 'Forest Guardian' badge for 500 kg recycled!", time: "3 hr ago", r: true },
    { e: "📊", t: "Monthly report ready", d: "Your December eco impact report is available.", time: "Yesterday", r: true },
    { e: "🎯", t: "Level up incoming!", d: "220 more points to reach Eco Level 5.", time: "2 days ago", r: true },
  ];
  return (
    <div style={{ padding: 28, maxWidth: 640 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.txt, marginBottom: 3 }}>Notifications</h1>
          <span style={{ fontSize: 13, color: theme.muted }}>2 unread</span>
        </div>
        <button style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, background: "transparent", border: `1px solid ${theme.border}`, color: theme.muted, cursor: "pointer" }}>Mark all read</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ns.map((n, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
            style={{ display: "flex", gap: 14, padding: 16, borderRadius: 14, background: theme.card, border: `1px solid ${!n.r ? "rgba(16,185,129,0.3)" : theme.border}` }}>
            <div style={{ fontSize: 24, marginTop: 2 }}>{n.e}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: theme.txt }}>{n.t}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 12 }}>
                  <span style={{ fontSize: 11, color: theme.muted }}>{n.time}</span>
                  {!n.r && <div style={{ width: 8, height: 8, borderRadius: "50%", background: E }} />}
                </div>
              </div>
              <p style={{ fontSize: 12, color: theme.muted, marginTop: 4, lineHeight: 1.5 }}>{n.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}