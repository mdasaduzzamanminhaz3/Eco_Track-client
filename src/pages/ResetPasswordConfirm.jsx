import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import authApiClient from "../services/auth-api-client";
import { Ic } from "../components/ui/Icons";
import { AuthDots } from "../components/ui/AuthDots";

export function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const E = "#10B981";
  const LIME = "#84CC16";
  const handleResetConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authApiClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: password,
      });
      alert("Password updated successfully! Please login with your new password.");
      navigate("/login");
    } catch (err) {
      alert("Reset failed. The link might be expired or invalid.",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", 
      background: "radial-gradient(ellipse at 20% 50%, #0b3020 0%, #060f08 55%, #020a04 100%)",
      fontFamily: "'Inter', sans-serif" 
    }}>
      <AuthDots />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ 
          width: "100%", maxWidth: 400, margin: 20, padding: 32, borderRadius: 20,position:"relative",zIndex:100,
          background: "#111d13", border: "1px solid rgba(16,185,129,0.2)" 
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `linear-gradient(135deg,${E},${LIME})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ic n="leaf" s={15} c="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>
            Eco<span style={{ color: E }}>Track</span>
          </span>
        </div>


        <h2 style={{ color: "#fff", marginBottom: 8 }}>Set new password</h2>
        <p style={{ color: "rgba(240,253,244,0.45)", fontSize: 13, marginBottom: 24 }}>
          Enter your new password below.
        </p>

        <form onSubmit={(e) => {
    console.log("Form submitted!");
    handleResetConfirm(e);
  }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.07)", color: "#fff", boxSizing: "border-box"
              }}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ 
                position: "absolute", right: 12, top: 12, background: "none", border: "none", 
                color: "rgba(255,255,255,0.4)", cursor: "pointer" 
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: "100%", padding: "12px", borderRadius: 12, border: "none",
              background: loading ? "rgba(16,185,129,0.5)" : E, color: "#fff", 
              fontWeight: 600, opacity: loading ? 0.6 : 1, 
    cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ResetPasswordConfirm;