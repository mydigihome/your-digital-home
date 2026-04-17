import { Link } from "react-router-dom";

export default function TermsOfService() {
  const h2 = { fontSize: 18, fontWeight: 700, color: "#111827", marginTop: 40, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #F3F4F6" } as React.CSSProperties;
  const p = { marginBottom: 14, color: "#374151", lineHeight: 1.8 } as React.CSSProperties;

  return (
    <div style={{ minHeight: "100vh", background: "white", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 32px 80px" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 40, color: "#6366f1", fontWeight: 600, fontSize: 15 }}>← Digital Home</Link>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 40 }}>Effective Date: April 16, 2026</p>
        <p style={p}>These Terms are a binding agreement between you and Digital Home governing use of <strong>mydigitalhome.app</strong>. By using the service, you agree to these terms.</p>
        <h2 style={h2}>1. Eligibility</h2>
        <p style={p}>You must be at least 18 years old to use Digital Home.</p>
        <h2 style={h2}>2. Subscription & Billing</h2>
        <p style={p}>Free, Standard ($12/mo or $99/yr), Founding Member ($9/mo locked), Student (50% off with .edu email), and Studio Add-on ($29.99 one-time). All payments via Stripe. Monthly plans refundable within 7 days, annual within 14 days.</p>
        <h2 style={h2}>3. Financial Disclaimer</h2>
        <p style={{ ...p, padding: "14px 18px", background: "#FFFBEB", borderLeft: "4px solid #F59E0B", borderRadius: "0 8px 8px 0" }}>Digital Home is a personal organization tool, NOT a licensed financial advisor. Nothing constitutes financial, investment, tax, or legal advice.</p>
        <h2 style={h2}>4. Your Content</h2>
        <p style={p}>You own all content you create. You grant Digital Home a limited license to store and display it solely to provide the service.</p>
        <h2 style={h2}>5. Limitation of Liability</h2>
        <p style={p}>Our liability is limited to amounts paid in the prior 12 months or $100, whichever is greater. We are not liable for indirect or consequential damages.</p>
        <h2 style={h2}>6. Governing Law</h2>
        <p style={p}>These Terms are governed by the laws of Colorado, United States. Disputes resolved via binding arbitration under AAA rules.</p>
        <h2 style={h2}>7. Contact</h2>
        <p style={p}>Legal: <a href="mailto:legal@mydigitalhome.app" style={{ color: "#6366f1" }}>legal@mydigitalhome.app</a></p>
        <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 24, marginTop: 40, textAlign: "center" as const }}>
          <p style={{ fontSize: 13, color: "#9CA3AF" }}>© {new Date().getFullYear()} Digital Home · <Link to="/privacy" style={{ color: "#9CA3AF" }}>Privacy</Link> · <Link to="/terms" style={{ color: "#9CA3AF" }}>Terms</Link></p>
        </div>
      </div>
    </div>
  );
}
