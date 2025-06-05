import type { EmotionCode } from "../utils/emotionUtils";

export interface DiaryEntry {
  title: string;
  content: string;
  date: string;
  emotion: EmotionCode;
  imgUrl?: string;
}
