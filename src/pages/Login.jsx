import { useState } from "react";
import { motion } from "framer-motion";
import { Ic } from "../components/ui/Icons";
import { AuthDots } from "../components/ui/AuthDots";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

export function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const E = "#10B981";
  const LIME = "#84CC16";
  const { loginUser, error: authError } = useAuth();
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

async function onSubmit(data) {
    setLocalError("");
    setLoading(true);
    
    const userData = {
      email: data.email,
      password: data.password,
    };
    const result = await loginUser(userData);
    setLoading(false); 
    
    if (result && result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setLocalError(
        result?.message || "Invalid credentials. Please try again.",
      );
    }
  }

  const displayError = localError || authError;

  const inputStyle = {
    width: "100%",
    padding: "10px 42px 10px 14px",
    borderRadius: 12,
    fontSize: 13,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#f0fdf4",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };
  const getInputStyle = (fieldName) => ({
    ...inputStyle,
    borderColor: errors[fieldName] ? "#EF4444" : "rgba(255,255,255,0.12)",
  });
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 20% 50%, #0b3020 0%, #060f08 55%, #020a04 100%)",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <AuthDots />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          margin: "0 16px",
          borderRadius: 20,
          padding: 32,
          background: "#111d13",
          border: "1px solid rgba(16,185,129,0.2)",
        }}
      >
        {/* Logo */}
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

        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 4,
          }}
        >
          Sign in
        </div>
        <div
          style={{
            fontSize: 13,
            color: "rgba(240,253,244,0.45)",
            marginBottom: 24,
          }}
        >
          Welcome back. Track your sustainability impact.
        </div>

        {/* Error Display */}
        {displayError && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#EF4444",
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            {displayError}
          </div>
        )}

        {/* Inputs & Form Elements */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(240,253,244,0.5)",
                marginBottom: 6,
              }}
            >
              Email
            </div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="you@mail.com"
              style={getInputStyle("email")}
            />
            {errors.email && (
              <span
                style={{
                  color: "#EF4444",
                  fontSize: 11,
                  marginTop: 4,
                  display: "block",
                }}
              >
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 12, color: "rgba(240,253,244,0.5)" }}>
                Password
              </span>
              <button
              onClick={() => navigate("/forgot-password")}
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: E,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Forgot?
              </button>
            </div>

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters length",
                  },
                })}
                placeholder="••••••••"
                style={getInputStyle("password")}
              />

              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showPassword ? (
                  // Eye Open SVG
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: 18, height: 18 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  // Eye Slash/Closed SVG
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: 18, height: 18 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span
                style={{
                  color: "#EF4444",
                  fontSize: 11,
                  marginTop: 4,
                  display: "block",
                }}
              >
                {errors.password.message}
              </span>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: 24,
              padding: "12px 0",
              borderRadius: 12,
              background: loading ? "rgba(16,185,129,0.5)" : E,
              color: "#fff",
              border: "none",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
            whileHover={!loading ? { background: "#059669" } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <motion.span
                  style={{
                    width: 15,
                    height: 15,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Signing in…
              </span>
            ) : (
              "Sign in"
            )}
          </motion.button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "rgba(255,255,255,0.38)",
          }}
        >
          New to EcoTrack?{" "}
          <button
            onClick={() => navigate("/register")}
            style={{
              background: "none",
              border: "none",
              color: E,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Create account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
