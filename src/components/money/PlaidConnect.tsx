import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RefreshCw, Unlink, Landmark } from "lucide-react";

export default function PlaidConnect() {
  const { user } = useAuth();
  const [connection, setConnection] = useState<any>(null);
  const [accounts, setAccounts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadConnection();
  }, [user]);

  const loadConnection = async () => {
    setLoading(true);
    const { data: conn } = await (supabase as any).from("plaid_connections").select("*").eq("user_id", user!.id).maybeSingle();
    setConnection(conn);
    if (conn) {
      const { data: accts } = await (supabase as any).from("plaid_accounts").select("*").eq("user_id", user!.id).maybeSingle();
      setAccounts(accts);
    }
    setLoading(false);
  };

  const connectBank = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("plaid-link-token", {
        body: { user_id: user!.id },
      });
      if (error) throw error;

      const linkToken = data?.link_token;
      if (!linkToken) { toast.error("No link token received"); return; }

      // Load Plaid Link
      const script = document.createElement("script");
      script.src = "https://cdn.plaid.com/link/v2/stable/link-initialize.js";
      script.onload = () => {
        const handler = (window as any).Plaid.create({
          token: linkToken,
          onSuccess: async (publicToken: string, metadata: any) => {
            try {
              const { error: exchangeError } = await supabase.functions.invoke("plaid-exchange-token", {
                body: { public_token: publicToken, user_id: user!.id, institution_name: metadata?.institution?.name || "Bank" },
              });
              if (exchangeError) throw exchangeError;
              toast.success("Bank connected");
              loadConnection();
            } catch { toast.error("Failed to exchange token"); }
          },
          onExit: () => {},
        });
        handler.open();
      };
      document.head.appendChild(script);
    } catch { toast.error("Failed to start Plaid Link"); }
  };

  const syncTransactions = async () => {
    setSyncing(true);
    try {
      const { error } = await supabase.functions.invoke("plaid-sync-transactions", {
        body: { user_id: user!.id },
      });
      if (error) throw error;
      toast.success("Transactions synced");
      loadConnection();
    } catch { toast.error("Sync failed"); }
    setSyncing(false);
  };

  const disconnect = async () => {
    if (!confirm("Disconnect your bank?")) return;
    await (supabase as any).from("plaid_accounts").delete().eq("user_id", user!.id);
    await (supabase as any).from("plaid_connections").delete().eq("user_id", user!.id);
    setConnection(null);
    setAccounts(null);
    toast.success("Bank disconnected");
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  if (!connection) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 text-center">
        <Landmark className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground mb-4">Connect your bank to automatically track balances and expenses</p>
        <button onClick={connectBank} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90">
          Connect Bank
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold">{connection.institution_name || "Connected Bank"}</p>
          <p className="text-xs text-muted-foreground">Connected</p>
        </div>
        <div className="flex gap-2">
          <button onClick={syncTransactions} disabled={syncing} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-accent disabled:opacity-50">
            <RefreshCw className={`h-3 w-3 ${syncing ? "animate-spin" : ""}`} /> Sync
          </button>
          <button onClick={disconnect} className="flex items-center gap-1 px-3 py-1.5 text-xs text-destructive border border-border rounded-lg hover:bg-destructive/10">
            <Unlink className="h-3 w-3" /> Disconnect
          </button>
        </div>
      </div>
      {accounts && (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800">
            <p className="text-xs text-muted-foreground">Checking</p>
            <p className="text-lg font-semibold">${Number(accounts.checking_balance || 0).toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800">
            <p className="text-xs text-muted-foreground">Savings</p>
            <p className="text-lg font-semibold">${Number(accounts.savings_balance || 0).toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800">
            <p className="text-xs text-muted-foreground">Credit</p>
            <p className="text-lg font-semibold">${Number(accounts.credit_balance || 0).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
