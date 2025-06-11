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
import { endOfMonth, format, startOfMonth } from "date-fns";
import { axiosInstance } from "../utils/axiosInstance";
import dayjs from "dayjs";

function MainPage() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [emotionStats, setEmotionStats] = useState(MainEmotionStats([]));
  const [userNickname, setUserNickname] = useState("");

  useEffect(() => {
    fetchUserNickname();
    fetchDiaries();
  }, []);

  const fetchUserNickname = async () => {
    try {
      const userRes = await axiosInstance.get("/api/users/userInfo");
      console.log("유저 응답 데이터:", userRes);
      setUserNickname(userRes.data.nickname);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("유저 정보 불러오기 실패:", err.message);
      }
      console.error("전체 에러 객체:", err);
    }
  };

  const fetchDiaries = async () => {
    try {
      const today = new Date();
      const startDate = format(startOfMonth(today), "yyyy-MM-dd");
      const endDate = format(endOfMonth(today), "yyyy-MM-dd");

      const diaryRes = await axiosInstance.get(`/api/diaries/`, {
        params: { startDate, endDate },
      });

      const entries: DiaryEntry[] = diaryRes.data;
      const validEntries = entries.filter(
        (entry) => entry.date && entry.emotion
      );

      const dates = validEntries.map((entry) =>
        dayjs(entry.date).format("YYYY-MM-DD")
      );

      setDiaryEntries(validEntries);
      setStreakCount(calculateStreak(dates));
      setEmotionStats(MainEmotionStats(validEntries));
    } catch (err) {
      console.error("일기 데이터 불러오기 실패:", err);
    }
  };

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
