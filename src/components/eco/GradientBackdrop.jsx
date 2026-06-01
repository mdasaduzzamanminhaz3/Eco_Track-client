import { motion } from "framer-motion";
export function GradientBackdrop() {
    return (<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-eco opacity-80"/>
      <motion.div aria-hidden className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--eco-emerald) 0%, transparent 60%)", opacity: 0.35 }} animate={{ x: [0, 40, -10, 0], y: [0, 30, -20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}/>
      <motion.div aria-hidden className="absolute top-40 -right-32 h-[480px] w-[480px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--eco-teal) 0%, transparent 60%)", opacity: 0.3 }} animate={{ x: [0, -30, 20, 0], y: [0, 20, -10, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}/>
      <motion.div aria-hidden className="absolute bottom-0 left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--eco-lime) 0%, transparent 60%)", opacity: 0.22 }} animate={{ scale: [1, 1.08, 0.96, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}/>
    </div>);
}
export function FloatingParticles({ count = 14 }) {
    return (<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
            const left = (i * 53) % 100;
            const top = (i * 37) % 100;
            const dur = 8 + (i % 6);
            return (<motion.span key={i} className="absolute h-1.5 w-1.5 rounded-full" style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    background: "var(--eco-emerald)",
                    boxShadow: "0 0 12px var(--eco-emerald)",
                    opacity: 0.5,
                }} animate={{ y: [0, -40, 0], opacity: [0.2, 0.7, 0.2] }} transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}/>);
        })}
    </div>);
}
