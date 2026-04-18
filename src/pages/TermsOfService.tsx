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

        <p style={p}>These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you") and Digital Home ("Company," "we," "us," "our"), a product of Princess Tope / mydigitalhome.app. By accessing or using Digital Home at <strong>mydigitalhome.app</strong>, you agree to be bound by these Terms in their entirety. If you do not agree, do not use the Service.</p>

        <h2 style={h2}>1. Acceptance of Terms</h2>
        <p style={p}>By creating an account, clicking "I Agree," or otherwise accessing the Service, you represent that: (a) you are at least 18 years of age or have obtained parental/guardian consent; (b) you have full legal authority to enter into this agreement; and (c) your use will comply with all applicable laws. These Terms supersede any prior agreements regarding the Service.</p>

        <h2 style={h2}>2. Description of Service</h2>
        <p style={p}>Digital Home is a personal life operating system designed to help users organize their financial life, projects, relationships, journaling, and content creation. Features include a financial dashboard, AI-powered insights, project management, contact management, journaling, studio tools, and integrations with third-party services including Google, Plaid, and Stripe.</p>
        <p style={p}>We reserve the right to modify, suspend, or discontinue any feature or the entire Service at any time, with or without notice. We are not liable for any modification, suspension, or discontinuation.</p>

        <h2 style={h2}>3. User Accounts</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {["You must provide accurate, complete, and current registration information.","You are solely responsible for all activities under your account and for maintaining the confidentiality of your login credentials.","You must notify us immediately at support@mydigitalhome.app if you suspect unauthorized account access.","We reserve the right to suspend or terminate accounts at our sole discretion for violations of these Terms.","You may not create accounts for others without their explicit consent or use automated means to create accounts."].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>

        <h2 style={h2}>4. Subscription, Billing & Payments</h2>
        <p style={p}><strong>Founding Member Plan:</strong> $7/month or $49/year (locked for first 50 users). Price locked for the life of the account while subscription remains active.</p>
        <p style={p}><strong>Standard Plan:</strong> $12/month or $99/year. Pricing is subject to change with 30 days' advance notice.</p>
        <p style={p}><strong>Billing:</strong> Subscriptions renew automatically. All payments are processed by Stripe. We do not store raw card data. By subscribing, you authorize recurring charges.</p>
        <p style={p}><strong>Refunds:</strong> We offer a 7-day refund on new subscriptions. No refunds are issued after 7 days or for partial billing periods, except where required by law.</p>
        <p style={p}><strong>Failed Payments:</strong> If payment fails, your account may be downgraded to a free tier. You remain responsible for outstanding amounts.</p>
        <p style={p}><strong>Taxes:</strong> Prices are exclusive of applicable taxes. You are responsible for all taxes associated with your use of the Service.</p>

        <h2 style={h2}>5. Intellectual Property Rights</h2>
        <p style={p}><strong>Our Property:</strong> Digital Home, including its logo, design, code, text, graphics, features, and all other content ("IP"), is owned exclusively by Princess Tope / Digital Home and protected by United States and international copyright, trademark, trade secret, and intellectual property laws. No license to our IP is granted except the limited use license described below.</p>
        <p style={p}><strong>Limited License to You:</strong> We grant you a personal, non-exclusive, non-transferable, revocable, limited license to access and use the Service for your own personal, non-commercial purposes. This license does not include the right to: copy, modify, distribute, sell, or lease any part of our Service; reverse engineer or extract source code; use our trademarks; or create derivative works.</p>
        <p style={p}><strong>Your Content:</strong> You retain all ownership rights to content you create within the Service ("User Content"). By using the Service, you grant us a limited, worldwide, royalty-free license to store, process, and display your User Content solely to provide the Service to you. We do not claim ownership of your content.</p>
        <p style={p}><strong>Feedback:</strong> Any feedback, suggestions, or ideas you provide to us may be used by us freely without any obligation of compensation, attribution, or confidentiality.</p>
        <p style={p}><strong>DMCA:</strong> If you believe your copyrighted work has been infringed, send a notice to <a href="mailto:legal@mydigitalhome.app" style={{ color: "#6366f1" }}>legal@mydigitalhome.app</a> with: identification of the work, location of infringing material, your contact information, and a statement of good faith belief.</p>

        <h2 style={h2}>6. Prohibited Uses</h2>
        <p style={p}>You agree NOT to:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {[
            "Violate any applicable law or regulation.",
            "Infringe upon the intellectual property rights of Digital Home or any third party.",
            "Attempt to access, probe, or breach security measures of the Service or its infrastructure.",
            "Use the Service to transmit malware, spam, or unauthorized advertising.",
            "Scrape, crawl, or collect data from the Service using automated means.",
            "Impersonate any person or entity or falsely represent your affiliation.",
            "Use the Service to facilitate illegal financial activity, fraud, or money laundering.",
            "Reverse engineer, decompile, or extract source code from the Service.",
            "Resell, sublicense, or commercialize the Service or any part thereof without written consent.",
            "Interfere with or disrupt the Service, its servers, or connected networks.",
            "Use the Service in any way that could expose Digital Home to legal liability."
          ].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>
        <p style={p}>Violations may result in immediate account suspension, termination, and legal action.</p>

        <h2 style={h2}>7. Financial Data & Third-Party Integrations</h2>
        <p style={p}><strong>Plaid:</strong> Bank connections are facilitated by Plaid Inc. You agree to Plaid's Terms of Service and Privacy Policy. We never store your bank login credentials.</p>
        <p style={p}><strong>Stripe:</strong> Payments are processed by Stripe, Inc. You agree to Stripe's terms. We never store raw payment card data.</p>
        <p style={p}><strong>Google:</strong> Calendar and authentication features use Google APIs. Your use is subject to Google's Terms of Service.</p>
        <p style={p}><strong>Accuracy Disclaimer:</strong> Financial data, projections, and insights provided by the Service are for informational and organizational purposes only. They do NOT constitute financial, investment, tax, or legal advice. Always consult a qualified professional before making financial decisions. We expressly disclaim any liability for financial decisions made based on information in the Service.</p>

        <h2 style={h2}>8. AI-Powered Features</h2>
        <p style={p}>The Service uses AI to generate insights, summaries, and suggestions. AI-generated content is provided "as is" for informational purposes only and may contain errors or inaccuracies. You should independently verify all AI-generated content. We are not liable for decisions made based on AI-generated content. We do not use your personal content to train AI models without your explicit, separate consent.</p>

        <h2 style={h2}>9. Privacy</h2>
        <p style={p}>Your use of the Service is governed by our <Link to="/privacy" style={{ color: "#6366f1" }}>Privacy Policy</Link>, which is incorporated into these Terms by reference. By using the Service, you consent to the data practices described in the Privacy Policy.</p>

        <h2 style={h2}>10. Disclaimers of Warranties</h2>
        <div style={{ padding: "16px 20px", background: "#FEF2F2", borderLeft: "4px solid #EF4444", borderRadius: "0 8px 8px 0", marginBottom: 24 }}>
          <p style={{ margin: 0, color: "#7F1D1D", fontSize: 14, fontWeight: 600, textTransform: "uppercase" }}>Important Legal Notice</p>
          <p style={{ margin: "8px 0 0", color: "#991B1B", fontSize: 14 }}>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, RELIABILITY, OR UNINTERRUPTED ACCESS. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, SECURE, OR CONTINUOUSLY AVAILABLE.</p>
        </div>

        <h2 style={h2}>11. Limitation of Liability</h2>
        <div style={{ padding: "16px 20px", background: "#FEF2F2", borderLeft: "4px solid #EF4444", borderRadius: "0 8px 8px 0", marginBottom: 24 }}>
          <p style={{ margin: 0, color: "#991B1B", fontSize: 14 }}>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, DIGITAL HOME AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY: (A) INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES; (B) LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS; (C) FINANCIAL LOSSES OR DECISIONS MADE BASED ON THE SERVICE; OR (D) ANY AMOUNT EXCEEDING THE GREATER OF $100 USD OR THE AMOUNT PAID BY YOU IN THE 12 MONTHS PRECEDING THE CLAIM. THESE LIMITATIONS APPLY REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF WE HAVE BEEN ADVISED OF SUCH DAMAGES.</p>
        </div>

        <h2 style={h2}>12. Indemnification</h2>
        <p style={p}>You agree to indemnify, defend, and hold harmless Digital Home, its owner Princess Tope, officers, directors, employees, agents, and service providers from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from or related to: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any third-party rights; (d) your User Content; or (e) any fraud, misrepresentation, or illegal activity by you. We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you.</p>

        <h2 style={h2}>13. Governing Law & Dispute Resolution</h2>
        <p style={p}><strong>Governing Law:</strong> These Terms are governed by the laws of the State of Colorado, United States, without regard to conflict of law principles.</p>
        <p style={p}><strong>Informal Resolution:</strong> Before initiating formal proceedings, you agree to contact us at <a href="mailto:legal@mydigitalhome.app" style={{ color: "#6366f1" }}>legal@mydigitalhome.app</a> and attempt good-faith resolution for at least 30 days.</p>
        <p style={p}><strong>Binding Arbitration:</strong> If informal resolution fails, disputes shall be resolved by binding arbitration under the American Arbitration Association (AAA) Commercial Arbitration Rules. Arbitration shall be conducted in Denver, Colorado, or remotely. The arbitrator's decision is final and binding. YOU AND DIGITAL HOME WAIVE THE RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN CLASS ACTIONS.</p>
        <p style={p}><strong>Small Claims Exception:</strong> Either party may bring qualifying claims in small claims court.</p>
        <p style={p}><strong>Injunctive Relief:</strong> Notwithstanding arbitration, either party may seek injunctive or equitable relief in any court of competent jurisdiction for IP infringement or unauthorized access.</p>

        <h2 style={h2}>14. Termination</h2>
        <p style={p}>We may terminate or suspend your access immediately, without prior notice, for any violation of these Terms, suspected fraud, or any other reason at our sole discretion. You may terminate your account at any time via Settings. Upon termination: (a) your license to use the Service terminates; (b) we may delete your data in accordance with our Privacy Policy; (c) provisions that by their nature should survive termination (including Sections 5, 10, 11, 12, 13) will survive.</p>

        <h2 style={h2}>15. Changes to Terms</h2>
        <p style={p}>We reserve the right to modify these Terms at any time. For material changes, we will provide at least 30 days' advance notice via email and in-app notification. Your continued use after the effective date constitutes acceptance. If you disagree with changes, your sole remedy is to stop using the Service and cancel your subscription.</p>

        <h2 style={h2}>16. Miscellaneous</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {[
            "Entire Agreement: These Terms and our Privacy Policy constitute the entire agreement between you and Digital Home.",
            "Severability: If any provision is found unenforceable, it will be modified to the minimum extent necessary, and remaining provisions remain in full force.",
            "Waiver: Our failure to enforce any right does not constitute a waiver of that right.",
            "Assignment: You may not assign your rights or obligations under these Terms. We may assign our rights freely.",
            "Force Majeure: We are not liable for delays or failures caused by events beyond our reasonable control.",
            "No Agency: Nothing in these Terms creates any agency, partnership, or employment relationship.",
          ].map((item, i) => <li key={i} style={li}>{item}</li>)}
        </ul>

        <h2 style={h2}>17. Contact & Legal Notices</h2>
        <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ margin: 0, lineHeight: 2.2, fontSize: 15, color: "#374151" }}>
            <strong>Digital Home (Princess Tope)</strong><br />
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
