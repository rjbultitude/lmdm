import { AUDIO_CONFIG } from "./constants.js";

export default class Voice {
  constructor(context, freq) {
    this.frequency = freq || AUDIO_CONFIG.ROOT_NOTE;
    this.context = context;
    this.oscillators = [];
    this.now = context.currentTime;
  }
  start() {
    const vco = this.context.createOscillator();
    vco.type = AUDIO_CONFIG.WAVE_TYPE;
    vco.frequency.value = this.frequency;

    /* VCA */
    const vca = this.context.createGain();
    vca.gain.value = AUDIO_CONFIG.MAX_VOLUME;

    /* connections */
    vco.connect(vca);
    vca.connect(this.context.destination);
    vco.start(0);

    /* Keep track of the oscillators used */
    this.oscillators.push(vco);
  }

  stop() {
    this.oscillators.forEach((oscillator) => {
      //vca.gain.setTargetAtTime(0, this.now, AUDIO_CONFIG.SMOOTHING_INTERVAL);
      oscillator.stop();
    });
  }
}