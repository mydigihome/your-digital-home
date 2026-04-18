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

        <p style={p}>Digital Home ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our application at <strong>mydigitalhome.app</strong>.</p>
        <div style={{ padding: "14px 18px", background: "#EEF2FF", borderLeft: "4px solid #6366f1", borderRadius: "0 8px 8px 0", marginBottom: 24 }}>
          <p style={{ margin: 0, color: "#312E81", fontSize: 14, fontWeight: 600 }}>This policy meets or exceeds the requirements of GDPR, CCPA, and COPPA. We are committed to full compliance with all applicable privacy laws.</p>
        </div>

        <h2 style={h2}>1. Information We Collect</h2>
        <p style={p}><strong>Account Information:</strong> Name, email address, profile photo, and authentication credentials when you create an account.</p>
        <p style={p}><strong>Financial Data (via Plaid):</strong> Bank balances, transactions, and investment data when you connect your accounts. We never store your bank login credentials — Plaid handles authentication directly and is subject to its own privacy policy.</p>
        <p style={p}><strong>Google/Calendar Data:</strong> Email metadata and calendar events when you enable these integrations. We comply fully with the Google API Services User Data Policy, including the Limited Use requirements. Google user data is used solely to provide the features you requested.</p>
        <p style={p}><strong>Usage Data:</strong> Pages visited, features used, device type, browser version, IP address, and error logs to improve the service and detect security issues.</p>
        <p style={p}><strong>Your Content:</strong> Journal entries, projects, contacts, financial plans, notes, and any other content you create within the app. This is your data and belongs to you.</p>
        <p style={p}><strong>Payment Information:</strong> Billing details processed through Stripe. We never see or store raw card numbers, CVVs, or bank account numbers.</p>

        <h2 style={h2}>2. How We Use Your Information</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {["Provide, operate, maintain, and improve the Service","Display your personal data in an organized, useful format across your dashboard","Generate AI-powered insights and summaries based on your data","Process payments securely via Stripe","Send transactional emails (receipts, password resets, billing notices, security alerts)","Respond to support requests and user feedback","Detect and prevent fraud, abuse, and security incidents","Comply with applicable laws and legal obligations","Conduct aggregate, anonymized internal analytics to understand usage patterns"].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>
        <div style={{ padding: "16px 20px", background: "#F0FDF4", borderLeft: "4px solid #10B981", borderRadius: "0 8px 8px 0", marginBottom: 24 }}>
          <p style={{ margin: 0, color: "#065F46", fontSize: 14, fontWeight: 600 }}>We do NOT:</p>
          <ul style={{ paddingLeft: 16, margin: "8px 0 0" }}>
            {["Sell your personal information to any third party, ever","Share your financial data with advertisers or data brokers","Use your journal entries or personal content to train AI models without explicit, separate consent","Share your data with other users without your permission","Send marketing emails without prior opt-in consent","Engage in cross-context behavioral advertising"].map((item, i) => <li key={i} style={{ ...li, color: "#065F46" }}>{item}</li>)}
          </ul>
        </div>

        <h2 style={h2}>3. Data Sharing and Third Parties</h2>
        <p style={p}>We share data only with the following service providers operating under strict data processing agreements and who process data solely as directed by us:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {["Supabase — database infrastructure and authentication (servers in the US)","Stripe — payment processing (PCI-DSS Level 1 compliant; we never store raw card data)","Plaid — bank account connection and financial data retrieval (subject to Plaid's privacy policy)","Google — OAuth authentication and calendar integration (subject to Google API Services User Data Policy)","Anthropic — AI-powered features and summaries (data processed per Anthropic's API terms)"].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>
        <p style={p}>We may also disclose data: (a) to comply with a legal obligation or valid court order; (b) to protect our rights, property, or safety or those of others; (c) in connection with a merger, acquisition, or asset sale, with advance notice to you.</p>
        <p style={p}><strong>We do not sell or rent your personal data to any party, ever.</strong></p>

        <h2 style={h2}>4. Data Security</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {["AES-256 encryption at rest for all stored data","TLS 1.3 encryption in transit for all data transfers","Row-level security (RLS) in our database — only you can access your data by default","OAuth tokens stored with encryption","Passwords hashed using bcrypt with unique salting","Multi-factor authentication (MFA) available for accounts","Automated daily backups with point-in-time recovery","Breach notification within 72 hours as required by GDPR Article 33","Regular security audits and penetration testing","Least-privilege access principles for all staff"].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>
        <p style={p}>Despite our efforts, no security system is impenetrable. We cannot guarantee absolute security. In the event of a breach affecting your rights, we will notify you as required by law.</p>

        <h2 style={h2}>5. Your Rights</h2>
        <p style={p}><strong>All users:</strong> You have the right to access, correct, and delete your data at any time through Settings. You can export your data upon request.</p>
        <p style={p}><strong>California residents (CCPA/CPRA):</strong> You have the right to: know what personal information we collect and how it is used; delete your personal information; correct inaccurate information; opt-out of sale (we don't sell data); limit use of sensitive personal information; and non-discrimination for exercising these rights. Submit requests to <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a>.</p>
        <p style={p}><strong>EU/UK residents (GDPR/UK GDPR):</strong> You have the right to: access your personal data; rectify inaccurate data; erase your data ("right to be forgotten"); restrict processing; data portability; object to processing; withdraw consent at any time; and lodge a complaint with your local data protection authority (e.g., ICO in the UK, relevant EU DPA). Our lawful basis for processing is primarily contract performance and legitimate interests. Requests should be submitted to <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a>. We will respond within 30 days.</p>

        <h2 style={h2}>6. Children's Privacy (COPPA)</h2>
        <p style={p}>Digital Home is not directed at children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us personal information, contact us immediately at <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a> and we will delete it promptly. Users between 13-18 should obtain parental consent before using the Service.</p>

        <h2 style={h2}>7. Cookies and Tracking</h2>
        <p style={p}><strong>Essential cookies:</strong> Required for authentication, session management, and security. Cannot be disabled without affecting functionality.</p>
        <p style={p}><strong>Preference cookies:</strong> Remember your settings, theme, and display preferences.</p>
        <p style={p}><strong>Analytics:</strong> We use aggregate, anonymized analytics (no cross-site tracking). We do not use advertising trackers, retargeting pixels, or sell cookie data to advertisers.</p>
        <p style={p}>You can control cookies through your browser settings. Note that disabling essential cookies may impair functionality.</p>

        <h2 style={h2}>8. Data Retention</h2>
        <p style={p}>We retain your data for as long as your account is active and for a reasonable period thereafter to fulfill legal obligations. When you delete your account: we delete or anonymize your personal data within 30 days from our active systems. Financial transaction records may be retained for up to 7 years as required by applicable tax and financial regulations. Anonymized, aggregate data may be retained indefinitely.</p>

        <h2 style={h2}>9. International Transfers</h2>
        <p style={p}>Your data may be processed in the United States and other countries where our service providers operate. For EU/UK users, we ensure appropriate safeguards are in place (such as Standard Contractual Clauses) for international transfers as required by GDPR.</p>

        <h2 style={h2}>10. Changes to This Policy</h2>
        <p style={p}>We may update this policy periodically. For material changes, we will provide at least 30 days' advance notice via email and in-app notification before the effective date. For non-material changes, the updated policy will be posted with a new effective date. Continued use of the Service after the effective date constitutes acceptance. If you do not agree, you should stop using the Service and delete your account.</p>

        <h2 style={h2}>11. Contact & Data Protection Officer</h2>
        <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ margin: 0, lineHeight: 2.2, fontSize: 15, color: "#374151" }}>
            <strong>Digital Home (Princess Tope)</strong><br />
            Privacy inquiries: <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a><br />
            Legal inquiries: <a href="mailto:legal@mydigitalhome.app" style={{ color: "#6366f1" }}>legal@mydigitalhome.app</a><br />
            General support: <a href="mailto:support@mydigitalhome.app" style={{ color: "#6366f1" }}>support@mydigitalhome.app</a><br />
            Website: <a href="https://mydigitalhome.app" style={{ color: "#6366f1" }}>mydigitalhome.app</a>
          </p>
        </div>

        <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 24, marginTop: 40, textAlign: "center" as const }}>
          <p style={{ fontSize: 13, color: "#9CA3AF" }}>
            © {new Date().getFullYear()} Digital Home ·{" "}
            <Link to="/privacy" style={{ color: "#9CA3AF", textDecoration: "none" }}>Privacy</Link> ·{" "}
            <Link to="/terms" style={{ color: "#9CA3AF", textDecoration: "none" }}>Terms</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
