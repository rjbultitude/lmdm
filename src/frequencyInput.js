import state from "./state.js";
import { updateActiveVoices } from "./audio.js";

export default function initFrequencyInput() {
  const form = document.getElementById("keyboard-settings-form");
  const inputFreq = document.getElementById("input-base-frequency");
  const submit = document.getElementById("keyboard-settings-submit");
  const baseFreqStr = parseInt(state.baseFrequency);
  inputFreq.value = baseFreqStr;
  form.addEventListener("submit", function(e) {
    event.preventDefault();
  });
  submit.addEventListener("click", function() {
    // Pitch of all notes
    if (state.baseFrequency !== inputFreq.value) {
      state.baseFrequency = inputFreq.value;
      updateActiveVoices();
    }
  });
}