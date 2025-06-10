import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarCustom.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ModalStore } from "../../store/ModalStore";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const diaryData: Record<string, string> = {
  "2025-05-06": "happy",
  "2025-05-07": "anxious",
  "2025-05-08": "calm",
  "2025-05-09": "sad",
  "2025-05-10": "angry",
}
const emotionColors: Record<string, string> = {
  happy: "emotion-happy",
  sad: "emotion-sad",
  angry: "emotion-angry",
  anxious: "emotion-anxious",
  calm: "emotion-calm",
  neutral: "emotion-neutral",
  love: "emotion-love",
};

function DiaryCalendar() {
  const navigate = useNavigate()
  const [value, setValue] = useState<Value>(new Date());
  const setModalOpen = ModalStore((state) => state.setModalOpen);
  const setData = ModalStore((state) => state.setData);

  const moveToDiary = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    if (diaryData[formattedDate]) {
    } else {
      navigate(`/write?date=${formattedDate}`);
    }
  }

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
