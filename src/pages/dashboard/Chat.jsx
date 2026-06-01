import  { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Ic } from "../../components/ui/Icons";

export function Chat({ theme, dark }) {
  const E = "#10B981";
  const LIME = "#84CC16";
  const [msgs, setMsgs] = useState([
    { id: 1, from: "r", text: "Hi! Accepted your pickup. ETA ~15 mins.", time: "2:30 PM" },
    { id: 2, from: "me", text: "Great! Bags are near the gate.", time: "2:31 PM" },
    { id: 3, from: "r", text: "Perfect 👍 Confirm the address?", time: "2:32 PM" },
    { id: 4, from: "me", text: "123 Green Street, near the red mailbox.", time: "2:33 PM" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  function send() {
    if (!input.trim()) return;
    setMsgs(m => [...m, { id: Date.now(), from: "me", text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { id: Date.now() + 1, from: "r", text: "Got it! On my way 🌱", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 1800);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <div style={{ padding: 28, display: "flex", gap: 16, height: "calc(100vh - 56px)", maxHeight: 620 }}>
      {/* list */}
      <div style={{ width: 240, flexShrink: 0, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", fontWeight: 600, color: theme.txt, borderBottom: `1px solid ${theme.border}` }}>Messages</div>
        {[{ n: "Marcus (Recycler)", l: "Got it! On my way 🌱", t: "Now", u: 1 }, { n: "EcoTrack Support", l: "Request processed.", t: "Yesterday", u: 0 }].map((c, i) => (
          <div key={c.n} style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, cursor: "pointer", background: i === 0 ? "rgba(16,185,129,0.07)" : "transparent" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${E}99,${LIME}66)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff", flexShrink: 0 }}>{c.n[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: theme.txt, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.n}</span>
                <span style={{ fontSize: 11, color: theme.muted, marginLeft: 4, flexShrink: 0 }}>{c.t}</span>
              </div>
              <div style={{ fontSize: 11, color: theme.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.l}</div>
            </div>
            {c.u > 0 && <div style={{ width: 16, height: 16, borderRadius: "50%", background: E, color: "#fff", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.u}</div>}
          </div>
        ))}
      </div>

      {/* window */}
      <div style={{ flex: 1, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: `1px solid ${theme.border}` }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${E},${LIME})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff" }}>M</div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: E, border: `2px solid ${theme.card}` }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.txt }}>Marcus (Recycler)</div>
            <div style={{ fontSize: 11, color: E }}>Online · PCK-3211</div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
          {msgs.map(m => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
              <div>
                <div style={{ maxWidth: 280, padding: "9px 14px", borderRadius: m.from === "me" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.from === "me" ? E : dark ? "rgba(255,255,255,0.07)" : "#f3f4f6", color: m.from === "me" ? "#fff" : theme.txt, fontSize: 13 }}>
                  {m.text}
                </div>
                <div style={{ fontSize: 10, color: theme.muted, marginTop: 4, textAlign: m.from === "me" ? "right" : "left" }}>{m.time}</div>
              </div>
            </motion.div>
          ))}
          {typing && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: dark ? "rgba(255,255,255,0.07)" : "#f3f4f6", display: "flex", gap: 4 }}>
                {[0, 0.2, 0.4].map((d, i) => (
                  <motion.div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: theme.muted }}
                    animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: d, repeat: Infinity }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ padding: 14, borderTop: `1px solid ${theme.border}`, display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Type a message…"
            style={{ flex: 1, padding: "9px 14px", borderRadius: 10, fontSize: 13, background: dark ? "rgba(255,255,255,0.06)" : "#f9fafb", border: `1px solid ${theme.border}`, color: theme.txt, outline: "none" }}
            onFocus={e => e.target.style.borderColor = E}
            onBlur={e => e.target.style.borderColor = theme.border} />
          <motion.button onClick={send} style={{ padding: "9px 14px", borderRadius: 10, background: E, border: "none", cursor: "pointer" }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Ic n="send" s={16} c="#fff" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}