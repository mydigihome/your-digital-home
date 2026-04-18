import { Landmark, RefreshCw, AlertTriangle, CheckCircle, Toggle } from "lucide-react";
import { usePlaidConnection } from "@/hooks/usePlaidConnection";
import { format } from "date-fns";

export default function PlaidStatusBar() {
  const { connection, isConnected, isDisconnected, connecting, syncing, connectBank, syncNow, toggleSync, disconnect } = usePlaidConnection();

  // Disconnected warning — user needs to reconnect
  if (isDisconnected) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-4 flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-800 dark:text-red-200">
              {connection?.institution_name || "Bank"} disconnected
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
              Your live numbers are paused. Reconnect to resume syncing.
            </p>
          </div>
        </div>
        <button
          onClick={connectBank}
          disabled={connecting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60"
        >
          {connecting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Landmark className="w-4 h-4" />}
          Reconnect Bank
        </button>
      </div>
    );
  }

  // Not connected yet — show connect banner
  if (!isConnected) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4 flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Landmark className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Connect your bank to auto-track spending, balances, and net worth in real time.
          </p>
        </div>
        <button
          onClick={connectBank}
          disabled={connecting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition disabled:opacity-60"
        >
          {connecting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Landmark className="w-4 h-4" />}
          {connecting ? "Opening Plaid..." : "Connect Bank"}
        </button>
      </div>
    );
  }

  // Connected — show status chip + sync controls
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-3 flex items-center justify-between flex-wrap gap-2 mb-4">
      <div className="flex items-center gap-2.5">
        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <div>
          <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
            Connected to {connection?.institution_name || "Bank"}
          </span>
          {connection?.last_sync_at && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 ml-2">
              Last synced {format(new Date(connection.last_sync_at), "MMM d 'at' h:mm a")}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Auto-sync toggle */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-emerald-700 dark:text-emerald-300">Auto-sync</span>
          <button
            onClick={() => toggleSync(!connection?.sync_enabled)}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              connection?.sync_enabled ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              connection?.sync_enabled ? "translate-x-4" : "translate-x-0.5"
            }`} />
          </button>
        </div>
        {/* Manual sync */}
        <button
          onClick={syncNow}
          disabled={syncing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-300 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
          Sync now
        </button>
        {/* Disconnect */}
        <button
          onClick={disconnect}
          className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded transition"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
