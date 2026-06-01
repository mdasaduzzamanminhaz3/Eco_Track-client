import { motion } from "framer-motion";

export function MiniBar({ data }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 64, marginTop: 8 }}>
      {data.map((v, i) => (
        <motion.div key={i} style={{ flex: 1, borderRadius: 4, background: `rgba(16,185,129,${0.3 + (i / data.length) * 0.7})` }}
          initial={{ height: 0 }} animate={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: i * 0.05, duration: 0.5 }} />
      ))}
    </div>
  );
}