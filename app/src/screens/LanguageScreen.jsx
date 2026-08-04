import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import TopBar from "../components/TopBar";
import { T, LANGUAGES } from "../lib/translations";

export default function LanguageScreen({ onSelect }) {
  const [picked, setPicked] = useState(null);
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title="ArthaBot" subtitle="India's AI Financial Growth Companion" />
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="text-center mb-6">
          <Sparkles className="mx-auto text-[#E1A32A] mb-2" size={26} />
          <div className="text-[17px] font-bold text-[#1E2A4F]">Choose your language</div>
          <div className="text-[11px] text-[#1E2A4F]/50 mt-1">अपनी भाषा चुनें • మీ భాషను ఎంచుకోండి</div>
        </div>
        <div className="space-y-2.5">
          {LANGUAGES.map((l) => (
            <button key={l.code} onClick={() => setPicked(l.code)}
              className={`w-full text-left rounded-xl px-4 py-3.5 flex items-center justify-between transition shadow-sm ${picked === l.code ? "bg-[#1E2A4F] text-[#FBF3E4]" : "bg-white text-[#1E2A4F]"}`}>
              <span className="font-semibold text-[15px]">{l.native}</span>
              <span className={`text-[11px] ${picked === l.code ? "text-[#E1A32A]" : "text-[#1E2A4F]/40"}`}>{l.label}</span>
            </button>
          ))}
        </div>
        <button disabled={!picked} onClick={() => onSelect(picked)}
          className="w-full mt-6 bg-[#E1A32A] text-[#1E2A4F] rounded-xl py-3 text-[13.5px] font-bold disabled:opacity-30 flex items-center justify-center gap-2">
          {picked ? T[picked].continueBtn : "Continue"} <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
