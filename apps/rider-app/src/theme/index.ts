// GarajOS Design Tokens — Dark & Light
export const dark = {
  bg: '#000000',
  bgCard: '#0A0A0A',
  bgCardAlt: '#171717',
  bgCardSoft: '#1A1A1A',
  bgSecondary: '#262626',
  textPrimary: '#FAFAFA',
  textSub: '#A3A3A3',
  textMuted: '#737373',
  brand: '#F97316',
  brandDark: '#EA580C',
  error: '#F87171',
  border: 'rgba(255,255,255,0.10)',
  borderStrong: '#3F3F3F',
  inputBg: 'rgba(255,255,255,0.05)',
  inputBorder: 'rgba(255,255,255,0.15)',
  isDark: true as const,
};

export const light = {
  bg: '#FFFFFF',
  bgCard: '#FFFFFF',
  bgCardAlt: '#F7F2FA',
  bgCardSoft: '#EEE8F4',
  bgSecondary: '#E8DEF8',
  textPrimary: '#1D1B20',
  textSub: '#49454F',
  textMuted: '#79747E',
  brand: '#F97316',
  brandDark: '#EA580C',
  error: '#DC2626',
  border: '#E4E0EA',
  borderStrong: '#CAC4D0',
  inputBg: 'rgba(0,0,0,0.04)',
  inputBorder: '#CAC4D0',
  isDark: false as const,
};

export type Theme = typeof dark;
