import usePixelsOperationHandler from "./usePixelsOperationHandler.js";
import calcBrightness from "@/utils/calcBrightness.js";

function useSaltPepper(probability) {
    return usePixelsOperationHandler((data, i) => {
        if (Math.random() < probability) {
            const brightness = calcBrightness(data[i], data[i + 1], data[i + 2]);
            if (brightness > 127) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
            } else {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
            }
        }
    })
}

export default useSaltPepper;