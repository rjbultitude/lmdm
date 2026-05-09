import { createColumns } from "./keyboard/keyboardInterface.js";
import { initColourSelect } from "./colourSchemes/colourSelect.js";
import initGridSizeSelect from "./keyboard/gridSelect.js";
import initFrequencyInput from "./audio/frequencyInput.js";
import { initMIDIAccess } from "./keyboard/midi-keyboard.js";
import { initSidebarControls } from "./ui/sidebar.js";
import { initToast } from "./ui/error-toast.js";
import { initAudioContext, createVoicePool } from "./audio/audio.js";

//import { initCanvas } from "./visual/lissajous.js";
createColumns();
initColourSelect();
initToast();
initGridSizeSelect();
initFrequencyInput();
initAudioContext();
createVoicePool();
initMIDIAccess();
initSidebarControls();

//initCanvas();

console.debug("v1.9.9");