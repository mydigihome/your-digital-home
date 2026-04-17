import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const h2 = { fontSize: 18, fontWeight: 700, color: "#111827", marginTop: 40, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #F3F4F6" } as React.CSSProperties;
  const p = { marginBottom: 14, color: "#374151", lineHeight: 1.8, fontSize: 15 } as React.CSSProperties;
  const li = { marginBottom: 8, paddingLeft: 4, color: "#374151", fontSize: 15 } as React.CSSProperties;

  return (
    <div style={{ minHeight: "100vh", background: "white", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 32px 80px" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 40, color: "#6366f1", fontWeight: 600, fontSize: 15 }}>
          ← Digital Home
        </Link>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 8 }}>Effective Date: April 16, 2026 · Last Updated: April 16, 2026</p>
        <div style={{ height: 1, background: "#F3F4F6", marginBottom: 40 }} />

        <p style={p}>Digital Home (“we,” “us,” or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our application at <strong>mydigitalhome.app</strong>.</p>
        <p style={{ ...p, padding: "14px 18px", background: "#EEF2FF", borderLeft: "4px solid #6366f1", borderRadius: "0 8px 8px 0", margin: "0 0 24px" }}>This policy meets or exceeds the requirements of GDPR, CCPA, and COPPA.</p>

        <h2 style={h2}>1. Information We Collect</h2>
        <p style={p}><strong>Account Information:</strong> Name, email address, profile photo, and authentication credentials when you create an account.</p>
        <p style={p}><strong>Financial Data (via Plaid):</strong> Bank balances, transactions, and investment data when you connect your accounts. We never store your bank login credentials — Plaid handles authentication directly.</p>
        <p style={p}><strong>Google/Calendar Data:</strong> Email metadata and calendar events when you enable these integrations. We comply fully with Google API Services User Data Policy, including the Limited Use requirements.</p>
        <p style={p}><strong>Usage Data:</strong> Pages visited, features used, device type, browser version, IP address, and error logs to help us improve the service.</p>
        <p style={p}><strong>Your Content:</strong> Journal entries, projects, contacts, financial plans, notes, and any content you create within the app.</p>

        <h2 style={h2}>2. How We Use Your Information</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {["Provide, operate, maintain, and improve the Service","Display your personal data in an organized, useful format across your dashboard","Generate AI-powered insights and summaries based on your data","Process payments securely via Stripe","Send transactional emails (receipts, password resets, billing notices)","Respond to support requests and user feedback","Detect and prevent fraud, abuse, and security issues","Comply with applicable laws and legal obligations","Conduct internal analytics to understand aggregate usage patterns"].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>
        <div style={{ padding: "16px 20px", background: "#F0FDF4", borderLeft: "4px solid #10B981", borderRadius: "0 8px 8px 0", marginBottom: 24 }}>
          <p style={{ margin: 0, color: "#065F46", fontSize: 14, fontWeight: 600 }}>We do NOT:</p>
          <ul style={{ paddingLeft: 16, margin: "8px 0 0" }}>
            {["Sell your personal information to any third party","Share your financial data with advertisers","Use your journal entries or personal content to train AI models without explicit consent","Share your data with other users without your permission","Send marketing emails without opt-in consent"].map((item, i) => <li key={i} style={{ ...li, color: "#065F46" }}>{item}</li>)}
          </ul>
        </div>

        <h2 style={h2}>3. Data Sharing and Third Parties</h2>
        <p style={p}>We share data only with the following service providers who operate under strict confidentiality agreements and process data solely on our behalf:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {["Supabase — database infrastructure and authentication","Stripe — payment processing (we never store raw card data)","Plaid — bank account connection and financial data retrieval","Google — OAuth authentication and calendar integration","Anthropic — AI-powered features and summaries"].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>
        <p style={p}>We do not sell or rent your personal data to any party, ever.</p>

        <h2 style={h2}>4. Data Security</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {["AES-256 encryption at rest for all stored data","TLS 1.2+ encryption in transit for all data transfers","Row-level security (RLS) in our database ensuring only you can access your data","OAuth tokens stored with encryption","Passwords hashed using bcrypt with salting","Automated daily backups with point-in-time recovery","Breach notification within 72 hours as required by GDPR Article 33","Regular security audits and vulnerability assessments"].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>

        <h2 style={h2}>5. Your Rights</h2>
        <p style={p}><strong>All users:</strong> You have the right to access, correct, and delete your data at any time through Settings.</p>
        <p style={p}><strong>California residents (CCPA):</strong> You have the right to know what personal information we collect, the right to delete, the right to opt-out of sale (we don’t sell data), and the right to non-discrimination.</p>
        <p style={p}><strong>EU/UK residents (GDPR):</strong> You have the right to access, rectification, erasure (“right to be forgotten”), data portability, restriction of processing, and the right to object. You may also lodge a complaint with your local supervisory authority.</p>
        <p style={p}>To exercise any right, email <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a> or delete your account directly from Settings.</p>

        <h2 style={h2}>6. Children’s Privacy (COPPA)</h2>
        <p style={p}>Digital Home is not directed at children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such data, contact us immediately at <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a> and we will delete it promptly.</p>

        <h2 style={h2}>7. Cookies and Tracking</h2>
        <p style={p}><strong>Essential cookies:</strong> Required for authentication and session management. Cannot be disabled.</p>
        <p style={p}><strong>Preference cookies:</strong> Remember your settings and display preferences.</p>
        <p style={p}><strong>Analytics:</strong> We use aggregate, anonymized analytics to understand how features are used. We do not use cross-site advertising trackers or sell cookie data.</p>

        <h2 style={h2}>8. Data Retention</h2>
        <p style={p}>We retain your data as long as your account is active. When you delete your account, we delete your personal data within 30 days, except where retention is required by law (e.g., financial transaction records for tax compliance).</p>

        <h2 style={h2}>9. Changes to This Policy</h2>
        <p style={p}>We may update this policy periodically. For material changes, we will provide at least 30 days’ advance notice via email and in-app notification. Continued use of the Service after the effective date constitutes acceptance of the updated policy.</p>

        <h2 style={h2}>10. Contact Us</h2>
        <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ margin: 0, lineHeight: 2.2, fontSize: 15, color: "#374151" }}>
            <strong>Digital Home</strong><br />
            Privacy inquiries: <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a><br />
            General support: <a href="mailto:support@mydigitalhome.app" style={{ color: "#6366f1" }}>support@mydigitalhome.app</a><br />
            Website: <a href="https://mydigitalhome.app" style={{ color: "#6366f1" }}>mydigitalhome.app</a>
          </p>
        </div>

        <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 24, marginTop: 40, textAlign: "center" as const }}>
          <p style={{ fontSize: 13, color: "#9CA3AF" }}>
            © {new Date().getFullYear()} Digital Home  · 
            <Link to="/privacy" style={{ color: "#9CA3AF", textDecoration: "none" }}>Privacy</Link>  · 
            <Link to="/terms" style={{ color: "#9CA3AF", textDecoration: "none" }}>Terms</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
