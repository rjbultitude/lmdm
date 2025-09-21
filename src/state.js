import { AUDIO_CONFIG, GRID_SIZE } from "./constants.js";

const state = {
  baseFrequency: AUDIO_CONFIG.ROOT_NOTE,
  activeVoices: {},
  gridSize: GRID_SIZE
}
export default state;