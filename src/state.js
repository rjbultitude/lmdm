import { AUDIO_CONFIG, GRID_SIZE, ONE_SHOT, LOWEST_NOTE } from "./constants.js";

const state = {
  audioContext: null,
  baseFrequency: AUDIO_CONFIG.ROOT_NOTE,
  activeVoices: {},
  gridSize: GRID_SIZE,
  colourScheme: "gra",
  playMode: ONE_SHOT,
  MIDINotSupported: false,
  intervalsRange: {
    upper: LOWEST_NOTE + (GRID_SIZE * GRID_SIZE),
    lower: LOWEST_NOTE
  }
}
export default state;