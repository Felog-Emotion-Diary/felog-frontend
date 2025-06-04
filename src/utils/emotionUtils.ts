import happyImg from "../assets/happy.png";
import sadImg from "../assets/sad.png";
import angryImg from "../assets/angry.png";
import anxiousImg from "../assets/anxious.png";
import calmImg from "../assets/chill.png";
import neutralImg from "../assets/normal.png";
import loveImg from "../assets/love.png";

export const ALL_EMOTIONS = [
  "happy",
  "sad",
  "angry",
  "anxious",
  "calm",
  "neutral",
  "love",
] as const;

export type Emotion = (typeof ALL_EMOTIONS)[number];

export const emotionColorMap: Record<Emotion, string> = {
  happy: "#FFE082",
  sad: "#90CAF9",
  angry: "#EF9A9A",
  anxious: "#9FA8DA",
  calm: "#A5D6A7",
  neutral: "#78909C",
  love: "#FFCC80",
};

export const EMOJI_MAP: Record<Emotion, string> = {
  happy: happyImg,
  sad: sadImg,
  angry: angryImg,
  anxious: anxiousImg,
  calm: calmImg,
  neutral: neutralImg,
  love: loveImg,
};
