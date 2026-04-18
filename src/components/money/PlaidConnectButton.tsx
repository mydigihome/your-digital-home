import { Landmark } from "lucide-react";
import { usePlaidConnection } from "@/hooks/usePlaidConnection";

export default function PlaidConnectButton() {
  const { connection, isConnected, isDisconnected, connecting, syncing, connectBank, syncNow } = usePlaidConnection();

  if (isDisconnected) {
    return (
      <button
        onClick={connectBank}
        disabled={connecting}
        className="flex items-center gap-2 border border-red-300 text-red-600 bg-red-50 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-red-100 transition disabled:opacity-60"
      >
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        {connecting ? "Reconnecting..." : "Reconnect Bank"}
      </button>
    );
  }

  if (isConnected) {
    return (
      <button
        onClick={syncNow}
        disabled={syncing}
        className="flex items-center gap-2 border border-emerald-300 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-700 rounded-xl px-4 py-2.5 text-sm font-semibold hover:opacity-80 transition disabled:opacity-60"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <Landmark className="w-4 h-4" />
        {syncing ? "Syncing..." : (connection?.institution_name || "Bank Connected")}
      </button>
    );
  }

  return (
    <button
      onClick={connectBank}
      disabled={connecting}
      className="flex items-center gap-2 border border-border text-foreground rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-muted transition disabled:opacity-60"
    >
      {connecting ? (
        <><span className="w-4 h-4 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" /> Connecting...</>
      ) : (
        <><Landmark className="w-4 h-4" /> Connect Bank</>
      )}
    </button>
  );
}
