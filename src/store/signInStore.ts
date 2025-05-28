import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OverlayState {
  isLogin: boolean;
  setIsLogin: () => void;
}

export const overlayStore = create(persist<OverlayState>((set) => ({
  isLogin: false,
  setIsLogin: () => set((state) => ({ isLogin: !state.isLogin }))
}), { name: 'overlay-store' }))
