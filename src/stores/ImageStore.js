import { create } from "zustand"

const ImageStore = create((set) => ({
    image: null,
    setImage: (newImage) => set({ image: newImage }),
}))

export default ImageStore
