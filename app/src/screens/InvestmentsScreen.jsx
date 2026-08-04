import { useState } from "react";
import { Landmark, TrendingUp, IndianRupee, Wallet, PiggyBank, Target, Receipt } from "lucide-react";
import TopBar from "../components/TopBar";
import { T } from "../lib/translations";

const INVESTMENT_CATALOG = [
  { key: "rd", rate: 5.5, risk: "riskLabelSafe", icon: PiggyBank, color: "#3F7D58" },
  { key: "ppf", rate: 7.1, risk: "riskLabelSafe", icon: PiggyBank, color: "#3F7D58" },
  { key: "nsc", rate: 7.7, risk: "riskLabelSafe", icon: Receipt, color: "#3F7D58" },
  { key: "debtmf", rate: 7.5, risk: "riskLabelLow", icon: Wallet, color: "#E1A32A" },
  { key: "sgb", rate: 8.0, risk: "riskLabelMod", icon: Target, color: "#E1A32A" },
  { key: "nps", rate: 9.5, risk: "riskLabelMod", icon: Landmark, color: "#E1A32A" },
  { key: "elss", rate: 12.0, risk: "riskLabelMkt", icon: TrendingUp, color: "#C1443A" },
  { key: "index", rate: 12.5, risk: "riskLabelMkt", icon: TrendingUp, color: "#C1443A" },
  { key: "equity", rate: 13.0, risk: "riskLabelMkt", icon: TrendingUp, color: "#C1443A" },
];

const INVESTMENT_NAMES = {
  hi: { rd: "रिकरिंग डिपॉजिट (RD)", ppf: "पब्लिक प्रोविडेंट फंड (PPF)", nsc: "नेशनल सेविंग्स सर्टिफिकेट", debtmf: "डेट म्यूचुअल फंड", sgb: "सॉवरेन गोल्ड बॉन्ड", nps: "नेशनल पेंशन सिस्टम (NPS)", elss: "ELSS टैक्स-सेविंग फंड", index: "इंडेक्स फंड SIP (निफ्टी 50)", equity: "इक्विटी म्यूचुअल फंड SIP" },
  te: { rd: "రికరింగ్ డిపాజిట్ (RD)", ppf: "పబ్లిక్ ప్రావిడెంట్ ఫండ్ (PPF)", nsc: "నేషనల్ సేవింగ్స్ సర్టిఫికేట్", debtmf: "డెట్ మ్యూచువల్ ఫండ్", sgb: "సావరిన్ గోల్డ్ బాండ్", nps: "నేషనల్ పెన్షన్ సిస్టమ్ (NPS)", elss: "ELSS టాక్స్-సేవింగ్ ఫండ్", index: "ఇండెక్స్ ఫండ్ SIP (నిఫ్టీ 50)", equity: "ఈక్విటీ మ్యూచువల్ ఫండ్ SIP" },
  en: { rd: "Recurring Deposit (RD)", ppf: "Public Provident Fund (PPF)", nsc: "National Savings Certificate", debtmf: "Debt Mutual Fund", sgb: "Sovereign Gold Bond", nps: "National Pension System (NPS)", elss: "ELSS Tax-saving Fund", index: "Index Fund SIP (Nifty 50)", equity: "Equity Mutual Fund SIP" },
};

function calcMonthsNeeded(monthly, target, annualPct) {
  if (!monthly || !target) return 0;
  const r = annualPct / 100 / 12;
  if (r === 0) return Math.ceil(target / monthly);
  const inner = (target * r) / (monthly * (1 + r)) + 1;
  if (inner <= 0) return 0;
  return Math.ceil(Math.log(inner) / Math.log(1 + r));
}

function formatDuration(months, t) {
  if (months <= 0) return "—";
  if (months < 12) return `${months} ${t.monthsShort}`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m > 0 ? `${y}${t.yearsShort} ${m}${t.monthsShort}` : `${y} ${t.yearsShort}`;
}

export default function InvestmentsScreen({ lang, name, onBack }) {
  const t = T[lang];
  const [monthly, setMonthly] = useState("");
  const [returnPct, setReturnPct] = useState(10);
  const [goalAmount, setGoalAmount] = useState("");

  const ready = Number(monthly) > 0 && Number(goalAmount) > 0;
  const headlineMonths = ready ? calcMonthsNeeded(Number(monthly), Number(goalAmount), returnPct) : 0;

  const options = INVESTMENT_CATALOG
    .map((opt) => ({
      ...opt,
      name: INVESTMENT_NAMES[lang][opt.key],
      months: ready ? calcMonthsNeeded(Number(monthly), Number(goalAmount), opt.rate) : 0,
      isMatch: Math.abs(opt.rate - returnPct) <= 1,
    }))
    .sort((a, b) => a.months - b.months);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title={t.invTitle} subtitle={t.invSub} name={name} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5">
            <IndianRupee size={12} /> {t.monthlyAmountLabel}
          </label>
          <input
            type="text" value={monthly} onChange={(e) => setMonthly(e.target.value.replace(/\D/g, ""))} placeholder={t.monthlyAmountPh}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[16px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E1A32A]"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5">
            <Target size={12} /> {t.goalAmountLabel}
          </label>
          <input
            type="text" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value.replace(/\D/g, ""))} placeholder={t.goalAmountPh}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[16px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E1A32A]"
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-[#1E2A4F]/70">{t.expectedReturnLabel}</span>
            <span className="text-[13px] font-bold text-[#E1A32A]">{returnPct}% {t.ratePerAnnum}</span>
          </div>
          <input
            type="range" min="4" max="16" step="1" value={returnPct}
            onChange={(e) => setReturnPct(Number(e.target.value))}
            className="w-full accent-[#E1A32A]"
          />
          <div className="flex justify-between text-[9px] text-[#1E2A4F]/40 mt-1"><span>4%</span><span>16%</span></div>
        </div>

        {ready ? (
          <>
            <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-[#E1A32A]/40 text-center">
              <div className="text-[10.5px] font-semibold text-[#1E2A4F]/60 mb-1">{t.timeRequiredLabel}</div>
              <div className="text-[26px] font-bold text-[#3F7D58]">{formatDuration(headlineMonths, t)}</div>
              <div className="text-[10.5px] text-[#1E2A4F]/45 mt-1">₹{Number(monthly).toLocaleString("en-IN")}{t.perMonth} @ {returnPct}% {t.ratePerAnnum}</div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-[#1E2A4F]/60 mb-2 px-0.5">{t.legalOptionsLabel}</div>
              <div className="space-y-2">
                {options.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <div key={opt.key} className="bg-white rounded-xl p-3.5 shadow-sm flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: opt.color + "1A" }}>
                        <Icon size={16} color={opt.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[12.5px] font-bold text-[#1E2A4F]">{opt.name}</span>
                          {opt.isMatch && (
                            <span className="text-[8.5px] font-semibold bg-[#E1A32A]/20 text-[#9A6B0A] px-1.5 py-0.5 rounded-full">{t.matchBadge}</span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#1E2A4F]/50 mt-0.5">{opt.rate}% {t.ratePerAnnum} · {t[opt.risk]}</div>
                      </div>
                      <div className="text-[13px] font-bold shrink-0" style={{ color: opt.color }}>{formatDuration(opt.months, t)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-[11.5px] text-[#1E2A4F]/40 py-6">{t.fillAllFields}</div>
        )}
      </div>
    </div>
  );
}
