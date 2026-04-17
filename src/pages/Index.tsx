import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "white",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Inter, -apple-system, sans-serif",
    }}>

      {/* Nav */}
      <nav style={{ padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M4 12L16 4L28 12V26C28 27.1 27.1 28 26 28H6C4.9 28 4 27.1 4 26V12Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 28V16H20V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#111827", letterSpacing: "-0.2px" }}>Digital Home</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/login" style={{ fontSize: 14, fontWeight: 500, color: "#6B7280", textDecoration: "none" }}>Sign In</Link>
          <Link to="/signup" style={{ fontSize: 14, fontWeight: 600, color: "white", background: "#6366f1", padding: "9px 20px", borderRadius: 10, textDecoration: "none" }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#EEF2FF", borderRadius: 999, marginBottom: 28 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1" }}>A Digital Office Home for Your Personal Life</span>
        </div>

        <h1 style={{ fontSize: 52, fontWeight: 800, color: "#111827", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px", maxWidth: 700 }}>
          Your entire life,<br />
          <span style={{ color: "#6366f1" }}>organized in one place.</span>
        </h1>

        <p style={{ fontSize: 18, color: "#6B7280", lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
          Digital Home is a personal OS that brings together your money, goals, relationships, 
          and creative work &mdash; so you can stop juggling apps and start living intentionally.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 60, flexWrap: "wrap" }}>
          <Link to="/signup" style={{ padding: "15px 32px", background: "#6366f1", color: "white", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 4px 14px rgba(99,102,241,0.35)" }}>
            Start for free
          </Link>
          <Link to="/login" style={{ padding: "15px 32px", border: "1.5px solid #E5E7EB", color: "#374151", borderRadius: 12, fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
            Sign in
          </Link>
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", maxWidth: 640, marginBottom: 80 }}>
          {[
            { emoji: "💰", label: "Money & Net Worth" },
            { emoji: "🎯", label: "Goals & Projects" },
            { emoji: "👥", label: "Contacts & CRM" },
            { emoji: "🎬", label: "Content Studio" },
            { emoji: "📓", label: "Journal" },
            { emoji: "📅", label: "Monthly Reviews" },
            { emoji: "📊", label: "Wealth Tracker" },
            { emoji: "🏠", label: "Life Dashboard" },
          ].map(f => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 999, fontSize: 13, color: "#374151", fontWeight: 500 }}>
              <span>{f.emoji}</span> {f.label}
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 900, width: "100%", marginBottom: 80 }}>
          {[
            {
              icon: "💰",
              title: "Your Money, Mastered",
              desc: "Track net worth, budget, investments, bills, and savings goals. Connect your bank with Plaid for automatic transaction sync.",
            },
            {
              icon: "🎯",
              title: "Goals That Stick",
              desc: "Turn your ambitions into structured projects with tasks, milestones, and AI-powered stage generation. Monthly reviews keep you accountable.",
            },
            {
              icon: "🎬",
              title: "Creator Studio",
              desc: "Manage your content pipeline, track brand deals, plan posts across platforms, and measure your growth all in one dashboard.",
            },
            {
              icon: "👥",
              title: "Your Network, Nurtured",
              desc: "A personal CRM that reminds you who to reach out to, tracks relationship history, and helps you stay connected to the people who matter.",
            },
            {
              icon: "📓",
              title: "Journal & Reflect",
              desc: "Private journaling with mood tracking, voice notes, and the ability to push entries straight to your Substack as drafts.",
            },
            {
              icon: "🏠",
              title: "One Home for It All",
              desc: "Everything synced in real time. Access your entire life from any device. No more switching between 10 different apps.",
            },
          ].map(card => (
            <div key={card.title} style={{ background: "white", border: "1px solid #F3F4F6", borderRadius: 16, padding: "24px 22px", textAlign: "left", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{card.title}</h3>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg, #6366f1, #8B5CF6)", borderRadius: 20, padding: "48px 40px", maxWidth: 600, width: "100%", color: "white", marginBottom: 60 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, letterSpacing: "-0.3px" }}>Ready to come home?</h2>
          <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.6, marginBottom: 28 }}>Join Digital Home free today. No credit card required.</p>
          <Link to="/signup" style={{ display: "inline-block", padding: "14px 32px", background: "white", color: "#6366f1", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            Create your free account
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: "24px 40px", borderTop: "1px solid #F3F4F6", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 32 32" fill="none">
              <path d="M4 12L16 4L28 12V26C28 27.1 27.1 28 26 28H6C4.9 28 4 27.1 4 26V12Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 28V16H20V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontSize: 13, color: "#9CA3AF" }}>&copy; {new Date().getFullYear()} Digital Home. All rights reserved.</span>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Link to="/privacy" style={{ fontSize: 13, color: "#9CA3AF", textDecoration: "none" }}>Privacy Policy</Link>
          <Link to="/terms" style={{ fontSize: 13, color: "#9CA3AF", textDecoration: "none" }}>Terms of Service</Link>
          <a href="mailto:support@mydigitalhome.app" style={{ fontSize: 13, color: "#9CA3AF", textDecoration: "none" }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
