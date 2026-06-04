import React, { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import PickupMap from "./PickupMap";

const RecyclerOverview = ({ theme, dark }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async (isMounted = true) => {
    try {
      if (isMounted) setLoading(true);
      setError(null);
      const res = await authApiClient.get("pickups/");
      if (isMounted) setRequests(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      if (isMounted) setError("Failed to fetch pickup requests.");
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchJobs(isMounted);
    return () => { isMounted = false; };
  }, []);

  const handleAcceptJob = async (jobId) => {
    try {
      await authApiClient.patch(`pickups/${jobId}/`, { status: "ACCEPTED" });
      alert("Job Accepted Successfully!");
      fetchJobs();
    } catch (err) {
      alert("Failed to accept the job.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 style={{ color: theme.txt }} className="text-2xl font-bold">Recycler Dashboard</h2>
          <p style={{ color: theme.muted }} className="text-sm">Manage and view available waste pickup requests.</p>
        </div>
      </div>

      {loading && <div style={{ color: theme.txt }} className="text-center py-10">Loading...</div>}
      
      {!loading && !error && requests.filter(j => j.status?.toUpperCase() === "PENDING").length === 0 ? (
        <div style={{ color: theme.muted, borderColor: theme.sidebarBorder }} className="text-center py-16 border-2 border-dashed rounded-2xl">
          No active pickup requests available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests
            .filter((job) => job.status?.toUpperCase() === "PENDING")
            .map((job) => {
              const wasteType = job.category_detail?.name || "General Waste";
              const customerName = job.user?.first_name ? `${job.user.first_name} ${job.user.last_name || ""}`.trim() : (job.user?.email || "Anonymous User");

              return (
                <div
                  key={job.id}
                  style={{ 
                    backgroundColor: dark ? "#132016" : "#F0FDF4",
                    border: `1px solid ${dark ? "#166534" : "#DCFCE7"}`
                  }}
                  className="rounded-2xl p-5 shadow-sm transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-2.5 py-1 rounded-md uppercase">
                        {wasteType}
                      </span>
                    </div>
                    <h3 style={{ color: theme.txt }} className="font-bold text-base mb-1 truncate">{customerName}</h3>
                    <p style={{ color: theme.muted }} className="text-sm mb-4">📍 {job.pickup_address || "No address"}</p>
                  </div>

                  <div className="flex gap-2 border-t pt-4" style={{ borderColor: dark ? "#166534" : "#DCFCE7" }}>
                    <button
                      onClick={() => setSelectedJob(job)}
                      style={{ backgroundColor: dark ? "#1c4a2e" : "#e5e7eb", color: theme.txt }}
                      className="flex-1 font-semibold py-2.5 px-3 rounded-xl text-xs transition"
                    >
                      🗺️ View Map
                    </button>
                    <button
                      onClick={() => handleAcceptJob(job.id)}
                      style={{ backgroundColor: "#10B981", color: "#fff" }}
                      className="flex-1 font-semibold py-2.5 px-3 rounded-xl text-xs transition"
                    >
                      Accept Job
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[50] p-4">
          <div style={{ backgroundColor: dark ? "#0E1F12" : "#ffffff" }} className="w-full max-w-4xl h-[80vh] rounded-3xl p-6 relative flex flex-col shadow-2xl">
            <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 font-bold text-xl">✕</button>
            <div className="flex-1 overflow-hidden rounded-2xl">
              <PickupMap
                pickupLat={selectedJob.latitude} 
                pickupLng={selectedJob.longitude} 
                pickupAddress={selectedJob.pickup_address}
                customerName={selectedJob.user?.email}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecyclerOverview;