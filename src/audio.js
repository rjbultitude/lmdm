import Voice from "./VoiceClass.js";

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

export function stopNote(noteId) {
  activeVoices[noteId].stop();
  delete activeVoices[noteId];
}

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  Object.keys(activeVoices).forEach((activeVoiceKey)=> {
    activeVoices[activeVoiceKey].stop();
    delete activeVoices[activeVoiceKey];
  });
});