import { axiosInstance } from "./axiosInstance";

export const fetchEmotionStats = async (start: string, end: string) => {
  const params = { startDate: start, endDate: end };
  const [long, ratio, counts, emotionWeek, diaryWeek] = await Promise.all([
    axiosInstance.get("/api/statistics/longTxt", { params }),
    axiosInstance.get("/api/statistics/emotionRatio", { params }),
    axiosInstance.get("/api/statistics/counts", { params }),
    axiosInstance.get("/api/statistics/emotionPerWeek", { params }),
    axiosInstance.get("/api/statistics/diaryCountPerWeek", { params }),
  ]);
  return { long, ratio, counts, emotionWeek, diaryWeek };
};
