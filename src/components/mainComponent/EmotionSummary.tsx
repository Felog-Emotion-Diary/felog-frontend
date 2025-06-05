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
import { getEmotionInfo } from "../../utils/emotionUtils";

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
        {stats.map(({ emotion, percentage }) => {
          const info = getEmotionInfo(emotion);
          return (
            <EmotionItem key={emotion}>
              <img src={info?.emoji} alt={info?.name} width={60} height={60} />
              <Percentage $emotion={emotion}>{percentage}%</Percentage>
            </EmotionItem>
          );
        })}
      </EmotionList>
    </Container>
  );
};

export default EmotionSummary;
