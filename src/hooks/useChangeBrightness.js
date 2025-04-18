import { useEffect } from "react";
import useImageStore from "@/stores/ImageStore.js";
import useProgressStore from "@/stores/ProgressStore.js";
import { chunkSize } from "@/utils/consts.js";

function useChangeBrightness(level) {
    const originalImageData = useImageStore((store) => store.originalImageData);
    const setImageData = useImageStore((store) => store.setImageData);
    const setProgress = useProgressStore((store) => store.setProgress);

    useEffect(() => {
        if (!originalImageData) return;

        const data = structuredClone(originalImageData.data);
        let i = 0;
        const percentInPixels = data.length / 100;

        if (level === 0) {
            // Просто вернуть оригинал
            setImageData(new ImageData(data, originalImageData.width, originalImageData.height));
            return;
        }

        const applyBrightness = () => {
            const end = Math.min(data.length, i + chunkSize);
            for (; i < end; i += 4) {
                data[i]     = Math.min(255, Math.max(0, data[i] + level));
                data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + level));
                data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + level));
            }

            if (i < data.length) {
                setProgress(Math.round(i / percentInPixels));
                requestIdleCallback(applyBrightness);
            } else {
                setProgress(0);
                setImageData(new ImageData(data, originalImageData.width, originalImageData.height));
            }
        };

        applyBrightness();
    }, [level]);
}

export default useChangeBrightness;
