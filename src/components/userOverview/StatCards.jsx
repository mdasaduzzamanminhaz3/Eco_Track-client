import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import { motion } from "framer-motion";
import { Counter } from "../eco/AnimatedCounter";
import { Ic } from "../ui/Icons";

const StatCards = ({ theme }) => {
    const E = "#10B981";
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pickup, setPickups] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const res = await authApiClient.get("pickups/");
        console.log("fetch pickup in overview", res.data);
        setPickups(res.data);
      } catch (error) {
        console.log("failed pickup", error);
      }
    };
    fetchPickups();
  }, []);
  useEffect(() => {
    const fetchMywallet = async () => {
      try {
        const res = await authApiClient.get("rewards/my-wallet/");
        setWallet(res.data);
        console.log("Wallet data:", res.data);
      } catch (err) {
        console.error("Failed to fetch wallet data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMywallet();
  }, []);
    useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await authApiClient.get("rewards/leaderboard/");
        setLeaderboard(res.data);
        // console.log("Leaderboard data:", res.data);
      } catch (err) {
        console.error("Failed to fetch leaderboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);
  const totalVeifiedWaste = pickup?.reduce((acc, current) => {
    if (current.status === "COLLECTED" && current.actual_weight !== null) {
      return acc + current.actual_weight;
    }
    return acc;
  }, 0);
  const myRank =
    leaderboard.findIndex(
      (entry) => entry.user_details.id === wallet?.user?.id,
    ) + 1; // +1 কারণ index 0 থেকে শুরু হয়

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14,
        marginBottom: 16,
      }}
    >
      {[
        {
          l: "Verified waste",
          v: totalVeifiedWaste || 0,
          suf: " kg",
          ic: "recycle",
        },
        {
          l: "CO₂ saved",
          v: wallet?.total_carbon_saved || 0,
          suf: " kg",
          ic: "leaf",
          dec: 1,
        },
        {
          l: "Total points",
          v: wallet?.total_points || 0,
          suf: "",
          ic: "trophy",
        },
        {
          l: "Leaderboard rank",
          v: myRank > 0 ? myRank : "N/A",
          pre: myRank > 0 ? "#" : " ",
          ic: "trend",
        },
      ].map((s, i) => (
        <motion.div
          key={s.l}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
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
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 12, color: theme.muted }}>{s.l}</span>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "rgba(16,185,129,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic n={s.ic} s={14} c={E} />
            </div>
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: theme.txt,
              marginBottom: 8,
            }}
          >
            {/* custom counter call */}
            <Counter
              to={s.v}
              suffix={s.suf}
              decimals={s.dec || 0}
              prefix={s.pre || ""}
            />
          </div>
          {/* <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: E, fontWeight: 600 }}>
              <Ic n="trend" s={11} c={E} /> +12.4% vs last week
            </div> */}
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;
