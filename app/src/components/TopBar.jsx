export default function TopBar({ title, subtitle, name, onBack }) {
  return (
    <div className="sticky top-0 z-10 bg-[#1E2A4F] text-[#FBF3E4] px-4 pt-4 pb-3 flex items-center gap-3 shadow-md">
      {onBack && (
        <button onClick={onBack} className="w-7 h-7 -ml-1 rounded-full flex items-center justify-center hover:bg-white/10 shrink-0">
          <ChevronLeft size={18} />
        </button>
      )}
      <div className="w-9 h-9 rounded-full bg-[#E1A32A] flex items-center justify-center text-[#1E2A4F] font-bold text-sm shrink-0">AB</div>
      <div className="min-w-0">
        <div className="font-semibold text-[15px] leading-tight truncate">{title}</div>
        {name && <div className="text-[10px] text-[#E1A32A] font-medium truncate">Hi, {name} 👋</div>}
        {subtitle && <div className="text-[11px] text-[#C7CEDD] truncate">{subtitle}</div>}
      </div>
    </div>
  );
}
