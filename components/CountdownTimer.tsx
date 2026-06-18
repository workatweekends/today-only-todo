import { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { getRemainingHoursUntilReset } from '../utils/dateUtils';
import type { AppColors } from '../utils/theme';

type Props = {
  colors: AppColors;
  resetHour: number;
  resetMinute: number;
};

export function CountdownTimer({ colors, resetHour, resetMinute }: Props) {
  const [hours, setHours] = useState(() =>
    getRemainingHoursUntilReset(resetHour, resetMinute),
  );

  useEffect(() => {
    const update = () => {
      setHours(getRemainingHoursUntilReset(resetHour, resetMinute));
    };

    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [resetHour, resetMinute]);

  return (
    <Text style={[styles.text, { color: colors.textMuted }]}>
      あと {hours} 時間
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
});
