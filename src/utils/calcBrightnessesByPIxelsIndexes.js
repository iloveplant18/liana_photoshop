import calcBrightness from "./calcBrightness.js";

function calcBrightnessesByPixelsIndexes(data, indexes) {
    const validatedIndexes = indexes.filter(i => i != null);
    return validatedIndexes.map(i => calcBrightness(data[i], data[i+1], data[i+2])) ?? [];
}

export default calcBrightnessesByPixelsIndexes;