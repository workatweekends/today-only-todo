import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useAppSettings } from '../contexts/AppSettingsContext';
import { PRIVACY_POLICY_URL } from '../constants/legal';
import { formatResetTime } from '../utils/dateUtils';
import type { ThemeMode } from '../types/settings';

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'システム' },
  { value: 'light', label: 'ライト' },
  { value: 'dark', label: 'ダーク' },
];

function adjustValue(current: number, delta: number, min: number, max: number): number {
  let next = current + delta;
  if (next > max) next = min;
  if (next < min) next = max;
  return next;
}

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, isDark, settings, updateSettings } = useAppSettings();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={[styles.back, { color: colors.accent }]}>戻る</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>設定</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          リセット時刻
        </Text>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardLabel, { color: colors.text }]}>
            タスクが消える時刻
          </Text>
          <Text style={[styles.timeDisplay, { color: colors.accent }]}>
            {formatResetTime(settings.resetHour, settings.resetMinute)}
          </Text>

          <View style={styles.stepperRow}>
            <View style={styles.stepperGroup}>
              <Text style={[styles.stepperLabel, { color: colors.textMuted }]}>時</Text>
              <View style={styles.stepper}>
                <Pressable
                  style={[styles.stepperButton, { backgroundColor: colors.accentLight }]}
                  onPress={() =>
                    updateSettings({
                      resetHour: adjustValue(settings.resetHour, -1, 0, 23),
                    })
                  }
                >
                  <Text style={[styles.stepperButtonText, { color: colors.accent }]}>−</Text>
                </Pressable>
                <Text style={[styles.stepperValue, { color: colors.text }]}>
                  {String(settings.resetHour).padStart(2, '0')}
                </Text>
                <Pressable
                  style={[styles.stepperButton, { backgroundColor: colors.accentLight }]}
                  onPress={() =>
                    updateSettings({
                      resetHour: adjustValue(settings.resetHour, 1, 0, 23),
                    })
                  }
                >
                  <Text style={[styles.stepperButtonText, { color: colors.accent }]}>＋</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.stepperGroup}>
              <Text style={[styles.stepperLabel, { color: colors.textMuted }]}>分</Text>
              <View style={styles.stepper}>
                <Pressable
                  style={[styles.stepperButton, { backgroundColor: colors.accentLight }]}
                  onPress={() =>
                    updateSettings({
                      resetMinute: adjustValue(settings.resetMinute, -1, 0, 59),
                    })
                  }
                >
                  <Text style={[styles.stepperButtonText, { color: colors.accent }]}>−</Text>
                </Pressable>
                <Text style={[styles.stepperValue, { color: colors.text }]}>
                  {String(settings.resetMinute).padStart(2, '0')}
                </Text>
                <Pressable
                  style={[styles.stepperButton, { backgroundColor: colors.accentLight }]}
                  onPress={() =>
                    updateSettings({
                      resetMinute: adjustValue(settings.resetMinute, 1, 0, 59),
                    })
                  }
                >
                  <Text style={[styles.stepperButtonText, { color: colors.accent }]}>＋</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>外観</Text>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={[styles.segmented, { backgroundColor: colors.background }]}>
            {THEME_OPTIONS.map((option) => {
              const selected = settings.themeMode === option.value;
              return (
                <Pressable
                  key={option.value}
                  style={[
                    styles.segment,
                    selected && { backgroundColor: colors.accent },
                  ]}
                  onPress={() => updateSettings({ themeMode: option.value })}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      { color: selected ? colors.onAccent : colors.textSecondary },
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>その他</Text>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Pressable
            style={styles.linkRow}
            onPress={() => router.push('/privacy-policy')}
          >
            <Text style={[styles.linkText, { color: colors.text }]}>プライバシーポリシー</Text>
            <Text style={[styles.linkArrow, { color: colors.textMuted }]}>›</Text>
          </Pressable>
          {PRIVACY_POLICY_URL ? (
            <Pressable
              style={[styles.linkRow, styles.linkRowBorder, { borderTopColor: colors.border }]}
              onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
            >
              <Text style={[styles.linkText, { color: colors.text }]}>Web版を開く</Text>
              <Text style={[styles.linkArrow, { color: colors.textMuted }]}>↗</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginBottom: 32,
  },
  back: {
    fontSize: 16,
    fontWeight: '600',
    width: 48,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 48,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 4,
  },
  card: {
    borderRadius: 16,
    padding: 20,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  timeDisplay: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 20,
  },
  stepperRow: {
    flexDirection: 'row',
    gap: 24,
  },
  stepperGroup: {
    flex: 1,
    gap: 8,
  },
  stepperLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  stepperValue: {
    fontSize: 22,
    fontWeight: '600',
    minWidth: 36,
    textAlign: 'center',
  },
  segmented: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  linkRowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 12,
    paddingTop: 16,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '500',
  },
  linkArrow: {
    fontSize: 18,
  },
});
