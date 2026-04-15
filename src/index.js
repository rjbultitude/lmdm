import { createColumns } from "./keyboard/keyboardInterface.js";
import { initColourSelect } from "./colourSchemes/colourSelect.js";
import initGridSizeSelect from "./keyboard/gridSelect.js";
import initFrequencyInput from "./audio/frequencyInput.js";
import { initMIDIAccess } from "./keyboard/midi-keyboard.js";
import { initSidebarControls } from "./ui/sidebar.js";
import { initToast } from "./ui/toast.js";
//import { initCanvas } from "./visual/lissajous.js";

// Generate keyboard interface and bind click events
//TODO do we still need this callback?
createColumns();
initColourSelect();
initGridSizeSelect();
initFrequencyInput();
initMIDIAccess();
initSidebarControls();
initToast();
//initCanvas();