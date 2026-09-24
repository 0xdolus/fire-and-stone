export const colors = {
  primary: '#C73E1D',
  primaryDark: '#9A2F16',
  accentOrange: '#F66A00',
  charcoal: '#1C1C1C',
  background: '#FAF7F2',
  surface: '#FFFFFF',
  border: '#E8E2D9',
  success: '#2E7D32',
  error: '#C62828',
  text: {
    primary: '#1C1C1C',
    secondary: '#5C5C5C',
    muted: '#8A8A8A',
    inverse: '#FFFFFF',
  },
  gradient: {
    fire: ['#C73E1D', '#F66A00'] as const,
    dark: ['#000000', '#1C1C1C'] as const,
    stone: ['#FAF7F2', '#F2EDE6'] as const,
  },
} as const;

export type ColorToken = typeof colors;
