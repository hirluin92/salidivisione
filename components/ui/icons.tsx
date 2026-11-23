type P = { size?: number; color?: string; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function CheckIcon({ size = 18, color = "#C6F432", className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2.5} className={className}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function CrossIcon({ size = 22, color = "#9AA4B2" }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2.4}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ArrowIcon({ size = 20, color = "#07090C" }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2.5}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChatIcon({ size = 20, color = "#07090C" }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2.2}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    </svg>
  );
}

export function SparkIcon({ size = 14, color = "#07090C" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill={color}>
      <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
    </svg>
  );
}

export function PlusIcon({ size = 24, color = "#C6F432" }: P) {
  return (
    <svg
      {...base(size)}
      stroke={color}
      strokeWidth={2.4}
      className="faq-plus shrink-0 transition-transform duration-200"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function LogoMark({ size = 34 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="8" fill="#C6F432" />
      <path
        d="M9 21l7-6 7 6M9 14l7-6 7 6"
        fill="none"
        stroke="#07090C"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
