import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthState {
  token: string | null;
  setToken: (token: string) => void;
}

export const AuthStore = create<IAuthState>()(
  persist((set) => ({
    token: null,
    setToken: (token) => set({ token }),
  }),
    {
      name: 'Authorization'
    }
  )
)
