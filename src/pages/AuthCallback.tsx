import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user) {
        navigate("/login", { replace: true });
        return;
      }
      const { data: prefs } = await (supabase as any)
        .from("user_preferences")
        .select("onboarding_completed")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (!prefs?.onboarding_completed) {
        navigate("/welcome", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
