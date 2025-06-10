import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarCustom.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ModalStore } from "../../store/ModalStore";
import type { DiaryEntry } from "../../types/DiaryEntry";
import { emotionMapByCode } from "../../utils/emotionUtils";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const emotionColors: Record<string, string> = {
  기쁨: "emotion-happy",
  슬픔: "emotion-sad",
  분노: "emotion-angry",
  불안: "emotion-anxious",
  설렘: "emotion-love",
  무덤덤: "emotion-neutral",
  편안함: "emotion-calm",
};

function DiaryCalendar({ entries }: { entries: DiaryEntry[] }) {
  const navigate = useNavigate();
  const [value, setValue] = useState<Value>(new Date());
  const [diaryData, setDiaryData] = useState<Record<string, string>>({});

  useEffect(() => {
    const mapped: Record<string, string> = {};
    entries.forEach(({ date, emotion }) => {
      const emotionName =
        typeof emotion === "number" ? emotionMapByCode[emotion]?.name : emotion;

      const formattedDate = format(new Date(date), "yyyy-MM-dd");

      if (date && emotionName && emotionColors[emotionName]) {
        mapped[formattedDate] = emotionName;
      } else {
        console.warn(`emotion 변환 실패: ${emotion}`, date);
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
      navigate(`/main?date=${formattedDate}`);
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
