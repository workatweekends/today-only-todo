import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { AppColors } from '../utils/theme';

type Props = {
  colors: AppColors;
  isDark: boolean;
};

export function ResetSplash({ colors, isDark }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Text style={styles.emoji}>🌅</Text>
      <Text style={[styles.message, { color: colors.text }]}>
        昨日のタスクは消えました。{'\n'}今日も1つずつ、始めよう
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 32,
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 30,
  },
});
