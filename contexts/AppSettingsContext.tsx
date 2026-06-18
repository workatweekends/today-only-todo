import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme, type ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  type AppSettings,
  type ThemeMode,
} from '../types/settings';
import { getColors, type AppColors } from '../utils/theme';

type AppSettingsContextValue = {
  settings: AppSettings;
  isSettingsReady: boolean;
  colors: AppColors;
  isDark: boolean;
  updateSettings: (partial: Partial<AppSettings>) => Promise<void>;
};

const AppSettingsContext = createContext<AppSettingsContextValue | null>(null);

function resolveIsDark(themeMode: ThemeMode, systemScheme: ColorSchemeName): boolean {
  if (themeMode === 'dark') return true;
  if (themeMode === 'light') return false;
  return systemScheme === 'dark';
}

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSettingsReady, setIsSettingsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        if (!cancelled && stored) {
          setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        if (!cancelled) {
          setIsSettingsReady(true);
        }
      }
    }

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateSettings = useCallback(async (partial: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next)).catch((error) => {
        console.error('Failed to save settings:', error);
      });
      return next;
    });
  }, []);

  const isDark = resolveIsDark(settings.themeMode, systemScheme);
  const colors = useMemo(() => getColors(isDark ? 'dark' : 'light'), [isDark]);

  const value = useMemo(
    () => ({
      settings,
      isSettingsReady,
      colors,
      isDark,
      updateSettings,
    }),
    [settings, isSettingsReady, colors, isDark, updateSettings],
  );

  return (
    <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>
  );
}

export function useAppSettings(): AppSettingsContextValue {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return context;
}
