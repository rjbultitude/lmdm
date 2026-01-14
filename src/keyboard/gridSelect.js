import { recreateColumns } from "./keyboardInterface.js";
import state from "../state.js";

const GRID_STR = "grid";

function getGridSizeValue(inputGrid) {
  return parseInt(inputGrid.value.split(" ")[0]);
}

export default function initGridSizeSelect() {
  const inputGrid = document.getElementById("input-grid-size");
  const gridContainer = document.getElementById("main");
  gridContainer.className = `${GRID_STR}-${getGridSizeValue(inputGrid)}`;
  inputGrid.addEventListener("change", function() {
    const gridSizeNum = getGridSizeValue(inputGrid);
    if (state.gridSize !== gridSizeNum) {
      state.gridSize = gridSizeNum;
      recreateColumns();
      gridContainer.className = `${GRID_STR}-${gridSizeNum}`;
    }
  });
}