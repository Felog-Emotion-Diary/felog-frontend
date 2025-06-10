import { create } from "zustand";
import type { IPost } from "../components/weekGroupedComponent/weekGrouped";

interface IModalState {
  isOpen: boolean;
  data: IPost | null;
  setData: (data: IPost) => void;
  setModalOpen: () => void;
  setModalClose: () => void;
}

export const ModalStore = create<IModalState>((set) => ({
  isOpen: false,
  data: null,
  setData: (data) => set({ data: data }),
  setModalOpen: () => set({ isOpen: true }),
  setModalClose: () => set({ isOpen: false }),
}))
