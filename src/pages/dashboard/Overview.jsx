import { motion } from "framer-motion";
import { Ic } from "../../components/ui/Icons";
import AchivementBadge from "../../components/userOverview/AchivementBadge";
import Pickups from "../../components/userOverview/Pickups";
import Chart from "../../components/userOverview/Chart";
import StatCards from "../../components/userOverview/StatCards";

//  Overview compopnent
export function Overview({ theme, dark, setPage }) {
  const E = "#10B981";

  return (
    <div style={{ padding: 28 }}>
      {/* Header Area */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: theme.txt,
              marginBottom: 4,
            }}
          >
            Your <span style={{ color: E }}>eco impact</span>
          </h1>
          <p style={{ fontSize: 13, color: theme.muted }}>
            A live look at the waste you've diverted and the CO₂ you've avoided.
          </p>
        </div>
        <motion.button
          onClick={() => setPage("pickup")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 18px",
            borderRadius: 10,
            background: E,
            color: "#fff",
            border: "none",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.03, background: "#059669" }}
          whileTap={{ scale: 0.97 }}
        >
          <Ic n="plus" s={15} c="#fff" /> New pickup
        </motion.button>
      </div>

      {/* Stat cards grid */}
          <StatCards theme={theme}/>

      {/*  Chart  */}
        <Chart theme={theme} dark={dark}/>
      
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}
      >
        {/* pickups request */}
        <Pickups theme={theme} dark={dark}/>
        {/* Achivement badges */}
        <AchivementBadge theme={theme} dark={dark}/>
      </div>
    </div>
  );
}
