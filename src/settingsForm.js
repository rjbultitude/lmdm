import state from "./state.js";

export default function initSettingsForm() {
  const form = document.getElementById("keyboard-settings-form");
  const input = document.getElementById("input-base-frequency");
  const submit = document.getElementById("keyboard-settings-submit");
  const baseFreqStr = parseInt(state.baseFrequency);
  input.value = baseFreqStr;
  form.addEventListener("submit", function(e) {
    event.preventDefault();
  });
  submit.addEventListener("click", function() {
    state.baseFrequency = input.value;
  });
}