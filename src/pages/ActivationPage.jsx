import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authApiClient from "../services/auth-api-client";

const spinnerStyle = {
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #3498db",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  animation: "spin 1s linear infinite",
  margin: "20px auto",
};

export function ActivationPage() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await authApiClient.post("/auth/users/activation/", { uid, token });
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setStatus("error",err);
      }
    };
    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" }}>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>

      {status === "loading" && (
        <div>
          <div style={spinnerStyle}></div>
          <h2>Account is being activated...</h2>
          <p>Please wait a moment.</p>
        </div>
      )}

      {status === "success" && (
        <div>
          <h2 style={{ color: "green" }}>Congratulations!</h2>
          <p>Your account has been successfully activated. Redirecting you to the login page in 3 seconds...</p>
        </div>
      )}

      {status === "error" && (
        <div>
          <h2 style={{ color: "red" }}>Activation Failed!</h2>
          <p>The link might be expired or invalid. Please try registering again.</p>
          <button 
            onClick={() => navigate("/register")}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Go to Registration
          </button>
        </div>
      )}
    </div>
  );
}

export default ActivationPage;