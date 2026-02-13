import { AUDIO_CONFIG } from "../constants.js";

export default class Voice {
  constructor(context, freq) {
    this.frequency = freq || AUDIO_CONFIG.ROOT_NOTE;
    this.context = context;
    this.oscillators = [];
    this.now = context.currentTime;
    this.vco = null;
    this.vca = null;
  }
  start(volume) {
    this.volume = volume ?? AUDIO_CONFIG.MAX_VOLUME;
    this.vco = this.context.createOscillator();
    this.vco.type = AUDIO_CONFIG.WAVE_TYPE;
    this.vco.frequency.value = this.frequency;

    /* VCA */
    this.vca = this.context.createGain();
    this.vca.gain.value = 0;

    /* connections */
    this.vco.connect(this.vca);
    this.vca.connect(this.context.destination);
    this.vca.gain.setTargetAtTime(this.volume, this.now, AUDIO_CONFIG.SMOOTHING_INTERVAL);
    this.vco.start(0);

    /* Keep track of the oscillators used */
    this.oscillators.push(this.vco);
    console.log("this.volume", this.volume);
  }

  stop() {
    this.oscillators.forEach((oscillator) => {
      const stopTime = this.now + (AUDIO_CONFIG.SMOOTHING_INTERVAL * 10);
      this.vca.gain.cancelScheduledValues(this.now);
      this.vca.gain.setValueAtTime(this.vca.gain.value, this.now);
      this.vca.gain.setTargetAtTime(0, this.now, AUDIO_CONFIG.SMOOTHING_INTERVAL);
      oscillator.stop(stopTime);
    });
  }
  update(newFrequency) {
    this.frequency = newFrequency;
    this.vco.frequency.value = newFrequency;
  }
}