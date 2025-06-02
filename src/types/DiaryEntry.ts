export type Emotion =
  | "happy"
  | "sad"
  | "angry"
  | "anxious"
  | "calm"
  | "neutral"
  | "love";

export interface DiaryEntry {
    date : string;
    emotion : Emotion;
}