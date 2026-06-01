import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ic } from "../components/ui/Icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // 👈 আপনার অথেনটিকেশন হুকটি ইম্পোর্ট করা হলো

function GridBG() {
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "linear-gradient(rgba(16,185,129,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.2) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
  );
}

export function Landing() {
  const [activeTab, setActiveTab] = useState(0);
  const E = "#10B981";
  const LIME = "#84CC16";
  const navigate = useNavigate();
  const { user } = useAuth(); // 👈 গ্লোবাল ইউজার স্টেট নিয়ে আসা হলো

  const features = [
    { title: "Smart Scheduling", desc: "Request waste pickups with pinpoint location accuracy. Our system matches you instantly with verified local recyclers.", icon: "plus" },
    { title: "Impact Analytics", desc: "Watch your dashboard convert kilograms of plastic, glass, or paper into direct carbon emission offset metrics.", icon: "trend" },
    { title: "Community Rewards", desc: "Earn Green Points for every successful pickup. Climbed the global leaderboard to claim real-world eco badges.", icon: "trophy" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#040d06", color: "#f0fdf4", fontFamily: "'Inter', system-ui, sans-serif", position: "relative", overflowX: "hidden" }}>
      <GridBG />
      
      {/* Decorative Glows */}
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vh", borderRadius: "50%", background: `radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", right: "-10%", width: "40vw", height: "40vh", borderRadius: "50%", background: `radial-gradient(circle, rgba(132,204,22,0.08) 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />

      {/* --- 1. NAVBAR --- */}
      <header style={{ position: "sticky", top: 0, backdropFilter: "blur(12px)", background: "rgba(4,13,6,0.75)", borderBottom: "1px solid rgba(16,185,129,0.1)", zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
          
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg, ${E}, ${LIME})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ic n="leaf" s={16} c="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-0.5px" }}>Eco<span style={{ color: E }}>Track</span></span>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: "flex", gap: 32, fontSize: 14, fontWeight: 500, color: "rgba(240,253,244,0.65)" }}>
            {["Features", "Impact", "Network"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "rgba(240,253,244,0.65)"}>
                {item}
              </a>
            ))}
          </nav>

          {/* 🎯 NAVBAR CTAs (Conditional Rendering Based on Login State) */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {user ? (
              /* ইউজার লগইন থাকলে ড্যাশবোর্ড বাটন দেখাবে */
              <motion.button onClick={() => navigate("/dashboard")} 
                style={{ background: `linear-gradient(135deg, ${E}, ${LIME})`, color: "#fff", border: "none", padding: "9px 22px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(16,185,129,0.25)", display: "flex", alignItems: "center", gap: 6 }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                Dashboard 🚀
              </motion.button>
            ) : (
              /* ইউজার লগইন না থাকলে নরমাল সাইন-ইন/সাইন-আপ অপশন */
              <>
                <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", padding: "8px 16px" }}>
                  Sign in
                </button>
                <motion.button onClick={() => navigate("/register")} 
                  style={{ background: E, color: "#fff", border: "none", padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(16,185,129,0.25)" }}
                  whileHover={{ scale: 1.04, background: "#059669" }} whileTap={{ scale: 0.96 }}>
                  Get started
                </motion.button>
              </>
            )}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        
        {/* --- 2. HERO SECTION --- */}
        <section style={{ padding: "80px 0 60px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, color: E, marginBottom: 24 }}>
              🚀 Smart Waste Logistics 2.0
            </div>
            <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 20 }}>
              Turn your waste into <span style={{ background: `linear-gradient(120deg, ${E}, ${LIME})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>measurable impact</span>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(240,253,244,0.55)", marginBottom: 32, maxWidth: 480 }}>
              An automated pick-and-drop system designed to optimize eco-logistics, boost recycle rates, and track real-time global sustainability rewards.
            </p>
            
            {/* 🎯 HERO CTAs (Conditional Rendering Based on Login State) */}
            <div style={{ display: "flex", gap: 16 }}>
              {user ? (
                /* ইউজার লগইন থাকলে সরাসরি ড্যাশবোর্ড এক্সেস বাটন */
                <motion.button onClick={() => navigate("/dashboard")}
                  style={{ padding: "14px 36px", borderRadius: 12, background: E, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 20px rgba(16,185,129,0.3)" }}
                  whileHover={{ scale: 1.03, background: "#059669" }} whileTap={{ scale: 0.97 }}>
                  Go to Dashboard ⚡
                </motion.button>
              ) : (
                /* ইউজার লগইন না থাকলে নরমাল অ্যাকশন বাটন */
                <>
                  <motion.button onClick={() => navigate("/register")}
                    style={{ padding: "14px 32px", borderRadius: 12, background: E, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 20px rgba(16,185,129,0.3)" }}
                    whileHover={{ scale: 1.03, background: "#059669" }} whileTap={{ scale: 0.97 }}>
                    Launch Platform
                  </motion.button>
                  <motion.button onClick={() => navigate("/login")}
                    style={{ padding: "14px 28px", borderRadius: 12, background: "rgba(255,255,255,0.04)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", fontWeight: 600, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                    whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.97 }}>
                    ⚡ Quick Live Demo
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>

          {/* Interactive Hero Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ height: 420, borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(16,185,129,0.15)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: "80%", height: "80%", border: "1px dashed rgba(16,185,129,0.2)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", width: "50%", height: "50%", border: "1px dashed rgba(16,185,129,0.15)", borderRadius: "50%" }} />
            
            {/* Main Interactive Floating Sphere */}
            <motion.div style={{ width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, ${E}, #042111)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px rgba(16,185,129,0.3)` }}
              animate={{ y: [0, -15, 0], rotate: 360 }} transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 25, repeat: Infinity, ease: "linear" } }}>
              <Ic n="leaf" s={36} c="#fff" />
            </motion.div>

            {/* Orbiting Satellite Data Indicators */}
            <motion.div style={{ position: "absolute", top: "20%", left: "15%", padding: "10px 16px", borderRadius: 14, background: "#111d13", border: `1px solid ${E}`, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}
              animate={{ y: [0, 8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <Ic n="recycle" s={14} c={E} /> 94% Recycled
            </motion.div>

            <motion.div style={{ position: "absolute", bottom: "22%", right: "12%", padding: "10px 16px", borderRadius: 14, background: "#111d13", border: `1px solid ${LIME}`, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}
              animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
              <Ic n="location" s={14} c={LIME} /> Route Optimized
            </motion.div>
          </motion.div>
        </section>

        {/* --- 3. IMPACT LIVE TRACKER --- */}
        <section id="impact" style={{ padding: "60px 0", borderTop: "1px solid rgba(16,185,129,0.08)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { label: "Total Waste Diverted", value: "3,142 Metric Tons", icon: "recycle" },
              { label: "CO₂ Emissions Saved", value: "842.6 Tons", icon: "leaf" },
              { label: "Active Recyclers", value: "1,240+ Hubs", icon: "user" },
              { label: "Green Rewards Issued", value: "4.8M Points", icon: "trophy" }
            ].map((stat, i) => (
              <div key={i} style={{ padding: 24, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Ic n={stat.icon} s={15} c={E} />
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "rgba(240,253,244,0.45)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 4. INTERACTIVE FEATURES TABS --- */}
        <section id="features" style={{ padding: "80px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Engineered for full accountability</h2>
            <p style={{ fontSize: 14, color: "rgba(240,253,244,0.5)" }}>Everything you need to automate corporate or individual carbon offset mapping.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 40, alignItems: "center" }}>
            {/* Tabs Buttons Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {features.map((f, index) => (
                <button key={index} onClick={() => setActiveTab(index)}
                  style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "16px 20px", borderRadius: 14, textClassName: "left", border: "none", cursor: "pointer", background: activeTab === index ? "rgba(16,185,129,0.08)" : "transparent", color: activeTab === index ? E : "rgba(240,253,244,0.4)", borderLeft: `3px solid ${activeTab === index ? E : "transparent"}`, textAlign: "left" }}>
                  <Ic n={f.icon} s={16} c={activeTab === index ? E : "rgba(240,253,244,0.3)"} />
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{f.title}</span>
                </button>
              ))}
            </div>

            {/* Active Content Display */}
            <div style={{ minHeight: 180, padding: 36, borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(16,185,129,0.12)", position: "relative" }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{features[activeTab].title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(240,253,244,0.55)", lineHeight: 1.6, maxWidth: 540 }}>{features[activeTab].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

      </main>

      {/* --- 5. FOOTER --- */}
      <footer id="network" style={{ borderTop: "1px solid rgba(16,185,129,0.08)", background: "#020703", padding: "40px 0", marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "rgba(240,253,244,0.4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 700, color: "#fff" }}>EcoTrack Inc.</span> 
            <span>© 2026 Sustainable Tech Stack Ecosystem.</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>Terms of Service</span>
            <span style={{ cursor: "pointer" }}>API Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}