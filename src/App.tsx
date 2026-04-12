import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useThemeApplicator } from "@/hooks/useThemeApplicator";
import { supabase } from "@/integrations/supabase/client";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import NewOnboarding from "./pages/NewOnboarding";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import JournalPage from "./pages/JournalPage";
import JournalEntryPage from "./pages/JournalEntryPage";
import MoneyPage from "./pages/MoneyPage";
import StudioPage from "./pages/StudioPage";
import RelationshipsPage from "./pages/RelationshipsPage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ThemeApplicator() {
  useThemeApplicator();
  return null;
}

function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) { setChecked(true); return; }
    const isOnboarding = location.pathname === "/onboarding" || location.pathname === "/welcome";
    if (!isOnboarding) { setChecked(true); return; }
    (supabase as any).from("user_preferences").select("onboarding_completed").eq("user_id", user.id).maybeSingle()
      .then(({ data }: any) => {
        if (data?.onboarding_completed) { navigate("/dashboard", { replace: true }); }
        else { setChecked(true); }
      });
  }, [user, location.pathname]);

  if (!checked) return null;
  return <>{children}</>;
}

function RootRedirect() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }
  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ThemeApplicator />
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/welcome" element={<ProtectedRoute><OnboardingGuard><NewOnboarding /></OnboardingGuard></ProtectedRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute><OnboardingGuard><NewOnboarding /></OnboardingGuard></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetailPage /></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><JournalPage /></ProtectedRoute>} />
            <Route path="/journal/new" element={<ProtectedRoute><JournalEntryPage /></ProtectedRoute>} />
            <Route path="/journal/:id" element={<ProtectedRoute><JournalEntryPage /></ProtectedRoute>} />
            <Route path="/money" element={<ProtectedRoute><MoneyPage /></ProtectedRoute>} />
            <Route path="/studio" element={<ProtectedRoute><StudioPage /></ProtectedRoute>} />
            <Route path="/relationships" element={<ProtectedRoute><RelationshipsPage /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
