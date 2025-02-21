const stopBtn = document.getElementById("stop");
let connected = false;
let startOsc = false;

// define audio context
const context = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = context.createOscillator();
oscillator.type = 'sine';
oscillator.connect(context.destination);
connected = true;

// function stop() {
//   oscillator.disconnect(context.destination);
//   connected = false;
// }

export function playNote(frequency) {
  if (!startOsc) {
    oscillator.frequency.value = frequency;
    oscillator.start();
    startOsc = true;
  }
};

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (connected) {
    oscillator.stop();
  }
});