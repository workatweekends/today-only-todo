export type ThemeMode = 'system' | 'light' | 'dark';

export type AppSettings = {
  resetHour: number;
  resetMinute: number;
  themeMode: ThemeMode;
};

export const DEFAULT_SETTINGS: AppSettings = {
  resetHour: 0,
  resetMinute: 0,
  themeMode: 'system',
};

export const SETTINGS_STORAGE_KEY = 'settings';
