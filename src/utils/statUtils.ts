import type { DiaryEntry } from "../types/DiaryEntry";
import type { EmotionCode } from "./emotionUtils";

export function getLongestDiaryLength(entries: DiaryEntry[]): number {
  if (!entries.length) return 0;
  return Math.max(...entries.map((e) => e.content.length));
}

export function calculateEmotionRatio(entries: DiaryEntry[]) {
  const counts: Record<EmotionCode, number> = {};
  entries.forEach(({ emotion }) => {
    counts[emotion] = (counts[emotion] ?? 0) + 1;
  });
  const emotionCounts = Object.entries(counts).map(([emotion, count]) => ({
    emotion: emotion as EmotionCode,
    count: count ?? 0,
  }));
  const total = entries.length || 1;
  const mostEmotion = emotionCounts.reduce(
    (max, curr) => (curr.count > max.count ? curr : max),
    { emotion: "normal" as EmotionCode, count: 0 }
  );

  return {
    emotionCounts,
    mostEmotion,
    percent: Math.round((mostEmotion.count / total) * 100),
  };
}

export function calculateEmotionPerWeek(entries: DiaryEntry[]) {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const result: Record<string, { emotion: EmotionCode; count: number }> = {};
  days.forEach((day) => (result[day] = { emotion: "normal", count: 0 }));

  const grouped: Record<string, Record<EmotionCode, number>> = {};

  for (const e of entries) {
    const date = new Date(e.date);
    const day = days[date.getDay()];
    if (!grouped[day]) grouped[day] = {};
    grouped[day][e.emotion] = (grouped[day][e.emotion] || 0) + 1;
  }

  for (const day of days) {
    const emotionGroup = grouped[day] || {};
    let maxEmotion: EmotionCode = "normal";
    let maxCount = 0;
    for (const [emotion, count] of Object.entries(emotionGroup)) {
      if (count > maxCount) {
        maxCount = count;
        maxEmotion = emotion as EmotionCode;
      }
    }
    result[day] = { emotion: maxEmotion, count: maxCount };
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
