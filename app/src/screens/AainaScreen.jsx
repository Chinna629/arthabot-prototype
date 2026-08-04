import { useState } from "react";
import { Sparkles, TrendingUp, Target } from "lucide-react";
import TopBar from "../components/TopBar";
import { T } from "../lib/translations";

export default function AainaScreen({ lang, name, onBack, goTo, goals }) {
  const t = T[lang];
  const [extra, setExtra] = useState(50);
  const baseline = 3000;
  const projected = baseline + extra * 17;
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title={t.aainaTitle} subtitle={t.aainaSub} name={name} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="text-center mb-1"><Sparkles className="mx-auto text-[#E1A32A]" size={22} /></div>
        <div className="text-center text-[12px] text-[#1E2A4F]/60 mb-3 leading-snug px-2">{t.goalLabel}</div>
        <button onClick={() => goTo("goalSetup")} className="w-full mb-4 bg-white border-2 border-dashed border-[#1E2A4F]/25 text-[#1E2A4F] rounded-xl py-2.5 text-[12.5px] font-semibold">
          {t.newGoalBtn}
        </button>

        <div className="mb-5">
          <div className="text-[11px] font-semibold text-[#1E2A4F]/60 mb-2 px-0.5">{t.savedGoalsLabel}</div>
          {goals.length === 0 ? (
            <div className="bg-white rounded-xl p-4 text-center text-[11.5px] text-[#1E2A4F]/40">{t.noGoalsYet}</div>
          ) : (
            <div className="space-y-2">
              {goals.map((g) => (
                <div key={g.id} className="bg-white rounded-xl p-3.5 shadow-sm flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#6C63C9]/10 flex items-center justify-center shrink-0">
                    <Target size={15} color="#6C63C9" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-semibold text-[#1E2A4F] truncate">{g.name}</div>
                    <div className="text-[10px] text-[#1E2A4F]/45">₹{g.amount.toLocaleString("en-IN")} · {g.optionName}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[12.5px] font-bold text-[#3F7D58]">₹{g.monthly.toLocaleString("en-IN")}{t.perMonth}</div>
                    <div className="text-[9.5px] text-[#1E2A4F]/40">{g.monthsLeft} {t.monthsLeftLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <div className="text-[10px] text-[#1E2A4F]/50 font-semibold mb-2">{t.todayCol.toUpperCase()}</div>
            <div className="h-24 flex items-end justify-center"><div className="w-10 bg-[#1E2A4F]/25 rounded-t-lg" style={{ height: "45%" }} /></div>
            <div className="text-[15px] font-bold text-[#1E2A4F] mt-2">₹{baseline.toLocaleString("en-IN")}</div>
            <div className="text-[9.5px] text-[#1E2A4F]/45">{t.savedBy}</div>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm border-2 border-[#E1A32A]">
            <div className="text-[10px] text-[#E1A32A] font-semibold mb-2">{t.stepCol.toUpperCase()}</div>
            <div className="h-24 flex items-end justify-center"><div className="w-10 bg-[#3F7D58] rounded-t-lg transition-all duration-300" style={{ height: `${Math.min(95, 45 + extra * 0.9)}%` }} /></div>
            <div className="text-[15px] font-bold text-[#3F7D58] mt-2">₹{projected.toLocaleString("en-IN")}</div>
            <div className="text-[9.5px] text-[#1E2A4F]/45">{t.savedBy}</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-[#1E2A4F] mb-2">₹{extra} — {t.saveExtra}</div>
          <input type="range" min="0" max="200" step="10" value={extra} onChange={(e) => setExtra(Number(e.target.value))} className="w-full accent-[#E1A32A]" />
          <div className="flex justify-between text-[9px] text-[#1E2A4F]/40 mt-1"><span>₹0</span><span>₹200/week</span></div>
        </div>
        <button className="w-full mt-4 bg-[#3F7D58] text-white rounded-xl py-2.5 text-[13px] font-semibold flex items-center justify-center gap-2"><TrendingUp size={14} /> {t.setNudge}</button>
        <div className="text-center text-[9.5px] text-[#1E2A4F]/40 mt-3">{t.onceMonth}</div>
      </div>
    </div>
  );
}
