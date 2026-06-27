function AreaChart({ data, labels }) {
  const W = 500, H = 160, px = 28, py = 16;
  const E = "#10B981";
  const safeData = data.map(v => (isNaN(v) || v === null ? 0 : v));
  const max = Math.max(...safeData, 1) * 1.1;
  const pts = data.map((v, i) => [
    px + (i / (data.length - 1 || 1)) * (W - px * 2),
    H - py - (v / max) * (H - py * 2),
  ]);
  
  const lineD = "M " + pts.map(([x, y]) => `${x} ${y}`).join(" L ");
  const areaD = `M ${pts[0][0]} ${H - py} L ${pts.map(([x, y]) => `${x} ${y}`).join(" L ")} L ${pts[pts?.length - 1][0]} ${H - py} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
  
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={E} stopOpacity="0.3" />
          <stop offset="100%" stopColor={E} stopOpacity="0" />
        </linearGradient>
      </defs>
{[0, 0.25, 0.5, 0.75, 1].map((v, i) => {
        const y = py + v * (H - py * 2);
        return <line key={i} x1={px} y1={y} x2={W - px} y2={y} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />;
      })}
      {labels.map((l, i) => {
        const x = px + (i / (labels.length - 1)) * (W - px * 2);
        return <text key={l} x={x} y={H - 2} fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle">{l}</text>;
      })}
      <path d={areaD} fill="url(#ag)" />
      <path d={lineD} fill="none" stroke={E} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* points & hover tip */}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={E} stroke="#fff" strokeWidth="2" className="cursor-pointer transition-all hover:r-6">
          <title>{`${labels[i]}: ${data[i]} KG`}</title>
        </circle>
      ))}
      <path d={areaD} fill="url(#ag)" />
      <path d={lineD} fill="none" stroke={E} strokeWidth="2.5" />
    </svg>
  );
}
export default AreaChart;