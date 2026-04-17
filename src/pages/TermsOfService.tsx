import { Link } from "react-router-dom";

export default function TermsOfService() {
  const h2 = { fontSize: 18, fontWeight: 700, color: "#111827", marginTop: 40, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #F3F4F6" } as React.CSSProperties;
  const p = { marginBottom: 14, color: "#374151", lineHeight: 1.8, fontSize: 15 } as React.CSSProperties;
  const li = { marginBottom: 8, paddingLeft: 4, color: "#374151", fontSize: 15 } as React.CSSProperties;

  return (
    <div style={{ minHeight: "100vh", background: "white", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 32px 80px" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 40, color: "#6366f1", fontWeight: 600, fontSize: 15 }}>
          ← Digital Home
        </Link>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 8 }}>Effective Date: April 16, 2026 · Last Updated: April 16, 2026</p>
        <div style={{ height: 1, background: "#F3F4F6", marginBottom: 40 }} />

        <p style={p}>These Terms of Service (“Terms”) constitute a legally binding agreement between you and Digital Home governing your access to and use of the Digital Home application at <strong>mydigitalhome.app</strong>.</p>
        <div style={{ padding: "14px 18px", background: "#FEF2F2", borderLeft: "4px solid #EF4444", borderRadius: "0 8px 8px 0", marginBottom: 24 }}>
          <p style={{ margin: 0, color: "#991B1B", fontSize: 14, fontWeight: 600 }}>PLEASE READ THESE TERMS CAREFULLY. By creating an account or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>
        </div>

        <h2 style={h2}>1. Eligibility</h2>
        <p style={p}>You must be at least 18 years of age to use Digital Home. By using the Service, you represent and warrant that you are at least 18 years old and that all information you provide is accurate, current, and complete.</p>

        <h2 style={h2}>2. Account Registration</h2>
        <p style={p}>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use at <a href="mailto:support@mydigitalhome.app" style={{ color: "#6366f1" }}>support@mydigitalhome.app</a>.</p>

        <h2 style={h2}>3. Subscription and Billing</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {["Free Plan: Limited access to core features at no cost","Standard Plan: $12/month or $99/year — full access to all standard features","Founding Member: $9/month (price locked forever, available to first 50 users)","Student Plan: 50% discount with verified .edu email address","Studio Add-on: $29.99 one-time payment for lifetime Studio access"].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>
        <p style={p}>All payments are processed securely by Stripe. We never store your raw card data. Prices are in USD and may be subject to applicable taxes.</p>
        <p style={p}><strong>Cancellation and Refunds:</strong> Monthly plans are refundable within 7 days of charge. Annual plans are refundable within 14 days of initial purchase. Founding Member and Studio Add-on are non-refundable after 7 days. To cancel, go to Settings → Plan & Billing or contact billing@mydigitalhome.app.</p>

        <h2 style={h2}>4. Acceptable Use</h2>
        <p style={p}>You agree not to use the Service to:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {["Violate any applicable law or regulation","Attempt to gain unauthorized access to any part of the Service or other users’ data","Reverse engineer, decompile, or disassemble the software","Use automated scraping, bots, or data harvesting tools","Impersonate any person, company, or entity","Upload malware, viruses, or any malicious code","Harass, threaten, or harm other users","Violate the terms of any third-party services we integrate with"].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>

        <h2 style={h2}>5. Financial Disclaimer</h2>
        <div style={{ padding: "16px 20px", background: "#FFFBEB", borderLeft: "4px solid #F59E0B", borderRadius: "0 8px 8px 0", marginBottom: 24 }}>
          <p style={{ margin: 0, color: "#92400E", fontSize: 14, fontWeight: 600 }}>IMPORTANT: Digital Home is a personal organization and tracking tool. It is NOT a licensed financial advisor, investment advisor, tax advisor, or legal advisor. Nothing in the Service constitutes financial, investment, tax, or legal advice. All financial data, projections, and plans are for organizational and informational purposes only. Consult a qualified professional before making any financial decisions.</p>
        </div>

        <h2 style={h2}>6. Your Content</h2>
        <p style={p}>You retain full ownership of all content you create in Digital Home, including journal entries, financial data, projects, contacts, and notes. You grant Digital Home a limited, non-exclusive license to store, display, and process your content solely to provide the Service to you. We will not use your content for advertising or share it with third parties without your consent.</p>

        <h2 style={h2}>7. Intellectual Property</h2>
        <p style={p}>Digital Home, its logo, design, code, and all associated intellectual property are owned by Digital Home and protected by copyright, trademark, and other applicable laws. You may not copy, modify, distribute, or create derivative works without prior written permission.</p>

        <h2 style={h2}>8. Third-Party Integrations</h2>
        <p style={p}>The Service integrates with third-party services (Plaid, Google, Stripe, etc.). Your use of these integrations is subject to those services’ own terms and privacy policies. Digital Home is not responsible for third-party service availability, accuracy, or policies.</p>

        <h2 style={h2}>9. Service Availability</h2>
        <p style={p}>We aim for 99.9% uptime but do not guarantee uninterrupted availability. We may perform maintenance, updates, or experience outages. We are not liable for service interruptions beyond our control.</p>

        <h2 style={h2}>10. Disclaimers of Warranties</h2>
        <p style={{ ...p, fontWeight: 600, textTransform: "uppercase" as const, fontSize: 13 }}>THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, UNINTERRUPTED, OR COMPLETELY SECURE.</p>

        <h2 style={h2}>11. Limitation of Liability</h2>
        <p style={{ ...p, fontWeight: 600, textTransform: "uppercase" as const, fontSize: 13 }}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DIGITAL HOME’S TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) AMOUNTS YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) $100 USD. WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</p>

        <h2 style={h2}>12. Indemnification</h2>
        <p style={p}>You agree to indemnify and hold harmless Digital Home and its officers, employees, and agents from any claims, damages, or expenses (including legal fees) arising from your use of the Service, your content, or your violation of these Terms.</p>

        <h2 style={h2}>13. Dispute Resolution and Arbitration</h2>
        <p style={p}>Disputes between you and Digital Home will be resolved through binding arbitration under the American Arbitration Association’s Consumer Arbitration Rules, rather than in court, except for claims that may be brought in small claims court.</p>
        <p style={p}><strong>Class Action Waiver:</strong> You agree to resolve disputes individually and waive the right to participate in class action lawsuits or class-wide arbitration.</p>
        <p style={p}>You may opt out of arbitration within 30 days of first accepting these Terms by emailing <a href="mailto:legal@mydigitalhome.app" style={{ color: "#6366f1" }}>legal@mydigitalhome.app</a> with “Arbitration Opt-Out” in the subject line.</p>

        <h2 style={h2}>14. Governing Law</h2>
        <p style={p}>These Terms are governed by and construed in accordance with the laws of the State of Colorado, United States, without regard to conflict of law principles.</p>

        <h2 style={h2}>15. Changes to Terms</h2>
        <p style={p}>We may update these Terms from time to time. For material changes, we will provide at least 30 days’ advance notice via email. Continued use after the effective date constitutes acceptance.</p>

        <h2 style={h2}>16. Termination</h2>
        <p style={p}>Either party may terminate this agreement at any time. We may suspend or terminate your account if you violate these Terms. Upon termination, your right to use the Service ceases and we will delete your data per our Privacy Policy.</p>

        <h2 style={h2}>17. Contact</h2>
        <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ margin: 0, lineHeight: 2.2, fontSize: 15, color: "#374151" }}>
            <strong>Digital Home</strong><br />
            Legal: <a href="mailto:legal@mydigitalhome.app" style={{ color: "#6366f1" }}>legal@mydigitalhome.app</a><br />
            Billing: <a href="mailto:billing@mydigitalhome.app" style={{ color: "#6366f1" }}>billing@mydigitalhome.app</a><br />
            Support: <a href="mailto:support@mydigitalhome.app" style={{ color: "#6366f1" }}>support@mydigitalhome.app</a><br />
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
