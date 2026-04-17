import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div style={{ minHeight: "100vh", background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        {/* Logo + name — must match Google OAuth app name exactly */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path d="M4 12L16 4L28 12V26C28 27.1 27.1 28 26 28H6C4.9 28 4 27.1 4 26V12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 28V16H20V28" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>Digital Home</span>
        </div>

        <h1 style={{ fontSize: 38, fontWeight: 800, color: "#111827", lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.5px" }}>
          Your personal OS for life
        </h1>
        <p style={{ fontSize: 17, color: "#6B7280", marginBottom: 36, lineHeight: 1.6 }}>
          Track your money, goals, relationships, and creative work — all in one place.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 48 }}>
          <Link to="/login" style={{ padding: "13px 28px", background: "#6366f1", color: "white", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            Sign In
          </Link>
          <Link to="/signup" style={{ padding: "13px 28px", border: "1.5px solid #E5E7EB", color: "#374151", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            Get Started
          </Link>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          {["Money & Net Worth", "Goals & Projects", "Contacts & CRM", "Content Studio", "Monthly Reviews"].map(f => (
            <span key={f} style={{ padding: "5px 12px", background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 999, fontSize: 12, color: "#6B7280" }}>{f}</span>
          ))}
        </div>
      </div>

      {/* Footer with privacy policy link — required for Google OAuth verification */}
      <footer style={{ position: "absolute", bottom: 24, textAlign: "center", fontSize: 13, color: "#9CA3AF" }}>
        <p style={{ margin: "0 0 4px" }}>© {new Date().getFullYear()} Digital Home</p>
        <p style={{ margin: 0 }}>
          <Link to="/privacy" style={{ color: "#9CA3AF", textDecoration: "none" }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "#6366f1"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "#9CA3AF"}
          >Privacy Policy</Link>
          <span style={{ margin: "0 8px" }}>&middot;</span>
          <Link to="/terms" style={{ color: "#9CA3AF", textDecoration: "none" }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "#6366f1"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "#9CA3AF"}
          >Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}
