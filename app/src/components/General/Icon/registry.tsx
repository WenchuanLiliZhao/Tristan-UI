// SVG 图标注册表
export const iconRegistry: Record<string, (strokeWidth: number) => React.ReactNode> = {
  
  circle: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={strokeWidth}/>
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  ),
  
  arrow: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  home: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth={strokeWidth}/>
      <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  ),
  
  user: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth={strokeWidth}/>
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  ),
  
  settings: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m7-7 2.5 2.5M16.5 16.5 14 14m2.5-9.5L14 7m2.5 9.5L14 14" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  ),
  
  search: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  ),
  
  plus: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  ),
  
  minus: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  ),
  
  close: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="m18 6-12 12M6 6l12 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  ),
  
  check: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  heart: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  ),
  
  star: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  ),
  
  mail: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth={strokeWidth}/>
      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  ),
  
  download: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  upload: (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  'ellipsis-vertical': (strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="6" r="1" fill="currentColor" stroke="currentColor" strokeWidth={strokeWidth}/>
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="currentColor" strokeWidth={strokeWidth}/>
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  )
};