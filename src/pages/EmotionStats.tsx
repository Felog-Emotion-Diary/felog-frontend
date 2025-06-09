// import { useEffect, useState } from "react";
// import StatCard from "../components/StatsComponent/StatCard";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../components/StatsComponent/CustomDatePicker.css";
// import { ko } from "date-fns/locale";
// import EmotionPieChart from "../components/StatsComponent/EmotionPieChart";
// import WeekEmotionChart from "../components/StatsComponent/WeekEmotionChart";
// import WeekDiaryCountChart from "../components/StatsComponent/WeekDiaryCountChart";
// import { emotionMap, getEmotionInfo } from "../utils/emotionUtils";
// import {
//   BottomWrapper,
//   ChartBox,
//   ChartCard,
//   ChartCardTitle,
//   Container,
//   DateRange,
//   Header,
//   Wrapper,
// } from "../style/EmotionStatsStyle";
// import type { DiaryEntry } from "../types/DiaryEntry";
// import calculateStreak from "../utils/caculateStreak";
// import {
//   getLongestDiaryLength,
//   calculateEmotionRatio,
//   calculateEmotionPerWeek,
//   calculateDiaryCountPerWeek,
// } from "../utils/statUtils";

// function EmotionStats() {
//   const today = new Date();
//   const oneMonthAgo = new Date();
//   oneMonthAgo.setMonth(today.getMonth() - 1);

//   const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo);
//   const [endDate, setEndDate] = useState<Date | null>(today);
//   const [entries, setEntries] = useState<DiaryEntry[]>([]);
//   const [filtered, setFiltered] = useState<DiaryEntry[]>([]);

//   useEffect(() => {
//     const raw = localStorage.getItem("diaries");
//     if (raw) {
//       const parsed: DiaryEntry[] = (JSON.parse(raw) as DiaryEntry[]).map(
//         (entry) => ({
//           ...entry,
//           emotion: emotionMap[entry.emotion] ?? "normal", // ← 중요!
//         })
//       );
//       const valid = parsed.filter((e) => e.date && e.emotion && e.content);
//       setEntries(valid);
//     }
//   }, []);

//   useEffect(() => {
//     if (!startDate || !endDate) return;
//     const filtered = entries.filter((entry) => {
//       const d = new Date(entry.date);
//       return d >= startDate && d <= endDate;
//     });
//     setFiltered(filtered);
//   }, [startDate, endDate, entries]);

//   const longTxtLength = getLongestDiaryLength(filtered);
//   const { emotionCounts, mostEmotion, percent } =
//     calculateEmotionRatio(filtered);
//   const streakCount = calculateStreak(filtered.map((e) => e.date));
//   const emotionPerWeek = calculateEmotionPerWeek(filtered);
//   const diaryCountPerWeek = calculateDiaryCountPerWeek(filtered);
//   const mostEmotionEmoji = getEmotionInfo(mostEmotion.emotion)?.emoji;

//   return (
//     <Container>
//       <Header>
//         <DateRange>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             dateFormat="yyyy-MM-dd"
//             dateFormatCalendar="yyyy년 MM월"
//             placeholderText="시작 날짜"
//             locale={ko}
//           />
//           <span>~</span>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             dateFormat="yyyy-MM-dd"
//             dateFormatCalendar="yyyy년 MM월"
//             placeholderText="종료 날짜"
//             locale={ko}
//           />
//         </DateRange>
//       </Header>

//       <Wrapper>
//         <StatCard
//           value={{ number: longTxtLength, unit: "자" }}
//           label="가장 길었던 일기"
//         />
//         <StatCard
//           value={{
//             number: (
//               <>
//                 <img
//                   src={mostEmotionEmoji}
//                   alt="emotion"
//                   width={60}
//                   height={60}
//                   style={{ marginBottom: "-10px", marginRight: "4px" }}
//                 />
//                 {percent}
//               </>
//             ),
//             unit: "%",
//           }}
//           label="가장 많이 나타난 감정"
//         />
//         <ChartBox>
//           <EmotionPieChart data={emotionCounts} />
//         </ChartBox>

//         <StatCard
//           value={{ number: streakCount, unit: "회" }}
//           label="연속 작성 기록"
//         />
//         <StatCard
//           value={{ number: filtered.length, unit: "개" }}
//           label="작성한 일기 개수"
//         />

