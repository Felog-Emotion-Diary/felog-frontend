import type { EmotionCode } from "../utils/emotionUtils";

export type EmotionPerDay = {
  emotion: EmotionCode;
  count: number;
};

export type EmotionPerWeek = {
  sun: EmotionPerDay;
  mon: EmotionPerDay;
  tue: EmotionPerDay;
  wed: EmotionPerDay;
  thu: EmotionPerDay;
  fri: EmotionPerDay;
  sat: EmotionPerDay;
};

export type DiaryCount = {
  day: string;
  count: number;
};

export type RawEmotionCount = {
  emotion: EmotionCode;
  count: number;
};