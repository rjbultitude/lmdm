import Voice from "./VoiceClass.js";
import { resetPlaying } from "./keyboardInterface.js";
import state from "./state.js";
import { getNote } from "./noteFunctions.js";

const stopBtn = document.getElementById("stop");
let contextNotSet = true;
let audioContext;

function setAudioContext() {
  audioContext = new AudioContext();
}

export function createVoice(frequency) {
  const thisVoice = new Voice(audioContext, frequency);
  return thisVoice;
}

export function playNote(noteId, frequency) {
  if (contextNotSet) {
    setAudioContext();
  }
  const thisVoice = createVoice(frequency);
  const newVoiceObj = {
    voice: null,
    ratio: null,
  };
  state.activeVoices[noteId] = newVoiceObj;
  state.activeVoices[noteId].voice = thisVoice;
  thisVoice.start();
};

export function stopNote(noteId) {
  state.activeVoices[noteId].voice.stop();
  delete state.activeVoices[noteId];
}

export function updateActiveVoices() {
  Object.keys(state.activeVoices).forEach((activeVoiceKey) => {
    const activeVoiceRatio = state.activeVoices[activeVoiceKey].ratio;
    const newNote = getNote({ rootNote: state.baseFrequency, ratio: activeVoiceRatio });
    state.activeVoices[activeVoiceKey].voice.update(newNote);
  });
}

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  Object.keys(state.activeVoices).forEach((activeVoiceKey) => {
    stopNote(activeVoiceKey);
    resetPlaying(activeVoiceKey);
  });
});