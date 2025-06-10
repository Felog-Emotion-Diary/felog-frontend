import type { EmotionCode, EmotionName } from "../utils/emotionUtils";

export interface DiaryEntry {
  title: string;
  content: string;
  date: string;
  emotion: EmotionName | EmotionCode; 
  imgUrl?: string;
}
