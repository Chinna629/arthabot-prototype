import { useState } from "react";
import { Landmark, ChevronRight } from "lucide-react";
import TopBar from "../components/TopBar";
import { T } from "../lib/translations";

const SCHEME_QUESTIONS = {
  hi: [
    { q: "आपका काम क्या है?", options: ["डिलीवरी / गिग राइडर", "स्ट्रीट वेंडर", "किसान", "गृहिणी"] },
    { q: "क्या आपके पास बैंक खाता है?", options: ["हाँ, PMJDY / जन धन", "हाँ, नियमित खाता", "अभी नहीं है"] },
  ],
  te: [
    { q: "మీ పని ఏమిటి?", options: ["డెలివరీ / గిగ్ రైడర్", "వీధి వ్యాపారి", "రైతు", "గృహిణి"] },
    { q: "మీకు బ్యాంక్ ఖాతా ఉందా?", options: ["అవును, PMJDY / జన్ ధన్", "అవును, రెగ్యులర్ ఖాతా", "ఇంకా లేదు"] },
  ],
  en: [
    { q: "What best describes your work?", options: ["Delivery / gig rider", "Street vendor", "Farmer", "Homemaker"] },
    { q: "Do you have a bank account?", options: ["Yes, PMJDY / Jan Dhan", "Yes, regular account", "No account yet"] },
  ],
};

const SCHEME_RESULTS = {
  hi: {
    gig: [{ name: "e-Shram पंजीकरण", why: "गिग वर्कर्स के लिए दुर्घटना कवर और सामाजिक सुरक्षा" }, { name: "PMSBY", why: "₹20/वर्ष में ₹2 लाख का दुर्घटना कवर" }],
    default: [{ name: "PM SVANidhi", why: "बिना गारंटी के ₹10,000 तक का कार्यशील पूंजी ऋण" }, { name: "PMJJBY", why: "₹436/वर्ष में ₹2 लाख का जीवन बीमा" }],
  },
  te: {
    gig: [{ name: "e-Shram నమోదు", why: "గిగ్ వర్కర్ల కోసం ప్రమాద కవర్ & సామాజిక భద్రత" }, { name: "PMSBY", why: "సంవత్సరానికి ₹20కి ₹2 లక్షల ప్రమాద కవర్" }],
    default: [{ name: "PM SVANidhi", why: "హామీ లేకుండా ₹10,000 వరకు వర్కింగ్ క్యాపిటల్ లోన్" }, { name: "PMJJBY", why: "సంవత్సరానికి ₹436కి ₹2 లక్షల జీవిత బీమా" }],
  },
  en: {
    gig: [{ name: "e-Shram Registration", why: "Unlocks accident cover & portable social security for gig workers" }, { name: "PMSBY", why: "₹2 lakh accident cover for ₹20/year" }],
    default: [{ name: "PM SVANidhi", why: "Working-capital loan up to ₹10,000, no collateral" }, { name: "PMJJBY", why: "₹2 lakh life cover for ₹436/year" }],
  },
};

export default function SchemeScreen({ lang, name, onBack }) {
  const t = T[lang];
  const questions = SCHEME_QUESTIONS[lang];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const pick = (opt) => { setAnswers([...answers, opt]); setStep((s) => s + 1); };
  const reset = () => { setStep(0); setAnswers([]); };
  const firstIsGig = answers[0] === questions[0].options[0];
  const results = SCHEME_RESULTS[lang][firstIsGig ? "gig" : "default"];

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title={t.schemeTitle} subtitle={t.schemeSub} name={name} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {step < questions.length ? (
          <div>
            <div className="text-[10px] font-semibold text-[#E1A32A] mb-1">{t.qLabel.toUpperCase()} {step + 1} / {questions.length}</div>
            <div className="text-[15px] font-semibold text-[#1E2A4F] mb-4">{questions[step].q}</div>
            <div className="space-y-2">
              {questions[step].options.map((opt) => (
                <button key={opt} onClick={() => pick(opt)} className="w-full text-left bg-white rounded-xl px-4 py-3 text-[12.5px] text-[#1E2A4F] shadow-sm hover:bg-[#E1A32A]/10 transition flex items-center justify-between">
                  {opt} <ChevronRight size={14} className="opacity-40" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-[13px] font-semibold text-[#1E2A4F] mb-3">{t.resultIntro}</div>
            <div className="space-y-2.5">
              {results.map((r) => (
                <div key={r.name} className="bg-white rounded-xl p-3.5 shadow-sm border border-[#3F7D58]/20">
                  <div className="flex items-center gap-2 font-semibold text-[13px] text-[#3F7D58]"><Landmark size={14} /> {r.name}</div>
                  <div className="text-[11px] text-[#1E2A4F]/70 mt-1">{r.why}</div>
                </div>
              ))}
            </div>
            <button onClick={reset} className="mt-4 text-[11px] font-semibold text-[#1E2A4F]/60 underline">{t.startOver}</button>
          </div>
        )}
      </div>
    </div>
  );
}
