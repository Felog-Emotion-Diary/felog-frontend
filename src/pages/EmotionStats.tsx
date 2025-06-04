import { useState } from "react";
import StatCard from "../components/StatsComponent/StatCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/StatsComponent/CustomDatePicker.css";
import { ko } from "date-fns/locale";
import EmotionPieChart from "../components/StatsComponent/EmotionPieChart";
import WeekEmotionChart from "../components/StatsComponent/WeekEmotionChart";
import WeekDiaryCountChart from "../components/StatsComponent/WeekDiaryCountChart";
import { EMOJI_MAP, type Emotion } from "../utils/emotionUtils";
import {
  BottomWrapper,
  ChartBox,
  ChartCard,
  ChartCardTitle,
  Container,
  DateRange,
  Header,
  Wrapper,
} from "../style/EmotionStatsStyle";

const dummyStats = {
  longTxtLength: 1200,
  mostEmotion: { emoji: "😢", percent: 72 },
  totalCount: 72,
  streakCount: 32,
  emotionCounts: [
    { emotion: "happy", count: 34 },
    { emotion: "sad", count: 32 },
    { emotion: "angry", count: 32 },
    { emotion: "anxious", count: 1 },
    { emotion: "calm", count: 16 },
    { emotion: "love", count: 18 },
    { emotion: "neutral", count: 12 },
  ],
  emotionPerWeek: {
    mon: { emotion: "happy" as Emotion, count: 3 },
    tue: { emotion: "sad" as Emotion, count: 5 },
    wed: { emotion: "angry" as Emotion, count: 1 },
    thu: { emotion: "anxious" as Emotion, count: 2 },
    fri: { emotion: "calm" as Emotion, count: 4 },
    sat: { emotion: "love" as Emotion, count: 3 },
    sun: { emotion: "neutral" as Emotion, count: 2 },
  },
  diaryCountPerWeek: [
    { day: "월", count: 10 },
    { day: "화", count: 3 },
    { day: "수", count: 8 },
    { day: "목", count: 4 },
    { day: "금", count: 22 },
    { day: "토", count: 3 },
    { day: "일", count: 1 },
  ],
};

function EmotionStats() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <Container>
      <Header>
        <DateRange>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            dateFormatCalendar="yyyy년 MM월"
            placeholderText="시작 날짜"
            locale={ko}
          />
          <span>~</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            dateFormatCalendar="yyyy년 MM월"
            placeholderText="종료 날짜"
            locale={ko}
          />
        </DateRange>
      </Header>

      <Wrapper>
        <StatCard
          value={{ number: dummyStats.longTxtLength, unit: "자" }}
          label="가장 길었던 일기"
        />
        <StatCard
          value={{
            number: (
              <>
                <img
                  src={EMOJI_MAP["sad"]} 
                  alt="emotion"
                  width={60}
                  height={60}
                  style={{ marginBottom: "-10px", marginRight: "4px" }}
                />
                {dummyStats.mostEmotion.percent}
              </>
            ),
            unit: "%",
          }}
          label="가장 많이 나타난 감정"
        />
        <ChartBox>
          <EmotionPieChart data={dummyStats.emotionCounts} />
        </ChartBox>

        <StatCard
          value={{ number: dummyStats.streakCount, unit: "회" }}
          label="연속 작성 기록"
        />
        <StatCard
          value={{ number: dummyStats.totalCount, unit: "개" }}
          label="작성한 일기 개수"
        />

        <BottomWrapper>
          <ChartCard>
            <ChartCardTitle>요일별 주요 감정</ChartCardTitle>
            <WeekEmotionChart data={dummyStats.emotionPerWeek} />
          </ChartCard>
          <ChartCard>
            <ChartCardTitle>요일별 일기 작성 횟수</ChartCardTitle>
            <WeekDiaryCountChart data={dummyStats.diaryCountPerWeek} />
          </ChartCard>
        </BottomWrapper>
      </Wrapper>
    </Container>
  );
}

export default EmotionStats;
