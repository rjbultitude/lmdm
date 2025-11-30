import { createColumns } from "./keyboard/keyboardInterface.js";
import { initColourSelect } from "./colourSchemes/colourSelect.js";
import initGridSizeSelect from "./keyboard/gridSelect.js";
import initFrequencyInput from "./audio/frequencyInput.js";

// Generate keyboard interface and bind click events
//TODO do wer still need this callback?
const doneCallbackArr = [initColourSelect];
createColumns(doneCallbackArr);
initGridSizeSelect();
initFrequencyInput();