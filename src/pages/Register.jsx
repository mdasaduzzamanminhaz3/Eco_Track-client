import  { useState } from "react";
import { motion } from "framer-motion";
import { Ic } from "../components/ui/Icons";
import { AuthDots } from "../components/ui/AuthDots";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";

export function Register() {
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const { registerUser, error:authError } = useAuthContext();
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const E = "#10B981";
  const LIME = "#84CC16";
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
const {register,handleSubmit, watch,formState:{errors}} = useForm({
  defaultValues:{
    first_name:"",
    last_name:"",
    email:"", 
    password:"",
    re_password:""
  }
});
const passwordValue = watch("password");

  async function onSubmit(data) {
    setLocalError("");
    setLoading(true);
    const userData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      re_password: data.re_password,
      role: role.toUpperCase()
    };
    const result = await registerUser(userData);
    setLoading(false);
    if (result?.success) {
      navigate("/login", { replace: true });

    }else{
      setLocalError(result?.message || "Registration failed. Please try again.");
    }

  }
  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 12, fontSize: 13,
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
    color: "#f0fdf4", outline: "none", boxSizing: "border-box",
  };

  const getInputStyle = ( fieldName) => (
    {
      ...inputStyle,
      borderColor: errors[fieldName] ?"#EF4444": "rgba(255,255,255,0.12)"
    }
  );

  const EyeIcon = ({ visible }) => visible ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
  );
const eyeButtonStyle = { position: "absolute", right: 12, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center" };
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse at 20% 50%, #0b3020 0%, #060f08 55%, #020a04 100%)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <AuthDots />

      <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        style={{ position: "relative", width: "100%", maxWidth: 440, margin: "24px 16px", borderRadius: 20, padding: 32, background: "#111d13", border: "1px solid rgba(16,185,129,0.2)" }}>

        {/* Logo */}
        <div onClick={() => navigate("/")}  style={{ display: "flex", cursor: "pointer", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${E},${LIME})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="leaf" s={15} c="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>Eco<span style={{ color: E }}>Track</span></span>
        </div>

        <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Create your account</div>
        <div style={{ fontSize: 13, color: "rgba(240,253,244,0.45)", marginBottom: 20 }}>
          `Join a community turning waste into measurable impact.`
        </div>
        {
          (localError || authError) && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#EF4444", fontSize: 12, marginBottom: 20, fontWeight: 500, whiteSpace: "pre-line" }}>
             {localError || authError}
          </motion.div>
          
        )}

        {/* Role Selector */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { v: "user", ic: "user", t: "Normal user", sub: "Schedule pickups" },
            { v: "recycler", ic: "recycle", t: "Recycler", sub: "Accept pickups" }
          ].map(r => (
            <button key={r.v} onClick={() => setRole(r.v)}
              style={{ padding: 12, borderRadius: 12, textAlign: "left", cursor: "pointer", background: role === r.v ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)", border: `1.5px solid ${role === r.v ? E : "rgba(255,255,255,0.08)"}` }}>
              <Ic n={r.ic} s={16} c={role === r.v ? E : "rgba(255,255,255,0.35)"} />
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginTop: 6 }}>{r.t}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{r.sub}</div>
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: "rgba(240,253,244,0.5)", marginBottom: 6 }}>First name</div>
              <input
               {...register("first_name",{required:"First name is required"})} placeholder="Asaduzzaman" 
                style={getInputStyle("first_name")}
                 />
                {errors.first_name && <span style={{color: "#EF4444", fontSize: 11}}>{errors.first_name.message}</span>}
            </div>
            <div>
              <div style={{ fontSize: 12, color: "rgba(240,253,244,0.5)", marginBottom: 6 }}>Last name</div>
              <input {...register("last_name",{required:"Last Name is required"})} placeholder="Minhaz" 
                style={getInputStyle("last_name")} />
                {errors.last_name && <span style={{color: "#EF4444", fontSize: 11}}>{errors.last_name.message}</span>}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "rgba(240,253,244,0.5)", marginBottom: 6 }}>Email</div>
            <input type="email" {...register("email",{required:"Email is required"})} placeholder="you@mail.com" 
              style={getInputStyle("email")} />
              {errors.email && <span style={{color: "#EF4444", fontSize: 11}}>{errors.email.message}</span>}
          </div>

<div>
            <div style={{ fontSize: 12, color: "rgba(240,253,244,0.5)", marginBottom: 6 }}>Password</div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters long" } })} placeholder="••••••••" style={getInputStyle("password")} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={eyeButtonStyle}>
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            {errors.password && <span style={{color: "#EF4444", fontSize: 11}}>{errors.password.message}</span>}
          </div>
          
<div>
            <div style={{ fontSize: 12, color: "rgba(240,253,244,0.5)", marginBottom: 6 }}>Confirm Password</div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input type={showRePassword ? "text" : "password"} {...register("re_password", { required: "Confirm password is required", validate: value => value === passwordValue || "Passwords do not match!" })} placeholder="••••••••" style={getInputStyle("re_password")} />
              <button type="button" onClick={() => setShowRePassword(!showRePassword)} style={eyeButtonStyle}>
                <EyeIcon visible={showRePassword} />
              </button>
            </div>
            {errors.re_password && <span style={{color: "#EF4444", fontSize: 11}}>{errors.re_password.message}</span>}
          </div>

        <motion.button type="submit" disabled={loading}
          style={{ width: "100%", marginTop: 24, padding: "12px 0", borderRadius: 12, background: loading ? "rgba(16,185,129,0.5)" : E, color: "#fff", border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
          whileHover={!loading ? { background: "#059669" } : {}} whileTap={!loading ? { scale: 0.98 } : {}}>
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <motion.span style={{ width: 15, height: 15, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }}
                animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              Creating account…
            </span>
          ) : "Create account"}
        </motion.button>
        </form>


        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.38)" }}>
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: E, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
            Sign in
          </button>
        </div>
      </motion.div>
    </div>
  );
}