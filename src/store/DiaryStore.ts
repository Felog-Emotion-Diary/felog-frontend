import { create } from "zustand";

type DiaryStoreType = {
  hasTodayDiary: boolean;
  setHasTodayDiary: (hasDiary: boolean) => void;
};

export const useDiaryStore = create<DiaryStoreType>((set) => ({
  hasTodayDiary: false,
  setHasTodayDiary: (hasDiary) => set({ hasTodayDiary: hasDiary }),
}));
