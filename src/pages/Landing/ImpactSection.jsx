import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Counter } from "../../components/eco/AnimatedCounter";
import { Ic } from "../../components/ui/Icons";

export function ImpactSection({ E }) {
  const containerRef = useRef(null);
  // স্ক্রোল করে এলিমেন্টের কাছাকাছি (৮০ পিক্সেল বাকি থাকতে) আসলে অ্যানিমেশন স্টার্ট হবে
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const stats = [
    { label: "Total Waste Diverted", targetValue: 3142, icon: "recycle", suffix: " Tons" },
    { label: "CO₂ Emissions Saved", targetValue: 842.6, icon: "leaf", suffix: " Tons", decimals: 1 },
    { label: "Verified Recycling Hubs", targetValue: 1240, icon: "user", suffix: "+" },
    { label: "Green Rewards Issued", targetValue: 4.8, icon: "trophy", suffix: "M Points", decimals: 1 }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <section id="impact" ref={containerRef} style={{ padding: "80px 0", borderTop: "1px solid rgba(16,185,129,0.08)" }}>
      {/* রেসপন্সিভ অটো-ফিট গ্রিড */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            whileHover={{ 
              y: -6,
              borderColor: "rgba(16, 185, 129, 0.3)",
              boxShadow: "0 16px 35px rgba(16, 185, 129, 0.08)",
              backgroundColor: "rgba(255,255,255,0.03)"
            }}
            style={{ 
              padding: "28px", 
              borderRadius: 20, 
              background: "rgba(255,255,255,0.01)", 
              border: "1px solid rgba(255,255,255,0.05)",
              transition: "border-color 0.3s, background-color 0.3s, box-shadow 0.3s, transform 0.2s",
              cursor: "default"
            }}
          >
            {/* icon box */}
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(16,185,129,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <Ic n={stat.icon} s={18} c={E} />
            </div>
            
            {/* live counter value */}
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.5px" }}>
              {isInView ? (
                <Counter 
                  to={stat.targetValue} 
                  decimals={stat.decimals || 0} 
                  suffix={stat.suffix} 
                />
              ) : (
                <span>0{stat.suffix}</span>
              )}
            </div>
            
            {/* লেবেল */}
            <div style={{ fontSize: 13, color: "rgba(240,253,244,0.45)", fontWeight: 500, lineHeight: 1.4 }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}