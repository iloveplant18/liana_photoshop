import { create } from "zustand"

const useCanvas = create((set) => ({
    canvas: null,
    context: null,
    setCanvas: (canvas) => set(() => ({
        canvas: canvas
    })),
    setContext: (context) => set(() => ({
        context: context,
    }))
}))

export default useCanvas