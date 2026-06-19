import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import authApiClient from "../services/auth-api-client";
import { Ic } from "../components/ui/Icons";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const E = "#10B981";
  const LIME = "#84CC16";
  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
         await authApiClient.post('auth/users/reset_password/',{email});
        alert("password reset email has been sent to you.");
        navigate("/login");

    }catch(error){
        alert(error.response?.data?.detail || "Something went wrong!");

    }finally{
        setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060f08" }}>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: 400, padding: 32, background: "#111d13", borderRadius: 20, border: "1px solid rgba(16,185,129,0.2)" }}>
       
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

        <h2 style={{ color: "#fff", marginBottom: 8 }}>Reset Password</h2>
        <p style={{ color: "rgba(240,253,244,0.45)", fontSize: 13, marginBottom: 24 }}>Enter your email to receive a reset link.</p>
        
        <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input 
            type="email" 
            placeholder="you@mail.com" 
            required 
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
          />
          <button disabled={loading} style={{ padding: 12, borderRadius: 12, background: E, color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: E, fontSize: 13, marginTop: 16, cursor: "pointer" }}>
          Back to Login
        </button>
      </motion.div>
    </div>
  );
}