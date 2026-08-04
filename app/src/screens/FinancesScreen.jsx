import { useState } from "react";
import { ArrowRight, Wallet, PiggyBank, Receipt } from "lucide-react";
import TopBar from "../components/TopBar";
import { T } from "../lib/translations";

export default function FinancesScreen({ lang, name, onBack, initial, onSave }) {
  const t = T[lang];
  const [income, setIncome] = useState(initial.income ? String(initial.income) : "");
  const [savings, setSavings] = useState(initial.savings ? String(initial.savings) : "");
  const [expenses, setExpenses] = useState(initial.expenses ? String(initial.expenses) : "");

  const overBudget = Number(savings) + Number(expenses) > Number(income) && Number(income) > 0;
  const canSave = Number(income) > 0;

  const save = () => {
    onSave({ income: Number(income) || 0, savings: Number(savings) || 0, expenses: Number(expenses) || 0 });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title={t.financesTitle} subtitle={t.financesSub} name={name} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5">
            <Wallet size={12} /> {t.incomeLabel}
          </label>
          <input
            type="text" value={income} onChange={(e) => setIncome(e.target.value.replace(/\D/g, ""))} placeholder={t.incomePh}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[16px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E1A32A]"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5">
            <PiggyBank size={12} /> {t.savingsLabel}
          </label>
          <input
            type="text" value={savings} onChange={(e) => setSavings(e.target.value.replace(/\D/g, ""))} placeholder={t.savingsPh}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[16px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E1A32A]"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5">
            <Receipt size={12} /> {t.expensesLabel}
          </label>
          <input
            type="text" value={expenses} onChange={(e) => setExpenses(e.target.value.replace(/\D/g, ""))} placeholder={t.expensesPh}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[16px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E1A32A]"
          />
        </div>

        {overBudget && (
          <div className="bg-[#C1443A]/10 text-[#C1443A] text-[11px] font-medium rounded-xl p-3">{t.overBudgetWarning}</div>
        )}

        <button
          disabled={!canSave}
          onClick={save}
          className="w-full bg-[#1E2A4F] text-[#FBF3E4] rounded-xl py-3 text-[13.5px] font-bold disabled:opacity-30 flex items-center justify-center gap-2"
        >
          {t.saveFinancesBtn} <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
