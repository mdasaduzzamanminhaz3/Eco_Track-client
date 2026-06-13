import { motion } from "framer-motion";
import { Ic } from "../../components/ui/Icons";

  const badges = ["Sprout", "Recycler", "Forest", "Ocean", "Aurora", "Titan"];

const AchivementBadge = ({ theme}) => {
     const E = "#10B981";
    return (
        <div>
                    {/* Achivement badges */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.37 }}
          style={{
            padding: 20,
            borderRadius: 16,
            background: theme.card,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div style={{ fontWeight: 600, color: theme.txt, marginBottom: 16 }}>
            Achievement badges
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {badges.map((b, i) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      i < 4
                        ? "rgba(16,185,129,0.15)"
                        : "rgba(255,255,255,0.04)",
                    border: `2px solid ${i < 4 ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.07)"}`,
                    opacity: i < 4 ? 1 : 0.35,
                  }}
                >
                  <Ic
                    n="trophy"
                    s={18}
                    c={i < 4 ? E : "rgba(255,255,255,0.3)"}
                  />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: i < 4 ? theme.txt : theme.muted,
                    fontWeight: 500,
                  }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
        </div>
    );
};

export default AchivementBadge;