import { create } from "zustand";

interface IBackgroundColorState {
  background: string;
  setBackground: (bg: string) => void;
}

export const backgroundStore = create<IBackgroundColorState>((set) => ({
  background: '#fff9e3',
  setBackground: (bg) => set({ background: bg })
}))

