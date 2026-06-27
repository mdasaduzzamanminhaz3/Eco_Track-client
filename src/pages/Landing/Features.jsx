import { motion } from "framer-motion";
import { Ic } from "../../components/ui/Icons";

export function FeaturesSection({ E, LIME }) {
  const extendedFeatures = [
    {
      id: "scheduling",
      title: "Smart Scheduling & Logistics",
      subtitle: "On-Demand Eco Logistics",
      desc: "Request waste pickups with pinpoint location accuracy. Our system matches you instantly with verified local recyclers using optimized route-mapping tech.",
      points: [
        "Automated route optimization for low fuel footprint",
        "Real-time tracking of the pickup vehicle",
        "Multi-stop dynamic collection algorithms"
      ],
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      badge: "Real-time AI Routing"
    },
    {
      id: "analytics",
      title: "Impact Analytics Dashboard",
      subtitle: "Transparent Carbon Mapping",
      desc: "Watch your personalized dashboard convert kilograms of collected plastic, glass, or paper into direct carbon emission offset metrics with mathematical precision.",
      points: [
        "Verifiable emission reductions certificates",
        "Downloadable sustainability reports for corporate compliance",
        "Historical charts tracking monthly waste diversion rates"
      ],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      badge: "Enterprise Analytics"
    },
    {
      id: "rewards",
      title: "Community Green Rewards",
      subtitle: "Gamified Environmental Stewardship",
      desc: "Earn Green Points for every successful pickup milestone. Climb the localized and global leaderboards to claim real-world eco-badges and exclusive community perks.",
      points: [
        "Convert Green Points into real partner discounts",
        "Unlock digital eco-credentials and NFT badges",
        "Participate in regional community clean-up challenges"
      ],
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      badge: "Tokenized Eco Rewards"
    }
  ];

  return (
    <section id="features" style={{ padding: "100px 0", borderTop: "1px solid rgba(16,185,129,0.08)", scrollMarginTop: "70px" }}>
      
      {/* 1. Header Section */}
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, color: LIME, letterSpacing: "1.5px", textTransform: "uppercase", display: "inline-block", marginBottom: "12px" }}>
          Engineered for Full Accountability
        </span>
        <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: "16px" }}>
          Next-Gen Solutions to <span style={{ color: E }}>Automate Sustainability</span>
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(240,253,244,0.5)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
          Everything you need to orchestrate corporate waste collection networks or track personal carbon offset data in real-time.
        </p>
      </div>

      {/* 2. Features Alternating Grid Layout */}
      <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
        {extendedFeatures.map((f, index) => {
          const isEven = index % 2 === 0;

          return (
            <div 
              key={f.id} 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: "64px", 
                alignItems: "center"
              }}
            >
              {/* Text Context Content Block */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{ order: isEven ? 1 : 2 }}
              >
                <span style={{ background: "rgba(16,185,129,0.06)", border: `1px solid rgba(16,185,129,0.15)`, padding: "6px 14px", borderRadius: "99px", fontSize: "12px", fontWeight: 600, color: E, display: "inline-block", marginBottom: "16px" }}>
                  {f.badge}
                </span>
                
                <h4 style={{ fontSize: "14px", color: LIME, fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" }}>{f.subtitle}</h4>
                <h3 style={{ fontSize: "26px", fontWeight: 700, color: "#fff", marginBottom: "16px", letterSpacing: "-0.5px" }}>{f.title}</h3>
                <p style={{ fontSize: "15px", color: "rgba(240,253,244,0.55)", lineHeight: "1.6", marginBottom: "24px" }}>{f.desc}</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {f.points.map((point, pIdx) => (
                    <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{ marginTop: "4px" }}>
                        <Ic n="check" s={14} c={E} />
                      </div>
                      <span style={{ fontSize: "14px", color: "rgba(240,253,244,0.75)", lineHeight: "1.4" }}>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Graphical/Image Container Block - Full Cover with Zoom Effect */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ 
                  order: isEven ? 2 : 1,
                  height: "340px", 
                  borderRadius: "24px",
                  border: "1px solid rgba(16,185,129,0.15)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/*  Framer Motion Image with Hover Scale zoom effected */}
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${f.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer"
                  }}
                />

                {/* Overlaid Gradient Layer - dark glass shade for image */}
                <div style={{ 
                  position: "absolute", 
                  inset: 0, 
                  background: "linear-gradient(to bottom, transparent 40%, rgba(4,13,6,0.8) 100%)", 
                  pointerEvents: "none" 
                }} />

                {/* Subtle Brand Border Glow */}
                <div style={{ 
                  position: "absolute", 
                  inset: 0, 
                  borderRadius: "24px", 
                  border: "1px solid rgba(255,255,255,0.02)", 
                  pointerEvents: "none" 
                }} />
              </motion.div>

            </div>
          );
        })}
      </div>

    </section>
  );
}