import { create } from "zustand";

interface IBackgroundColorState {
  background: string;
  setBackground: (bg: string) => void;
  reset: () => void;
}

type TBackgroundState = {
  background: string
}

const initialState: TBackgroundState = {
  background: '#fff9e3',
}

export const backgroundStore = create<IBackgroundColorState>()((set) => ({
  ...initialState,
  setBackground: (bg: string) => {
    set({ background: bg })
  },
  reset: () => {
    set(initialState)
  }
}))

