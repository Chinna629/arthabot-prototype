import { useState, useRef, useEffect } from "react";
import { Mic, ChevronRight } from "lucide-react";
import TopBar from "../components/TopBar";
import { T } from "../lib/translations";

const CHAT_SCRIPT = {
  hi: [
    { from: "user", text: "SIP kya hota hai?", en: "What is a SIP?" },
    { from: "bot", text: "SIP ek gullak hai jiska ek timetable hota hai — har mahine thodi si raqam apne aap bachat mein jaati hai.", en: "A SIP is a piggy bank with a timetable — a small amount is saved automatically every month." },
    { from: "user", text: "Kitna paisa chahiye shuru karne ke liye?", en: "How much money do I need to start?" },
    { from: "bot", text: "Kai jagah ₹100 se shuru ho jaata hai. Main aapke liye ek 'Goal Tracker' bana doon?", en: "Many start at just ₹100. Should I set up a Goal Tracker for you?" },
  ],
  te: [
    { from: "user", text: "SIP అంటే ఏమిటి?", en: "What is a SIP?" },
    { from: "bot", text: "SIP అనేది టైమ్‌టేబుల్ ఉన్న గుళక లాంటిది — ప్రతి నెలా కొంచెం మొత్తం స్వయంచాలకంగా పొదుపు అవుతుంది.", en: "A SIP is a piggy bank with a timetable — a small amount is saved automatically every month." },
    { from: "user", text: "ప్రారంభించడానికి ఎంత డబ్బు కావాలి?", en: "How much money do I need to start?" },
    { from: "bot", text: "చాలా చోట్ల ₹100 తో మొదలవుతుంది. మీ కోసం 'గోల్ ట్రాకర్' సెటప్ చేయమంటారా?", en: "Many start at just ₹100. Should I set up a Goal Tracker for you?" },
  ],
  en: [
    { from: "user", text: "What is a SIP?", en: "" },
    { from: "bot", text: "A SIP is a piggy bank with a timetable — a small amount is saved automatically every month.", en: "" },
    { from: "user", text: "How much money do I need to start?", en: "" },
    { from: "bot", text: "Many start at just ₹100. Should I set up a Goal Tracker for you?", en: "" },
  ],
};

export default function ChatScreen({ lang, name, onBack }) {
  const t = T[lang];
  const script = CHAT_SCRIPT[lang];
  const [visible, setVisible] = useState(2);
  const [showGloss, setShowGloss] = useState(lang !== "en");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [visible]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title={t.chatTitle} subtitle={t.chatSub} name={name} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[repeating-linear-gradient(135deg,#EAF6FD,#EAF6FD_18px,#DCEEFB_18px,#DCEEFB_19px)]">
        {script.slice(0, visible).map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug shadow-sm ${m.from === "user" ? "bg-[#E1A32A] text-[#1E2A4F] rounded-br-sm" : "bg-white text-[#1E2A4F] rounded-bl-sm"}`}>
              <div className="font-medium">{m.text}</div>
              {showGloss && m.en && <div className="text-[10.5px] mt-1 opacity-60 italic">{m.en}</div>}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="px-4 pb-2 flex items-center justify-between">
        {lang !== "en" ? (
          <label className="flex items-center gap-1.5 text-[10px] text-[#1E2A4F]/60">
            <input type="checkbox" checked={showGloss} onChange={() => setShowGloss((s) => !s)} /> {t.showEnglish}
          </label>
        ) : <span />}
        {visible < script.length && (
          <button onClick={() => setVisible((v) => v + 1)} className="text-[11px] font-semibold text-[#1E2A4F] bg-[#E1A32A]/30 px-3 py-1 rounded-full flex items-center gap-1">
            {t.continueBtn} <ChevronRight size={12} />
          </button>
        )}
      </div>
      <div className="border-t border-[#1E2A4F]/10 px-3 py-3 flex items-center gap-2 bg-white">
        <div className="flex-1 bg-[#EAF6FD] rounded-full px-4 py-2 text-[12px] text-[#1E2A4F]/50">{t.typeHint}</div>
        <button className="w-9 h-9 rounded-full bg-[#1E2A4F] flex items-center justify-center text-[#FBF3E4]"><Mic size={16} /></button>
      </div>
    </div>
  );
}
