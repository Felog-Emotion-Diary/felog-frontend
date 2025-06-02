import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import type { DiaryEntry, Emotion } from "../types/DiaryEntry";
dayjs.extend(isBetween);

export interface EmotionStat {
  emotion: Emotion;
  percentage: number;
}

const ALL_EMOTIONS: Emotion[] = ['happy', 'sad', 'angry', 'anxious', 'calm', 'neutral', 'love'];

export function MainEmotionStats(entries: DiaryEntry[]): EmotionStat[] {
  const today = dayjs("2025-05-10");
  const weekAgo = today.subtract(6, "day");

  const recentEntries = entries.filter((entry) =>
    dayjs(entry.date).isBetween(weekAgo, today, "day", "[]")
  );

  const total = recentEntries.length;
  const counts: Record<Emotion, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    anxious: 0,
    calm: 0,
    neutral: 0,
    love: 0,
  };

  recentEntries.forEach((entry) => {
    counts[entry.emotion]++;
  });

  const stats: EmotionStat[] = ALL_EMOTIONS.map((emotion) => ({
    emotion,
    percentage: total === 0 ? 0 : Math.round((counts[emotion] / total) * 100),
  }));

  return stats;
}
