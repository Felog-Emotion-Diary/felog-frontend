import { useEffect, useState } from "react";
import StatCard from "../components/StatsComponent/StatCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/StatsComponent/CustomDatePicker.css";
import { ko } from "date-fns/locale";
import EmotionPieChart from "../components/StatsComponent/EmotionPieChart";
import WeekEmotionChart from "../components/StatsComponent/WeekEmotionChart";
import WeekDiaryCountChart from "../components/StatsComponent/WeekDiaryCountChart";
import { emotionMapByCode, type EmotionCode } from "../utils/emotionUtils";
import {
  BottomWrapper,
  ChartBox,
  ChartCard,
  ChartCardTitle,
  Container,
  DateRange,
  Header,
  StatCardNumberWrapper,
  Wrapper,
} from "../style/EmotionStatsStyle";
import { axiosInstance } from "../utils/axiosInstance";

type EmotionCount = { emotion: EmotionCode; count: number };
type EmotionPerWeekResponse = Record<
  string,
  { emotion: EmotionCode; count: number }
>;
type DiaryCountPerWeekResponse = { day: string; count: number }[];

function EmotionStats() {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo);
  const [endDate, setEndDate] = useState<Date | null>(today);

  const [longTxt, setLongTxt] = useState(0);
  const [emotionCounts, setEmotionCounts] = useState<EmotionCount[]>([]);
  const [mostEmotion, setMostEmotion] = useState<EmotionCode | null>(null);
  const [percent, setPercent] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [emotionPerWeek, setEmotionPerWeek] = useState<EmotionPerWeekResponse>(
    {}
  );
  const [diaryCountPerWeek, setDiaryCountPerWeek] =
    useState<DiaryCountPerWeekResponse>([]);

  useEffect(() => {
    
    if (!startDate || !endDate) return;

    const fetchStats = async () => {
      try {
        const start = startDate.toISOString().split("T")[0];
        const end = endDate.toISOString().split("T")[0];

        const [
          { data: longTxtRes },
          { data: emotionRatioRes },
          { data: countRes },
          { data: emotionPerWeekRes },
          { data: diaryCountPerWeekRes },
        ] = await Promise.all([
          axiosInstance.get<{ longTxt: { longText: number } }>("/api/statistics/longTxt", {
            params: { startDate: start, endDate: end },
          }),
          axiosInstance.get<{
            mostIdx: number;
            emotionCounts: { emotion: string; count: number }[];
          }>("/api/statistics/emotionRatio", {
            params: { startDate: start, endDate: end },
          }),
          axiosInstance.get<{ totalCount: number; streakCount: number }>(
            "/api/statistics/counts",
            { params: { startDate: start, endDate: end } }
          ),
          axiosInstance.get<Record<string, { emotion: string; count: number }>>(
            "/api/statistics/emotionPerWeek",
            {
              params: { startDate: start, endDate: end },
            }
          ),
          axiosInstance.get<DiaryCountPerWeekResponse>(
            "/api/statistics/diaryCountPerWeek",
            {
              params: { startDate: start, endDate: end },
            }
          ),
        ]);

        // 가장 긴 일기
        setLongTxt(longTxtRes.longTxt.longText);

        // 감정 비율
        const convertedCounts: EmotionCount[] =
          emotionRatioRes.emotionCounts.map((e) => ({
            emotion: parseInt(e.emotion, 10) as EmotionCode,
            count: e.count,
          }));
        setEmotionCounts(convertedCounts);

        const most = convertedCounts[emotionRatioRes.mostIdx];
        if (most) {
          setMostEmotion(most.emotion);
          const total = convertedCounts.reduce(
            (sum, item) => sum + item.count,
            0
          );
          setPercent(Math.round((most.count / total) * 100));
        }

        // 작성 수 및 streak
        setTotalCount(countRes.totalCount);
        setStreakCount(countRes.streakCount);

        // 요일별 감정
        const convertedWeek: EmotionPerWeekResponse = Object.fromEntries(
          Object.entries(emotionPerWeekRes).map(([day, val]) => [
            day,
            {
              emotion: parseInt(val.emotion, 10) as EmotionCode,
              count: val.count,
            },
          ])
        );
        setEmotionPerWeek(convertedWeek);

        // 요일별 작성 수
        setDiaryCountPerWeek(diaryCountPerWeekRes);
      } catch (err) {
        console.error("통계 데이터 불러오기 실패:", err);
      }
    };

    fetchStats();
  }, [startDate, endDate]);

  const mostEmotionEmoji = mostEmotion
    ? emotionMapByCode[mostEmotion]?.emoji
    : "";

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
          value={{ number: longTxt, unit: "자" }}
          label="가장 길었던 일기"
        />

        <StatCard
          value={{
            number: (
              <StatCardNumberWrapper>
                {mostEmotionEmoji && (
                  <img
                    src={mostEmotionEmoji}
                    alt="emotion"
                    width={60}
                    height={60}
                  />
                )}
                <span>{percent}</span>
              </StatCardNumberWrapper>
            ),
            unit: "%",
          }}
          label="가장 많이 나타난 감정"
        />

        <ChartBox>
          <EmotionPieChart data={emotionCounts} />
        </ChartBox>

        <StatCard
          value={{ number: streakCount, unit: "회" }}
          label="연속 작성 기록"
        />
        <StatCard
          value={{ number: totalCount, unit: "개" }}
          label="작성한 일기 개수"
        />

        <BottomWrapper>
          <ChartCard>
            <ChartCardTitle>요일별 주요 감정</ChartCardTitle>
            <WeekEmotionChart data={emotionPerWeek} />
          </ChartCard>
          <ChartCard>
            <ChartCardTitle>요일별 일기 작성 횟수</ChartCardTitle>
            <WeekDiaryCountChart data={diaryCountPerWeek} />
          </ChartCard>
        </BottomWrapper>
      </Wrapper>
    </Container>
  );
}

export default EmotionStats;


