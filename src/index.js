import { createColumns } from "./keyboard/keyboardInterface.js";
import { initColourSelect } from "./colourSchemes/colourSelect.js";
import initGridSizeSelect from "./keyboard/gridSelect.js";
import initFrequencyInput from "./audio/frequencyInput.js";
import { setAudioContext } from "./audio/audio.js";
import { initMIDIAccess } from "./keyboard/midi-keyboard.js";
import { initSidebarControls } from "./ui/sidebar.js";
import { initUnlockMidi } from './ui/unlock-toast.js';
import { initToast } from "./ui/error-toast.js";
//import { initCanvas } from "./visual/lissajous.js";

// Generate keyboard interface and bind click events
//TODO do we still need this callback?
createColumns();
initColourSelect();
initToast();
initUnlockMidi();
initGridSizeSelect();
initFrequencyInput();
setAudioContext()
initMIDIAccess();
initSidebarControls();
//initCanvas();