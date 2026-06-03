import { useState, useEffect } from "react";
import axios from "axios";

export function RecyclerHistory({ theme }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const tokenObj = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
        const res = await axios.get("http://127.0.0.1:8000/api/pickup-requests/", {
          headers: { Authorization: `Bearer ${tokenObj?.access}` }
        });
        const completedJobs = res.data.filter(job => job.status === "COLLECTED");
        setHistory(completedJobs);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div style={{ color: theme.txt, padding: 24, textAlign: "center" }}>Loading history...</div>;

  return (
    <div style={{ padding: "24px", color: theme.txt }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Collection History</h2>
        <p style={{ color: theme.muted, fontSize: "14px" }}>Review all waste containers successfully collected by you.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {history.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", background: theme.card, borderRadius: 12, border: `1px solid ${theme.border}`, color: theme.muted }}>
            No completed collections yet.
          </div>
        ) : (
          history.map((job) => (
            <div key={job.id} style={{ display: "flex", justifyContent: "between", items: "center", background: theme.card, padding: 16, borderRadius: 12, border: `1px solid ${theme.border}` }}>
              <div>
                <p style={{ margin: 0, fontWeight: "bold", fontSize: 14 }}>{job.category_detail?.name} Collection Completed</p>
                <p style={{ margin: "2px 0 0 0", fontSize: 12, color: theme.muted }}>User: {job.user?.email}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, color: "#10B981", fontWeight: "bold", fontSize: 14 }}>{job.actual_weight} KG</p>
                <p style={{ margin: 0, fontSize: 11, color: theme.muted }}>Verified</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}