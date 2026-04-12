import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { UpgradeModal } from "./UpgradeModal";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const { data: prefs, isLoading: prefsLoading } = useUserPreferences();
  const location = useLocation();

  if (loading || (user && prefsLoading)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const isOnboardingPath = location.pathname === '/welcome';

  if (user && !prefsLoading && !(prefs as any)?.onboarding_completed && !isOnboardingPath) {
    return <Navigate to="/welcome" replace />;
  }

  const isFoundingMember = profile?.founding_member === true;

  const isExpired = !isFoundingMember && (prefs as any)?.trial_end_date && !prefs?.is_subscribed
    ? new Date((prefs as any).trial_end_date) < new Date()
    : false;

  if (isExpired && !location.pathname.startsWith('/settings')) {
    return <Navigate to="/settings?tab=billing" replace />;
  }

  return (
    <>
      <UpgradeModal />
      {children}
    </>
  );
}