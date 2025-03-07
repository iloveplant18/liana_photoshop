import {create} from "zustand"

const useImageStore = create((set) => ({
  image: null,
  name: null,
  extension: null,
  size: { width: 0, height: 0 },
  setImage: (newImage) => set({image: newImage}),
  setImageName: (newImageName) => set({name: newImageName}),
  setExtension: (newExtension) => set({extension: newExtension}),
  setSize: (newSize) => set({size: newSize}),
}))

export default useImageStore
