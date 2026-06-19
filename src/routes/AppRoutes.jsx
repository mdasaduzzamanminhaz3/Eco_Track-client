import { Navigate, Route, Routes } from "react-router-dom";
import { Landing } from "../pages/Landing";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import { Profile } from "../pages/dashboard/Profile";
import { Pickup } from "../pages/dashboard/Pickup";
import { Leaderboard } from "../pages/dashboard/Leaderboard";
import { ForgotPassword } from "../pages/ForgotPassword";
import { ResetPasswordConfirm } from "../pages/ResetPasswordConfirm";
import ActivationPage from "../pages/ActivationPage";

// পাবলিক পেজসমূহ

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate/:uid/:token" element={<ActivationPage />} />
      <Route path="/password-reset-confirm/:uid/:token" element={<ResetPasswordConfirm />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      {/* ================= PROTECTED ROUTES ================= */}
      {/* এই রুটের ভেতরে যা থাকবে, সবকিছুর জন্য ইউজার লগইন থাকা বাধ্যতামূলক */}
      <Route element={<ProtectedRoute />}>
        
        {/* মেইন ড্যাশবোর্ড হোম (ওভারভিউ) */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* ইউজার প্রোফাইল ও সেটিংস */}
        <Route path="/profile" element={<Profile />} />
        
        {/* পিকআপ লজিস্টিকস ম্যানেজমেন্ট */}
        <Route path="/pickups" element={<Pickup />} />
        {/* <Route path="/pickups/new" element={< />} /> */}
        
        {/* অ্যানালিটিক্স ও রিওয়ার্ডস */}
        {/* // <Route path="/analytics" element={<Analytics />} />
        // <Route path="/rewards" element={<Rewards />} /> */}
        <Route path="/leaderboard" element={<Leaderboard />} />

      </Route>
      
      {/* ================= 404 REDIRECT ================= */}
      {/* ভুল কোনো ইউআরএল টাইপ করলে সরাসরি ল্যান্ডিং পেজে পাঠিয়ে দেবে */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}