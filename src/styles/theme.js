// Design tokens — Light (Washi Paper) & Dark (Lacquerware) themes

export const lightTheme = {
  colors: {
    background: '#F9F5F0',
    primary: '#C0392B',
    secondary: '#1a1a1a',
    gold: '#D4A017',
    white: '#FFFFFF',
    gray: '#f5f5f5',
    textLight: '#888888',
    cardBg: '#FFFFFF',
    border: '#E8E0D5',
  },
  shadows: {
    card: '0 8px 24px rgba(0,0,0,0.06)',
    header: '0 2px 10px rgba(0,0,0,0.05)',
    floating: '0 10px 30px rgba(192, 57, 43, 0.3)',
  },
  borders: {
    divider: '1px solid #eee',
  },
  transitions: {
    default: 'all 0.2s ease',
  },
  fonts: {
    main: "'Segoe UI', system-ui, sans-serif",
    japanese: "'Noto Serif JP', 'Yu Mincho', serif",
  },
};

export const darkTheme = {
  colors: {
    background: '#0D0D0D',
    primary: '#E74C3C',
    secondary: '#F0E6D3',
    gold: '#F0C040',
    white: '#1A1A1A',
    gray: '#1E1E1E',
    textLight: '#777777',
    cardBg: '#1A1A1A',
    border: '#2A2A2A',
  },
  shadows: {
    card: '0 8px 24px rgba(0,0,0,0.3)',
    header: '0 2px 10px rgba(0,0,0,0.4)',
    floating: '0 10px 30px rgba(240, 192, 64, 0.2)',
  },
  borders: {
    divider: '1px solid #2A2A2A',
  },
  transitions: {
    default: 'all 0.2s ease',
  },
  fonts: {
    main: "'Segoe UI', system-ui, sans-serif",
    japanese: "'Noto Serif JP', 'Yu Mincho', serif",
  },
};

// Default export for backward compat — components that import { theme } still work
export const theme = lightTheme;

// SVG Brushstroke divider (as a component or string)
export const BrushDivider = () => (
  <svg 
    width="100%" 
    height="10" 
    viewBox="0 0 100 10" 
    preserveAspectRatio="none" 
    style={{ margin: '2rem 0', opacity: 0.1 }}
  >
    <path 
      d="M0,5 Q25,1 50,5 T100,5" 
      stroke="#1a1a1a" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
    />
  </svg>
);
