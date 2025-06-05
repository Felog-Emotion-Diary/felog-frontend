import { useEffect, useState } from "react";
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

function MainPage() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [emotionStats, setEmotionStats] = useState(MainEmotionStats([]));
  const userNickname = "지은";

  useEffect(() => {
    const raw = localStorage.getItem("diaries");
    if (raw) {
      const parsed: DiaryEntry[] = JSON.parse(raw);
      const validEntries = parsed.filter((entry) => entry.date && entry.emotion);

      setDiaryEntries(validEntries);

      const dates = validEntries.map((entry) => entry.date);
      setStreakCount(calculateStreak(dates));
      setEmotionStats(MainEmotionStats(validEntries));
    }
  }, []);

  return (
    <MainPageStyle>
      <MainContentWrapper>
        <CalendarWrapper>
          <DiaryCalendar entries={diaryEntries}/>
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
