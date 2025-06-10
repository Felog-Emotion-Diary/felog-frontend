import emotions from "../../emotions.json";

export type Emotion = (typeof emotions)[number];
export type EmotionName = Emotion["name"];
export type EmotionCode = Emotion["code"];

export const emotionMap: Record<EmotionName, Emotion> = emotions.reduce(
  (acc, emotion) => {
    acc[emotion.name] = emotion;
    return acc;
  },
  {} as Record<EmotionName, Emotion>
);

export const emotionMapByCode: Record<EmotionCode, Emotion> = emotions.reduce(
  (acc, emotion) => {
    acc[emotion.code] = emotion;
    return acc;
  },
  {} as Record<EmotionCode, Emotion>
);

export const emotionNameToCode: Record<EmotionName, EmotionCode> =
  Object.fromEntries(emotions.map((e) => [e.name, e.code])) as Record<
    EmotionName,
    EmotionCode
  >;

export const getEmotionInfo = (code: EmotionCode) =>
  emotions.find((e) => e.code === code);

export const EMOJI_MAP: Record<EmotionCode, string> = emotions.reduce(
  (acc, { code, emoji }) => {
    acc[code] = emoji;
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

export const emotionColors: Record<string, string> = emotions.reduce((acc, { name, code }) => {
  acc[name] = `emotion-${code}`; 
  return acc;
}, {} as Record<string, string>);
