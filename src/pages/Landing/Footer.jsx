import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Ic } from "../../components/ui/Icons";

export function Footer() {
  const navigate = useNavigate();
  const E = "#10B981";
  const LIME = "#84CC16";

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Smart Pickup", path: "/pickup" },
        { name: "Impact Analytics", path: "/analytics" },
        { name: "Green Rewards", path: "/rewards" },
        { name: "Corporate Solutions", path: "/corporate" }
      ]
    },
    {
      title: "Network",
      links: [
        { name: "Recycling Hubs", path: "/hubs" },
        { name: "Logistics Partners", path: "/partners" },
        { name: "Eco Leaderboard", path: "/leaderboard" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "API Documentation", path: "/docs" },
        { name: "Sustainability Blog", path: "/blog" },
        { name: "Carbon Metrics Manual", path: "/manual" }
      ]
    }
  ];

  return (
    <footer style={{ background: "#030a05", borderTop: `1px solid rgba(16, 185, 129, 0.08)`, position: "relative", overflow: "hidden", paddingTop: "80px", paddingBottom: "30px" }}>
      
      {/* Background Subtle Gradient Glow */}
      <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "40vw", height: "40vh", borderRadius: "50%", background: `radial-gradient(circle, rgba(132,204,22,0.04) 0%, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "30vw", height: "30vh", borderRadius: "50%", background: `radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        
        {/* Main Grid: Info + Links + Newsletter */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr repeat(3, 0.6fr) 1.2fr", gap: "40px", marginBottom: "60px", isResposive: "true" }}>
          
          {/* Column 1: Brand Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${E}, ${LIME})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic n="leaf" s={15} c="#fff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "-0.5px" }}>Eco<span style={{ color: E }}>Track</span></span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(240,253,244,0.45)", lineHeight: "1.6" }}>
              Automating corporate and individual eco-logistics through smart pick-and-drop systems for a sustainable tomorrow.
            </p>
            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              {["twitter", "github", "linkedin"].map((social, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, backgroundColor: "rgba(16, 185, 129, 0.1)", borderColor: E }}
                  style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.2s" }}
                >
                  <Ic n={social} s={14} c="rgba(240,253,244,0.6)" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Columns 2, 3, 4: Dynamic Links Mapping */}
          {footerLinks.map((col, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#fff", letterSpacing: "0.5px" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <motion.span
                      onClick={() => navigate(link.path)}
                      whileHover={{ x: 4, color: "#fff" }}
                      style={{ fontSize: "13px", color: "rgba(240,253,244,0.45)", cursor: "pointer", display: "inline-block", transition: "color 0.2s" }}
                    >
                      {link.name}
                    </motion.span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Newsletter Subscription */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#fff", letterSpacing: "0.5px" }}>Stay Updated</h4>
            <p style={{ fontSize: "13px", color: "rgba(240,253,244,0.45)", lineHeight: "1.5" }}>
              Subscribe to get notified on dynamic global carbon credit pool expansions.
            </p>
            <div style={{ display: "flex", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(16, 185, 129, 0.15)", borderRadius: "12px", padding: "4px", paddingLeft: "12px", alignItems: "center" }}>
              <input 
                type="email" 
                placeholder="Enter email" 
                style={{ background: "none", border: "none", outline: "none", color: "#fff", fontSize: "13px", width: "100%", paddingRight: "8px" }}
              />
              <motion.button 
                whileHover={{ background: "#059669" }}
                whileTap={{ scale: 0.95 }}
                style={{ background: E, border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Ic n="arrow-right" s={14} c="#fff" />
              </motion.button>
            </div>
          </div>

        </div>

        {/* Horizontal Divider Line */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1) 20%, rgba(16, 185, 129, 0.1) 80%, transparent)" }} />

        {/* Bottom Copyright Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "30px", fontSize: "12px", color: "rgba(240,253,244,0.35)" }}>
          <div>
            © 2026 <span style={{ color: "#fff", fontWeight: 600 }}>EcoTrack Inc.</span> Project Ecosystem.
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((bLink, bIdx) => (
              <span key={bIdx} style={{ cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "rgba(240,253,244,0.35)"}>
                {bLink}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}