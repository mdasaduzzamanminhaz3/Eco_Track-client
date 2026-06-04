import React, { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import AreaChart from "../../components/charts/AreaChart";

// ১. অ্যানিমেটেড কাউন্টার কম্পোনেন্ট
function AnimatedCounter({ from, to }) {
  const count = useSpring(from, { damping: 20, stiffness: 100 });
  useEffect(() => {
    const controls = animate(from, to, { duration: 1.5, onUpdate: (v) => count.set(v) });
    return () => controls.stop();
  }, [to]);
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

  // চার্টের ডেটা
  const chartData = collected.map(h => parseFloat(h.actual_weight) || 0);
  const chartLabels = collected.map(h => new Date(h.updated_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }));

  // ক্যাটাগরি ডিস্ট্রিবিউশন লজিক
  const categoryStats = collected.reduce((acc, curr) => {
    const cat = curr.category_detail?.name || "Other";
    acc[cat] = (acc[cat] || 0) + (parseFloat(curr.actual_weight) || 0);
    return acc;
  }, {});

  if (loading) return <div style={{ color: theme.txt, padding: 24, textAlign: "center" }}>Loading history...</div>;

  return (
    <div style={{ padding: "24px", color: theme.txt }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Collection History</h2>
        <p style={{ color: theme.muted, fontSize: "14px" }}>Performance overview and collection logs.</p>
      </div>

      {/* সামারি কার্ডস */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { l: "Accepted", v: accepted, c: "#3B82F6" },
          { l: "Pending", v: pending, c: "#F59E0B" },
          { l: "Collected", v: collected.length, c: "#10B981" },
        ].map((item, i) => (
          <div key={i} style={{ background: theme.card, padding: 20, borderRadius: 16, border: `1px solid ${theme.border}`, textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 12, color: theme.muted }}>{item.l}</p>
            <h3 style={{ margin: "8px 0 0 0", color: item.c, fontSize: "24px" }}>
              <AnimatedCounter from={0} to={item.v} />
            </h3>
          </div>
        ))}
      </div>

      {/* চার্ট এবং গেইজ সেকশন */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 24 }}>
        {chartData.length > 0 && (
          <div style={{ background: theme.card, padding: 20, borderRadius: 16, border: `1px solid ${theme.border}` }}>
            <h3 style={{ marginBottom: 16, fontSize: "16px" }}>Collection Trend ({totalWeight.toFixed(1)} KG Total)</h3>
            <AreaChart data={chartData} labels={chartLabels} />
          </div>
        )}

        <div style={{ background: theme.card, padding: 20, borderRadius: 16, border: `1px solid ${theme.border}` }}>
          <h3 style={{ marginBottom: 16, fontSize: "16px" }}>Category Distribution</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {Object.entries(categoryStats).map(([cat, weight], i) => {
              const percentage = (weight / (totalWeight || 1)) * 100;
              return (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span>{cat}</span>
                    <span style={{ fontWeight: "bold" }}>{weight.toFixed(1)} KG</span>
                  </div>
                  <div style={{ height: 8, background: theme.border, borderRadius: 4, overflow: "hidden" }}>
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1 }}
                      style={{ height: "100%", background: "#10B981" }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ডিটেইল লগ */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {collected.map((job) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            key={job.id} 
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: theme.card, padding: 16, borderRadius: 12, border: `1px solid ${theme.border}` }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: 14 }}>{job.category_detail?.name || "Waste"} Collection</p>
              <p style={{ margin: 0, fontSize: 11, color: theme.muted }}>User: {job.user?.email}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, color: "#10B981", fontWeight: "bold", fontSize: 14 }}>{job.actual_weight} KG</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}