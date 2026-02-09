import { AUDIO_CONFIG, GRID_SIZE, ONE_SHOT } from "./constants.js";

const state = {
  baseFrequency: AUDIO_CONFIG.ROOT_NOTE,
  activeVoices: {},
  gridSize: GRID_SIZE,
  colourScheme: "gra",
  playMode: ONE_SHOT,
  MIDINotSupported: false,
  intervalsRange: {
    upper: GRID_SIZE,
    lower: 0
  }
}
export default state;