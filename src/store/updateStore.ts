import { create } from "zustand";
import type { IDiaryData } from "../components/diaryReadComponent/DiaryDataComponent";

interface IUpdateState {
  fetchedData: IDiaryData | null;
  setFetchedData: (fetchedData: IDiaryData | null) => void;
}

export const updateStore = create<IUpdateState>((set) => ({
  fetchedData: null,
  setFetchedData: (fetchedData) => set({ fetchedData: fetchedData })
}))
