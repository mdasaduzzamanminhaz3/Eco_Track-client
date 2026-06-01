import  { useState, useEffect } from "react";

export function Counter({ to, suffix = "", decimals = 0, prefix = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1600;
    const run = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setV(+(ease * to).toFixed(decimals));
      if (p < 1) requestAnimationFrame(run);
    };
    const t = setTimeout(() => requestAnimationFrame(run), 200);
    return () => clearTimeout(t);
  }, [to, decimals]);
  return <>{prefix}{decimals ? v.toFixed(decimals) : Math.floor(v).toLocaleString()}{suffix}</>;
}