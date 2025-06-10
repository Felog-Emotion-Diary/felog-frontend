import type { DiaryEntry } from "../types/DiaryEntry";
import type { EmotionCode } from "./emotionUtils";
import { emotionMap } from "./emotionUtils";

export function getLongestDiaryLength(entries: DiaryEntry[]): number {
  if (!entries.length) return 0;
  return Math.max(...entries.map((e) => e.content.length));
}

export function calculateEmotionRatio(entries: DiaryEntry[]) {
  const counts: Record<EmotionCode, number> = {};
  entries.forEach(({ emotion }) => {
    const code = emotionMap[emotion]?.code;
    if (code !== undefined) {
      counts[code] = (counts[code] ?? 0) + 1;
    }
  });

  const emotionCounts = Object.entries(counts).map(([code, count]) => ({
    emotion: Number(code) as EmotionCode,
    count: count ?? 0,
  }));
  const total = entries.length || 1;
  const mostEmotion = emotionCounts.reduce(
    (max, curr) => (curr.count > max.count ? curr : max),
    { emotion: 32 as EmotionCode, count: 0 }
  );

  return {
    emotionCounts,
    mostEmotion,
    percent: Math.round((mostEmotion.count / total) * 100),
  };
}

export function calculateEmotionPerWeek(entries: DiaryEntry[]) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const result: Record<string, { emotion: EmotionCode; count: number }> = {};
  days.forEach((day) => (result[day] = { emotion: 32, count: 0 })); // 32 = 무덤덤

  const grouped: Record<string, Record<string, number>> = {};

  for (const e of entries) {
    const date = new Date(e.date);
    const day = days[date.getDay()];
    if (!grouped[day]) grouped[day] = {};
    grouped[day][e.emotion] = (grouped[day][e.emotion] || 0) + 1;
  }

  for (const day of days) {
    const emotionGroup = grouped[day] || {};
    let maxEmotionName = "무덤덤";
    let maxCount = 0;

    for (const [emotionName, count] of Object.entries(emotionGroup)) {
      if (count > maxCount) {
        maxCount = count;
        maxEmotionName = emotionName;
      }
    }

    const code = emotionMap[maxEmotionName]?.code ?? 32;
    result[day] = { emotion: code, count: maxCount };
  }

  return result;
}

export function calculateDiaryCountPerWeek(entries: DiaryEntry[]) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const countByDay: Record<string, number> = {};
  days.forEach((d) => (countByDay[d] = 0));

  entries.forEach((e) => {
    const dayName = days[new Date(e.date).getDay()];
    countByDay[dayName]++;
  });

  return days.map((day) => ({ day, count: countByDay[day] }));
}
