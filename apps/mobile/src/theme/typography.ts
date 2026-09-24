import { TextStyle } from 'react-native';

export const fontFamily = {
  display: 'System', // Bebas Neue would be loaded via expo-font in production
  heading: 'System',
  body: 'System',
} as const;

export const typography = {
  displayXL: {
    fontSize: 56,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 1.5,
    lineHeight: 64,
  },
  displayLG: {
    fontSize: 44,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 1.2,
    lineHeight: 52,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as TextStyle['fontWeight'],
    lineHeight: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 24,
  },
} as const;
