import { AUDIO_CONFIG } from "./constants.js";

export default class Voice {
  constructor(context, freq) {
    this.frequency = freq || AUDIO_CONFIG.ROOT_NOTE;
    this.context = context;
    this.oscillators = [];
    this.now = context.currentTime;
    this.vco = null;
    this.vca = null;
  }
  start() {
    this.vco = this.context.createOscillator();
    this.vco.type = AUDIO_CONFIG.WAVE_TYPE;
    this.vco.frequency.value = this.frequency;

    /* VCA */
    this.vca = this.context.createGain();
    this.vca.gain.value = AUDIO_CONFIG.MAX_VOLUME;

    /* connections */
    this.vco.connect(this.vca);
    this.vca.connect(this.context.destination);
    this.vco.start(0);

    /* Keep track of the oscillators used */
    this.oscillators.push(this.vco);
  }

  stop() {
    this.oscillators.forEach((oscillator) => {
      this.vca.gain.setTargetAtTime(0, this.now, AUDIO_CONFIG.SMOOTHING_INTERVAL);
      oscillator.stop();
    });
  }
}