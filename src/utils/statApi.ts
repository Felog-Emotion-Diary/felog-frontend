import axios from "axios";

export const fetchEmotionStats = async (start: string, end: string) => {
  const params = { startDate: start, endDate: end };
  const [long, ratio, counts, emotionWeek, diaryWeek] = await Promise.all([
    axios.get("/statistics/longTxt", { params }),
    axios.get("/statistics/emotionRatio", { params }),
    axios.get("/statistics/counts", { params }),
    axios.get("/statistics/emotionPerWeek", { params }),
    axios.get("/statistics/diaryCountPerWeek", { params }),
  ]);
  return { long, ratio, counts, emotionWeek, diaryWeek };
};
