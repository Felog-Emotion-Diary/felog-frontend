import dayjs from "dayjs";

const calculateStreak = (diaryDates: string[]): number => {
  const today = dayjs().subtract(1, "day");

  let streak = 0;

  for (let i = 0; i < 100; i++) {
    const date = today.subtract(i, "day").format("YYYY-MM-DD");
    
    if (diaryDates.includes(date)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

export default calculateStreak;
