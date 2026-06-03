function Pill({ s }) {
    const E = "#10B981";
  const map = {
    Collected: { bg: "rgba(16,185,129,0.15)", color: E, border: "rgba(16,185,129,0.4)" },
    Accepted: { bg: "transparent", color: "rgba(255,255,255,0.65)", border: "rgba(255,255,255,0.2)" },
    Pending: { bg: "transparent", color: "rgba(255,255,255,0.4)", border: "rgba(255,255,255,0.12)" },
  };
  const c = map[s] || map.Pending;
  return (
    <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 99, background: c.bg, color: c.color, border: `1px solid ${c.border}`, fontWeight: 500 }}>
      {s}
    </span>
  );
}
export default Pill;