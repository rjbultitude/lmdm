import { AUDIO_CONFIG, GRID_SIZE, SUSTAIN } from "./constants.js";

const state = {
  audioContext: null,
  voiceManager: null,
  //keyClicked: false,
  baseFrequency: AUDIO_CONFIG.ROOT_NOTE,
  activeVoices: {},
  gridSize: GRID_SIZE,
  colourScheme: "gra",
  isPlaying: false,
  playMode: SUSTAIN,
  MIDINotSupported: false
}
export default state;