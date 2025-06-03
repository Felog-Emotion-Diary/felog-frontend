import React from "react";
import type { EmotionStat } from "../../utils/MainEmotionStats";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  Container,
  Title,
  EmotionItem,
  EmotionList,
  Percentage,
  StyledLink,
} from "../../style/EmotionSummaryStyle";

const EMOJI_MAP: Record<string, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😡",
  anxious: "😨",
  calm: "😌",
  neutral: "😐",
  love: "😍",
};

interface EmotionSummaryProps {
  stats: EmotionStat[];
}

const EmotionSummary: React.FC<EmotionSummaryProps> = ({ stats }) => {
  return (
    <Container>
      <Title>
        <span>이번주의 감정</span>
        <StyledLink to="/emotion-stats">더 알아보기 <MdKeyboardArrowRight /></StyledLink>
      </Title>
      <EmotionList>
        {stats.map(({ emotion, percentage }) => (
          <EmotionItem key={emotion}>
            <div>{EMOJI_MAP[emotion]}</div>
            <Percentage $emotion={emotion}>{percentage}%</Percentage>
          </EmotionItem>
        ))}
      </EmotionList>
    </Container>
  );
};

export default EmotionSummary;
