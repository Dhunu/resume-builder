import { create } from "zustand";

interface DropdownMenuState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useDropdownMenu = create<DropdownMenuState>()((set) => ({
  open: false,
  setOpen: (open) => set({ open })
}));

export default useDropdownMenu;
