import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarCustom.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { emotionMap } from "../../utils/emotionUtils";
import type { DiaryEntry } from "../../types/DiaryEntry";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const emotionColors: Record<string, string> = {
  happy: "emotion-happy",
  sad: "emotion-sad",
  angry: "emotion-angry",
  anxious: "emotion-anxious",
  calm: "emotion-calm",
  neutral: "emotion-neutral",
  love: "emotion-love",
};

function DiaryCalendar({ entries }: { entries: DiaryEntry[] }) {
  const navigate = useNavigate();
  const [value, setValue] = useState<Value>(new Date());
  const [diaryData, setDiaryData] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const mapped: Record<string, string> = {};
    entries.forEach(({ date, emotion }) => {
      const englishEmotion = emotionMap[emotion] ?? emotion; 
      if (date && englishEmotion) {
        mapped[date] = englishEmotion;
      } else {
        console.warn(`emotion 변환 실패: ${emotion}`);
      }
    });
    setDiaryData(mapped);
  }, [entries]);

  const moveToDiary = (date: Date) => {
    const today = new Date();
    const selectedDate = new Date(format(date, "yyyy-MM-dd")); 

    if (selectedDate > today) {
      return;
    }
    const formattedDate = format(date, "yyyy-MM-dd");
    if (diaryData[formattedDate]) {
      navigate(`/`);
    } else {
      navigate(`/write?date=${formattedDate}`);
    }
  };

  return (
    <div>
      <Calendar
        onClickDay={(value) => moveToDiary(value)}
        onChange={setValue}
        value={value}
        showNeighboringMonth={false}
        locale="ko-KO"
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) => format(date, "d")}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const dateStr = format(date, "yyyy-MM-dd");
            const emotion = diaryData[dateStr];
            if (emotion) {
              return emotionColors[emotion];
            }
          }
          return null;
        }}
      />
    </div>
  );
}

export default DiaryCalendar;
