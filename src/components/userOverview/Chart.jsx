import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AreaChart from "../charts/AreaChart";
import authApiClient from "../../services/auth-api-client";
import Gauge from "../charts/Gauge";

const Chart = ({ theme, dark }) => {
  const E = "#10B981";

  const chartLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  useEffect(() => {
    const fetchMywallet = async () => {
      try {
        const res = await authApiClient.get("rewards/my-wallet/");
        setWallet(res.data);
        // console.log("Wallet data:", res.data);
      } catch (err) {
        console.error("Failed to fetch wallet data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMywallet();
  }, []);

const getWeeklyData = () => {
    const weeklyPoints = new Array(7).fill(0); 
    if (!wallet || !Array.isArray(wallet.transactions)) {
      return weeklyPoints;
    }

    wallet.transactions.forEach((t) => {
      if (t.created_at && typeof t.points === 'number') {
        const date = new Date(t.created_at);
        let dayIndex = date.getDay();
        dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
        
        weeklyPoints[dayIndex] += t.points;
      }
    });
    return weeklyPoints;
  };

  const dynamicChartData = getWeeklyData();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: 14,
        marginBottom: 16,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          padding: 20,
          borderRadius: 16,
          background: theme.card,
          border: `1px solid ${theme.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontWeight: 600, color: theme.txt, marginBottom: 3 }}>
              Weekly waste diverted
            </div>
            <div style={{ fontSize: 12, color: theme.muted }}>
              kg per day, verified by recyclers
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              padding: "4px 12px",
              borderRadius: 8,
              background: dark ? "rgba(255,255,255,0.06)" : "#f3f4f6",
              color: theme.muted,
            }}
          >
            This week
          </div>
        </div>
        <AreaChart data={dynamicChartData} labels={chartLabels} />
      </motion.div>
      {/* Sustainability score */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.27 }}
        style={{
          padding: 20,
          borderRadius: 16,
          background: theme.card,
          border: `1px solid ${theme.border}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: 600, color: theme.txt, marginBottom: 16 }}>
          Sustainability score
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <Gauge pct={78} />
        </div>
        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              marginBottom: 6,
            }}
          >
            <span style={{ color: theme.muted }}>Next: Forest Guardian</span>
            <span style={{ color: E, fontWeight: 600 }}>780/1000</span>
          </div>
          <div
            style={{
              height: 6,
              borderRadius: 99,
              background: dark ? "rgba(255,255,255,0.07)" : "#e5e7eb",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{ height: "100%", borderRadius: 99, background: E }}
              initial={{ width: 0 }}
              animate={{ width: "78%" }}
              transition={{ duration: 1.4 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chart;
