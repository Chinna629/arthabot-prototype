import { ShieldCheck, Sparkles, Landmark, MessageCircle, TrendingUp, Send, Home } from "lucide-react";

const SCREEN_IDS = [
  { id: "home", key: "navHome", icon: Home },
  { id: "chat", key: "navChat", icon: MessageCircle },
  { id: "send", key: "navSend", icon: Send },
  { id: "scam", key: "navScam", icon: ShieldCheck },
  { id: "scheme", key: "navScheme", icon: Landmark },
  { id: "aaina", key: "navAaina", icon: Sparkles },
];

export default function BottomNav({ screen, setScreen, t }) {
  return (
    <div className="sticky bottom-0 z-10 bg-white border-t border-[#1E2A4F]/10 flex items-stretch shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      {SCREEN_IDS.map((s) => {
        const Icon = s.icon;
        const active = screen === s.id;
        return (
          <button
            key={s.id}
            onClick={() => setScreen(s.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[9.5px] font-semibold transition ${
              active ? "text-[#1E2A4F]" : "text-[#1E2A4F]/40"
            }`}
          >
            <Icon size={18} color={active ? "#E1A32A" : "currentColor"} />
            {t[s.key]}
          </button>
        );
      })}
      <button
        onClick={() => setScreen("investments")}
        className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[9.5px] font-semibold transition ${
          screen === "investments" ? "text-[#1E2A4F]" : "text-[#1E2A4F]/40"
        }`}
      >
        <TrendingUp size={18} color={screen === "investments" ? "#E1A32A" : "currentColor"} />
        {t.navInvest}
      </button>
    </div>
  );
}
