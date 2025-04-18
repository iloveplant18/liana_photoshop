import usePixelsOperationHandler from "./usePixelsOperationHandler.js";
import calcIndexesOfPixelsInSquare from "@/utils/calcIndexesOfPixelsInSquare.js";
import calcBrightnessesByPixelsIndexes from "@/utils/calcBrightnessesByPixelsIndexes.js";
import calcBrightness from "@/utils/calcBrightness.js";
import useImageStore from "@/stores/ImageStore.js";

function useLinearNoiseReducer() {
    const imageSize = useImageStore(store => store.size);

    const applyLinearNoiseReduce = usePixelsOperationHandler((data, i) => {
        const pixelsIndexes = calcIndexesOfPixelsInSquare(i, imageSize, 1);
        const currentBrightness = calcBrightness(data[i], data[i + 1], data[i + 2]);
        const mediumBrightness = calcMediumBrightness(data, pixelsIndexes);
        const diff = mediumBrightness - currentBrightness;

        data[i] = Math.min(Math.max(data[i] + diff, 0), 255);
        data[i + 1] = Math.min(Math.max(data[i + 1] + diff, 0), 255);
        data[i + 2] = Math.min(Math.max(data[i + 2] + diff, 0), 255);
    }, {
        chunkSize: 20_000,
    })

    return applyLinearNoiseReduce;
}

function calcMediumBrightness(data, pixelsIndexes) {
    const brightnesses = calcBrightnessesByPixelsIndexes(data, pixelsIndexes);
    if (brightnesses.length === 0) return 0;
    return brightnesses.reduce((accum, current) => accum + current) / brightnesses.length;
}

export default useLinearNoiseReducer;