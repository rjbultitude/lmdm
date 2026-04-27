import { AUDIO_CONFIG, GRID_SIZE, ONE_SHOT } from "./constants.js";

const state = {
  audioContext: null,
  voiceManager: null,
  baseFrequency: AUDIO_CONFIG.ROOT_NOTE,
  activeVoices: {},
  gridSize: GRID_SIZE,
  colourScheme: "gra",
  playMode: ONE_SHOT,
  MIDINotSupported: false
}
export default state;