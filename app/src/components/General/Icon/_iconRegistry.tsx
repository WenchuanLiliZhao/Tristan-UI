// SVG 图标注册表
export const iconRegistry: Record<
  string,
  (strokeWidth: number) => React.ReactNode
> = {
  "circle": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="12"
        cy="12"
        r="2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  "arrow": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  "home": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <polyline
        points="9,22 9,12 15,12 15,22"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  "user": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="12"
        cy="7"
        r="4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  "settings": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M12 1v6m0 6v6m11-7h-6m-6 0H1m7-7 2.5 2.5M16.5 16.5 14 14m2.5-9.5L14 7m2.5 9.5L14 14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  "search": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle
        cx="11"
        cy="11"
        r="8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="m21 21-4.35-4.35"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  "plus": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14m-7-7h14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  ),

  "minus": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  ),

  "close": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="m18 6-12 12M6 6l12 12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  ),

  "check": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <polyline
        points="20,6 9,17 4,12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  "heart": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  "star": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  "mail": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <polyline
        points="22,6 12,13 2,6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  "download": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  "upload": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  "ellipsis-vertical": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="6"
        r="1"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="12"
        cy="12"
        r="1"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="12"
        cy="18"
        r="1"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  // AI & Knowledge Base Icons
  "brain": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.5 2 6 4.5 6 8c0 1.5.5 2.8 1.3 3.8C6.5 12.5 6 13.7 6 15c0 2.8 2.2 5 5 5h2c2.8 0 5-2.2 5-5 0-1.3-.5-2.5-1.3-3.2C17.5 10.8 18 9.5 18 8c0-3.5-2.5-6-6-6z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 14c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zm4 0c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  "database": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <ellipse
        cx="12"
        cy="5"
        rx="9"
        ry="3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  "book": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M8 7h8M8 11h6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  ),

  "lightbulb": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M9 21h6m-3-18a5 5 0 0 1 5 5c0 1.5-.8 2.8-2 3.7-.7.5-1 1.3-1 2.3v1m-4-7a5 5 0 0 0 0 7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 18h6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  ),

  "robot": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="11"
        width="18"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="12"
        cy="5"
        r="2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path d="M12 7v4" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="9" cy="16" r="1" fill="currentColor" />
      <circle cx="15" cy="16" r="1" fill="currentColor" />
      <path
        d="M3 16h2m14 0h2M7 21v2m10-2v2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  ),

  "chip": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <rect
        x="8"
        y="8"
        width="8"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M9 1v3m6-3v3M9 20v3m6-3v3M1 9h3m16 0h3M1 15h3m16 0h3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  ),

  "knowledge-base": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M6 8h12M6 12h8M6 16h10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle
        cx="17"
        cy="7"
        r="2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path d="M17 9v6" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  ),

  "neural-network": (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle
        cx="5"
        cy="6"
        r="2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="5"
        cy="18"
        r="2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="12"
        cy="12"
        r="2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="19"
        cy="6"
        r="2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="19"
        cy="18"
        r="2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M7 8l3 2m0 0l3-2m-3 2v0m0 0l3 2m-3-2l-3 2m6-2l3-2m-3 2l3 2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  ),
};
