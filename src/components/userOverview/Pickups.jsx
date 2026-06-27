import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import Pill from "../../pages/dashboard/Pill";

const Pickups = ({ theme }) => {
  const E = "#10B981";
  const [visibleCount, setVisibleCount] = useState(4);

  const [pickup, setPickups] = useState([]);
  const displayedPickups = pickup?.slice(0, visibleCount);
  const hasMore = visibleCount < pickup?.length;
  const showLess = visibleCount > pickup?.length;
  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const res = await authApiClient.get("pickups/");
        // console.log("fetch pickup in overview", res.data);
        setPickups(res.data);
      } catch (error) {
        console.log("failed pickup", error);
      }
    };
    fetchPickups();
  }, []);
  const picks = [
    { t: "Plastic · 4.2 kg", id: "PCK-3211", s: "Collected" },
    { t: "E-waste · 1.8 kg", id: "PCK-3208", s: "Accepted" },
    { t: "Glass · 6.0 kg", id: "PCK-3201", s: "Pending" },
    { t: "Paper · 12.4 kg", id: "PCK-3197", s: "Collected" },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
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
          Recent pickup requests
        </div>
        {displayedPickups?.map((p, i) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom:
                i < picks.length - 1 ? `1px solid ${theme.border}` : "none",
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: theme.txt }}>
                {p.category_detail.name}
              </div>
              <div style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>
                {p.recycler?.email}
              </div>
            </div>
            <Pill s={p?.status} />
          </div>
        ))}
        {/* more button */}
        <div className="flex gap-6">
          {hasMore && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              style={{
                marginTop: 12,
                background: "transparent",
                border: "none",
                color: E,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View More
            </button>
          )}
          {/* less button */}
          {showLess && (
            <button
              onClick={() => setVisibleCount((prev) => prev - visibleCount + 4)}
              style={{
                marginTop: 12,
                background: "transparent",
                border: "none",
                color: E,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Show Less
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Pickups;
