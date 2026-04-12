import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111]">
      <div className="max-w-[760px] mx-auto px-6 py-16" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Link to="/" className="inline-block font-bold text-sm text-[#6366f1] mb-8">
          Digital Home
        </Link>

        <h1 className="font-bold text-3xl text-[#111827] dark:text-white tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-[#9ca3af] mt-2 mb-10">Last updated: March 27, 2026</p>
        <div className="h-px bg-[#f0f0f0] dark:bg-white/10 mb-10" />

        <div className="space-y-8 text-sm text-[#374151] dark:text-[#d1d5db] leading-[1.8]">
          <p>Your privacy is important to us. This Privacy Policy explains how Digital Home collects, uses, stores, and protects your personal information when you use our application.</p>

          <section>
            <h2 className="font-semibold text-base text-[#111827] dark:text-white mt-8 mb-3">1. Information We Collect</h2>
            <p>We collect account information, financial data (via Plaid), social media data (via platform integrations), email data (via Gmail), and usage information.</p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-[#111827] dark:text-white mt-8 mb-3">2. How We Use Your Information</h2>
            <p>We use your information to provide and improve the service. We do NOT sell your personal information to any third party.</p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-[#111827] dark:text-white mt-8 mb-3">3. Contact Us</h2>
            <p>Email: contact@digitalhome.app</p>
          </section>
        </div>

        <div className="mt-16 pt-6 border-t border-[#f0f0f0] dark:border-white/10 text-center">
          <p className="text-xs text-[#9ca3af]">
            <Link to="/privacy" className="hover:text-[#6366f1] transition-colors">Privacy Policy</Link>
            <span className="mx-2">·</span>
            <Link to="/terms" className="hover:text-[#6366f1] transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
