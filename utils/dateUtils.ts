/** カレンダー日付を YYYY-MM-DD 形式で返す */
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * リセット時刻を基準にした「論理日」のキーを返す。
 * 例: リセット3:00の場合、2:59までは前日扱い。
 */
export function getLogicalDayKey(
  resetHour: number,
  resetMinute: number,
  date: Date = new Date(),
): string {
  const adjusted = new Date(date);
  if (
    adjusted.getHours() < resetHour ||
    (adjusted.getHours() === resetHour && adjusted.getMinutes() < resetMinute)
  ) {
    adjusted.setDate(adjusted.getDate() - 1);
  }
  return formatDateKey(adjusted);
}

export function isSameLogicalDay(
  dayA: string,
  dayB: string,
): boolean {
  return dayA === dayB;
}

/** 次のリセット時刻までの残り時間（時間単位、切り上げ） */
export function getRemainingHoursUntilReset(
  resetHour: number,
  resetMinute: number,
  date: Date = new Date(),
): number {
  const nextReset = new Date(date);
  nextReset.setHours(resetHour, resetMinute, 0, 0);

  if (date.getTime() >= nextReset.getTime()) {
    nextReset.setDate(nextReset.getDate() + 1);
  }

  const diffMs = nextReset.getTime() - date.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));
}

export function formatResetTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
