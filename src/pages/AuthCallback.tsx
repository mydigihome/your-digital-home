import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      if (window.location.hash.includes("access_token")) {
        await new Promise(r => setTimeout(r, 300));
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/login", { replace: true });
        return;
      }
      const { data: prefs } = await (supabase as any)
        .from("user_preferences")
        .select("onboarding_completed")
        .eq("user_id", session.user.id)
        .maybeSingle();
      navigate(
        !prefs?.onboarding_completed ? "/welcome" : "/dashboard",
        { replace: true }
      );
    };
    handleCallback();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
