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
import { EMOJI_MAP } from "../../utils/emotionUtils";

interface EmotionSummaryProps {
  stats: EmotionStat[];
}

const EmotionSummary: React.FC<EmotionSummaryProps> = ({ stats }) => {
  return (
    <Container>
      <Title>
        <span>이번주의 감정</span>
        <StyledLink to="/emotion-stats">
          더 알아보기 <MdKeyboardArrowRight />
        </StyledLink>
      </Title>
      <EmotionList>
        {stats.map(({ emotion, percentage }) => (
          <EmotionItem key={emotion}>
            <img src={EMOJI_MAP[emotion]} alt={emotion} width={60} height={60} />
            <Percentage $emotion={emotion}>{percentage}%</Percentage>
          </EmotionItem>
        ))}
      </EmotionList>
    </Container>
  );
};

export default EmotionSummary;
