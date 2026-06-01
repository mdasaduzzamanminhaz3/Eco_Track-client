import  { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ic } from "../../components/ui/Icons";

export function Pickup({ theme, dark }) {
  const [step, setStep] = useState(1);
  const [cat, setCat] = useState("");
  const [done, setDone] = useState(false);
  const E = "#10B981";
  const cats = [["🧴", "Plastic"], ["📄", "Paper"], ["🔩", "Metal"], ["🫙", "Glass"], ["💻", "E-Waste"], ["🌿", "Organic"]];

  if (done) return (
    <div style={{ padding: 28, display: "flex", justifyContent: "center", paddingTop: 80 }}>
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        style={{ padding: 48, borderRadius: 20, background: theme.card, border: `1px solid ${theme.border}`, textAlign: "center", maxWidth: 360 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: theme.txt, marginBottom: 8 }}>Request submitted!</div>
        <div style={{ fontSize: 13, color: theme.muted, marginBottom: 20 }}>A recycler near you will accept shortly.</div>
        <div style={{ fontSize: 13, padding: "8px 16px", borderRadius: 10, background: "rgba(16,185,129,0.1)", color: E, border: "1px solid rgba(16,185,129,0.3)", fontFamily: "monospace", marginBottom: 20 }}>
          PCK-{Math.floor(Math.random() * 9000 + 1000)}
        </div>
        <button onClick={() => { setDone(false); setStep(1); setCat(""); }}
          style={{ padding: "9px 20px", borderRadius: 10, background: E, color: "#fff", border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
          New request
        </button>
      </motion.div>
    </div>
  );

  const btnStyle = (active) => ({ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: active ? E : dark ? "rgba(255,255,255,0.06)" : "#f3f4f6", color: active ? "#fff" : theme.muted, fontWeight: 600, fontSize: 13, cursor: "pointer" });
  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 13, background: dark ? "rgba(255,255,255,0.06)" : "#f9fafb", border: `1px solid ${theme.border}`, color: theme.txt, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.txt, marginBottom: 4 }}>New pickup</h1>
      <p style={{ fontSize: 13, color: theme.muted, marginBottom: 28 }}>Schedule a waste collection in a few steps.</p>
      <div style={{ maxWidth: 500 }}>
        {/* steps */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
          {["Category", "Details", "Location", "Review"].map((name, i) => (
            <div key={name} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: step > i + 1 ? E : step === i + 1 ? "rgba(16,185,129,0.18)" : "rgba(255,255,255,0.05)", color: step > i + 1 ? "#fff" : step === i + 1 ? E : theme.muted, border: `2px solid ${step >= i + 1 ? E : "rgba(255,255,255,0.1)"}` }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 11, color: step === i + 1 ? E : theme.muted, whiteSpace: "nowrap" }}>{name}</span>
              </div>
              {i < 3 && <div style={{ flex: 1, height: 2, marginBottom: 16, background: step > i + 1 ? E : "rgba(255,255,255,0.08)" }} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              style={{ padding: 24, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}` }}>
              <div style={{ fontWeight: 600, color: theme.txt, marginBottom: 16 }}>What are you recycling?</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
                {cats.map(([em, l]) => (
                  <motion.button key={l} onClick={() => setCat(l)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    style={{ padding: 16, borderRadius: 12, border: `1.5px solid ${cat === l ? E : theme.border}`, background: cat === l ? "rgba(16,185,129,0.12)" : dark ? "rgba(255,255,255,0.03)" : "#f9fafb", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{em}</div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: cat === l ? E : theme.muted }}>{l}</div>
                  </motion.button>
                ))}
              </div>
              <button disabled={!cat} onClick={() => setStep(2)} style={{ ...btnStyle(true), width: "100%", opacity: cat ? 1 : 0.35 }}>Continue</button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              style={{ padding: 24, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontWeight: 600, color: theme.txt }}>Waste details</div>
              {[["Estimated weight (kg)", "e.g. 2.5", "number"], ["Notes", "Any special instructions…", "text"]].map(([l, p, t]) => (
                <div key={l}>
                  <div style={{ fontSize: 12, color: theme.muted, marginBottom: 6 }}>{l}</div>
                  <input type={t} placeholder={p} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = E}
                    onBlur={e => e.target.style.borderColor = theme.border} />
                </div>
              ))}
              <div style={{ border: `2px dashed ${theme.border}`, borderRadius: 10, padding: 24, textAlign: "center" }}>
                <Ic n="camera" s={24} c={theme.muted} />
                <div style={{ fontSize: 13, color: theme.muted, marginTop: 8 }}>Upload waste photo</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(1)} style={btnStyle(false)}>Back</button>
                <button onClick={() => setStep(3)} style={btnStyle(true)}>Continue</button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              style={{ padding: 24, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontWeight: 600, color: theme.txt }}>Pickup location</div>
              <button style={{ padding: 12, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: E, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Ic n="location" s={16} c={E} /> Use current location
              </button>
              <div style={{ textAlign: "center", fontSize: 12, color: theme.muted }}>— or —</div>
              <input placeholder="Enter address manually" style={inputStyle}
                onFocus={e => e.target.style.borderColor = E}
                onBlur={e => e.target.style.borderColor = theme.border} />
              <div style={{ height: 120, borderRadius: 10, background: dark ? "rgba(16,185,129,0.04)" : "#f0fdf4", border: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }}>
                  <defs><pattern id="gp" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke={E} strokeWidth="0.5" /></pattern></defs>
                  <rect width="100%" height="100%" fill="url(#gp)" />
                </svg>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Ic n="location" s={28} c={E} />
                </motion.div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} style={btnStyle(false)}>Back</button>
                <button onClick={() => setStep(4)} style={btnStyle(true)}>Continue</button>
              </div>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              style={{ padding: 24, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontWeight: 600, color: theme.txt }}>Confirm request</div>
              {[["Category", cat], ["Location", "Current location"], ["Status", "Pending recycler"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${theme.border}` }}>
                  <span style={{ fontSize: 13, color: theme.muted }}>{l}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: theme.txt }}>{v}</span>
                </div>
              ))}
              <div style={{ padding: 12, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: E, fontSize: 13 }}>
                🌱 You'll earn approximately +240 Green Points
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(3)} style={btnStyle(false)}>Back</button>
                <button onClick={() => setDone(true)} style={btnStyle(true)}>Submit request</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}