export default function ScoreRing({ score }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 75 ? "#3F7D58" : score >= 50 ? "#E1A32A" : "#C1443A";
  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#E5EEF6" strokeWidth="10" />
      <circle
        cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={offset} transform="rotate(-90 65 65)"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text x="65" y="60" textAnchor="middle" fontSize="30" fontWeight="700" fill="#1E2A4F">{score}</text>
      <text x="65" y="80" textAnchor="middle" fontSize="10" fill="#1E2A4F" opacity="0.5">/ 100</text>
    </svg>
  );
}
