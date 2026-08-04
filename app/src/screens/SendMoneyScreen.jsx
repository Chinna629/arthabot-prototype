import { useState } from "react";
import { User, Check, Send, IndianRupee } from "lucide-react";
import TopBar from "../components/TopBar";
import { T } from "../lib/translations";

export default function SendMoneyScreen({ lang, name, onBack, transactions, addTransaction }) {
  const t = T[lang];
  const [tab, setTab] = useState("send"); // send | history
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState("form"); // form -> sending -> success
  // 4.6% reflects the average end-to-end cost of a domestic Indian remittance through an
  // informal agent (formal fee + informal costs like travel/bribes) — CGAP/IFMR-RBI field study.
  const shopFee = Math.round((Number(amount) || 0) * 0.046);

  const send = () => {
    if (!recipient.trim() || !Number(amount)) return;
    setStep("sending");
    setTimeout(() => {
      addTransaction({
        id: Date.now(),
        recipient,
        amount: Number(amount),
        timestamp: new Date().toISOString(),
      });
      setStep("success");
    }, 1200);
  };

  const reset = () => { setStep("form"); setRecipient(""); setAmount(""); };

  const TabBar = () => (
    <div className="flex bg-white/70 rounded-xl p-1 mx-5 mt-3 mb-1 shrink-0">
      {["send", "history"].map((id) => (
        <button
          key={id}
          onClick={() => setTab(id)}
          className={`flex-1 py-2 rounded-lg text-[12px] font-semibold transition ${
            tab === id ? "bg-[#1E2A4F] text-[#FBF3E4]" : "text-[#1E2A4F]/50"
          }`}
        >
          {id === "send" ? t.sendTab : t.historyTab}
        </button>
      ))}
    </div>
  );

  if (step === "success") {
    return (
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title={t.sendTitle} subtitle={t.sendSub} name={name} onBack={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#3F7D58] flex items-center justify-center mb-4">
            <Check size={30} className="text-white" />
          </div>
          <div className="text-[16px] font-bold text-[#1E2A4F] mb-1">{t.successTitle}</div>
          <div className="text-[12px] text-[#1E2A4F]/60 mb-1">₹{Number(amount).toLocaleString("en-IN")} → {recipient}</div>
          <div className="text-[11px] text-[#3F7D58] mb-6">{t.successSub}</div>
          <button onClick={reset} className="bg-[#1E2A4F] text-[#FBF3E4] rounded-xl px-5 py-2.5 text-[12.5px] font-semibold">
            {t.newTransfer}
          </button>
        </div>
      </div>
    );
  }

  if (tab === "history") {
    return (
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title={t.sendTitle} subtitle={t.historyLabel} name={name} onBack={onBack} />
        <TabBar />
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {transactions.length === 0 ? (
            <div className="text-center text-[12px] text-[#1E2A4F]/40 mt-10">{t.noHistoryYet}</div>
          ) : (
            transactions.slice().reverse().map((tx) => {
              const d = new Date(tx.timestamp);
              return (
                <div key={tx.id} className="bg-white rounded-xl p-3.5 shadow-sm flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#3F7D58]/10 flex items-center justify-center shrink-0">
                    <Send size={15} color="#3F7D58" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-semibold text-[#1E2A4F] truncate">{t.toLabel} {tx.recipient}</div>
                    <div className="text-[10px] text-[#1E2A4F]/45">{d.toLocaleDateString()} · {d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                  </div>
                  <div className="text-[13px] font-bold text-[#3F7D58] shrink-0">₹{tx.amount.toLocaleString("en-IN")}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TopBar title={t.sendTitle} subtitle={t.sendSub} name={name} onBack={onBack} />
      <TabBar />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5">
            <User size={12} /> {t.recipientLabel}
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={t.recipientPh}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#E1A32A]"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-[#1E2A4F]/70 flex items-center gap-1.5 mb-1.5">
            <IndianRupee size={12} /> {t.amountLabel}
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
            placeholder={t.amountPh}
            className="w-full rounded-xl border border-[#1E2A4F]/15 bg-white px-3.5 py-2.5 text-[16px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E1A32A]"
          />
        </div>

        {Number(amount) > 0 && (
          <div className="bg-white rounded-xl p-3.5 shadow-sm">
            <div className="text-[10.5px] font-semibold text-[#1E2A4F]/70 mb-2">{t.feeCompareTitle}</div>
            <div className="flex items-center justify-between text-[12px] py-1">
              <span className="text-[#1E2A4F]/60">{t.shopFeeLabel}</span>
              <span className="font-semibold text-[#C1443A]">₹{shopFee}</span>
            </div>
            <div className="flex items-center justify-between text-[12px] py-1 border-t border-[#1E2A4F]/10 mt-1 pt-2">
              <span className="text-[#1E2A4F]/60">{t.appFeeLabel}</span>
              <span className="font-semibold text-[#3F7D58]">₹0</span>
            </div>
            <div className="text-[9px] text-[#1E2A4F]/35 mt-2">{t.feeSourceNote}</div>
          </div>
        )}

        <button
          disabled={!recipient.trim() || !Number(amount) || step === "sending"}
          onClick={send}
          className="w-full bg-[#E1A32A] text-[#1E2A4F] rounded-xl py-3 text-[13.5px] font-bold disabled:opacity-30 flex items-center justify-center gap-2"
        >
          {step === "sending" ? "…" : t.reviewBtn}
          {step !== "sending" && <Send size={14} />}
        </button>
      </div>
    </div>
  );
}
