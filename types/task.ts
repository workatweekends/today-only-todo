export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

export const STORAGE_KEYS = {
  tasks: 'tasks',
  lastOpenDate: 'lastOpenDate',
} as const;
