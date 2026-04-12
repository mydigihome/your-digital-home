import { useState, useEffect } from "react";
import houseLogo from "@/assets/house-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes("access_token")) {
        await new Promise((r) => setTimeout(r, 500));
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!cancelled && session?.user) {
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
        return;
      }
      if (!cancelled) setCheckingSession(false);
    };
    check();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user && !cancelled) {
        const { data: prefs } = await (supabase as any)
          .from("user_preferences")
          .select("onboarding_completed")
          .eq("user_id", session.user.id)
          .maybeSingle();
        navigate(!prefs?.onboarding_completed ? "/welcome" : "/dashboard", { replace: true });
      }
    });
    return () => { cancelled = true; subscription.unsubscribe(); };
  }, [navigate]);

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Try again or use a different email.");
    } else {
      navigate("/welcome");
    }
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <img src={houseLogo} alt="Digital Home" className="h-24 w-24 object-contain" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your Digital Home</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required />
          </div>
          <Button type="submit" className="w-full h-12 text-[15px] font-semibold" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/reset-password" className="hover:text-primary transition-colors">Forgot password?</Link>
          <span className="mx-2">·</span>
          <Link to="/signup" className="hover:text-primary transition-colors">Create account</Link>
        </div>
        <p className="mt-4 text-[11px] text-center text-muted-foreground">
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span className="mx-2">·</span>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </p>
      </motion.div>
    </div>
  );
}