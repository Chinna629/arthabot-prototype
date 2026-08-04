export default function FactorBar({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: color + "22" }}>
        <Icon size={14} color={color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[10.5px] font-medium text-[#1E2A4F]/70 truncate">{label}</span>
          <span className="text-[10.5px] font-bold text-[#1E2A4F]">{value}</span>
        </div>
        <div className="h-1.5 w-full bg-[#1E2A4F]/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
        </div>
      </div>
    </div>
  );
}
