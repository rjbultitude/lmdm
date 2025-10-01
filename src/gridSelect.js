import { recreateColumns } from "./keyboardInterface.js";
import state from "./state.js";

export default function initGridSizeSelect() {
  const inputGrid = document.getElementById("input-grid-size");
  inputGrid.addEventListener("change", function() {
    const gridSizeNum = parseInt(inputGrid.value.split(" ")[0]);
    if (state.gridSize !== gridSizeNum) {
      state.gridSize = gridSizeNum;
      recreateColumns();
    }
  });
}