//         <BottomWrapper>
//           <ChartCard>
//             <ChartCardTitle>요일별 주요 감정</ChartCardTitle>
//             <WeekEmotionChart data={emotionPerWeek} />
//           </ChartCard>
//           <ChartCard>
//             <ChartCardTitle>요일별 일기 작성 횟수</ChartCardTitle>
//             <WeekDiaryCountChart data={diaryCountPerWeek} />
//           </ChartCard>
//         </BottomWrapper>
//       </Wrapper>
//     </Container>
//   );
// }

// export default EmotionStats;

import { useEffect, useState } from "react";
import StatCard from "../components/StatsComponent/StatCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/StatsComponent/CustomDatePicker.css";
import { ko } from "date-fns/locale";
import EmotionPieChart from "../components/StatsComponent/EmotionPieChart";
import WeekEmotionChart from "../components/StatsComponent/WeekEmotionChart";
import WeekDiaryCountChart from "../components/StatsComponent/WeekDiaryCountChart";
import { emotionMap, getEmotionInfo } from "../utils/emotionUtils";
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
import { format } from "date-fns";
import { fetchEmotionStats } from "../utils/statApi";
import type { EmotionPerWeek, DiaryCount, RawEmotionCount } from "../types/StatTypes";

function EmotionStats() {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo);
  const [endDate, setEndDate] = useState<Date | null>(today);

  const [longTxtLength, setLongTxtLength] = useState(0);
  const [emotionRatio, setEmotionRatio] = useState<
    { emotion: string; count: number }[]
  >([]);
  const [mostEmotion, setMostEmotion] = useState<{
    emotion: string;
    count: number;
  }>({
    emotion: "",
    count: 0,
  });
  const [streakCount, setStreakCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [emotionPerWeek, setEmotionPerWeek] = useState<EmotionPerWeek>({
    sun: { emotion: "", count: 0 },
    mon: { emotion: "", count: 0 },
    tue: { emotion: "", count: 0 },
    wed: { emotion: "", count: 0 },
    thu: { emotion: "", count: 0 },
    fri: { emotion: "", count: 0 },
    sat: { emotion: "", count: 0 },
  });
  const [diaryCountPerWeek, setDiaryCountPerWeek] = useState<DiaryCount[]>([]);

  const mostEmotionEmoji = getEmotionInfo(mostEmotion.emotion)?.emoji;
  const percent = emotionRatio.length
    ? Math.round(
        (mostEmotion.count /
          emotionRatio.reduce((acc, cur) => acc + cur.count, 0)) *
          100
      )
    : 0;

  useEffect(() => {
    const loadStats = async () => {
      if (!startDate || !endDate) return;

      const formattedStart = format(startDate, "yyyy-MM-dd");
      const formattedEnd = format(endDate, "yyyy-MM-dd");

      try {
        const { long, ratio, counts, emotionWeek, diaryWeek } =
          await fetchEmotionStats(formattedStart, formattedEnd);

        setLongTxtLength(long.data.longTxt);

        const emotionCounts = (
          ratio.data.emotionCounts as RawEmotionCount[]
        ).map((item) => ({
          emotion: emotionMap[item.emotion] ?? "normal",
          count: item.count,
        }));
        setEmotionRatio(emotionCounts);
        setMostEmotion(emotionCounts[ratio.data.mostIdx]);

        setTotalCount(counts.data.totalCount);
        setStreakCount(counts.data.streakCount);

        setEmotionPerWeek(emotionWeek.data);
        setDiaryCountPerWeek(diaryWeek.data);
      } catch (err) {
        console.error("통계 데이터 불러오기 실패:", err);
      }
    };

    loadStats();
  }, [startDate, endDate]);

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
          value={{ number: longTxtLength, unit: "자" }}
          label="가장 길었던 일기"
        />
        <StatCard
          value={{
            number: (
              <>
                {mostEmotionEmoji && (
                  <img
                    src={mostEmotionEmoji}
                    alt="emotion"
                    width={60}
                    height={60}
                    style={{ marginBottom: "-10px", marginRight: "4px" }}
                  />
                )}
                {percent}
              </>
            ),
            unit: "%",
          }}
          label="가장 많이 나타난 감정"
        />
        <ChartBox>
          <EmotionPieChart data={emotionRatio} />
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
