import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import type { DiaryEntry } from "../types/DiaryEntry";
import emotions from "../../emotions.json";
import { emotionMap, type EmotionCode } from "../utils/emotionUtils";
dayjs.extend(isBetween);

export interface EmotionStat {
  emotion: EmotionCode;
  percentage: number;
}

export function MainEmotionStats(entries: DiaryEntry[]): EmotionStat[] {
  const today = dayjs("");
  const weekAgo = today.subtract(6, "day");

  const recentEntries = entries.filter((entry) =>
    dayjs(entry.date).isBetween(weekAgo, today, "day", "[]")
  );

  const total = recentEntries.length;

  const emotionCodes = emotions.map((e) => e.code as EmotionCode);

  const counts: Record<EmotionCode, number> = Object.fromEntries(
    emotionCodes.map((emotion) => [emotion, 0])
  ) as Record<EmotionCode, number>;


  recentEntries.forEach((entry) => {
  const code = emotionMap[entry.emotion]; 
  if (code) {
    counts[code]++;
  } else {
    console.warn(`Unrecognized emotion: ${entry.emotion}`);
  }
});

  const stats: EmotionStat[] = emotionCodes.map((emotion) => ({
    emotion,
    percentage: total === 0 ? 0 : Math.round((counts[emotion] / total) * 100),
  }));

  return stats;
}
