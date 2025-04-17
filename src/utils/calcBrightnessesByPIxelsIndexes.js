import calcBrightness from "./calcBrightness.js";

function calcBrightnessesByPixelsIndexes(data, indexes) {
    return indexes.map(i => calcBrightness(data[i], data[i+1], data[i+2])) ?? [];
}

export default calcBrightnessesByPixelsIndexes;