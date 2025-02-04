const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
let connected = false;
let index = 0;
let startOsc = false;

// define audio context
const context = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = context.createOscillator();
let myInterval;

function playSine(freq) {
  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  oscillator.connect(context.destination);
  connected = true;
}

function playSineCb(scale) {
  console.log(scale[index]);
  playSine(scale[index]);
  if (index >= scale.length - 1) {
    index = 0;
  } else {
    index++;
  }
}

function stop() {
  oscillator.disconnect(context.destination);
  connected = false;
  clearInterval(myInterval);
}

function play(scale, noteLength) {
  playSineCb(scale);
  myInterval = setInterval(function() {
    playSineCb(scale);
  }, noteLength || 300);
}

playBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (!startOsc) {
    oscillator.start();
    startOsc = true;
  }
  if (!connected) {
    play(scaleFrequencies, 500);
  }
  console.log('connected', connected);
});

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (connected) {
    stop();
  }
  console.log('connected', connected);
});