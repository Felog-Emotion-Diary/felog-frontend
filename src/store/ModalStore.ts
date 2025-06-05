import { create } from "zustand";

interface IModalState {
  isOpen: boolean;
  setModalOpen: () => void;
  setModalClose: () => void;
}

export const ModalStore = create<IModalState>((set) => ({
  isOpen: false,
  setModalOpen: () => set({ isOpen: true }),
  setModalClose: () => set({ isOpen: false }),
}))
