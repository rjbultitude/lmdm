import { AUDIO_CONFIG } from "../constants.js";

export default class Voice {
  constructor(context, freq) {
    this.frequency = freq || AUDIO_CONFIG.ROOT_NOTE;
    this.context = context;
    this.now = context.currentTime;
    this.volume = AUDIO_CONFIG.MAX_VOLUME;
    this.vca = new GainNode(this.context, {
      gain: 0
    })
    this.vco = new OscillatorNode(this.context, {
      type: AUDIO_CONFIG.WAVE_TYPE,
      frequency: this.frequency
    });
    
  }
  start(volume) {
    this.volume = volume ?? AUDIO_CONFIG.MAX_VOLUME;
    /* connect osciallator to gain */
    this.vco.connect(this.vca);
    /* connect gain to destination */
    this.vca.connect(this.context.destination);
    /* ADSR */
    this.vca.gain.setTargetAtTime(this.volume, this.now, AUDIO_CONFIG.SMOOTHING_INTERVAL);
    this.vco.start(0);
  }

  stop() {
    const stopTime = this.now + (AUDIO_CONFIG.SMOOTHING_INTERVAL * 10);
    this.vca.gain.cancelScheduledValues(this.now);
    this.vca.gain.setValueAtTime(this.vca.gain.value, this.now);
    this.vca.gain.setTargetAtTime(0, this.now, AUDIO_CONFIG.SMOOTHING_INTERVAL);
    this.vco.stop(stopTime);
  }
  update(newFrequency) {
    this.frequency = newFrequency;
    this.vco.frequency.value = newFrequency;
  }
}