import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../types/task';
import { getLogicalDayKey, isSameLogicalDay } from '../utils/dateUtils';

type UseResetOnNewDayResult = {
  wasReset: boolean;
  isReady: boolean;
};

export function useResetOnNewDay(
  resetHour: number,
  resetMinute: number,
  enabled: boolean,
): UseResetOnNewDayResult {
  const [wasReset, setWasReset] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function checkAndReset() {
      try {
        const today = getLogicalDayKey(resetHour, resetMinute);
        const lastOpenDate = await AsyncStorage.getItem(STORAGE_KEYS.lastOpenDate);

        if (lastOpenDate === null) {
          await AsyncStorage.setItem(STORAGE_KEYS.lastOpenDate, today);
        } else if (!isSameLogicalDay(lastOpenDate, today)) {
          await AsyncStorage.multiSet([
            [STORAGE_KEYS.tasks, JSON.stringify([])],
            [STORAGE_KEYS.lastOpenDate, today],
          ]);
          if (!cancelled) {
            setWasReset(true);
          }
        }
      } catch (error) {
        console.error('Failed to check day reset:', error);
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    }

    checkAndReset();

    return () => {
      cancelled = true;
    };
  }, [resetHour, resetMinute, enabled]);

  return { wasReset, isReady };
}
