import { AUDIO_CONFIG } from "./constants.js";

const stopBtn = document.getElementById("stop");
const smoothingInterval = 0.02;
let contextNotSet = true;
let audioContext;
let oscillator;
let gainNode;

function setAudioContext() {
  // define audio context
  audioContext = new AudioContext();
  // the "volume control" in our chain:
  gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  
  // the "signal" in our chain:
  oscillator = audioContext.createOscillator();
  oscillator.frequency.value = AUDIO_CONFIG.ROOT_NOTE;
  oscillator.type = 'sine';
  oscillator.connect(gainNode);
  oscillator.start();
  contextNotSet = false;
}

export function playNote(frequency) {
  if (contextNotSet) {
    setAudioContext();
  }
  const now = audioContext.currentTime;
  oscillator.frequency.value = frequency;
  gainNode.gain.setTargetAtTime(AUDIO_CONFIG.MAX_VOLUME, now, smoothingInterval);
  return;
};

stopBtn.addEventListener('click', function(e) {
  const now = audioContext.currentTime;
  e.preventDefault();
  gainNode.gain.setTargetAtTime(0, now, smoothingInterval);
  startOsc = false;
});