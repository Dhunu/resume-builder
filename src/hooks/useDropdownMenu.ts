import { create } from "zustand";

interface DropdownMenuState {
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

const useDropdownMenu = create<DropdownMenuState>()((set) => ({
  dropdownOpen: false,
  setDropdownOpen: (dropdownOpen) => set({ dropdownOpen })
}));

export default useDropdownMenu;
