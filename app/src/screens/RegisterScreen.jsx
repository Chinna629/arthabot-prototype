import { useState } from "react";
import { ArrowRight, User, Smartphone, Check } from "lucide-react";
import TopBar from "../components/TopBar";
import { T } from "../lib/translations";

export default function RegisterScreen({ lang, onDone, onBack }) {
  const t = T[lang];
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const validMobile = /^\d{10}$/.test(mobile);
  const otpCorrect = otp === "123456";

  const sendOtp = () => { if (!name.trim() || !validMobile) return; setOtpSent(true); setError(""); };
  const verify = () => {
    if (otpCorrect) onDone({ name, mobile });
    else setError(lang === "hi" ? "गलत OTP। कृपया 123456 दर्ज करें।" : lang === "te" ? "తప్పు OTP. దయచేసి 123456 నమోదు చేయండి." : "Incorrect OTP. Please enter 123456.");
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title={t.regTitle} subtitle={t.regSub} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5"><User size={12} /> {t.nameLabel}</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePh} disabled={otpSent}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#E1A32A] disabled:opacity-60" />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5"><Smartphone size={12} /> {t.mobileLabel}</label>
          <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder={t.mobilePh} disabled={otpSent}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#E1A32A] disabled:opacity-60" />
          <button onClick={sendOtp} disabled={!name.trim() || !validMobile || otpSent}
            className="w-full mt-2 bg-[#1E2A4F] text-[#FBF3E4] rounded-xl py-2.5 text-[12.5px] font-semibold disabled:opacity-30 flex items-center justify-center gap-1.5">
            {otpSent ? <><Check size={14} /> OTP Sent</> : t.sendOtp}
          </button>
        </div>
        {otpSent && (
          <div>
            <div className="text-[10.5px] text-[#3F7D58] font-medium mb-2">{t.otpSentTo} +91 {mobile}</div>
            <label className="text-[11px] font-semibold text-[#1E2A4F]/70 mb-1.5 block">{t.otpLabel}</label>
            <input type="text" value={otp} onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }} placeholder={t.otpPh}
              className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[15px] tracking-[0.3em] text-center font-semibold focus:outline-none focus:ring-2 focus:ring-[#E1A32A]" />
            <div className="text-[10px] text-[#1E2A4F]/40 mt-1.5">{t.otpHint}</div>
            {error && <div className="text-[10.5px] text-[#C1443A] mt-1.5">{error}</div>}
            <button onClick={verify} disabled={otp.length !== 6}
              className="w-full mt-4 bg-[#E1A32A] text-[#1E2A4F] rounded-xl py-3 text-[13.5px] font-bold disabled:opacity-30 flex items-center justify-center gap-2">
              {t.verifyBtn} <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
