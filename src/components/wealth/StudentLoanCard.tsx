import { useUserFinances } from "@/hooks/useUserFinances";
import { GraduationCap, TrendingDown } from "lucide-react";

export default function StudentLoanCard() {
  const { data: finances } = useUserFinances();
  const loanBalance = Number((finances as any)?.student_loan_balance || 0);
  const monthlyPayment = Number((finances as any)?.student_loan_payment || 0);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-foreground">Student Loans</h3>
      </div>
      {loanBalance > 0 ? (
        <>
          <p className="text-3xl font-bold text-foreground mb-1">${loanBalance.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Remaining balance</p>
          {monthlyPayment > 0 && <p className="text-sm text-muted-foreground mt-2">${monthlyPayment}/mo payment</p>}
        </>
      ) : (
        <p className="text-sm text-muted-foreground">No student loan data. Update in Settings → Finance.</p>
      )}
    </div>
  );
}
