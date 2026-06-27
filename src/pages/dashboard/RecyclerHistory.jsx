import React, { useEffect, useState, useMemo, useCallback } from "react";
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

export function RecyclerHistory({ theme }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectingId, setCollectingId] = useState(null);
  const [weightInput, setWeightInput] = useState("");

const fetchHistory = useCallback(async () => {
    try {
      //  dashboard mood
      const res = await authApiClient.get("pickups/?dashboard=true");
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const accepted = useMemo(() => history.filter((j) => j.status === "ACCEPTED"), [history]);
  const pending = useMemo(() => history.filter((j) => j.status === "PENDING"), [history]);
  const collected = useMemo(() => history.filter((j) => j.status === "COLLECTED"), [history]);

  const totalWeight = useMemo(() => 
    collected.reduce((acc, curr) => acc + (parseFloat(curr.actual_weight) || 0), 0), 
  [collected]);

  // Category distribution logic
  const categoryStats = useMemo(() => {
    return collected.reduce((acc, curr) => {
      const cat = curr.category_detail?.name || "Other";
      acc[cat] = (acc[cat] || 0) + (parseFloat(curr.actual_weight) || 0);
      return acc;
    }, {});
  }, [collected]);

  // Preparation of chart data and labels
  const chartData = useMemo(() => collected.map((h) => parseFloat(h.actual_weight) || 0), [collected]);
  const chartLabels = useMemo(() => 
    collected.map((h) => new Date(h.updated_at).toLocaleDateString("en-US", { day: "numeric", month: "short" })), 
  [collected]);

  const handleCollect = async (id) => {
    if (!weightInput || parseFloat(weightInput) <= 0) {
      return alert("Please enter a valid weight");
    }
    
    try {
      await authApiClient.post(`pickups/${id}/complete/`, {
        actual_weight: parseFloat(weightInput),
      });
      
      setCollectingId(null);
      setWeightInput("");
      await fetchHistory(); 
      
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.error || "Failed to update status.";
      alert(errorMsg);
    }
  };

  //Function to generate Google Maps navigation links
  const handleViewLocation = (lat, lng) => {
    if (!lat || !lng) {
      return alert("Location coordinates not available for this request.");
    }
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(mapUrl, "_blank");
  };

  if (loading) return <div style={{ color: theme.txt, padding: 24, textAlign: "center" }}>Loading history...</div>;

  return (
    <div style={{ padding: "24px", color: theme.txt }}>
      {/* summery cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { l: "Accepted", v: accepted.length, c: "#3B82F6" },
          { l: "Pending", v: pending.length, c: "#F59E0B" },
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

      {/* Chart and Category Distribution Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 24 }}>
        {chartData.length > 0 && (
          <div style={{ background: theme.card, padding: 20, borderRadius: 16, border: `1px solid ${theme.border}` }}>
            <h3 style={{ marginBottom: 16, fontSize: "16px" }}>
              Collection Trend ({totalWeight.toFixed(1)} KG Total)
            </h3>
            <AreaChart data={chartData} labels={chartLabels} />
          </div>
        )}

        <div style={{ background: theme.card, padding: 20, borderRadius: 16, border: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: "16px" }}>Category Distribution</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            {Object.entries(categoryStats).map(([cat, weight]) => {
              const percentage = totalWeight > 0 ? (weight / totalWeight) * 100 : 0;
              return (
                <div key={cat}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span>{cat}</span>
                    <span style={{ fontWeight: "bold" }}>{weight.toFixed(1)} KG</span>
                  </div>
                  <div style={{ height: 8, background: theme.border, borderRadius: 4, overflow: "hidden" }}>
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${percentage}%` }} 
                      transition={{ duration: 0.8 }}
                      style={{ height: "100%", background: "#10B981" }} 
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(categoryStats).length === 0 && (
              <p style={{ fontSize: 13, color: theme.muted }}>No collected data available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Active Requests (ACCEPTED) */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: "16px", marginBottom: 12 }}>Active Requests (To Collect)</h3>
        {accepted.map((job) => (
          <div key={job.id} style={{ background: theme.card, padding: 16, borderRadius: 12, border: `1px solid ${theme.border}`, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>{job.category_detail?.name || "Unassigned"}</p>
              <p style={{ fontSize: 11, color: theme.muted, margin: "4px 0 0 0" }}>{job.pickup_address}</p>
            </div>
            
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {/* he new location button has been added here.*/}
              <button 
                onClick={() => handleViewLocation(job.latitude, job.longitude)}
                style={{ 
                  padding: "8px 12px", 
                  background: "transparent", 
                  color: "#10B981", 
                  border: "1px solid #10B981", 
                  hover: { background: "#10B98", color: "#fff" },
                  borderRadius: 6, 
                  cursor: "pointer", 
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
                title="Open in Google Maps"
              >
                 Location
              </button>

              {collectingId === job.id ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <input 
                    type="number" 
                    step="0.1"
                    placeholder="KG" 
                    autoFocus
                    style={{ width: 80, padding: "6px 8px", borderRadius: 6, border: `1px solid ${theme.border}`, background: 'transparent', color: 'inherit' }} 
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)} 
                  />
                  <button onClick={() => handleCollect(job.id)} style={{ padding: "6px 14px", background: "#10B981", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>Save</button>
                  <button onClick={() => { setCollectingId(null); setWeightInput(""); }} style={{ padding: "6px 14px", background: "transparent", color: theme.muted, border: `1px solid ${theme.border}`, borderRadius: 6, cursor: "pointer" }}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => setCollectingId(job.id)} style={{ padding: "8px 16px", background: "#10B981", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>Collect</button>
              )}
            </div>
          </div>
        ))}
        {accepted.length === 0 && (
          <p style={{ fontSize: 13, color: theme.muted }}>No active accepted pickups.</p>
        )}
      </div>
    </div>
  );
}