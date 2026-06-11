import { SUSTAIN, ONE_SHOT } from "../constants.js";
import state from "../state.js";

export default function initPlayModeControls() {
  const playModeToggle = document.getElementById("input-play-mode");
  playModeToggle.addEventListener("change", function(e) {
    const isChecked = e.target.checked;
    if (isChecked) {
      state.playMode = ONE_SHOT;
      return;
    }
    state.playMode = SUSTAIN;
  });
}