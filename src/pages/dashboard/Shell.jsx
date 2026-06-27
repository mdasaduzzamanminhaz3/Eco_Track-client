import  { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ic } from "../../components/ui/Icons";
import { Overview } from "./Overview";
import { Pickup } from "./Pickup";
import { MapView } from "./MapView";
import { Leaderboard } from "./Leaderboard";
import { Chat } from "./Chat";
import { Notifs } from "./Notifs";
import { Profile } from "./Profile";

export function Shell({ user, onLogout }) {
  const [page, setPage] = useState("overview");
  const [dark, setDark] = useState(true);
  const E = "#10B981";
  const LIME = "#84CC16";

  const theme = {
    bg: dark ? "#0b1a0e" : "#f0fdf4",
    sidebar: dark ? "#0e1f12" : "#fff",
    sidebarBorder: dark ? "#1a2e1d" : "#e5e7eb",
    card: dark ? "#132016" : "#fff",
    border: dark ? "#1e3322" : "#e5e7eb",
    txt: dark ? "#f0fdf4" : "#0f1e12",
    muted: dark ? "rgba(240,253,244,0.42)" : "#6b7280",
    hover: dark ? "rgba(16,185,129,0.08)" : "#f0fdf4",
    active: dark ? "rgba(16,185,129,0.12)" : "#d1fae5",
  };

  const nav = [
    { k: "overview", ic: "grid", l: "Overview" },
    { k: "pickup", ic: "plus", l: "New pickup" },
    { k: "map", ic: "map", l: "Map" },
    { k: "leaderboard", ic: "trophy", l: "Leaderboard" },
    { k: "chat", ic: "chat", l: "Chat" },
    { k: "notifications", ic: "bell", l: "Notifications" },
    { k: "profile", ic: "user", l: "Profile" },
  ];

  const initials = (user?.name || "U").split(" ").map(w => w[0]).slice(0, 2).join("");
  // console.log("shel user data=========", user);
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: theme.bg, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: 220, flexShrink: 0, position: "fixed", top: 0, left: 0, height: "100vh", background: theme.sidebar, borderRight: `1px solid ${theme.sidebarBorder}`, display: "flex", flexDirection: "column", zIndex: 30 }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 20px", borderBottom: `1px solid ${theme.sidebarBorder}` }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg,${E},${LIME})`, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8 }}>
            <Ic n="leaf" s={13} c="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: theme.txt }}>Eco<span style={{ color: E }}>Track</span></span>
        </div>

        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          {nav.map(item => (
            <button key={item.k} onClick={() => setPage(item.k)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, textAlign: "left", marginBottom: 2, background: page === item.k ? theme.active : "transparent", color: page === item.k ? E : theme.muted }}
              onMouseEnter={e => { if (page !== item.k) e.currentTarget.style.background = theme.hover; }}
              onMouseLeave={e => { if (page !== item.k) e.currentTarget.style.background = "transparent"; }}>
              <Ic n={item.ic} s={16} c={page === item.k ? E : "currentColor"} />
              {item.l}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 10px", borderTop: `1px solid ${theme.sidebarBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: dark ? "rgba(255,255,255,0.05)" : "#f9fafb", marginBottom: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${E},${LIME})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: theme.txt, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name}</div>
              <div style={{ fontSize: 11, color: theme.muted }}>User</div>
            </div>
            <button onClick={onLogout} style={{ background: "none", border: "none", cursor: "pointer", color: theme.muted, padding: 2 }}>
              <Ic n="logout" s={15} c="currentColor" />
            </button>
          </div>
          <button onClick={() => setDark(!dark)}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", fontSize: 13, color: theme.muted }}
            onMouseEnter={e => e.currentTarget.style.background = theme.hover}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Ic n={dark ? "sun" : "moon"} s={15} c="currentColor" />
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>

      {/* Main Content View */}
      <div style={{ flex: 1, marginLeft: 220, overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            {page === "overview" && <Overview theme={theme} dark={dark} setPage={setPage} />}
            {page === "pickup" && <Pickup theme={theme} dark={dark} />}
            {page === "map" && <MapView theme={theme} dark={dark} />}
            {page === "leaderboard" && <Leaderboard theme={theme} dark={dark} user={user} />}
            {/* The chat component will render only when the user ID is successfully retrieved. */}
{page === "chat" && (user?.id || user?.pk || user?.user_id) ? (
  <Chat 
    theme={theme} 
    dark={dark} 
    currentUserId={user?.id || user?.pk || user?.user_id} 
    activePickupId={null} 
  />
) : page === "chat" && (
  <div style={{ color: theme.muted, padding: 20, textAlign: "center" }}>
    Loading user session...
  </div>
)}
            {page === "notifications" && <Notifs theme={theme} />}
            {page === "profile" && <Profile theme={theme} dark={dark} user={user} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}