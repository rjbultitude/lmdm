import { AUDIO_CONFIG } from "../constants.js";

export default class Voice {
  constructor(context) {
    this.context = context;
    this.ratio = null;
    this.now = context.currentTime;
    this.volume = AUDIO_CONFIG.MAX_VOLUME;
    this.vca = new GainNode(this.context, {
      gain: 0
    })
    this.vco = new OscillatorNode(this.context, {
      type: AUDIO_CONFIG.WAVE_TYPE
    });
    /* connect osciallator to gain */
    this.vco.connect(this.vca);
    /* connect gain to destination */
    this.vca.connect(this.context.destination);
    /*  start the oscillator immediately
        since we're using an audio pool */
    this.vco.start(0);
  }

  updateRatio(ratio) {
    this.ratio = ratio;
  }

  start(frequency, volume) {
    this.volume = volume ?? AUDIO_CONFIG.MAX_VOLUME;
    /* set the frequency */
    this.vco.frequency.setTargetAtTime(frequency, this.context.currentTime, 0.001);;
    /* ADSR */
    this.vca.gain.setTargetAtTime(this.volume, this.now, AUDIO_CONFIG.SMOOTHING_INTERVAL);
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