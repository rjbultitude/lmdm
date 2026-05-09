import VoiceManager from "./VoiceManager.js";
import { resetPlaying, clearNoteDataUi } from "../keyboard/keyboardInterface.js";
import state from "../state.js";
import { getNote } from "./noteFunctions.js";
import { AUDIO_CONFIG } from "../constants.js";
import initUnlockAudio from '../ui/unlock-toast.js';
import { hideToastEl } from "../ui/ui-utils.js";

const stopBtn = document.getElementById("stop");
let contextNotSet = true;
let noVoicePool = true;

function removeKeyboardListners() {
  keyboardContainer.removeEventListener('mousedown', unlockAudio);
  keyboardContainer.removeEventListener('touchstart', unlockAudio);
}

const unlockAudio = async () => {
  if (state.audioContext.state === "suspended") {
    await state.audioContext.resume();
  }
  removeKeyboardListners();
  hideToastEl();
};

export function initAudioContext() {
  state.audioContext = new AudioContext();
  contextNotSet = false;
  initUnlockAudio();
  // Unintrusive solution
  const keyboardContainer = document.getElementById("main");
  keyboardContainer.addEventListener("mousedown", unlockAudio);
  keyboardContainer.addEventListener("touchstart", unlockAudio);
}

export function createVoicePool() {
  if (!state.audioContext) {
    console.debug("no audio context set yet")
    initAudioContext()
  }
  const Voices = new VoiceManager(state.audioContext);
  state.voiceManager = Voices;
  noVoicePool = false;
}

function getThisVoiceVolume(numActiveVoices) {
  const thisVolume = AUDIO_CONFIG.MAX_VOLUME - (0.05 * numActiveVoices.size);
  if (thisVolume < AUDIO_CONFIG.MIN_VOLUME) return AUDIO_CONFIG.MIN_VOLUME;
  return thisVolume;
}

export function playNote(noteId, frequency, ratio) {
  if (contextNotSet) {
    initAudioContext();
  }
  if (noVoicePool) {
    createVoicePool();
  }
  const volume = getThisVoiceVolume(state.voiceManager.activeVoices);
  const thisVoice = state.voiceManager.noteOn({noteId, frequency, volume, ratio});
};

export function stopNote(noteId) {
  state.voiceManager.noteOff(noteId);
}

/* Used for the root note form */
export function updateActiveVoices() {
  state.voiceManager.activeVoices.forEach((voice, key) => {
    const newNote = getNote({ rootNote: state.baseFrequency, ratio: voice.ratio });
    voice.update(newNote);
  });
}

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  state.voiceManager.activeVoices.forEach((__value, activeVoiceKey) => {
    stopNote(activeVoiceKey);
    resetPlaying(activeVoiceKey);
    clearNoteDataUi();
  });
});