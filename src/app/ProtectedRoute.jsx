import { Navigate, Outlet } from "react-router-dom";
import { Loader2, Database } from "lucide-react";
import { C, FB, R, S, SHADOW } from "../theme.jsx";
import { useAuth } from "./AuthContext.jsx";

// Full-screen states shared by the gate (loading / not-configured).
function Centered({ children }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(180deg,#fff 0%,${C.surface} 100%)`, fontFamily: FB, padding: 24,
    }}>
      {children}
    </div>
  );
}

function SetupNotice() {
  return (
    <Centered>
      <div style={{
        maxWidth: 460, background: "#fff", border: `1px solid ${C.border}`,
        borderRadius: R.panel, boxShadow: SHADOW.card, padding: "32px 30px", textAlign: "center",
      }}>
        <span style={{
          width: 52, height: 52, borderRadius: R.icon, background: C.blueFaint, color: C.blue,
          display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
        }}>
          <Database size={24} />
        </span>
        <h1 style={{ fontFamily: FB, fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 10 }}>
          Connect Supabase to continue
        </h1>
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: C.body, margin: 0 }}>
          The dashboard needs your Supabase credentials. Copy <code>.env.example</code> to{" "}
          <code>.env</code>, fill in <strong>VITE_SUPABASE_URL</strong> and{" "}
          <strong>VITE_SUPABASE_ANON_KEY</strong>, run <code>supabase/schema.sql</code> in the
          SQL editor, then restart the dev server. See <code>supabase/README.md</code>.
        </p>
      </div>
    </Centered>
  );
}

export default function ProtectedRoute() {
  const { user, loading, isConfigured } = useAuth();

  if (!isConfigured) return <SetupNotice />;

  if (loading) {
    return (
      <Centered>
        <Loader2 size={28} color={C.blue} style={{ animation: "kbspin 1s linear infinite" }} />
        <style>{`@keyframes kbspin{to{transform:rotate(360deg)}}`}</style>
      </Centered>
    );
  }

  if (!user) return <Navigate to="/auth/sign-in" replace />;

  return <Outlet />;
}
