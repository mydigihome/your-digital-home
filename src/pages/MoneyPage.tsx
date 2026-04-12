import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserFinances } from "@/hooks/useUserFinances";
import { useExpenses } from "@/hooks/useExpenses";
import { useBills } from "@/hooks/useBills";
import AppShell from "@/components/AppShell";
import PlaidConnect from "@/components/money/PlaidConnect";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

const tabs = ["Overview", "Expenses", "Bills", "Plaid"] as const;

export default function MoneyPage() {
  const { user } = useAuth();
  const { data: finances } = useUserFinances();
  const { data: expenses, refetch: refetchExpenses } = useExpenses();
  const { data: bills, refetch: refetchBills } = useBills();
  const [tab, setTab] = useState<typeof tabs[number]>("Overview");
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showBillForm, setShowBillForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ name: "", amount: "", category: "", date: format(new Date(), "yyyy-MM-dd") });
  const [billForm, setBillForm] = useState({ name: "", amount: "", due_date_proper: "" });

  const financeData = Array.isArray(finances) ? finances[0] : finances;

  const addExpense = async () => {
    if (!expenseForm.name || !expenseForm.amount) return;
    const { error } = await (supabase as any).from("expenses").insert({ ...expenseForm, amount: parseFloat(expenseForm.amount), user_id: user!.id });
    if (error) { toast.error("Failed to add expense"); return; }
    toast.success("Expense added");
    setExpenseForm({ name: "", amount: "", category: "", date: format(new Date(), "yyyy-MM-dd") });
    setShowExpenseForm(false);
    refetchExpenses();
  };

  const addBill = async () => {
    if (!billForm.name) return;
    const { error } = await (supabase as any).from("bills").insert({ name: billForm.name, amount: billForm.amount ? parseFloat(billForm.amount) : null, due_date_proper: billForm.due_date_proper || null, user_id: user!.id });
    if (error) { toast.error("Failed to add bill"); return; }
    toast.success("Bill added");
    setBillForm({ name: "", amount: "", due_date_proper: "" });
    setShowBillForm(false);
    refetchBills();
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8">
        <h1 className="text-2xl font-semibold mb-6">Money</h1>

        <div className="flex gap-1 mb-6 border-b border-border">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm border-b-2 -mb-px transition-colors ${tab === t ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === "Overview" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-muted-foreground">Net Worth</p>
              <p className="text-2xl font-semibold mt-1">${Number(financeData?.net_worth || 0).toLocaleString()}</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-muted-foreground">Monthly Income</p>
              <p className="text-2xl font-semibold mt-1">${Number(financeData?.monthly_income || 0).toLocaleString()}</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-muted-foreground">Total Debt</p>
              <p className="text-2xl font-semibold mt-1">${Number(financeData?.total_debt || 0).toLocaleString()}</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-muted-foreground">Credit Score</p>
              <p className="text-2xl font-semibold mt-1">{financeData?.credit_score || "N/A"}</p>
            </div>
          </div>
        )}

        {tab === "Expenses" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{(expenses || []).length} expenses</p>
              <button onClick={() => setShowExpenseForm(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90"><Plus className="h-4 w-4" /> Add</button>
            </div>
            {showExpenseForm && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-4 grid gap-3 sm:grid-cols-2">
                <input value={expenseForm.name} onChange={(e) => setExpenseForm({ ...expenseForm, name: e.target.value })} placeholder="Name" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} placeholder="Amount" type="number" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} placeholder="Category" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} type="date" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                <div className="sm:col-span-2 flex gap-2">
                  <button onClick={addExpense} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg">Save</button>
                  <button onClick={() => setShowExpenseForm(false)} className="px-4 py-2 text-sm border border-border rounded-lg">Cancel</button>
                </div>
              </div>
            )}
            <div className="space-y-2">
              {(expenses || []).map((exp: any) => (
                <div key={exp.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{exp.name || exp.merchant || "Expense"}</p>
                    <p className="text-xs text-muted-foreground">{exp.category} {exp.date && `· ${exp.date}`}</p>
                  </div>
                  <p className="text-sm font-medium">${Number(exp.amount || 0).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Bills" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{(bills || []).length} bills</p>
              <button onClick={() => setShowBillForm(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90"><Plus className="h-4 w-4" /> Add</button>
            </div>
            {showBillForm && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-4 grid gap-3 sm:grid-cols-3">
                <input value={billForm.name} onChange={(e) => setBillForm({ ...billForm, name: e.target.value })} placeholder="Bill name" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={billForm.amount} onChange={(e) => setBillForm({ ...billForm, amount: e.target.value })} placeholder="Amount" type="number" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={billForm.due_date_proper} onChange={(e) => setBillForm({ ...billForm, due_date_proper: e.target.value })} type="date" className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary" />
                <div className="sm:col-span-3 flex gap-2">
                  <button onClick={addBill} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg">Save</button>
                  <button onClick={() => setShowBillForm(false)} className="px-4 py-2 text-sm border border-border rounded-lg">Cancel</button>
                </div>
              </div>
            )}
            <div className="space-y-2">
              {(bills || []).map((bill: any) => (
                <div key={bill.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{bill.name}</p>
                    <p className="text-xs text-muted-foreground">{bill.status} {bill.due_date_proper && `· Due ${bill.due_date_proper}`}</p>
                  </div>
                  <p className="text-sm font-medium">${Number(bill.amount || 0).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Plaid" && <PlaidConnect />}
      </div>
    </AppShell>
  );
}
