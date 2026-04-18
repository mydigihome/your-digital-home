import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface PlaidConnection {
  id: string;
  institution_name: string | null;
  sync_enabled: boolean;
  last_sync_at: string | null;
  disconnected_at: string | null;
  connected_at: string | null;
}

export interface PlaidAccount {
  checking_balance: number | null;
  savings_balance: number | null;
  credit_balance: number | null;
  total_balance: number | null;
  last_synced: string | null;
  accounts_raw: any;
}

export function usePlaidConnection() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [connection, setConnection] = useState<PlaidConnection | null>(null);
  const [accounts, setAccounts] = useState<PlaidAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    const { data: conn } = await (supabase as any)
      .from("plaid_connections")
      .select("*")
      .eq("user_id", user.id)
      .is("disconnected_at", null)
      .maybeSingle();
    setConnection(conn);
    if (conn) {
      const { data: acct } = await (supabase as any)
        .from("plaid_accounts")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setAccounts(acct);
    } else {
      setAccounts(null);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const connectBank = useCallback(async () => {
    if (!user) return;
    setConnecting(true);
    try {
      const { data, error } = await supabase.functions.invoke("plaid-link-token", {
        body: { user_id: user.id },
      });
      if (error || !data?.link_token) throw error || new Error("No link token");

      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.plaid.com/link/v2/stable/link-initialize.js";
        script.onload = () => {
          const handler = (window as any).Plaid.create({
            token: data.link_token,
            onSuccess: async (publicToken: string, metadata: any) => {
              try {
                const { error: exchErr } = await supabase.functions.invoke("plaid-exchange-token", {
                  body: {
                    public_token: publicToken,
                    user_id: user.id,
                    institution_name: metadata?.institution?.name || "Bank",
                  },
                });
                if (exchErr) throw exchErr;
                // Sync transactions immediately
                await supabase.functions.invoke("plaid-sync-transactions", { body: { user_id: user.id } });
                await load();
                queryClient.invalidateQueries({ queryKey: ["transactions"] });
                queryClient.invalidateQueries({ queryKey: ["user_finances"] });
                toast.success(`Connected to ${metadata?.institution?.name || "your bank"}! Data syncing now.`);
                resolve();
              } catch (e) {
                reject(e);
              }
            },
            onExit: (err: any) => {
              if (err) reject(err);
              else resolve();
            },
          });
          handler.open();
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    } catch (err) {
      toast.error("Bank connection failed. Please try again.");
    } finally {
      setConnecting(false);
    }
  }, [user, load, queryClient]);

  const syncNow = useCallback(async () => {
    if (!user || !connection) return;
    setSyncing(true);
    try {
      const { error } = await supabase.functions.invoke("plaid-sync-transactions", { body: { user_id: user.id } });
      if (error) throw error;
      await load();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user_finances"] });
      // Update last_sync_at
      await (supabase as any).from("plaid_connections").update({ last_sync_at: new Date().toISOString() }).eq("id", connection.id);
      toast.success("Synced with your bank");
    } catch {
      toast.error("Sync failed. Try again.");
    } finally {
      setSyncing(false);
    }
  }, [user, connection, load, queryClient]);

  const toggleSync = useCallback(async (enabled: boolean) => {
    if (!connection) return;
    await (supabase as any).from("plaid_connections").update({ sync_enabled: enabled }).eq("id", connection.id);
    setConnection(prev => prev ? { ...prev, sync_enabled: enabled } : null);
    toast.success(enabled ? "Auto-sync enabled" : "Auto-sync paused");
  }, [connection]);

  const disconnect = useCallback(async () => {
    if (!connection || !user) return;
    await (supabase as any).from("plaid_connections").update({ disconnected_at: new Date().toISOString() }).eq("id", connection.id);
    await (supabase as any).from("plaid_accounts").delete().eq("user_id", user.id);
    setConnection(null);
    setAccounts(null);
    toast.success("Bank disconnected");
  }, [connection, user]);

  const isConnected = !!connection && !connection.disconnected_at;
  const isDisconnected = !!connection && !!connection.disconnected_at;

  return {
    connection, accounts, loading, connecting, syncing,
    isConnected, isDisconnected,
    connectBank, syncNow, toggleSync, disconnect, reload: load,
  };
}
