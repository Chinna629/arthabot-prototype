import { useState } from "react";
import { Phone, ChevronRight } from "lucide-react";
import TopBar from "../components/TopBar";
import { T } from "../lib/translations";

export default function HelpScreen({ lang, name, onBack }) {
  const t = T[lang];
  const faqs = [
    { q: t.faqQ1, a: t.faqA1 },
    { q: t.faqQ2, a: t.faqA2 },
    { q: t.faqQ3, a: t.faqA3 },
  ];
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title={t.helpTitle} subtitle={t.helpSub} name={name} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <button className="w-full bg-[#3F7D58] text-white rounded-2xl p-4 shadow-sm flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Phone size={18} />
          </div>
          <div>
            <div className="font-semibold text-[13.5px]">{t.talkHuman}</div>
            <div className="text-[10.5px] opacity-90">{t.callbackInfo}</div>
          </div>
        </button>

        <div>
          <div className="text-[11px] font-semibold text-[#1E2A4F]/60 mb-2 px-0.5">{t.faqTitle}</div>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full text-left px-3.5 py-3 flex items-center justify-between gap-2"
                >
                  <span className="text-[12.5px] font-semibold text-[#1E2A4F]">{f.q}</span>
                  <ChevronRight size={14} className={`shrink-0 text-[#1E2A4F]/40 transition-transform ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-3.5 pb-3 text-[11.5px] text-[#1E2A4F]/70 leading-snug">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
