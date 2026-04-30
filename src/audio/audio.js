import VoiceManager from "./VoiceManager.js";
import { resetPlaying, clearNoteDataUi } from "../keyboard/keyboardInterface.js";
import state from "../state.js";
import { getNote } from "./noteFunctions.js";
import { AUDIO_CONFIG } from "../constants.js";

const stopBtn = document.getElementById("stop");
let contextNotSet = true;
let noVoicePool = true;

export function setAudioContext() {
  state.audioContext = new AudioContext();
  contextNotSet = false;
}

export function createVoicePool() {
  if (!state.audioContext) {
    console.debug("no audio contexr set yet")
    setAudioContext()
  }
  const Voices = new VoiceManager(state.audioContext);
  state.voiceManager = Voices;
  noVoicePool = false;
}

// export function createVoice(frequency) {
//   const thisVoice = new Voice(audioContext, frequency);
//   return thisVoice;
// }

function getThisVoiceVolume(numActiveVoices) {
  const thisVolume = AUDIO_CONFIG.MAX_VOLUME - (0.05 * numActiveVoices);
  if (thisVolume < AUDIO_CONFIG.MIN_VOLUME) return AUDIO_CONFIG.MIN_VOLUME;
  return thisVolume;
}

export function playNote(noteId, frequency, ratio) {
  if (contextNotSet) {
    setAudioContext();
  }
  if (noVoicePool) {
    createVoicePool();
  }
  const thisVoice = state.voiceManager.noteOn(noteId, frequency, ratio);
  const newVoiceObj = {
    voice: null,
    ratio: null,
  };
  state.activeVoices[noteId] = newVoiceObj;
  state.activeVoices[noteId].voice = thisVoice;
  // TODO move to VoiceManager
  //const numActiveVoices = Object.keys(state.activeVoices).length;
  //const thisVoiceVolume = getThisVoiceVolume(numActiveVoices);
};

export function stopNote(noteId, frequency) {
  state.voiceManager.noteOff(noteId, frequency);
}

export function updateActiveVoices() {
  state.voiceManager.activeVoices.forEach((voice, key) => {
    const newNote = getNote({ rootNote: state.baseFrequency, ratio: voice.ratio });
    voice.update(newNote);
  });
}

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  Object.keys(state.activeVoices).forEach((activeVoiceKey) => {
    stopNote(activeVoiceKey);
    resetPlaying(activeVoiceKey);
    clearNoteDataUi();
  });
});