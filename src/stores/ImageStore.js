import {create} from "zustand"

const useImageStore = create((set) => ({
  image: null,
  imageData: null,
  name: null,
  extension: null,
  size: {width: 0, height: 0},
  prevStep: null,
  setImage: (newImage) => set({image: newImage}),
  setImageData: (imageData, prevStep) => {
    set((state) => {
      if (prevStep === undefined) {
        prevStep = structuredClone(state.imageData)
      }
      return { imageData, prevStep }
    })
  },
  setOriginalImageData: (data) => set({ originalImageData: data }),
  setImageName: (newImageName) => set({name: newImageName}),
  setExtension: (newExtension) => set({extension: newExtension}),
  setSize: (newSize) => set({size: newSize}),
}))

export default useImageStore
