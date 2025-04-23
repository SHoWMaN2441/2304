import { create } from "zustand";

interface GamburgerState {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const useGamburgerStore = create<GamburgerState>((set) => ({
  open: true, 
  setOpen: (value) => set({ open: value }),
}));

export default useGamburgerStore;
