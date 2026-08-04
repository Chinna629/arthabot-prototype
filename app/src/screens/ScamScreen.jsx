import { useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldQuestion, ArrowRight, Phone, HelpCircle } from "lucide-react";
import TopBar from "../components/TopBar";
import { T } from "../lib/translations";

const SCAM_EXAMPLES = {
  hi: [
    { text: "21 दिनों में अपना पैसा दोगुना करने की गारंटी — Telegram पर अभी जुड़ें!", verdict: "scam" },
    { text: "आपके PMJDY खाते का KYC आज फ्रीज हो जाएगा, सत्यापन के लिए OTP भेजें", verdict: "scam" },
    { text: "SBI फिक्स्ड डिपॉजिट पर वरिष्ठ नागरिकों के लिए ब्याज दर", verdict: "safe" },
  ],
  te: [
    { text: "21 రోజుల్లో మీ డబ్బును రెట్టింపు చేస్తామని గ్యారంటీ — ఇప్పుడే Telegram లో చేరండి!", verdict: "scam" },
    { text: "మీ PMJDY ఖాతా KYC ఈరోజు స్తంభిస్తుంది, ధృవీకరణ కోసం OTP పంపండి", verdict: "scam" },
    { text: "SBI ఫిక్స్‌డ్ డిపాజిట్‌పై సీనియర్ సిటిజన్లకు వడ్డీ రేటు", verdict: "safe" },
  ],
  en: [
    { text: "Guaranteed double your money in 21 days — join now on Telegram!", verdict: "scam" },
    { text: "Your PMJDY account KYC will freeze today, share OTP to verify", verdict: "scam" },
    { text: "SBI fixed deposit interest rate for senior citizens", verdict: "safe" },
  ],
};

const SCAM_REASON = {
  hi: {
    scam: { label: "संभावित स्कैम", reason: "यह इकाई SEBI/RBI पंजीकृत सूची में नहीं मिली। तात्कालिकता + गारंटीड रिटर्न का सामान्य पैटर्न।" },
    safe: { label: "सुरक्षित", reason: "एक पंजीकृत बैंक ऑफर से मेल खाता है। कोई दबाव वाली रणनीति नहीं मिली।" },
    unclear: { label: "सावधानी — निश्चित नहीं", reason: "आत्मविश्वास से सत्यापित नहीं हो सका। एक व्यक्ति 4 कार्य घंटों में कॉल करेगा।" },
  },
  te: {
    scam: { label: "మోసం అవకాశం", reason: "ఈ సంస్థ SEBI/RBI నమోదిత జాబితాలో కనుగొనబడలేదు. అత్యవసరత + గ్యారంటీడ్ రిటర్న్ నమూనా." },
    safe: { label: "సురక్షితం", reason: "నమోదైన బ్యాంక్ ఆఫర్‌తో సరిపోలింది. ఒత్తిడి వ్యూహాలు కనుగొనబడలేదు." },
    unclear: { label: "జాగ్రత్త — ఖచ్చితం కాదు", reason: "నమ్మకంగా ధృవీకరించలేకపోయాము. ఒక వ్యక్తి 4 పని గంటల్లో కాల్ చేస్తారు." },
  },
  en: {
    scam: { label: "Likely Scam", reason: "Entity not found in SEBI/RBI registered-entity list. Classic urgency + guaranteed-return pattern." },
    safe: { label: "Safe", reason: "Matches a registered bank offering. No pressure tactics detected." },
    unclear: { label: "Caution — Not Sure", reason: "Couldn't verify confidently. A human will call you back within 4 working hours." },
  },
};

export default function ScamScreen({ lang, name, onBack }) {
  const t = T[lang];
  const examples = SCAM_EXAMPLES[lang];
  const config = {
    scam: { icon: ShieldAlert, color: "#C1443A", bg: "#F8E3E0" },
    safe: { icon: ShieldCheck, color: "#3F7D58", bg: "#E3EEE6" },
    unclear: { icon: ShieldQuestion, color: "#E1A32A", bg: "#FBF0DB" },
  };
  const [input, setInput] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  const runCheck = (text) => {
    setInput(text); setResult(null); setChecking(true);
    setTimeout(() => {
      const match = examples.find((e) => e.text === text);
      const verdict = match ? match.verdict : /double|guarantee|otp|urgent|winner|गारंट|రెట్టింపు/i.test(text) ? "scam" : "unclear";
      setResult(verdict); setChecking(false);
    }, 1100);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title={t.scamTitle} subtitle={t.scamSub} name={name} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <div className="text-[11px] text-[#1E2A4F]/60 mb-1">{t.tryExample}</div>
        {examples.map((e, i) => (
          <button key={i} onClick={() => runCheck(e.text)} className="w-full text-left bg-white rounded-xl px-3 py-2.5 text-[12px] text-[#1E2A4F] shadow-sm hover:shadow-md transition">"{e.text}"</button>
        ))}
        <textarea value={input} onChange={(ev) => setInput(ev.target.value)} placeholder={t.scamPh}
          className="w-full mt-2 rounded-xl border border-[#1E2A4F]/15 bg-white px-3 py-2 text-[12px] h-16 resize-none focus:outline-none focus:ring-2 focus:ring-[#E1A32A]" />
        <button disabled={!input.trim() || checking} onClick={() => runCheck(input)}
          className="w-full bg-[#1E2A4F] text-[#FBF3E4] rounded-xl py-2.5 text-[13px] font-semibold disabled:opacity-40 flex items-center justify-center gap-2">
          {checking ? t.checking : t.checkBtn}{!checking && <ArrowRight size={14} />}
        </button>
        {checking && <div className="text-center text-[11px] text-[#1E2A4F]/50 pt-2 animate-pulse">{t.checking}</div>}
        {result && !checking && (
          <div className="rounded-2xl p-4 mt-1 shadow-sm border" style={{ background: config[result].bg, borderColor: config[result].color + "40" }}>
            <div className="flex items-center gap-2 mb-1.5">
              {React.createElement(config[result].icon, { size: 20, color: config[result].color })}
              <span className="font-bold text-[14px]" style={{ color: config[result].color }}>{SCAM_REASON[lang][result].label}</span>
            </div>
            <p className="text-[11.5px] text-[#1E2A4F]/80 leading-snug">{SCAM_REASON[lang][result].reason}</p>
            <div className="flex gap-2 mt-3">
              <button className="text-[10.5px] font-semibold bg-white rounded-full px-3 py-1.5 text-[#1E2A4F] flex items-center gap-1"><HelpCircle size={11} /> {t.why}</button>
              <button className="text-[10.5px] font-semibold bg-white rounded-full px-3 py-1.5 text-[#1E2A4F] flex items-center gap-1"><Phone size={11} /> {t.human}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
