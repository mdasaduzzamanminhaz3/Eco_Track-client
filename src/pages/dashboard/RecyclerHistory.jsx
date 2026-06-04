import React, { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import { motion, useSpring, useTransform, animate } from "framer-motion";

// অ্যানিমেটেড কাউন্টার কম্পোনেন্ট
function AnimatedCounter({ from, to }) {
  const count = useSpring(from, { damping: 20, stiffness: 100 });
  
  useEffect(() => {
    const controls = animate(from, to, {
      duration: 2,
      onUpdate: (value) => count.set(value),
    });
    return () => controls.stop();
  }, [from, to]);

  return <motion.span>{useTransform(count, (latest) => Math.round(latest))}</motion.span>;
}

export function RecyclerHistory({ theme, dark }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await authApiClient.get("pickups/");
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const accepted = history.filter(j => j.status === "ACCEPTED").length;
  const pending = history.filter(j => j.status === "PENDING").length;
  const collected = history.filter(j => j.status === "COLLECTED");
  const totalWeight = collected.reduce((acc, curr) => acc + (parseFloat(curr.actual_weight) || 0), 0);

  if (loading) return <div style={{ color: theme.txt, padding: 24 }}>Loading data...</div>;

  return (
    <div style={{ padding: "24px", color: theme.txt }}>
      {/* সামারি কার্ডস */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { l: "Accepted", v: accepted, c: "#3B82F6" },
          { l: "Pending", v: pending, c: "#F59E0B" },
          { l: "Collected", v: collected.length, c: "#10B981" },
        ].map((item, i) => (
          <div key={i} style={{ background: theme.card, padding: 20, borderRadius: 16, border: `1px solid ${theme.border}`, textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 12, color: theme.muted }}>{item.l}</p>
            <h3 style={{ margin: "8px 0 0 0", color: item.c, fontSize: "28px" }}>
              <AnimatedCounter from={0} to={item.v} />
            </h3>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: "20px", marginBottom: 16 }}>Detailed Collection Logs</h2>

      {/* কালেকশন লিস্ট */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {collected.map((job) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            key={job.id} 
            style={{ background: theme.card, padding: 16, borderRadius: 12, border: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>{job.category_detail?.name}</p>
              <p style={{ fontSize: 11, color: theme.muted }}>{job.user?.email}</p>
            </div>
            <div style={{ fontWeight: "bold", color: "#10B981" }}>{job.actual_weight} KG</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}