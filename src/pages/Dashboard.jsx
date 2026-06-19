import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth"; // আপনার Auth হুক

// সাধারণ ইউজারের সাব-পেজসমূহ
import { Overview } from "./dashboard/Overview";
import { Pickup } from "./dashboard/Pickup";
import { MapView } from "./dashboard/MapView";
import { Leaderboard } from "./dashboard/Leaderboard";

// সাধারণ কমন পেজসমূহ
import { Chat } from "./dashboard/Chat";
import { Notifs } from "./dashboard/Notifs";
import { Sidebar } from "./dashboard/Sidebar";
import { Profile } from "./dashboard/Profile";

// রিসাইক্লারের নতুন দুটি স্পেশাল পেজ
import { RecyclerHistory } from "./dashboard/RecyclerHistory";
import RecyclerOverview from "./dashboard/RecyclerOverview";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logoutUser, authLoading } = useAuth(); // 🎯 আপনার হুকে যদি authLoading বা কোনো লোডিং স্টেট থাকে তা নিন
  const [page, setPage] = useState("overview");
  const [dark, setDark] = useState(true);
  const navigate = useNavigate();
  const E = "#10B981";
  const LIME = "#84CC16";

  // 🎯 আসল ফিক্স: ইউজার অবজেক্ট চেঞ্জ হওয়া মাত্রই রোল চেক করে সঠিক পেজ পুশ করা
  useEffect(() => {
    if (user && user.role) {
      // .toLowerCase() করে চেক করছি যাতে Django থেকে ক্যাপিটাল লেটারে এলেও কোনো বাগ না হয়
      if (user.role.toLowerCase() === "recycler") {
        setPage("recycler-overview");
      } else {
        setPage("overview");
      }
    }
  }, [user]); // ইউজার ডাটা লোড হওয়ামাত্র এই ইফেক্ট ফায়ার হবে

  // যদি আপনার Auth হুক থেকে ডাটা আসতে দেরি হয়, তবে সেটার জন্য একটা সেফটি গার্ড
  if (authLoading) {
    return <div style={{ color: "#fff", background: "#0b1a0e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading EcoTrack...</div>;
  }

  // গ্লোবাল ডাইনামিক থিম কনফিগারেশন
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

  // 🎯 সেফটি ফিক্স: ইউজার অবজেক্ট যদি কোনো কারণে এখনো না পায়, ব্ল্যাঙ্ক স্ক্রিন বা লোডিং দেখাবে
  if (!user) {
    return navigate("/")
  }

  // বর্তমান অ্যাক্টিভ রোল ট্র্যাকিং (কন্ডিশন সহজ করার জন্য)
  const isRecycler = user.role.toLowerCase() === "recycler";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: theme.bg, fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* সাইডবার কম্পোনেন্ট */}
      <Sidebar 
        page={page} 
        setPage={setPage} 
        dark={dark} 
        setDark={setDark} 
        user={user} 
        onLogout={logoutUser} 
        theme={theme}
        E={E}
        LIME={LIME}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: 220, overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={page} 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -12 }} 
            transition={{ duration: 0.2 }}
          >
            {/* ================= NORMAL USER PAGES ================= */}
            {!isRecycler && page === "overview" && <Overview theme={theme} dark={dark} setPage={setPage} />}
            {!isRecycler && page === "pickup" && <Pickup theme={theme} dark={dark} />}
            {!isRecycler && page === "map" && <MapView theme={theme} dark={dark} />}
            {!isRecycler && page === "leaderboard" && <Leaderboard theme={theme} dark={dark} user={user} />}
            
            {/* ================= RECYCLER SPECIAL PAGES ================= */}
            {isRecycler && page === "recycler-overview" && <RecyclerOverview theme={theme} dark={dark} />}
            {isRecycler && page === "recycler-history" && <RecyclerHistory theme={theme} dark={dark} />}

            {/* ================= COMMON PAGES ================= */}
            {page === "chat" && <Chat theme={theme} dark={dark} />}
            {page === "notifications" && <Notifs theme={theme} />}
            {page === "profile" && <Profile theme={theme} dark={dark} user={user} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}