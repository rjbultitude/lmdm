import { createColumns } from "./keyboardInterface.js";
import { initColourSelect } from "./colourSelect.js";
import initGridSizeSelect from "./gridSelect.js";
import initFrequencyInput from "./frequencyInput.js";

// Generate keyboard interface and bind click events
//TODO do wer still need this callback?
const doneCallbackArr = [initColourSelect];
createColumns(doneCallbackArr);
initGridSizeSelect();
initFrequencyInput();