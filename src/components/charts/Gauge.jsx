import { motion } from "framer-motion";

function Gauge({ pct }) {
  const r = 50, cx = 70, cy = 70, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const E = "#10B981";
// const LIME = "#84CC16";
  return (
    <svg width={140} height={140} viewBox="0 0 140 140">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12" />
      <motion.circle cx={cx} cy={cy} r={r} fill="none" stroke={E} strokeWidth="12"
        strokeLinecap="round" strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ / 4}
        initial={{ strokeDasharray: `0 ${circ}` }}
        animate={{ strokeDasharray: `${dash} ${circ - dash}` }}
        transition={{ duration: 1.5, ease: "easeOut" }} />
      <text x={cx} y={cy - 5} fill="white" fontSize="22" fontWeight="700" textAnchor="middle">{pct}%</text>
      <text x={cx} y={cy + 14} fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">Top {100 - pct}%</text>
    </svg>
  );
}
export default Gauge;