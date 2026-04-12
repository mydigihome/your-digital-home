import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="text-center max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-[#6366f1]" />
          <span className="text-lg font-semibold text-gray-900">Digital Home</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your personal OS for life</h1>
        <p className="text-lg text-gray-500 mb-8">Track your money, goals, network, and creative work — all in one place.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/login" className="px-6 py-3 bg-[#6366f1] text-white rounded-xl font-semibold hover:opacity-90 transition">Sign In</Link>
          <Link to="/signup" className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition">Get Started</Link>
        </div>
      </div>
      <footer className="mt-16 text-center text-sm text-gray-400">
        <p>Digital Home &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">
          <Link to="/privacy" className="hover:text-[#6366f1] transition-colors">Privacy Policy</Link>
          <span className="mx-2">&middot;</span>
          <Link to="/terms" className="hover:text-[#6366f1] transition-colors">Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}
