import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Swipeable, { SwipeDirection } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { Task } from '../types/task';
import type { AppColors } from '../utils/theme';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  colors: AppColors;
};

export function TaskItem({ task, onToggle, onDelete, colors }: Props) {
  const strikeProgress = useSharedValue(task.completed ? 1 : 0);

  useEffect(() => {
    strikeProgress.value = withTiming(task.completed ? 1 : 0, { duration: 280 });
  }, [task.completed, strikeProgress]);

  const strikeStyle = useAnimatedStyle(() => ({
    width: `${strikeProgress.value * 100}%`,
  }));

  const renderRightActions = () => (
    <Pressable
      style={[styles.deleteAction, { backgroundColor: colors.deleteBg }]}
      onPress={() => onDelete(task.id)}
    >
      <Text style={[styles.deleteText, { color: colors.onAccent }]}>削除</Text>
    </Pressable>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      onSwipeableOpen={(direction) => {
        if (direction === SwipeDirection.LEFT) {
          onDelete(task.id);
        }
      }}
    >
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: task.completed ? colors.background : colors.surface,
          },
        ]}
        onPress={() => onToggle(task.id)}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: task.completed ? colors.accent : colors.border,
              backgroundColor: task.completed ? colors.accent : 'transparent',
            },
          ]}
        >
          {task.completed && (
            <Text style={[styles.checkmark, { color: colors.onAccent }]}>✓</Text>
          )}
        </View>

        <View style={styles.textWrapper}>
          <Text
            style={[
              styles.text,
              { color: task.completed ? colors.completedText : colors.text },
              task.completed && styles.textCompleted,
            ]}
          >
            {task.text}
          </Text>
          <Animated.View
            style={[
              styles.strikeLine,
              { backgroundColor: colors.completedText },
              strikeStyle,
            ]}
          />
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: -1,
  },
  textWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  textCompleted: {
    fontWeight: '400',
  },
  strikeLine: {
    position: 'absolute',
    left: 0,
    height: 1.5,
    top: '50%',
  },
  deleteAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    borderRadius: 14,
    marginBottom: 10,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
