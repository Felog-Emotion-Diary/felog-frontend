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
// import Modal from "react-modal";
// import axios from "axios";
// import { endOfMonth, format, startOfMonth } from "date-fns";

function MainPage() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [emotionStats, setEmotionStats] = useState(MainEmotionStats([]));
  //const [userNickname, setUserNickname] = useState("");

  /* 로컬 스토리지 확인용 */
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

  /* 백엔드 연동 로직 */
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const email = localStorage.getItem("email");
  //       if (!email) {
  //         console.error("이메일 정보가 없습니다.");
  //         return;
  //       }

  //       const userRes = await axios.get(`http://localhost:5000/user/${email}`);
  //       setUserNickname(userRes.data.nickname);

  //       const today = new Date();
  //       const startDate = format(startOfMonth(today), "yyyy-MM-dd");
  //       const endDate = format(endOfMonth(today), "yyyy-MM-dd");

  //       const diaryRes = await axios.get(`http://localhost:5000/diaries`, {
  //         params: { startDate, endDate },
  //       });

  //       const entries: DiaryEntry[] = diaryRes.data;
  //       const validEntries = entries.filter(
  //         (entry) => entry.date && entry.emotion
  //       );
  //       setDiaryEntries(validEntries);

  //       const dates = validEntries.map((entry) => entry.date);
  //       setStreakCount(calculateStreak(dates));
  //       setEmotionStats(MainEmotionStats(validEntries));
  //     } catch (err) {
  //       console.error("데이터 불러오기 실패:", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <MainPageStyle>
      <MainContentWrapper>
        <CalendarWrapper>
          <DiaryCalendar entries={diaryEntries} />
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
