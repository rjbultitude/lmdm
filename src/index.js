import { createColumns } from "./keyboardInterface.js";
import { initColourSelect } from "./colourSelect.js";
import initSettingForm from "./settingsForm.js";

// Generate keyboard interface and bind click events
const doneCallbackArr = [initColourSelect];
createColumns(doneCallbackArr);
initSettingForm();