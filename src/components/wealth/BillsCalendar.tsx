import { useBills, useCreateBill, useUpdateBill, useDeleteBill } from "@/hooks/useBills";
import { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import { toast } from "sonner";

export default function BillsCalendar() {
  const { data: bills = [] } = useBills();
  const createBill = useCreateBill();
  const updateBill = useUpdateBill();
  const deleteBill = useDeleteBill();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ merchant: "", amount: "", due_date: "", frequency: "monthly" });

  const handleCreate = async () => {
    if (!form.merchant || !form.amount || !form.due_date) return;
    await createBill.mutateAsync({ ...form, amount: parseFloat(form.amount), status: "unpaid" });
    setForm({ merchant: "", amount: "", due_date: "", frequency: "monthly" });
    setShowForm(false);
    toast.success("Bill added");
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Bills & Recurring</h3>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium"><Plus className="w-3.5 h-3.5" /> Add</button>
      </div>
      {showForm && (
        <div className="bg-muted/50 rounded-xl p-4 mb-4 space-y-2">
          <input value={form.merchant} onChange={e => setForm(p => ({ ...p, merchant: e.target.value }))} placeholder="Bill name" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          <div className="grid grid-cols-2 gap-2">
            <input type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} placeholder="Amount" className="px-3 py-2 text-sm border border-border rounded-lg bg-background" />
            <input type="date" value={form.due_date} onChange={e => setForm(p => ({ ...p, due_date: e.target.value }))} className="px-3 py-2 text-sm border border-border rounded-lg bg-background" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Save</button>
            <button onClick={() => setShowForm(false)} className="flex-1 py-2 border border-border rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-2">
        {(bills as any[]).map((bill: any) => {
          const due = new Date(bill.due_date);
          const daysLeft = Math.ceil((due.getTime() - Date.now()) / 86400000);
          return (
            <div key={bill.id} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
              <button onClick={() => updateBill.mutate({ id: bill.id, status: bill.status === 'paid' ? 'unpaid' : 'paid' })}
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${bill.status === 'paid' ? 'bg-primary border-primary' : 'border-border'}`}>
                {bill.status === 'paid' && <Check className="w-3 h-3 text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${bill.status === 'paid' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{bill.merchant}</p>
                <p className={`text-xs ${daysLeft < 0 ? 'text-destructive' : daysLeft <= 3 ? 'text-warning' : 'text-muted-foreground'}`}>
                  {daysLeft < 0 ? 'Overdue' : daysLeft === 0 ? 'Due today' : `Due in ${daysLeft}d`}
                </p>
              </div>
              <span className="text-sm font-semibold text-foreground">${Number(bill.amount).toFixed(0)}</span>
              <button onClick={() => deleteBill.mutate(bill.id)} className="p-1 hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          );
        })}
        {bills.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No bills yet</p>}
      </div>
    </div>
  );
}
