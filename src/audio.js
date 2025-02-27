import { AUDIO_CONFIG } from "./constants.js";
import Voice from "VoiceClass.js";

const stopBtn = document.getElementById("stop");
let contextNotSet = true;
let audioContext;
let activeVoices = {};

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
  activeVoices[noteId] = thisVoice;
  thisVoice.start();
};

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  activeVoices[noteId].stop();
  delete activeVoices[noteId];
  startOsc = false;
});