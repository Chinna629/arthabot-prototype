import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { SHEETS_API_URL, CLOUD_SYNC_ENABLED } from "./lib/config";
import { T } from "./lib/translations";
import BottomNav from "./components/BottomNav";
import LanguageScreen from "./screens/LanguageScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import HelpScreen from "./screens/HelpScreen";
import ChatScreen from "./screens/ChatScreen";
import ScamScreen from "./screens/ScamScreen";
import SchemeScreen from "./screens/SchemeScreen";
import AainaScreen from "./screens/AainaScreen";
import FinancesScreen from "./screens/FinancesScreen";
import GoalSetupScreen from "./screens/GoalSetupScreen";
import InvestmentsScreen from "./screens/InvestmentsScreen";
import SendMoneyScreen from "./screens/SendMoneyScreen";

export default function App() {
  const [stage, setStage] = useState("language");
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("home");
  const [navStack, setNavStack] = useState([]);
  const [profile, setProfile] = useState({ name: "", mobile: "" });
  const [showHelp, setShowHelp] = useState(false);
  const [goals, setGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [finances, setFinances] = useState({ income: 0, savings: 0, expenses: 0 });
  const [syncStatus, setSyncStatus] = useState("idle"); // idle | syncing | synced | error

  const goToApp = () => setStage("app");

  // Best-effort push to Google Sheets. Silently no-ops if CLOUD_SYNC_ENABLED is false
  // (no URL configured yet) or if the network call fails — local state is always
  // the source of truth for the current session either way.
  const syncToCloud = (payload) => {
    if (!CLOUD_SYNC_ENABLED || !profile.mobile) return;
    setSyncStatus("syncing");
    fetch(SHEETS_API_URL, {
      method: "POST",
      body: JSON.stringify({ mobile: profile.mobile, name: profile.name, ...payload }),
    })
      .then(() => setSyncStatus("synced"))
      .catch(() => setSyncStatus("error"));
  };

  // Pull any previously-saved data for this mobile number right after login.
  const loadFromCloud = async (mobile) => {
    if (!CLOUD_SYNC_ENABLED || !mobile) return;
    try {
      setSyncStatus("syncing");
      const res = await fetch(`${SHEETS_API_URL}?mobile=${encodeURIComponent(mobile)}`);
      const data = await res.json();
      if (data.finances && data.finances.income) setFinances(data.finances);
      if (Array.isArray(data.goals)) setGoals(data.goals);
      if (Array.isArray(data.transactions)) setTransactions(data.transactions);
      setSyncStatus("synced");
    } catch (err) {
      setSyncStatus("error");
    }
  };

  const addGoal = (goal) => {
    const updated = [...goals, goal];
    setGoals(updated);
    syncToCloud({ finances, goals: updated, transactions });
  };
  const addTransaction = (tx) => {
    const updated = [...transactions, tx];
    setTransactions(updated);
    syncToCloud({ finances, goals, transactions: updated });
  };
  const saveFinances = (f) => {
    setFinances(f);
    syncToCloud({ finances: f, goals, transactions });
  };

  // navigate() pushes the current screen onto the history stack before moving forward.
  const navigate = (next) => {
    if (next === screen) return;
    setNavStack((s) => [...s, screen]);
    setScreen(next);
  };

  // goBack() pops exactly one step off the stack (falls back to Home if empty).
  const goBack = () => {
    setNavStack((s) => {
      if (s.length === 0) {
        setScreen("home");
        return s;
      }
      const copy = [...s];
      const prev = copy.pop();
      setScreen(prev);
      return copy;
    });
  };

  const renderInner = () => {
    if (showHelp) return <HelpScreen lang={lang} name={profile.name} onBack={() => setShowHelp(false)} />;
    if (stage === "language") return <LanguageScreen onSelect={(code) => { setLang(code); setStage("register"); }} />;
    if (stage === "register")
      return (
        <RegisterScreen
          lang={lang}
          onBack={() => setStage("language")}
          onDone={(p) => { setProfile(p); goToApp(); setScreen("finances"); loadFromCloud(p.mobile); }}
        />
      );
    const commonProps = { lang, name: profile.name, onBack: goBack };
    switch (screen) {
      case "home": return <HomeScreen lang={lang} name={profile.name} goTo={navigate} goals={goals} finances={finances} />;
      case "chat": return <ChatScreen {...commonProps} />;
      case "send": return <SendMoneyScreen {...commonProps} transactions={transactions} addTransaction={addTransaction} />;
      case "scam": return <ScamScreen {...commonProps} />;
      case "scheme": return <SchemeScreen {...commonProps} />;
      case "aaina": return <AainaScreen {...commonProps} goTo={navigate} goals={goals} />;
      case "goalSetup": return <GoalSetupScreen lang={lang} name={profile.name} onBack={goBack} onSave={addGoal} />;
      case "investments": return <InvestmentsScreen lang={lang} name={profile.name} onBack={goBack} />;
      case "finances": return <FinancesScreen lang={lang} name={profile.name} onBack={goBack} initial={finances} onSave={(f) => { saveFinances(f); goBack(); }} />;
      default: return null;
    }
  };

  const t = T[lang];
  const showBottomNav = stage === "app";
  const showFab = !showHelp;
  const selectTab = (id) => { setShowHelp(false); navigate(id); };

  return (
    <div
      className="app-shell w-full flex justify-center overflow-hidden"
      style={{ fontFamily: "'Poppins', 'Inter', sans-serif", backgroundColor: "#87CEEB" }}
    >
      <style>{`
        html, body { background-color: #87CEEB; margin: 0; height: 100%; overflow: hidden; }
        .app-shell { height: 100vh; height: 100dvh; }
        .app-inner { height: 100vh; height: 100dvh; }
      `}</style>
      <div
        className="app-inner w-full max-w-[440px] flex flex-col overflow-hidden relative sm:shadow-2xl"
        style={{ backgroundColor: "#DCEEFB" }}
      >
        {renderInner()}
        {CLOUD_SYNC_ENABLED && stage === "app" && (
          <div className="absolute left-3 z-20 bg-white/90 rounded-full px-2.5 py-1 text-[9px] font-semibold text-[#1E2A4F]/60 shadow-sm flex items-center gap-1" style={{ bottom: showBottomNav ? "72px" : "16px" }}>
            {syncStatus === "syncing" && "☁ Syncing…"}
            {syncStatus === "synced" && "☁ Synced"}
            {syncStatus === "error" && "☁ Sync failed"}
            {syncStatus === "idle" && "☁ Cloud ready"}
          </div>
        )}
        {showFab && (
          <button
            onClick={() => setShowHelp(true)}
            className="absolute right-4 z-20 bg-[#1E2A4F] text-[#E1A32A] rounded-full shadow-lg flex items-center gap-1.5 px-4 py-3 text-[11.5px] font-semibold hover:bg-[#28365e] transition"
            style={{ bottom: showBottomNav ? "72px" : "16px" }}
          >
            <HelpCircle size={16} /> {t.helpFab}
          </button>
        )}
        {showBottomNav && <BottomNav screen={showHelp ? null : screen} setScreen={selectTab} t={t} />}
      </div>
    </div>
  );
}
