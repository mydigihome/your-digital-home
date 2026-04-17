import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const h2 = { fontSize: 18, fontWeight: 700, color: "#111827", marginTop: 40, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #F3F4F6" } as React.CSSProperties;
  const p = { marginBottom: 14, color: "#374151", lineHeight: 1.8 } as React.CSSProperties;

  return (
    <div style={{ minHeight: "100vh", background: "white", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 32px 80px" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 40, color: "#6366f1", fontWeight: 600, fontSize: 15 }}>← Digital Home</Link>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 40 }}>Effective Date: April 16, 2026</p>
        <p style={p}>Digital Home is committed to protecting your privacy. This policy explains how we collect, use, and protect your data at <strong>mydigitalhome.app</strong>.</p>
        <h2 style={h2}>1. Information We Collect</h2>
        <p style={p}>Account info (name, email, photo), financial data via Plaid (never your login credentials), Google/Calendar data when enabled, usage analytics, and content you create in the app.</p>
        <h2 style={h2}>2. How We Use It</h2>
        <p style={p}>To provide the service, generate AI insights, process payments, respond to support requests, and comply with legal obligations. We do NOT sell your data or use your content to train AI without consent.</p>
        <h2 style={h2}>3. Data Security</h2>
        <p style={p}>AES-256 encryption at rest, TLS 1.2+ in transit, row-level security so only you access your data, bcrypt password hashing, and breach notification within 72 hours per GDPR.</p>
        <h2 style={h2}>4. Your Rights</h2>
        <p style={p}>You can access, correct, delete, and export your data at any time. California (CCPA) and EU/UK (GDPR) users have additional rights. Contact <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a>.</p>
        <h2 style={h2}>5. Children's Privacy (COPPA)</h2>
        <p style={p}>Digital Home is not directed at children under 13. We do not knowingly collect data from children under 13.</p>
        <h2 style={h2}>6. Contact</h2>
        <p style={p}>Email: <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a></p>
        <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 24, marginTop: 40, textAlign: "center" as const }}>
          <p style={{ fontSize: 13, color: "#9CA3AF" }}>© {new Date().getFullYear()} Digital Home · <Link to="/privacy" style={{ color: "#9CA3AF" }}>Privacy</Link> · <Link to="/terms" style={{ color: "#9CA3AF" }}>Terms</Link></p>
        </div>
      </div>
    </div>
  );
}
