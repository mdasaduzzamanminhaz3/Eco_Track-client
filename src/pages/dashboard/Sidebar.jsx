import { useNavigate } from "react-router-dom";
import { Ic } from "../../components/ui/Icons";

export function Sidebar({ 
  page, 
  setPage, 
  dark, 
  setDark, 
  user, 
  onLogout, 
  theme, 
  E, 
  LIME 
}) {
  
// 🎯 ফিক্স: .toLowerCase() ব্যবহার করে রোল চেক করা হচ্ছে যাতে বানানের কেস বা ক্যাপিটাল লেটার মিসম্যাশ না হয়
  const getNavItems = () => {
    // সেফটি চেইনিং এবং ছোট হাতের অক্ষরে কনভার্ট
    const currentRole = user?.role ? user.role.toLowerCase() : "";
    
    if (currentRole === "recycler") {
      // ♻️ রিসাইক্লারের সাইডবার লিস্ট
      return [
        { k: "recycler-overview", ic: "grid", l: "Collection Jobs" },
        { k: "recycler-history", ic: "trophy", l: "History" }, 
        { k: "chat", ic: "chat", l: "Chat" },
        { k: "notifications", ic: "bell", l: "Notifications" },
        { k: "profile", ic: "user", l: "Profile" },
      ];
    } else {
      // 👥 সাধারণ ইউজারের সাইডবার লিস্ট
      return [
        { k: "overview", ic: "grid", l: "Overview" },
        { k: "pickup", ic: "plus", l: "New pickup" },
        { k: "map", ic: "map", l: "Map" },
        { k: "leaderboard", ic: "trophy", l: "Leaderboard" },
        { k: "chat", ic: "chat", l: "Chat" },
        { k: "notifications", ic: "bell", l: "Notifications" },
        { k: "profile", ic: "user", l: "Profile" },
      ];
    }
  };

  const nav = getNavItems();
  const navigate = useNavigate();
  // ইউজারের নামের প্রথম অক্ষর বা ইনিশিয়াল বের করা
  const fullName = user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "";
  const displayName = fullName || user?.email || "User";
  const initials = displayName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div 
      style={{ 
        width: 220, 
        flexShrink: 0, 
        position: "fixed", 
        top: 0, 
        left: 0, 
        height: "100vh", 
        background: theme.sidebar, 
        borderRight: `1px solid ${theme.sidebarBorder}`, 
        display: "flex", 
        flexDirection: "column", 
        zIndex: 30 
      }}
    >
      {/* Sidebar Logo */}
      <div onClick={() => navigate("/")} style={{cursor:"pointer", height: 56, display: "flex", alignItems: "center", padding: "0 20px", borderBottom: `1px solid ${theme.sidebarBorder}` }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg,${E},${LIME})`, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8 }}>
          <Ic n="leaf" s={13} c="#fff" />
        </div>
        <span style={{ fontWeight: 700, fontSize: 16, color: theme.txt }}>Eco<span style={{ color: E }}>Track</span></span>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {nav.map(item => (
          <button 
            key={item.k} 
            onClick={() => setPage(item.k)}
            style={{ 
              width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", 
              borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, 
              textAlign: "left", marginBottom: 2, background: page === item.k ? theme.active : "transparent", 
              color: page === item.k ? E : theme.muted, transition: "background 0.2s" 
            }}
            onMouseEnter={e => { if (page !== item.k) e.currentTarget.style.background = theme.hover; }}
            onMouseLeave={e => { if (page !== item.k) e.currentTarget.style.background = "transparent"; }}
          >
            <Ic n={item.ic} s={16} c={page === item.k ? E : "currentColor"} />
            {item.l}
          </button>
        ))}
      </nav>

      {/* Bottom Profile & Mode Toggle */}
      <div style={{ padding: "12px 10px", borderTop: `1px solid ${theme.sidebarBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: dark ? "rgba(255,255,255,0.05)" : "#f9fafb", marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${E},${LIME})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {initials || "U"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: theme.txt, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {displayName}
            </div>
            {/* 🎯 রোল ক্যাপিটালাইজ করে দেখানো (যেমন: Recycler অথবা User) */}
            <div style={{ fontSize: 11, color: theme.muted, textTransform: "capitalize" }}>
              {user?.role || "User"}
            </div>
          </div>
          <button onClick={onLogout} style={{ background: "none", border: "none", cursor: "pointer", color: theme.muted, padding: 2 }}>
            <Ic n="logout" s={15} c="currentColor" />
          </button>
        </div>

        {/* Dark/Light Mode Button */}
        <button 
          onClick={() => setDark(!dark)}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", fontSize: 13, color: theme.muted }}
          onMouseEnter={e => e.currentTarget.style.background = theme.hover}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <Ic n={dark ? "sun" : "moon"} s={15} c="currentColor" />
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </div>
  );
}