import { useState, useEffect } from "react";
import axios from "axios"; // অথবা আপনার প্রজেক্টের কাস্টম apiClient

export function RecyclerOverview({ theme, dark }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPickup, setSelectedPickup] = useState(null); // মডাল কন্ট্রোল
  const [actualWeight, setActualWeight] = useState("");
  const [error, setError] = useState("");

  // 🎯 ১. ব্যাকএন্ড থেকে সব সচল রিকোয়েস্ট লোড করার ক্লিন লজিক
  const fetchJobs = async (isMounted = true) => {
    try {
      if (isMounted) setLoading(true);
      const tokenObj = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
      const res = await axios.get("http://127.0.0.1:8000/api/pickup-requests/", {
        headers: { Authorization: `Bearer ${tokenObj?.access}` }
      });
      
      if (isMounted) {
        // রিসাইক্লার শুধু পেন্ডিং এবং এক্সেপ্ট করা রিকোয়েস্টগুলো মেইন স্ক্রিনে দেখবে
        const activeJobs = res.data.filter(job => job.status === "PENDING" || job.status === "ACCEPTED");
        setRequests(activeJobs);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  // 🎯 ফিক্স: useEffect এর ভেতরে সরাসরি বা সিনক্রোনাসলি স্টেট চেঞ্জ ব্লক করা হয়েছে
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      await fetchJobs(isMounted);
    };

    loadData();

    // Cleanup ফাংশন: কম্পোনেন্ট আনমাউন্ট হয়ে গেলে ব্যাকগ্রাউন্ড স্টেট আপডেট বন্ধ করবে
    return () => {
      isMounted = false;
    };
  }, []);

  // ২. এক্সেপ্ট বা কালেক্টেড একশন ফায়ার করা
  const handleAction = async (id, statusName, weight = null) => {
    try {
      setError("");
      const tokenObj = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
      
      const payload = { status: statusName };
      if (weight) payload.actual_weight = parseFloat(weight);

      await axios.patch(`http://127.0.0.1:8000/api/pickup-requests/${id}/recycler-update/`, payload, {
        headers: { Authorization: `Bearer ${tokenObj?.access}` }
      });

      setSelectedPickup(null);
      setActualWeight("");
      fetchJobs(true); // লিস্ট রিফ্রেশ করা হলো
    } catch (err) {
      if (err.response?.data?.actual_weight) {
        setError(err.response.data.actual_weight[0]);
      } else {
        alert("Something went wrong!");
      }
    }
  };

  if (loading) {
    return <div style={{ color: theme.txt, padding: 24, textAlign: "center" }}>Loading jobs...</div>;
  }

  return (
    <div style={{ padding: "24px", color: theme.txt }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Recycler Collection Jobs</h2>
        <p style={{ color: theme.muted, fontSize: "14px" }}>Accept pickup tasks and verify actual weight upon collection.</p>
      </div>

      {/* রিকোয়েস্ট লিস্ট */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {requests.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", background: theme.card, borderRadius: 12, border: `1px solid ${theme.border}`, color: theme.muted }}>
            No active pickup requests found.
          </div>
        ) : (
          requests.map((job) => (
            <div key={job.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: theme.card, padding: 20, borderRadius: 12, border: `1px solid ${theme.border}`, flexWrap: "wrap", gap: 16 }}>
              <div style={{ flex: 1, minWidth: 250 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <span style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: "bold" }}>
                    {job.category_detail?.name || "Waste"}
                  </span>
                  <span style={{ color: theme.muted, fontSize: 12 }}>ID: #{job.id.substring(0,8)}</span>
                </div>
                <p style={{ fontSize: 14, margin: "2px 0" }}><strong>User:</strong> {job.user?.email}</p>
                <p style={{ fontSize: 13, color: theme.muted, margin: "2px 0" }}><strong>Address:</strong> {job.pickup_address}</p>
                <p style={{ fontSize: 14, marginTop: 6, color: "#84CC16" }}>Est. Weight: <strong>{job.estimated_weight} KG</strong></p>
              </div>

              {/* অ্যাকশন বাটনসমূহ */}
              <div>
                {job.status === "PENDING" && (
                  <button onClick={() => handleAction(job.id, "ACCEPTED")} style={{ background: "#10B981", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: "600", cursor: "pointer" }}>
                    Accept Job
                  </button>
                )}
                {job.status === "ACCEPTED" && (
                  <button onClick={() => setSelectedPickup(job)} style={{ background: "#3B82F6", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: "600", cursor: "pointer" }}>
                    Mark Collected
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🚨 ওজন ইনপুট দেওয়ার পপআপ মডাল */}
      {selectedPickup && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
          <div style={{ background: dark ? "#111d13" : "#fff", padding: 24, borderRadius: 16, width: "100%", maxWidth: 360, border: `1px solid ${theme.border}`, color: theme.txt }}>
            <h3 style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>Verify Collected Weight</h3>
            <p style={{ fontSize: 13, color: theme.muted, marginBottom: 16 }}>User estimated: {selectedPickup.estimated_weight} KG</p>

            {error && <p style={{ color: "#EF4444", fontSize: 12, marginBottom: 8 }}>{error}</p>}

            <input 
              type="number" 
              step="0.1"
              value={actualWeight}
              onChange={(e) => setActualWeight(e.target.value)}
              placeholder="Enter exact weight in KG"
              style={{ width: "100%", padding: 12, background: dark ? "rgba(255,255,255,0.05)" : "#f3f4f6", border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.txt, outline: "none", marginBottom: 16 }}
            />

            <div style={{ display: "flex", justifyContent: "end", gap: 12 }}>
              <button onClick={() => { setSelectedPickup(null); setActualWeight(""); setError(""); }} style={{ background: "none", border: "none", color: theme.muted, cursor: "pointer", fontWeight: "600" }}>Cancel</button>
              <button onClick={() => handleAction(selectedPickup.id, "COLLECTED", actualWeight)} style={{ background: "#10B981", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: "600", cursor: "pointer" }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}