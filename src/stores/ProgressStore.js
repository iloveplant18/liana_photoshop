import { create } from "zustand"

const useProgressStore = create((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
}))

export default useProgressStore;