import { useState } from "react";
import { Sparkles, ArrowRight, Check, IndianRupee, PiggyBank, Target } from "lucide-react";
import TopBar from "../components/TopBar";
import { T } from "../lib/translations";

export default function GoalSetupScreen({ lang, name, onBack, onSave }) {
  const t = T[lang];
  const [goalName, setGoalName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [returnRate, setReturnRate] = useState(10);
  const [done, setDone] = useState(false);

  const monthsLeft = (() => {
    if (!date) return 0;
    const target = new Date(date);
    const now = new Date();
    let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
    if (target.getDate() < now.getDate()) months -= 1;
    return Math.max(1, months);
  })();

  // SIP formula: solve monthly investment P such that future value of a monthly
  // annuity-due at the chosen annual return reaches the goal amount by the due date.
  const monthly = (() => {
    if (!date || !Number(amount) || monthsLeft < 1) return 0;
    const target = Number(amount);
    const r = returnRate / 100 / 12;
    if (r === 0) return Math.ceil(target / monthsLeft);
    const factor = ((Math.pow(1 + r, monthsLeft) - 1) / r) * (1 + r);
    return Math.ceil(target / factor);
  })();

  const canSet = goalName.trim() && Number(amount) > 0 && date && monthly > 0;

  const option =
    returnRate <= 6 ? { key: "optSafe", name: t.optSafeName, desc: t.optSafeDesc, color: "#3F7D58" } :
    returnRate <= 9 ? { key: "optBal", name: t.optBalName, desc: t.optBalDesc, color: "#E1A32A" } :
    returnRate <= 13 ? { key: "optGrow", name: t.optGrowName, desc: t.optGrowDesc, color: "#6C63C9" } :
    { key: "optAgg", name: t.optAggName, desc: t.optAggDesc, color: "#C1443A" };

  const handleSave = () => {
    onSave({
      id: Date.now(),
      name: goalName,
      amount: Number(amount),
      date,
      returnRate,
      monthly,
      monthsLeft,
      optionName: option.name,
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title={t.goalSetupTitle} subtitle={t.goalSetupSub} name={name} onBack={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#3F7D58] flex items-center justify-center mb-4">
            <Check size={30} className="text-white" />
          </div>
          <div className="text-[16px] font-bold text-[#1E2A4F] mb-1">{t.goalSuccessTitle}</div>
          <div className="text-[12px] text-[#1E2A4F]/60 mb-1">{goalName} — ₹{Number(amount).toLocaleString("en-IN")}</div>
          <div className="text-[11px] text-[#3F7D58] mb-6">{t.goalSuccessSub}</div>
          <div className="bg-white rounded-2xl p-4 shadow-sm w-full mb-6">
            <div className="text-[10.5px] font-semibold text-[#1E2A4F]/60 mb-1">{t.monthlyLabel}</div>
            <div className="text-[22px] font-bold text-[#3F7D58]">₹{monthly.toLocaleString("en-IN")}<span className="text-[11px] font-medium text-[#1E2A4F]/50">{t.perMonth}</span></div>
            <div className="text-[10.5px] text-[#1E2A4F]/45 mt-1">{monthsLeft} {t.monthsLeftLabel} · {option.name}</div>
          </div>
          <button onClick={onBack} className="bg-[#1E2A4F] text-white rounded-xl px-6 py-2.5 text-[12.5px] font-semibold">{t.doneBtnGoal}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title={t.goalSetupTitle} subtitle={t.goalSetupSub} name={name} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5">
            <Target size={12} /> {t.goalNameLabel}
          </label>
          <input
            type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)} placeholder={t.goalNamePh}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#E1A32A]"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5">
            <IndianRupee size={12} /> {t.goalAmountLabel}
          </label>
          <input
            type="text" value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))} placeholder={t.goalAmountPh}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[16px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E1A32A]"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5">
            <Sparkles size={12} /> {t.goalDateLabel}
          </label>
          <input
            type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().slice(0, 10)}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#E1A32A]"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-[#1E2A4F]/70">{t.expectedReturnLabel}</span>
            <span className="text-[13px] font-bold text-[#E1A32A]">{returnRate}%</span>
          </div>
          <input
            type="range" min="4" max="16" step="1" value={returnRate}
            onChange={(e) => setReturnRate(Number(e.target.value))}
            className="w-full accent-[#E1A32A]"
          />
          <div className="flex justify-between text-[9px] text-[#1E2A4F]/40 mt-1"><span>4%</span><span>16%</span></div>
        </div>

        {monthly > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-[#E1A32A]/40">
            <div className="text-[10.5px] font-semibold text-[#1E2A4F]/60 mb-1">{t.monthlyLabel}</div>
            <div className="text-[24px] font-bold text-[#3F7D58]">₹{monthly.toLocaleString("en-IN")}<span className="text-[12px] font-medium text-[#1E2A4F]/50">{t.perMonth}</span></div>
            <div className="text-[10.5px] text-[#1E2A4F]/45 mt-1">{monthsLeft} {t.monthsLeftLabel}</div>
          </div>
        )}

        {monthly > 0 && (
          <div>
            <div className="text-[11px] font-semibold text-[#1E2A4F]/60 mb-2 px-0.5">{t.investmentOptionsLabel}</div>
            <div className="bg-white rounded-xl p-3.5 shadow-sm flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: option.color + "1A" }}>
                <PiggyBank size={16} color={option.color} />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold" style={{ color: option.color }}>{option.name}</div>
                <div className="text-[11px] text-[#1E2A4F]/60 mt-0.5 leading-snug">{option.desc}</div>
              </div>
            </div>
          </div>
        )}

        <button
          disabled={!canSet}
          onClick={handleSave}
          className="w-full bg-[#1E2A4F] text-[#FBF3E4] rounded-xl py-3 text-[13.5px] font-bold disabled:opacity-30 flex items-center justify-center gap-2"
        >
          {t.setGoalBtn} <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
