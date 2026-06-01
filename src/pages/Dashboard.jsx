import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Ic } from "../components/ui/Icons"; // আপনার প্রজেক্টের আইকন কম্পোনেন্ট

export default function Dashboard() {
  const { user, logoutUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const E = "#10B981";
  const LIME = "#84CC16";

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060f08", color: "#fff" }}>
        <motion.span 
          style={{ width: 40, height: 40, border: "4px solid rgba(16,185,129,0.2)", borderTopColor: E, borderRadius: "50%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  // স্ট্যাটস কার্ডের ডেটা
  const stats = [
    { title: "Total Recycled", value: "1,248 kg", icon: "leaf", trend: "+12% this month", color: E },
    { title: "Carbon Saved", value: "342 kg CO₂", icon: "globe", trend: "Equiv. to 15 trees", color: LIME },
    { title: "Eco Points", value: "4,850 pts", icon: "award", trend: "Top 5% Recycler", color: "#3B82F6" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#060f08", color: "#f0fdf4", fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* 1. Sidebar */}
      <aside style={{ width: 260, background: "#111d13", borderRight: "1px solid rgba(16,185,129,0.12)", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40, cursor:"pointer" }} onClick={() => navigate("/")}>
            <div  style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${E},${LIME})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ic n="leaf" s={15} c="#fff" />
            </div>
            <span  style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>Eco<span style={{ color: E }}>Track</span></span>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { id: "overview", label: "Overview", icon: "grid" },
              { id: "analytics", label: "Analytics", icon: "chart" },
              { id: "rewards", label: "Rewards", icon: "award" },
              { id: "settings", label: "Settings", icon: "settings" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 16px", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer",
                  background: activeTab === item.id ? "rgba(16,185,129,0.15)" : "transparent",
                  color: activeTab === item.id ? E : "rgba(240,253,244,0.6)",
                  transition: "all 0.2s"
                }}
              >
                <Ic n={item.icon} s={16} c={activeTab === item.id ? E : "rgba(240,253,244,0.6)"} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile & Logout Box */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {user?.first_name} {user?.last_name}
          </div>
          <div style={{ fontSize: 11, color: E, fontWeight: 600, textTransform: "uppercase", marginTop: 2, letterSpacing: "0.5px" }}>
            🛡️ {user?.role || "RECYCLER"}
          </div>
          
          <button 
            onClick={handleLogout}
            style={{ width: "100%", marginTop: 14, padding: "8px 0", borderRadius: 10, background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main style={{ flex: 1, padding: 40, overflowY: "auto", maxWidth: 1200 }}>
        
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#fff", margin: 0 }}>Welcome Back!</h1>
            <p style={{ fontSize: 14, color: "rgba(240,253,244,0.5)", marginTop: 4 }}>Here is your environmental impact summary for today.</p>
          </div>
          
          {/* Quick Date Display Badge */}
          <div style={{ padding: "8px 16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 13, color: "rgba(240,253,244,0.8)" }}>
            🗓️ Live Statistics
          </div>
        </header>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: 24, borderRadius: 20, background: "#111d13", border: `1px solid rgba(255,255,255,0.05)`, position: "relative", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", right: -10, bottom: -10, opacity: 0.05, transform: "scale(2.5)" }}>
                <Ic n={stat.icon} s={40} c={stat.color} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: "rgba(240,253,244,0.5)", fontWeight: 500 }}>{stat.title}</span>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(${stat.color === E ? "16,185,129" : "132,204,22"}, 0.1)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ic n={stat.icon} s={16} c={stat.color} />
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: stat.color, marginTop: 8, fontWeight: 500 }}>{stat.trend}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section: Mock Chart & Activity Log */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, alignItems: "start" }}>
          
          {/* Box 1: Recycling Activity Graph Container */}
          <div style={{ background: "#111d13", border: "1px solid rgba(16,185,129,0.1)", borderRadius: 20, padding: 24 }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: 16, fontWeight: 600 }}>Sustainability Index Trend</h3>
            <div style={{ height: 200, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px dashed rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,253,244,0.3)", fontSize: 13 }}>
              {/* আপনি চাইলে এখানে Recharts বা Chart.js মডিউল ইম্পোর্ট করে বসাতে পারেন */}
              ⚡ [Activity Chart Visualizer Placeholder]
            </div>
          </div>

          {/* Box 2: Recent Milestones */}
          <div style={{ background: "#111d13", border: "1px solid rgba(16,185,129,0.1)", borderRadius: 20, padding: 24 }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: 16, fontWeight: 600 }}>Recent Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { desc: "Dropped 5kg Plastic Waste", time: "2 hrs ago", points: "+50 pts" },
                { desc: "Reclaimed Reward Badge", time: "Yesterday", points: "Level 3" },
                { desc: "Referred a Friend", time: "3 days ago", points: "+100 pts" }
              ].map((act, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottom: idx !== 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{act.desc}</div>
                    <div style={{ fontSize: 11, color: "rgba(240,253,244,0.4)", marginTop: 2 }}>{act.time}</div>
                  </div>
                  <span style={{ fontSize: 12, color: LIME, fontWeight: 600 }}>{act.points}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}