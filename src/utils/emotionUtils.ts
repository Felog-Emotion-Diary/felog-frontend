import emotions from "../../emotions.json";

export type EmotionCode = typeof emotions[number]["code"];

export const emotionMap: Record<string, EmotionCode> = emotions.reduce(
  (acc, { name, code }) => {
    acc[name] = code;
    return acc;
  },
  {} as Record<string, EmotionCode>
);

export const getEmotionInfo = (code: string) =>
  emotions.find((e) => e.code === code);

export const EMOJI_MAP: Record<EmotionCode, string> = emotions.reduce(
  (acc, { code, emoji }) => {
    acc[code as EmotionCode] = emoji;
    return acc;
  },
  {} as Record<EmotionCode, string>
);

export const emotionCodes: EmotionCode[] = emotions.map((e) => e.code);

export const emotionColorMap: Record<EmotionCode, string> = emotions.reduce(
  (acc, { code, tagColor }) => {
    acc[code] = tagColor;
    return acc;
  },
  {} as Record<EmotionCode, string>
);