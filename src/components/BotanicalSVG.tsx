export function BotanicalSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        d="M200 480 C200 400, 180 350, 200 280 C220 210, 200 150, 200 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Left leaves */}
      <path
        d="M200 380 C160 360, 100 340, 80 300 C100 320, 160 330, 200 350"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M200 300 C150 270, 90 250, 60 200 C90 230, 150 250, 200 270"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M200 220 C170 190, 120 160, 100 120 C130 150, 170 170, 200 195"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* Right leaves */}
      <path
        d="M200 340 C240 320, 300 310, 320 270 C300 290, 240 300, 200 315"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M200 260 C250 230, 310 210, 340 170 C310 200, 250 215, 200 235"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M200 180 C230 150, 280 120, 300 80 C270 110, 230 135, 200 155"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* Top bud */}
      <circle cx="200" cy="75" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <circle cx="200" cy="75" r="3" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}
