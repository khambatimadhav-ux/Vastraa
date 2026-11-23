export default function Logo({ size = 34, withText = true, withTag = false, className = '' }) {
  return (
    <span className={`brand-logo ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
        <defs>
          <linearGradient id="vastraaMark" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D9A96A" />
            <stop offset="100%" stopColor="#96652F" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18.5" fill="none" stroke="url(#vastraaMark)" strokeWidth="1.3" />
        <path d="M10.5 12.5 L20 28.5 L29.5 12.5" fill="none" stroke="url(#vastraaMark)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 12.5 L20 21 L25 12.5" fill="none" stroke="url(#vastraaMark)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity=".6" />
      </svg>
      {withText && (
        <span className="brand-word-wrap">
          <span className="brand-word">Vastraa</span>
          {withTag && <span className="brand-tag">STYLE THAT SPEAKS</span>}
        </span>
      )}
    </span>
  );
}
