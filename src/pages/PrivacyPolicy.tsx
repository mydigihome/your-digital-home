import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const s: React.CSSProperties = { fontFamily: "Inter, sans-serif", color: "#374151", lineHeight: 1.8, fontSize: 15 };
  const h1s: React.CSSProperties = { fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 8, letterSpacing: "-0.5px" };
  const h2s: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: "#111827", marginTop: 48, marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #F3F4F6" };
  const h3s: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: "#111827", marginTop: 24, marginBottom: 8 };
  const ps: React.CSSProperties = { marginBottom: 14 };
  const lis: React.CSSProperties = { marginBottom: 6, paddingLeft: 4 };

  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 32px 80px", ...s }}>

        {/* Header */}
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 40 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none"><path d="M4 12L16 4L28 12V26C28 27.1 27.1 28 26 28H6C4.9 28 4 27.1 4 26V12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 28V16H20V28" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#6366f1" }}>Digital Home</span>
        </Link>

        <h1 style={h1s}>Privacy Policy</h1>
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 8 }}>Effective Date: April 16, 2026 &nbsp;&middot;&nbsp; Last Updated: April 16, 2026</p>
        <div style={{ height: 1, background: "#F3F4F6", marginBottom: 40 }} />

        <p style={ps}>Digital Home (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains in detail how we collect, use, disclose, store, and protect your personal information when you use our application and services available at <strong>mydigitalhome.app</strong> and any associated domains or mobile applications (collectively, the &ldquo;Service&rdquo;).</p>
        <p style={ps}>By creating an account or using the Service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree, do not use the Service.</p>
        <p style={{ ...ps, padding: "14px 18px", background: "#EEF2FF", borderLeft: "4px solid #6366f1", borderRadius: "0 8px 8px 0" }}>This policy is designed to meet or exceed the requirements of the California Consumer Privacy Act (CCPA), the EU General Data Protection Regulation (GDPR), the Children&rsquo;s Online Privacy Protection Act (COPPA), and other applicable privacy laws.</p>

        {/* 1 */}
        <h2 style={h2s}>1. Information We Collect</h2>
        <p style={ps}>We collect information in three ways: information you provide directly, information collected automatically, and information from third-party integrations you authorize.</p>

        <h3 style={h3s}>1.1 Information You Provide Directly</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Full name, email address, and password when you create an account",
            "Profile photo, display name, location, and handle if you choose to provide them",
            "Billing information processed securely through Stripe (we never store raw card numbers)",
            "Journal entries, notes, and any personal content you create within the Service",
            "Project names, goals, tasks, and related details",
            "Contact information for people you add to your Contacts feature",
            "Financial data you manually enter, including income, expenses, debts, savings goals, and net worth estimates",
            "Content plans, brand deal information, and revenue data in the Studio feature",
            "Communication preferences and feedback you submit to us",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        <h3 style={h3s}>1.2 Information Collected Automatically</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Log data: IP address, browser type and version, operating system, referrer URL, pages visited, and time/date of access",
            "Device information: device type, screen resolution, and general hardware capabilities",
            "Usage data: features used, time spent in the application, clicks, and navigation patterns",
            "Session tokens and authentication identifiers necessary for account security",
            "Error logs and performance data used to diagnose technical issues",
            "Cookies and similar tracking technologies (see Section 9 for full details)",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        <h3 style={h3s}>1.3 Information from Third-Party Integrations</h3>
        <p style={ps}>When you connect third-party services, we receive data as described below. You control which integrations you enable and can disconnect them at any time.</p>
        <p style={{ ...ps, fontWeight: 600, color: "#111827" }}>Plaid (Financial Data)</p>
        <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
          {[
            "Bank account balances, transaction history, and account type information",
            "Credit card balances and payment history",
            "Investment account values and holdings (where supported)",
            "We do NOT store your bank login credentials. All authentication is handled by Plaid's secure infrastructure.",
            "Financial data is stored encrypted and used solely to display information to you within the Service.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={{ ...ps, fontWeight: 600, color: "#111827" }}>Google / Gmail</p>
        <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
          {[
            "Google account display name and email address for authentication",
            "If you enable Gmail integration: the ability to read email headers and bodies from contacts you designate as priority",
            "Calendar events if you connect Google Calendar",
            "We comply fully with Google API Services User Data Policy, including Limited Use requirements",
            "We do not use Google user data to serve advertising or for any purpose outside of providing the Service",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={{ ...ps, fontWeight: 600, color: "#111827" }}>LinkedIn</p>
        <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
          {[
            "Basic profile information including name, headline, and profile photo",
            "Professional connections data where authorized",
            "We do not post to LinkedIn on your behalf without your explicit action",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={{ ...ps, fontWeight: 600, color: "#111827" }}>Stripe (Payments)</p>
        <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
          {[
            "Subscription status, plan tier, and payment history",
            "Stripe handles all payment processing; we never receive or store raw card data",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 2 */}
        <h2 style={h2s}>2. How We Use Your Information</h2>
        <p style={ps}>We use your information only for the purposes described below. We do not sell your personal information. Ever.</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "To provide, operate, maintain, and improve the Service",
            "To authenticate your identity and maintain the security of your account",
            "To display your data back to you in an organized, useful format",
            "To generate AI-powered insights based on your data (when you use AI features)",
            "To process subscription payments and send transactional emails",
            "To send you product updates, new feature announcements, and important account notices",
            "To respond to your support requests, questions, and feedback",
            "To detect, prevent, and address fraud, abuse, and security vulnerabilities",
            "To comply with applicable legal obligations",
            "To conduct analytics that help us understand how the Service is used in aggregate",
            "To enforce our Terms of Service",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={{ ...ps, padding: "14px 18px", background: "#F0FDF4", borderLeft: "4px solid #10B981", borderRadius: "0 8px 8px 0" }}>
          <strong>We do NOT:</strong> sell your data to any third party, share your financial data with advertisers, use your journal entries or personal content to train AI models without your explicit consent, share your data with other Digital Home users, or use your data for any purpose not described in this policy.
        </p>

        {/* 3 */}
        <h2 style={h2s}>3. Legal Basis for Processing (GDPR)</h2>
        <p style={ps}>For users in the European Economic Area (EEA), United Kingdom, or Switzerland, our legal bases for processing your personal data are:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Contract performance: Processing necessary to provide the Service you signed up for",
            "Legitimate interests: Analytics, security, fraud prevention, and product improvement — balanced against your privacy rights",
            "Legal obligation: Compliance with applicable laws and regulations",
            "Consent: For optional features such as email marketing or non-essential cookies — you may withdraw consent at any time",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 4 */}
        <h2 style={h2s}>4. Data Sharing and Disclosure</h2>
        <p style={ps}>We do not sell, rent, or trade your personal information. We share data only in the following limited circumstances:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Service providers: Companies that help us operate the Service (cloud hosting, payment processing, email delivery) under confidentiality agreements that prohibit them from using your data for other purposes",
            "Legal requirements: When required by law, court order, or governmental authority, or when necessary to protect the rights, property, or safety of Digital Home, our users, or the public",
            "Business transfer: In connection with a merger, acquisition, or sale of assets, in which case we will notify you and the acquiring entity must honor this Privacy Policy",
            "With your consent: Any other sharing requires your explicit permission",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={ps}>Our key service providers and their privacy policies:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Supabase (infrastructure): supabase.com/privacy",
            "Stripe (payments): stripe.com/privacy",
            "Plaid (financial data): plaid.com/legal/privacy-policy",
            "Google (authentication/calendar/email): policies.google.com/privacy",
            "Anthropic (AI features): anthropic.com/privacy",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 5 */}
        <h2 style={h2s}>5. Data Storage and Security</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "All data is stored on secure, SOC 2 Type II certified cloud infrastructure",
            "Data is encrypted at rest using AES-256 encryption",
            "All data in transit is protected with TLS 1.2 or higher",
            "We implement row-level security (RLS) ensuring each user can only access their own data",
            "OAuth tokens for third-party integrations are stored encrypted and never exposed in plaintext",
            "Passwords are hashed using bcrypt with salting",
            "We maintain automated backups with point-in-time recovery",
            "We conduct periodic security reviews and vulnerability assessments",
            "Access to production data is limited to essential personnel only",
            "We maintain an incident response plan and will notify you of any data breach affecting your personal information within 72 hours of discovery, as required by GDPR",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={ps}>While we implement industry-standard security measures, no method of transmission over the Internet or electronic storage is 100% secure. We encourage you to use a strong, unique password and enable any additional security features we offer.</p>

        {/* 6 */}
        <h2 style={h2s}>6. Data Retention</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "We retain your account data for as long as your account is active or as needed to provide the Service",
            "If you request account deletion, all personal data is permanently deleted within 30 days",
            "Financial transaction data synced from Plaid is retained for up to 24 months unless you delete it earlier",
            "Anonymized, aggregated analytics data may be retained indefinitely as it cannot identify you",
            "Backup copies may persist for up to 90 days after deletion before being purged from all systems",
            "If required by law (e.g., tax records), we may retain certain data for longer periods as required",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 7 */}
        <h2 style={h2s}>7. Your Rights and Choices</h2>
        <p style={ps}>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Right of access: Request a copy of all personal data we hold about you",
            "Right of rectification: Correct inaccurate or incomplete information in your profile",
            "Right of erasure (\u201cright to be forgotten\u201d): Request deletion of your account and all associated data",
            "Right to data portability: Receive your data in a structured, machine-readable format (JSON export available in Settings)",
            "Right to object: Object to processing based on legitimate interests",
            "Right to restrict processing: Request that we limit how we use your data",
            "Right to withdraw consent: Where processing is based on consent, withdraw it at any time without affecting prior processing",
            "Right to lodge a complaint: File a complaint with your local data protection authority (EU users: your national DPA)",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={ps}><strong>California residents (CCPA):</strong> You have the right to know what personal information we collect and how it is used, to request deletion of your personal information, and to opt out of the sale of personal information (we do not sell personal information). We will not discriminate against you for exercising your CCPA rights.</p>
        <p style={ps}>To exercise any of these rights, contact us at <strong>privacy@mydigitalhome.app</strong> or through Settings &rarr; Account &rarr; Export/Delete My Data. We respond to all verified requests within 30 days.</p>

        {/* 8 */}
        <h2 style={h2s}>8. Children&rsquo;s Privacy (COPPA)</h2>
        <p style={ps}>Digital Home is not directed at children under the age of 13, and we do not knowingly collect personal information from children under 13. If you are between 13 and 18, you may use the Service only with verifiable parental consent.</p>
        <p style={ps}>If we become aware that we have inadvertently collected personal information from a child under 13 without parental consent, we will take immediate steps to delete that information. If you believe we have collected information from a child under 13, please contact us immediately at <strong>privacy@mydigitalhome.app</strong>.</p>

        {/* 9 */}
        <h2 style={h2s}>9. Cookies and Tracking Technologies</h2>
        <p style={ps}>We use cookies and similar technologies for the following purposes:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Essential cookies: Required for authentication, session management, and core functionality. Cannot be disabled.",
            "Preference cookies: Remember your settings, theme preferences, and customizations",
            "Analytics cookies: Help us understand aggregate usage patterns to improve the Service. You may opt out in Settings.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={ps}>We do not use advertising cookies, cross-site tracking pixels, or behavioral advertising. You can control cookies through your browser settings, though disabling essential cookies may impair core functionality.</p>

        {/* 10 */}
        <h2 style={h2s}>10. International Data Transfers</h2>
        <p style={ps}>Digital Home is operated in the United States. If you access the Service from outside the United States, your information may be transferred to, stored, and processed in the United States or other countries where our service providers operate. These countries may have data protection laws that differ from those in your country.</p>
        <p style={ps}>For users in the European Economic Area, we ensure that such transfers comply with GDPR requirements through the use of Standard Contractual Clauses (SCCs) or other appropriate safeguards.</p>

        {/* 11 */}
        <h2 style={h2s}>11. Third-Party Links and Services</h2>
        <p style={ps}>The Service may contain links to third-party websites, services, or applications. This Privacy Policy does not apply to those third parties. We encourage you to review the privacy policies of any third-party services you access through the Service. We are not responsible for the privacy practices of third parties.</p>

        {/* 12 */}
        <h2 style={h2s}>12. AI Features and Data</h2>
        <p style={ps}>Digital Home uses artificial intelligence to generate insights, summaries, and recommendations based on your data. Specifically:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "AI features process your data to generate personalized insights within the Service",
            "We do not use your personal content (journal entries, financial data, etc.) to train third-party AI models without your explicit consent",
            "AI-generated content is provided for informational purposes only and does not constitute professional financial, legal, medical, or other advice",
            "You can disable AI features in Settings at any time",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 13 */}
        <h2 style={h2s}>13. Changes to This Privacy Policy</h2>
        <p style={ps}>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Update the \u201cLast Updated\u201d date at the top of this page",
            "Send an email notification to your registered email address at least 30 days before changes take effect",
            "Display a prominent notice within the Service",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={ps}>Your continued use of the Service after the effective date of any changes constitutes your acceptance of the updated policy.</p>

        {/* 14 */}
        <h2 style={h2s}>14. Contact Us</h2>
        <p style={ps}>If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us:</p>
        <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ margin: 0, lineHeight: 2 }}>
            <strong>Digital Home</strong><br />
            Email: <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a><br />
            Support: <a href="mailto:support@mydigitalhome.app" style={{ color: "#6366f1" }}>support@mydigitalhome.app</a><br />
            Website: <a href="https://mydigitalhome.app" style={{ color: "#6366f1" }}>mydigitalhome.app</a><br />
            Response time: Within 5 business days for general inquiries; within 30 days for data rights requests
          </p>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 24, marginTop: 40, textAlign: "center" as const }}>
          <p style={{ fontSize: 13, color: "#9CA3AF" }}>
            Digital Home &copy; {new Date().getFullYear()}
            <span style={{ margin: "0 8px" }}>&middot;</span>
            <Link to="/privacy" style={{ color: "#9CA3AF", textDecoration: "none" }}>Privacy Policy</Link>
            <span style={{ margin: "0 8px" }}>&middot;</span>
            <Link to="/terms" style={{ color: "#9CA3AF", textDecoration: "none" }}>Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
