import { useEffect, useState } from "react";

function Counter({ to, decimals = 0, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(to);
    if (start === end) return;

    const totalMiliseconds = 1000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(totalMiliseconds / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // EaseOut Quad formula
      const currentCount = start + (end - start) * progress * (2 - progress);
      
      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [to]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
export { Counter };