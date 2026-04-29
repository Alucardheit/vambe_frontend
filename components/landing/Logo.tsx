type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 text-white"
        fill="none"
      >
        <path
          d="M12 2 L22 12 L12 22 L2 12 Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M12 6 L18 12 L12 18 L6 12 Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>
      <span className="text-xl font-semibold tracking-tight text-white">
        vambe
      </span>
    </span>
  );
}
