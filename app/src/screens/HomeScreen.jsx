import { useState } from "react";
import { ShieldAlert, Sparkles, Landmark, TrendingUp, Send, Wallet, PiggyBank, Target, Receipt } from "lucide-react";
import TopBar from "../components/TopBar";
import ScoreRing from "../components/ScoreRing";
import FactorBar from "../components/FactorBar";
import { computeScores } from "../lib/helpers";
import { T } from "../lib/translations";

export default function HomeScreen({ lang, name, goTo, goals, finances }) {
  const t = T[lang];
  const [showTips, setShowTips] = useState(false);
  const hasFinances = finances.income > 0;
  const computed = computeScores(finances, goals);
  const factors = [
    { key: "incomeLabel", value: computed.incomeLabel, color: "#3F7D58", icon: Wallet, tipTitle: "tipIncomeTitle", tip: "tipIncome" },
    { key: "savingsLabel", value: computed.savingsLabel, color: "#E1A32A", icon: PiggyBank, tipTitle: "tipSavingsTitle", tip: "tipSavings" },
    { key: "goalsLabel", value: computed.goalsLabel, color: "#6C63C9", icon: Target, tipTitle: "tipGoalsTitle", tip: "tipGoals" },
    { key: "expensesLabel", value: computed.expensesLabel, color: "#C1443A", icon: Receipt, tipTitle: "tipExpensesTitle", tip: "tipExpenses" },
  ];
  const score = Math.round(factors.reduce((s, f) => s + f.value, 0) / factors.length);
  const level = score >= 75 ? 4 : score >= 55 ? 3 : score >= 35 ? 2 : 1;
  const sortedByWeakest = [...factors].sort((a, b) => a.value - b.value);

  const actions = [
    { screen: "finances", label: t.navFinances, icon: Wallet, color: "#0E7C8C" },
    { screen: "scam", label: t.navScam, icon: ShieldAlert, color: "#C1443A" },
    { screen: "scheme", label: t.navScheme, icon: Landmark, color: "#3F7D58" },
    { screen: "send", label: t.navSend, icon: Send, color: "#1E2A4F" },
    { screen: "aaina", label: t.navAaina, icon: Sparkles, color: "#E1A32A" },
    { screen: "goalSetup", label: t.newGoalBtn.replace("+ ", ""), icon: Target, color: "#6C63C9" },
    { screen: "investments", label: t.navInvest, icon: TrendingUp, color: "#0E7C8C" },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      <TopBar title="ArthaBot" subtitle={t.welcomeBack} name={name} />
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-[10.5px] font-bold text-[#1E2A4F]/50 tracking-wide mb-1">{t.homeGreetTitle.toUpperCase()}</div>
          <div className="text-[13px] text-[#1E2A4F] leading-snug">"{t.homeGreetBody}"</div>
        </div>

        {!hasFinances && (
          <button
            onClick={() => goTo("finances")}
            className="w-full bg-[#E1A32A]/15 border-2 border-dashed border-[#E1A32A] rounded-2xl p-4 text-left"
          >
            <div className="text-[12.5px] font-bold text-[#1E2A4F]">{t.setupPromptTitle}</div>
            <div className="text-[11px] text-[#1E2A4F]/60 mt-0.5">{t.setupPromptBody}</div>
          </button>
        )}

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-[#1E2A4F]/60 text-center mb-2">{t.healthScoreLabel}</div>
          <div className="flex flex-col items-center">
            <ScoreRing score={score} />
            <div className="text-[11px] font-bold text-[#3F7D58] -mt-1">LEVEL {level}</div>
          </div>
          <div className="mt-4 space-y-3">
            {factors.map((f) => (
              <FactorBar key={f.key} icon={f.icon} label={t[f.key]} value={f.value} color={f.color} />
            ))}
          </div>
          <button onClick={() => setShowTips(true)} className="w-full text-center text-[11px] font-semibold text-[#1E2A4F] mt-3">{t.howToImprove}</button>
        </div>

        {goals.length > 0 && (() => {
          const current = goals[goals.length - 1];
          return (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#1E2A4F]/60">{t.currentGoalLabel}</span>
                <button onClick={() => goTo("aaina")} className="text-[10.5px] font-semibold text-[#6C63C9]">{t.viewAllLabel}</button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#6C63C9]/10 flex items-center justify-center shrink-0">
                  <Target size={18} color="#6C63C9" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-[#1E2A4F] truncate">{current.name}</div>
                  <div className="text-[10.5px] text-[#1E2A4F]/50">₹{current.amount.toLocaleString("en-IN")} · {current.optionName}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] font-bold text-[#3F7D58]">₹{current.monthly.toLocaleString("en-IN")}{t.perMonth}</div>
                  <div className="text-[9.5px] text-[#1E2A4F]/40">{current.monthsLeft} {t.monthsLeftLabel}</div>
                </div>
              </div>
            </div>
          );
        })()}

        <div>
          <div className="text-[11px] font-semibold text-[#1E2A4F]/60 mb-2 px-0.5">{t.quickActionsLabel}</div>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.screen}
                  onClick={() => goTo(a.screen)}
                  className="bg-white rounded-2xl p-3.5 shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition"
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: a.color + "1A" }}>
                    <Icon size={17} color={a.color} />
                  </div>
                  <span className="text-[11.5px] font-semibold text-[#1E2A4F]">{a.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {showTips && (
        <div
          className="absolute inset-0 z-30 bg-[#1E2A4F]/50 flex items-end justify-center"
          onClick={() => setShowTips(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl w-full max-h-[75%] overflow-y-auto p-5 pb-6"
          >
            <div className="w-10 h-1 bg-[#1E2A4F]/15 rounded-full mx-auto mb-4" />
            <div className="text-[16px] font-bold text-[#1E2A4F] mb-1">{t.improveTitle}</div>
            <div className="text-[11.5px] text-[#1E2A4F]/50 mb-4">{t.improveSub}</div>
            <div className="space-y-3">
              {sortedByWeakest.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.key} className="flex items-start gap-3 bg-[#F5FAFD] rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: f.color + "22" }}>
                      <Icon size={15} color={f.color} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[12.5px] font-bold text-[#1E2A4F]">{t[f.tipTitle]}</span>
                        <span className="text-[9.5px] font-semibold text-[#1E2A4F]/40">{f.value}/100</span>
                      </div>
                      <div className="text-[11px] text-[#1E2A4F]/65 mt-0.5 leading-snug">{t[f.tip]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setShowTips(false)}
              className="w-full mt-4 bg-[#1E2A4F] text-[#FBF3E4] rounded-xl py-2.5 text-[12.5px] font-semibold"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
