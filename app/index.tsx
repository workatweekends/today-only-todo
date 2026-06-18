import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { AdBanner } from '../components/AdBanner';
import { AddTaskInput } from '../components/AddTaskInput';
import { ConfettiOverlay } from '../components/ConfettiOverlay';
import { CountdownTimer } from '../components/CountdownTimer';
import { ResetSplash } from '../components/ResetSplash';
import { TaskItem } from '../components/TaskItem';
import { useAppSettings } from '../contexts/AppSettingsContext';
import { useResetOnNewDay } from '../hooks/useResetOnNewDay';
import { useTasks } from '../hooks/useTasks';

export default function HomeScreen() {
  const router = useRouter();
  const { colors, isDark, settings, isSettingsReady } = useAppSettings();

  const { wasReset, isReady: isResetReady } = useResetOnNewDay(
    settings.resetHour,
    settings.resetMinute,
    isSettingsReady,
  );

  const {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    completedCount,
    totalCount,
    allCompleted,
  } = useTasks(isResetReady);

  const [showResetSplash, setShowResetSplash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevAllCompleted = useRef(false);

  useEffect(() => {
    if (wasReset) {
      setShowResetSplash(true);
      const timer = setTimeout(() => setShowResetSplash(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [wasReset]);

  useEffect(() => {
    if (allCompleted && !prevAllCompleted.current) {
      setShowConfetti(true);
    }
    prevAllCompleted.current = allCompleted;
  }, [allCompleted]);

  const progressRatio = totalCount > 0 ? completedCount / totalCount : 0;

  if (!isSettingsReady || !isResetReady) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </View>
    );
  }

  if (showResetSplash) {
    return <ResetSplash colors={colors} isDark={isDark} />;
  }

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <View style={styles.content}>
            <View style={styles.topBar}>
              <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>今日だけ</Text>
                <CountdownTimer
                  colors={colors}
                  resetHour={settings.resetHour}
                  resetMinute={settings.resetMinute}
                />
              </View>
              <Pressable
                style={[styles.settingsButton, { backgroundColor: colors.surface }]}
                onPress={() => router.push('/settings')}
                hitSlop={8}
              >
                <Text style={[styles.settingsIcon, { color: colors.accent }]}>⚙</Text>
              </Pressable>
            </View>

            <AddTaskInput onAdd={addTask} colors={colors} />

            {totalCount > 0 && (
              <View style={styles.progressSection}>
                <View style={[styles.progressTrack, { backgroundColor: colors.accentLight }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        backgroundColor: colors.accent,
                        width: `${progressRatio * 100}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
                  {completedCount} / {totalCount}
                </Text>
              </View>
            )}

            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskItem
                  task={item}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  colors={colors}
                />
              )}
              ListEmptyComponent={
                <View style={styles.empty}>
                  <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                    今日やることを追加しよう
                  </Text>
                </View>
              }
              contentContainerStyle={[
                styles.list,
                tasks.length === 0 && styles.emptyList,
              ]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <AdBanner colors={colors} />
      <ConfettiOverlay visible={showConfetti} onFinish={() => setShowConfetti(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 24,
    marginBottom: 36,
  },
  header: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  settingsIcon: {
    fontSize: 20,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    minWidth: 36,
    textAlign: 'right',
  },
  list: {
    paddingBottom: 16,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
