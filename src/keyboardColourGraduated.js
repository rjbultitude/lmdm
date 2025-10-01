import state from "./state.js";

const colourGradientArr = generateGradientArray();

export function generateHSLFromNumber(i, j) {
  const totalGridSize = state.gridSize * state.gridSize;
  const increment = i * j / totalGridSize;
  const hue = 0 + increment * 240; // 0° (red) → 240° (blue)
  const saturation = 100;            // full spectrum
  const lightness = 50;              // mid brightness
  return {
    hue, saturation, lightness
  };
}

export function generateGradientArray() {
  const colorGradientArr = [];
  // use lambdome arrays as model
  for (let i = 0; i < state.gridSize; i++) {
    const colorGradientChildArr = [];
    for (let j = 0; j < state.gridSize; j++) {
      const newColour = generateHSLFromNumber(i, j);
      colorGradientChildArr.push(newColour);
    }
    colorGradientArr.push(colorGradientChildArr);
  }
  return colorGradientArr;
}

// Graduated overlay
export function getColourGraduated(ratio, _colourGradientArr = colourGradientArr) {
  /* make an array of colours
     starting at the lowest
     and apply it to the matrix array
     to set the color */
  const column = ratio.column;
  const row = ratio.row;
  return _colourGradientArr[column][row];
}
