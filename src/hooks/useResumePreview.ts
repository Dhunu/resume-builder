import { create } from "zustand";

interface ResumePreviewState {
  show: boolean;
  setShow: (open: boolean) => void;
}

const useResumePreview = create<ResumePreviewState>((set) => ({
  show: false,
  setShow: (show) => set({ show })
}));

export default useResumePreview;
