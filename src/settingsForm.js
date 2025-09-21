import state from "./state.js";
import { updateActiveVoices } from "./audio.js";
import { recreateColumns } from "./keyboardInterface.js";

export default function initSettingsForm() {
  const form = document.getElementById("keyboard-settings-form");
  const inputFreq = document.getElementById("input-base-frequency");
  const inputGrid = document.getElementById("input-grid-size");
  const submit = document.getElementById("keyboard-settings-submit");
  const baseFreqStr = parseInt(state.baseFrequency);
  inputFreq.value = baseFreqStr;
  form.addEventListener("submit", function(e) {
    event.preventDefault();
  });
  submit.addEventListener("click", function() {
    // Pitch of all notes
    if (state.baseFrequency !== inputFreq.value) {
      console.debug("no change in frequency");
      state.baseFrequency = inputFreq.value;
      updateActiveVoices();
    }
    // Grid size
    const gridSizeNum = parseInt(inputGrid.value.split(" ")[0]);
    if (state.gridSize !== gridSizeNum) {
      console.debug("no change in grid size");
      state.gridSize = gridSizeNum;
      recreateColumns();
    }
  });
}