import DiaryCalendar from "../components/mainComponent/calendar";
import EmotionSummary from "../components/mainComponent/EmotionSummary";
import RandomDiaryTab from "../components/mainComponent/RandomDiaryTab";
import StreakNotice from "../components/mainComponent/StreakNotice";
import {
  CalendarWrapper,
  MainContentWrapper,
  MainPageStyle,
  RightPanel,
} from "../style/MainPageStyle";
import type { DiaryEntry } from "../types/DiaryEntry";
import calculateStreak from "../utils/caculateStreak";
import { MainEmotionStats } from "../utils/MainEmotionStats";
import Modal from 'react-modal'

const diaryEntries: DiaryEntry[] = [
  { date: "2025-05-06", emotion: "happy" },
  { date: "2025-05-07", emotion: "anxious" },
  { date: "2025-05-08", emotion: "calm" },
  { date: "2025-05-09", emotion: "sad" },
  { date: "2025-05-10", emotion: "angry" },
];

const diaryDates = diaryEntries.map((entry) => entry.date);
const emotionStats = MainEmotionStats(diaryEntries);
const streakCount = calculateStreak(diaryDates);

function MainPage() {
  const userNickname = "지은";

  return (
    <MainPageStyle>
      <MainContentWrapper>
        <CalendarWrapper>
          <DiaryCalendar />
        </CalendarWrapper>
        <RightPanel>
          <StreakNotice nickname={userNickname} streak={streakCount} />
          <EmotionSummary stats={emotionStats} />
        </RightPanel>
      </MainContentWrapper>
      <RandomDiaryTab />
    </MainPageStyle>
  );
}

export default MainPage;
