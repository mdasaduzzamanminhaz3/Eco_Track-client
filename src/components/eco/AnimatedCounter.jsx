import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
export function AnimatedCounter({ value, duration = 1.4, decimals = 0, prefix = "", suffix = "", className, }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        if (!inView)
            return;
        const start = performance.now();
        const from = 0;
        let raf = 0;
        const step = (t) => {
            const p = Math.min(1, (t - start) / (duration * 1000));
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(from + (value - from) * eased);
            if (p < 1)
                raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [inView, value, duration]);
    return (<motion.span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        })}
      {suffix}
    </motion.span>);
}
