import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111]">
      <div className="max-w-[760px] mx-auto px-6 py-16" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Link to="/" className="inline-block font-bold text-sm text-[#6366f1] mb-8">
          Digital Home
        </Link>

        <h1 className="font-bold text-3xl text-[#111827] dark:text-white tracking-tight">Terms of Service</h1>
        <p className="text-sm text-[#9ca3af] mt-2 mb-10">Last updated: March 27, 2026</p>
        <div className="h-px bg-[#f0f0f0] dark:bg-white/10 mb-10" />

        <div className="space-y-8 text-sm text-[#374151] dark:text-[#d1d5db] leading-[1.8]">
          <p>Please read these Terms of Service carefully before using Digital Home. By accessing or using our service, you agree to be bound by these terms.</p>

          <section>
            <h2 className="font-semibold text-base text-[#111827] dark:text-white mt-8 mb-3">1. Subscription and Billing</h2>
            <ul className="pl-4 space-y-1">
              <li>— Pro Plan: $99.00 per year</li>
              <li>— Student Plan: $49.00 per year</li>
              <li>— Founding Member: $9.00 one-time payment</li>
              <li>— All payments processed by Stripe</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-base text-[#111827] dark:text-white mt-8 mb-3">2. Contact</h2>
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
