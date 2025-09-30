import { AUDIO_CONFIG, GRID_SIZE, KEYBOARD_COLOURSCHEME_GRA } from "./constants.js";

const state = {
  baseFrequency: AUDIO_CONFIG.ROOT_NOTE,
  activeVoices: {},
  gridSize: GRID_SIZE,
  colourScheme: KEYBOARD_COLOURSCHEME_GRA,
}
export default state;