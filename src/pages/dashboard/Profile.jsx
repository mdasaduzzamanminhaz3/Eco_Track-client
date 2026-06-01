import  { useState } from "react";
import { motion } from "framer-motion";

export function Profile({ theme, dark, user }) {
  const E = "#10B981";
  const [first, setFirst] = useState(user?.name?.split(" ")[0] || "Asaduzzaman");
  const [last, setLast] = useState(user?.name?.split(" ")[1] || "Minhaz");
  const [email, setEmail] = useState(user?.email || "admin@gmail.com");
  const initials = (first[0] || "") + (last[0] || "");
  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 13, background: dark ? "rgba(255,255,255,0.06)" : "#f9fafb", border: `1px solid ${theme.border}`, color: theme.txt, outline: "none", boxSizing: "border-box" };
  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.txt, marginBottom: 4 }}>Profile</h1>
      <p style={{ fontSize: 13, color: theme.muted, marginBottom: 24 }}>Manage your account.</p>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        {/* avatar card */}
        <div style={{ width: 220, flexShrink: 0, padding: 24, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: dark ? "rgba(16,185,129,0.2)" : "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: E }}>
            {initials}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: theme.txt }}>{first} {last}</div>
            <div style={{ fontSize: 12, color: theme.muted, marginTop: 3 }}>User</div>
          </div>
          <button style={{ padding: "6px 16px", borderRadius: 8, background: "transparent", border: `1px solid ${theme.border}`, color: theme.muted, fontSize: 12, cursor: "pointer" }}>Change avatar</button>
        </div>

        {/* form */}
        <div style={{ flex: 1, padding: 24, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[["First name", first, setFirst], ["Last name", last, setLast]].map(([l, v, fn]) => (
              <div key={l}>
                <div style={{ fontSize: 12, color: theme.muted, marginBottom: 6 }}>{l}</div>
                <input value={v} onChange={e => fn(e.target.value)} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = E}
                  onBlur={e => e.target.style.borderColor = theme.border} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 6 }}>Email</div>
            <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}
              onFocus={e => e.target.style.borderColor = E}
              onBlur={e => e.target.style.borderColor = theme.border} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <motion.button style={{ padding: "9px 20px", borderRadius: 10, background: dark ? theme.txt : "#0f1e12", color: dark ? "#0f1e12" : "#fff", border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Save changes
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}