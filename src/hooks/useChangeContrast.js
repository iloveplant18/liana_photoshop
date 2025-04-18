import { useEffect } from "react";
import useImageStore from "@/stores/ImageStore.js";
import useProgressStore from "@/stores/ProgressStore.js";
import { chunkSize } from "@/utils/consts.js";

function useChangeContrast(level) {
    const originalImageData = useImageStore((store) => store.originalImageData);
    const setImageData = useImageStore((store) => store.setImageData);
    const setProgress = useProgressStore((store) => store.setProgress);

    useEffect(() => {
        if (!originalImageData) return;

        const data = structuredClone(originalImageData.data);
        let i = 0;
        const percentInPixels = data.length / 100;

        if (level === 0) {
            setImageData(new ImageData(data, originalImageData.width, originalImageData.height));
            return;
        }

        const contrastFactor = (259 * (level + 255)) / (255 * (259 - level));

        const applyContrast = () => {
            const end = Math.min(data.length, i + chunkSize);
            for (; i < end; i += 4) {
                data[i]     = Math.min(255, Math.max(0, contrastFactor * (data[i] - 128) + 128));
                data[i + 1] = Math.min(255, Math.max(0, contrastFactor * (data[i + 1] - 128) + 128));
                data[i + 2] = Math.min(255, Math.max(0, contrastFactor * (data[i + 2] - 128) + 128));
            }

            if (i < data.length) {
                setProgress(Math.round(i / percentInPixels));
                requestIdleCallback(applyContrast);
            } else {
                setProgress(0);
                setImageData(new ImageData(data, originalImageData.width, originalImageData.height));
            }
        };

        applyContrast();
    }, [level]);
}

export default useChangeContrast;
