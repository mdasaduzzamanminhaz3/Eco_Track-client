import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import useAuth from "../../hooks/useAuth";

export function Leaderboard({ theme, dark }) {
  const E = "#10B981";
  const LIME = "#84CC16";
    const [leaderboard, setLeaderboard] = useState([]);
    const {user} = useAuth();
    const loggedInUserId = user?.id;
      useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await authApiClient.get("rewards/leaderboard/");
        setLeaderboard(res.data);
        // console.log("Leaderboard data:", res.data);
      } catch (err) {
        console.error("Failed to fetch leaderboard data:", err);
      } 
    };
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.txt, marginBottom: 4 }}>Leaderboard</h1>
      <p style={{ fontSize: 13, color: theme.muted, marginBottom: 24 }}>Your global eco-warrior ranking.</p>
      {/* podium */}
      <div style={{ padding: 24, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 24 }}>
          {leaderboard.slice(0,3).map((u, i) => {
            const order = [1,0,2];
            const user = leaderboard[order[i]];
            if(!user)return null;
            const first = order[i] === 0;
            const h = first ? 80 : i === 0 ? 56 : 44;
            const name = user.user_details.first_name || user.user_details.email.split('@')[0];

            return (
              <div key={user.user_details.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                {first && <motion.div style={{ fontSize: 20 }} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>👑</motion.div>}
                <div style={{ width: first ? 52 : 44, height: first ? 52 : 44, borderRadius: "50%", background: first ? `linear-gradient(135deg,${E},${LIME})` : dark ? "rgba(255,255,255,0.1)" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: first ? 18 : 14, color: first ? "#fff" : theme.txt }}>
                  {name[0]}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.txt, textAlign: "center", maxWidth: 80 }}>{name}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: E }}>{user.total_points.toLocaleString()}</div>
                <div style={{ height: h, width: 60, borderRadius: "8px 8px 0 0", background: first ? "rgba(16,185,129,0.15)" : dark ? "rgba(255,255,255,0.05)" : "#f3f4f6", border: `1px solid ${first ? "rgba(16,185,129,0.3)" : theme.border}`, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 8, fontSize: 18 }}>
                  {["🥈", "🥇", "🥉"][i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ borderRadius: 16, overflow: "hidden", background: theme.card, border: `1px solid ${theme.border}` }}>
{leaderboard.map((u, i) => {
  const isMe = u.user_details?.id === loggedInUserId;
  const rank = i + 1;
  const name = u.user_details?.first_name || u.user_details?.email.split('@')[0];
 
  return (
    <motion.div 
      key={u.user_details.id} 
      initial={{ opacity: 0, x: -14 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ delay: i * 0.04 }}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < leaderboard.length - 1 ? `1px solid ${theme.border}` : "none", background: isMe ? "rgba(16,185,129,0.07)" : "transparent" }}
    >
      <div style={{ width: 28, fontSize: 14, fontWeight: 700, color: rank <= 3 ? E : theme.muted }}>
        {rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : `#${rank}`}
      </div>
      
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: isMe ? `linear-gradient(135deg,${E},${LIME})` : dark ? "rgba(255,255,255,0.1)" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: isMe ? "#fff" : theme.txt }}>
        {name[0].toUpperCase()}
      </div>
      
      <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: isMe ? E : theme.txt }}>
        {name}{isMe && " (you)"}
      </div>
      
      <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: E }}>
        {u?.total_points.toLocaleString()}
      </div>
      
      <div style={{ width: 36, fontSize: 12, textAlign: "right", fontWeight: 600, color: theme.muted }}>
        #{rank}
      </div>
    </motion.div>
  );
})}
      </div>
    </div>
  );
}