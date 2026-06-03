function AreaChart({ data, labels }) {
  const W = 500, H = 160, px = 28, py = 16;
  const E = "#10B981";
// const LIME = "#84CC16";
  const max = Math.max(...data) * 1.1;
  const pts = data.map((v, i) => [
    px + (i / (data.length - 1)) * (W - px * 2),
    H - py - (v / max) * (H - py * 2),
  ]);
  const lineD = "M " + pts.map(([x, y]) => `${x} ${y}`).join(" L ");
  const areaD = `M ${pts[0][0]} ${H - py} L ${pts.map(([x, y]) => `${x} ${y}`).join(" L ")} L ${pts[pts.length - 1][0]} ${H - py} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={E} stopOpacity="0.35" />
          <stop offset="100%" stopColor={E} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = py + t * (H - py * 2);
        return <line key={t} x1={px} y1={y} x2={W - px} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />;
      })}
      {labels.map((l, i) => {
        const x = px + (i / (labels.length - 1)) * (W - px * 2);
        return <text key={l} x={x} y={H - 2} fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle">{l}</text>;
      })}
      <path d={areaD} fill="url(#ag)" />
      <path d={lineD} fill="none" stroke={E} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill={E} stroke="#132016" strokeWidth="2" />)}
    </svg>
  );
}
export default AreaChart;