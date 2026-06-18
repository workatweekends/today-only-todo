import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, STORAGE_KEYS } from '../types/task';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

type UseTasksResult = {
  tasks: Task[];
  isLoading: boolean;
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  completedCount: number;
  totalCount: number;
  allCompleted: boolean;
};

export function useTasks(isReady: boolean): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;

    let cancelled = false;

    async function loadTasks() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.tasks);
        if (!cancelled && stored) {
          setTasks(JSON.parse(stored) as Task[]);
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      cancelled = true;
    };
  }, [isReady]);

  const persistTasks = useCallback(async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(newTasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, []);

  const addTask = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const newTask: Task = {
        id: generateId(),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      setTasks((prev) => {
        const updated = [newTask, ...prev];
        persistTasks(updated);
        return updated;
      });
    },
    [persistTasks],
  );

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prev) => {
        const updated = prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        );
        persistTasks(updated);
        return updated;
      });
    },
    [persistTasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => {
        const updated = prev.filter((task) => task.id !== id);
        persistTasks(updated);
        return updated;
      });
    },
    [persistTasks],
  );

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const allCompleted = totalCount > 0 && completedCount === totalCount;

  return {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    completedCount,
    totalCount,
    allCompleted,
  };
}
