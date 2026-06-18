import type { ColorSchemeName } from 'react-native';

export const ACCENT = '#3B82F6';
export const ACCENT_LIGHT = '#EFF6FF';

export type AppColors = {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  completedText: string;
  inputBg: string;
  deleteBg: string;
  accent: string;
  accentLight: string;
  onAccent: string;
};

export function getColors(scheme: ColorSchemeName): AppColors {
  const isDark = scheme === 'dark';

  if (isDark) {
    return {
      background: '#0B1220',
      surface: '#152238',
      text: '#F0F7FF',
      textSecondary: '#93B4E0',
      textMuted: '#5B7FA8',
      border: '#1E3354',
      completedText: '#3D5F8A',
      inputBg: '#152238',
      deleteBg: '#2563EB',
      accent: '#60A5FA',
      accentLight: '#1A2F4F',
      onAccent: '#FFFFFF',
    };
  }

  return {
    background: '#FFFFFF',
    surface: '#EFF6FF',
    text: '#0F2744',
    textSecondary: '#3B6B9E',
    textMuted: '#7BA3CC',
    border: '#DBEAFE',
    completedText: '#A8C8E8',
    inputBg: '#EFF6FF',
    deleteBg: '#3B82F6',
    accent: ACCENT,
    accentLight: ACCENT_LIGHT,
    onAccent: '#FFFFFF',
  };
}
