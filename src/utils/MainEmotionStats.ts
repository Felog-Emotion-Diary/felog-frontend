import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import type { DiaryEntry } from "../types/DiaryEntry";
import { ALL_EMOTIONS, type Emotion } from "./emotionUtils";
dayjs.extend(isBetween);

export interface EmotionStat {
  emotion: Emotion;
  percentage: number;
}

export function MainEmotionStats(entries: DiaryEntry[]): EmotionStat[] {
  const today = dayjs("2025-05-10");
  const weekAgo = today.subtract(6, "day");

  const recentEntries = entries.filter((entry) =>
    dayjs(entry.date).isBetween(weekAgo, today, "day", "[]")
  );

  const total = recentEntries.length;

  const counts: Record<Emotion, number> = Object.fromEntries(
    ALL_EMOTIONS.map((emotion) => [emotion, 0])
  ) as Record<Emotion, number>;

  recentEntries.forEach((entry) => {
    counts[entry.emotion]++;
  });

  const stats: EmotionStat[] = ALL_EMOTIONS.map((emotion) => ({
    emotion,
    percentage: total === 0 ? 0 : Math.round((counts[emotion] / total) * 100),
  }));

  return stats;
}
