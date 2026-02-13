import state from "../state.js";

const colourGradientArr = generateGradientArray();

export function generateHSLFromNumber(i, j) {
  // highest j inside lowest i is lowest note
  // lowest j inside highest i is highest note
  // when in i 1 gridSize is number of notes
  const columnNum = i + 1;
  const rowNum = j + 1;
  const totalGridSize = state.gridSize * state.gridSize;
  const hueIncrement = columnNum * rowNum / totalGridSize;
  const hue = 0 + hueIncrement * 360;
  const saturation = 70;
  const lightnessIncrement = columnNum * rowNum / totalGridSize;
  const lightness = 60 + lightnessIncrement; //70 max
  return {
    hue, saturation, lightness
  };
}

export function generateGradientArray() {
  const colorGradientArr = [];
  // use lambdome arrays as model
  for (let i = 0; i < state.gridSize; i++) {
    const colorGradientChildArr = [];
    for (let j = state.gridSize; j > 0; j--) {
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
  console.debug("ratio", ratio);
  return _colourGradientArr[column][row];
}
