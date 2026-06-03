import { Navigate, Outlet } from "react-router-dom"; 
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProtectedRoute() {
  const { authTokens, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center text-white font-sans">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 text-sm mt-4 font-medium animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }


  let hasAccess = authTokens?.access;
  
  if (!hasAccess) {
    const localTokens = localStorage.getItem("authTokens");
    if (localTokens) {
      try {
        const parsed = JSON.parse(localTokens);
        hasAccess = parsed?.access; 
      } catch (e) {
        hasAccess = false;
        console.log(e);
      }
    }
  }

  return hasAccess ? <Outlet /> : <Navigate to="/login" replace />;
}