import { Link } from "react-router-dom";

export default function TermsOfService() {
  const s: React.CSSProperties = { fontFamily: "Inter, sans-serif", color: "#374151", lineHeight: 1.8, fontSize: 15 };
  const h1s: React.CSSProperties = { fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 8, letterSpacing: "-0.5px" };
  const h2s: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: "#111827", marginTop: 48, marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #F3F4F6" };
  const h3s: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: "#111827", marginTop: 24, marginBottom: 8 };
  const ps: React.CSSProperties = { marginBottom: 14 };
  const lis: React.CSSProperties = { marginBottom: 6, paddingLeft: 4 };
  const caps: React.CSSProperties = { ...ps, fontWeight: 700, color: "#111827", textTransform: "uppercase" as const, fontSize: 13, letterSpacing: "0.3px" };

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

        <h1 style={h1s}>Terms of Service</h1>
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 8 }}>Effective Date: April 16, 2026 &nbsp;&middot;&nbsp; Last Updated: April 16, 2026</p>
        <div style={{ height: 1, background: "#F3F4F6", marginBottom: 40 }} />

        <p style={ps}>These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and Digital Home (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your access to and use of the Digital Home application and all related services available at <strong>mydigitalhome.app</strong> (collectively, the &ldquo;Service&rdquo;).</p>
        <p style={{ ...ps, padding: "14px 18px", background: "#FEF2F2", borderLeft: "4px solid #EF4444", borderRadius: "0 8px 8px 0" }}><strong>PLEASE READ THESE TERMS CAREFULLY.</strong> By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use the Service.</p>

        {/* 1 */}
        <h2 style={h2s}>1. Acceptance and Eligibility</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "You must be at least 18 years of age to use the Service. If you are between 13 and 17, you may use the Service only with verifiable parental or guardian consent.",
            "By using the Service, you represent and warrant that you are at least 18 years old, or that you have obtained parental consent if between 13 and 17.",
            "You must provide accurate, current, and complete information when creating your account and keep it updated.",
            "The Service is intended for personal, non-commercial use unless you have entered into a separate written agreement with us for commercial use.",
            "The Service is not available to users who have previously been suspended or removed from the Service.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 2 */}
        <h2 style={h2s}>2. Description of Service</h2>
        <p style={ps}>Digital Home is a personal productivity and financial management platform that enables users to organize their finances, goals, projects, relationships, and content creation activities. The Service includes, without limitation:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Financial tracking and planning tools (Money / Wealth tab)",
            "Goal and project management tools",
            "Personal journal and note-taking features",
            "Contact relationship management (CRM)",
            "Content creation planning and studio tools",
            "Calendar and scheduling features",
            "AI-powered insights and recommendations",
            "Monthly review and life audit features",
            "Integrations with third-party services including Plaid, Stripe, Google, and LinkedIn",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={ps}>We reserve the right to modify, suspend, or discontinue any feature or aspect of the Service at any time, with or without notice, though we will make reasonable efforts to notify you of material changes.</p>

        {/* 3 */}
        <h2 style={h2s}>3. Account Registration and Security</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "You are responsible for maintaining the confidentiality of your account credentials, including your password.",
            "You are solely responsible for all activities that occur under your account, whether or not you authorized them.",
            "You must notify us immediately at security@mydigitalhome.app if you suspect any unauthorized use of your account or any security breach.",
            "We reserve the right to require you to change your password if we believe it has been compromised.",
            "You may not share your account credentials with any other person or entity.",
            "You may not create more than one account per person.",
            "We will not be liable for any loss or damage arising from your failure to comply with these account security obligations.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 4 */}
        <h2 style={h2s}>4. Subscription Plans, Pricing, and Billing</h2>

        <h3 style={h3s}>4.1 Available Plans</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Free Plan: Limited access to core features with usage restrictions",
            "Standard Plan: $12.00/month (monthly billing) or $99.00/year (annual billing) — full access to all standard features",
            "Founding Member: $9.00/month (limited to first 50 users) — price locked forever for qualifying early adopters",
            "Student Plan: 50% discount on Standard Plan with verified .edu email address",
            "Studio Add-on: $29.99 one-time payment for advanced creator features",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={ps}>Prices are listed in USD and are subject to change with 30 days&rsquo; advance notice.</p>

        <h3 style={h3s}>4.2 Billing and Payment</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "All payments are processed securely by Stripe. By providing payment information, you authorize us to charge your payment method for applicable subscription fees.",
            "Monthly subscriptions are billed on the same date each month. Annual subscriptions are billed on the anniversary of your subscription start date.",
            "Subscriptions automatically renew unless cancelled before the renewal date. You will receive a reminder email at least 7 days before annual renewal.",
            "Failed payments may result in temporary suspension of your account. We will attempt to notify you of failed payments before suspending access.",
            "We do not store your credit card number. All payment data is handled by Stripe in accordance with PCI DSS standards.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        <h3 style={h3s}>4.3 Refund Policy</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Monthly subscriptions: Refunds are available within 7 days of initial purchase. After 7 days, monthly subscriptions are non-refundable but you retain access until the end of the billing period.",
            "Annual subscriptions: Refunds are available within 14 days of initial purchase or annual renewal. After 14 days, annual subscriptions are non-refundable.",
            "Founding Member: Non-refundable after 7 days.",
            "Studio Add-on: Non-refundable after 7 days.",
            "Refund requests must be submitted to billing@mydigitalhome.app with your account email and reason for the refund.",
            "We reserve the right to decline refund requests that appear to abuse the refund policy.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        <h3 style={h3s}>4.4 Cancellation</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "You may cancel your subscription at any time through Settings \u2192 Plan & Billing.",
            "Cancellation takes effect at the end of your current billing period. You will not receive a prorated refund for unused time, except where required by law.",
            "Cancelling your subscription does not delete your account. Your data remains accessible on the Free Plan.",
            "You may request account deletion separately through Settings \u2192 Account.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        <h3 style={h3s}>4.5 Student Discount</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Student pricing requires verification of current enrollment through a valid .edu email address.",
            "Providing false verification information constitutes fraud and will result in immediate account termination and potential legal action.",
            "Student pricing is available for current students only. You agree to notify us if your student status changes.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 5 */}
        <h2 style={h2s}>5. Acceptable Use Policy</h2>
        <p style={ps}>You agree to use the Service only for lawful purposes and in accordance with these Terms. You specifically agree NOT to:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Use the Service for any illegal purpose or in violation of any applicable local, state, national, or international law or regulation",
            "Attempt to gain unauthorized access to any part of the Service, other users' accounts, or our systems or networks",
            "Transmit any content that is defamatory, obscene, abusive, threatening, harassing, hateful, or discriminatory",
            "Reverse engineer, decompile, disassemble, or attempt to discover the source code of the Service",
            "Use automated scripts, bots, scrapers, or other automated means to access the Service without our written consent",
            "Impersonate any person or entity or misrepresent your affiliation with any person or entity",
            "Upload or transmit viruses, malware, ransomware, or any other malicious code",
            "Interfere with or disrupt the integrity or performance of the Service or servers or networks connected to the Service",
            "Collect or harvest any personally identifiable information from the Service without authorization",
            "Use the Service to send spam, unsolicited messages, or other forms of unauthorized communication",
            "Violate the terms of service of any third-party service connected to or integrated with Digital Home",
            "Attempt to circumvent any access controls, security measures, or rate limits implemented by the Service",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={ps}>Violation of this Acceptable Use Policy may result in immediate suspension or termination of your account, at our sole discretion, with or without prior notice.</p>

        {/* 6 */}
        <h2 style={h2s}>6. Financial Features and Important Disclaimers</h2>
        <p style={{ ...ps, padding: "14px 18px", background: "#FFFBEB", borderLeft: "4px solid #F59E0B", borderRadius: "0 8px 8px 0" }}>
          <strong>IMPORTANT:</strong> Digital Home is a personal organization and tracking tool. It is NOT a licensed financial advisor, investment advisor, broker-dealer, bank, credit union, or other financial institution. Nothing in the Service constitutes financial, investment, tax, legal, or professional advice of any kind.
        </p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "The financial information displayed in the Service is provided for informational and organizational purposes only.",
            "You should consult a qualified financial professional before making any financial decisions.",
            "Digital Home is not responsible for any financial decisions you make based on information displayed in or generated by the Service.",
            "Market data, account balances, and financial calculations provided by the Service may not be real-time and may contain errors. Do not rely solely on this data for financial decisions.",
            "By connecting your bank accounts through Plaid, you authorize Digital Home and Plaid to access your financial data. You can revoke this access at any time.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 7 */}
        <h2 style={h2s}>7. User Content</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "You retain full ownership of all content you create within the Service, including journal entries, notes, projects, and financial data (\u201cUser Content\u201d).",
            "By using the Service, you grant Digital Home a limited, non-exclusive, royalty-free license to store, process, and display your User Content solely for the purpose of providing the Service to you.",
            "This license terminates when you delete your content or account.",
            "You are solely responsible for your User Content and the consequences of posting or publishing it.",
            "You represent and warrant that you own or have the necessary rights to your User Content and that it does not violate any third-party rights.",
            "We reserve the right to remove any User Content that violates these Terms, without prior notice.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 8 */}
        <h2 style={h2s}>8. Intellectual Property</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "The Service, including all software, design, text, graphics, logos, icons, and other content, is owned by Digital Home and is protected by copyright, trademark, and other intellectual property laws.",
            "\u201cDigital Home\u201d and related marks are trademarks of Digital Home. You may not use our trademarks without prior written permission.",
            "You may not copy, modify, distribute, sell, or lease any part of the Service or its content without our express written permission.",
            "Feedback, suggestions, or ideas you submit to us about the Service may be used by us freely without any obligation, compensation, or attribution to you.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 9 */}
        <h2 style={h2s}>9. Third-Party Integrations</h2>
        <p style={ps}>The Service integrates with third-party platforms. Your use of third-party integrations is subject to each third party&rsquo;s own terms and privacy policies. By connecting these services, you agree that:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Digital Home is not responsible for the availability, accuracy, security, or content of third-party services.",
            "Interruptions to third-party services may affect certain features of Digital Home.",
            "You are responsible for complying with the terms of service of any third-party platform you connect.",
            "We may not be able to access your data if a third-party service changes its API or terms.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 10 */}
        <h2 style={h2s}>10. Privacy</h2>
        <p style={ps}>Your use of the Service is subject to our <Link to="/privacy" style={{ color: "#6366f1" }}>Privacy Policy</Link>, which is incorporated into these Terms by this reference. By using the Service, you consent to our collection and use of your data as described in the Privacy Policy.</p>

        {/* 11 */}
        <h2 style={h2s}>11. Service Availability and Modifications</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "We strive for high availability but do not guarantee that the Service will be available 100% of the time.",
            "We may perform scheduled maintenance with advance notice where possible.",
            "We reserve the right to modify, suspend, or discontinue any feature of the Service with or without notice.",
            "We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 12 */}
        <h2 style={h2s}>12. Disclaimers of Warranties</h2>
        <p style={caps}>THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</p>
        <p style={caps}>WE DO NOT WARRANT THAT: (A) THE SERVICE WILL MEET YOUR REQUIREMENTS; (B) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (C) ANY INFORMATION OBTAINED THROUGH THE SERVICE WILL BE ACCURATE OR RELIABLE; OR (D) DEFECTS IN THE SERVICE WILL BE CORRECTED.</p>
        <p style={ps}>Some jurisdictions do not allow the exclusion of implied warranties, so the above exclusions may not apply to you. In such jurisdictions, our warranties are limited to the minimum extent permitted by applicable law.</p>

        {/* 13 */}
        <h2 style={h2s}>13. Limitation of Liability</h2>
        <p style={caps}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DIGITAL HOME, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, OR SERVICE PROVIDERS BE LIABLE FOR:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Any indirect, incidental, special, consequential, punitive, or exemplary damages",
            "Loss of profits, revenue, data, goodwill, or business opportunities",
            "Damages resulting from your reliance on information provided by the Service",
            "Damages arising from unauthorized access to or alteration of your data",
            "Damages arising from your use of third-party integrations",
            "Financial losses resulting from decisions made based on information in the Service",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>
        <p style={caps}>IN NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY TO YOU EXCEED THE GREATER OF: (A) THE TOTAL AMOUNTS YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100.00 USD).</p>
        <p style={ps}>The limitations in this section apply regardless of the legal theory on which the claim is based, whether in contract, tort (including negligence), strict liability, or otherwise, and even if we have been advised of the possibility of such damages.</p>

        {/* 14 */}
        <h2 style={h2s}>14. Indemnification</h2>
        <p style={ps}>You agree to defend, indemnify, and hold harmless Digital Home and its officers, directors, employees, agents, licensors, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&rsquo; fees) arising out of or relating to:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Your violation of these Terms",
            "Your User Content",
            "Your use of the Service",
            "Your violation of any third party&rsquo;s rights, including intellectual property rights",
            "Your violation of any applicable law or regulation",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 15 */}
        <h2 style={h2s}>15. Dispute Resolution and Arbitration</h2>
        <p style={ps}>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.</p>
        <h3 style={h3s}>15.1 Informal Resolution</h3>
        <p style={ps}>Before filing any formal dispute, you agree to contact us at legal@mydigitalhome.app and attempt to resolve the dispute informally. We will try to resolve the dispute within 30 days.</p>
        <h3 style={h3s}>15.2 Binding Arbitration</h3>
        <p style={ps}>If we cannot resolve the dispute informally, you and Digital Home agree to resolve any disputes through binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules. The arbitration will be conducted in English. The arbitrator&rsquo;s decision will be final and binding and may be entered as a judgment in any court of competent jurisdiction.</p>
        <h3 style={h3s}>15.3 Class Action Waiver</h3>
        <p style={ps}>YOU AND DIGITAL HOME AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION.</p>
        <h3 style={h3s}>15.4 Exceptions</h3>
        <p style={ps}>Either party may seek emergency injunctive or other equitable relief in a court of competent jurisdiction to prevent irreparable harm pending arbitration. Claims of intellectual property infringement may be brought in court.</p>
        <h3 style={h3s}>15.5 Opt-Out</h3>
        <p style={ps}>You may opt out of binding arbitration by sending written notice to legal@mydigitalhome.app within 30 days of first accepting these Terms. Your notice must include your name and email address.</p>

        {/* 16 */}
        <h2 style={h2s}>16. Governing Law</h2>
        <p style={ps}>These Terms are governed by and construed in accordance with the laws of the State of Colorado, United States, without regard to conflict of law principles. For any disputes not subject to arbitration, you consent to the exclusive jurisdiction of the state and federal courts located in Denver, Colorado.</p>

        {/* 17 */}
        <h2 style={h2s}>17. Account Termination</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "You may terminate your account at any time through Settings \u2192 Account \u2192 Delete Account.",
            "We reserve the right to suspend or terminate your account immediately, without prior notice, for violation of these Terms, fraudulent activity, or conduct that we determine, in our sole discretion, to be harmful to other users, third parties, or the Service.",
            "Upon termination, your right to use the Service ceases immediately. We may retain certain data as required by law or for legitimate business purposes as described in our Privacy Policy.",
            "Termination of your account does not relieve you of any payment obligations that accrued prior to termination.",
            "Sections 7, 8, 12, 13, 14, 15, 16, and 18 survive any termination of these Terms.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 18 */}
        <h2 style={h2s}>18. General Provisions</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            "Entire Agreement: These Terms and the Privacy Policy constitute the entire agreement between you and Digital Home regarding the Service.",
            "Severability: If any provision of these Terms is held invalid or unenforceable, the remaining provisions remain in full force and effect.",
            "Waiver: Our failure to enforce any right or provision of these Terms does not constitute a waiver of that right or provision.",
            "Assignment: You may not assign your rights or obligations under these Terms without our prior written consent. We may freely assign these Terms.",
            "Force Majeure: We are not liable for any failure to perform our obligations due to circumstances beyond our reasonable control.",
            "Notices: We may provide notices to you via email or through the Service. You may provide notices to us at legal@mydigitalhome.app.",
          ].map((item, i) => <li key={i} style={lis}>{item}</li>)}
        </ul>

        {/* 19 */}
        <h2 style={h2s}>19. Changes to Terms</h2>
        <p style={ps}>We reserve the right to modify these Terms at any time. If we make material changes, we will provide at least 30 days&rsquo; advance notice via email and through the Service. Continued use of the Service after the effective date of any changes constitutes your acceptance. If you do not agree to the revised Terms, you must stop using the Service.</p>

        {/* 20 */}
        <h2 style={h2s}>20. Contact Information</h2>
        <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ margin: 0, lineHeight: 2 }}>
            <strong>Digital Home</strong><br />
            General: <a href="mailto:support@mydigitalhome.app" style={{ color: "#6366f1" }}>support@mydigitalhome.app</a><br />
            Billing: <a href="mailto:billing@mydigitalhome.app" style={{ color: "#6366f1" }}>billing@mydigitalhome.app</a><br />
            Legal: <a href="mailto:legal@mydigitalhome.app" style={{ color: "#6366f1" }}>legal@mydigitalhome.app</a><br />
            Privacy: <a href="mailto:privacy@mydigitalhome.app" style={{ color: "#6366f1" }}>privacy@mydigitalhome.app</a><br />
            Website: <a href="https://mydigitalhome.app" style={{ color: "#6366f1" }}>mydigitalhome.app</a>
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
