import Voice from "./VoiceClass.js";

/* This approach js based on uninque frequencies 
   Given that mutiple buttons play the same note this won't work */
export default class VoiceManager {
    constructor(context, poolSize = 32) {
        this.freeVoices = [];
        this.activeVoices = new Map(); // Key: Frequency, Value: Voice Object

        for (let i = 0; i < poolSize; i++) {
            const voice = new Voice(context);
            this.freeVoices.push(voice);
        }
    }

    noteOn({noteId, frequency, ratio, volume}) {
        // 1. Don't play the same frequency twice
        const sameFreqTrue = this.activeVoices.values().some((activeVoice) => {
            const voiceFreq = activeVoice.vco.frequency.value;
            return voiceFreq === frequency;
        });
        if (sameFreqTrue) return;

        // 2. Get a voice from the pool
        const voice = this.freeVoices.pop();
        if (voice) {
            voice.updateRatio(ratio);
            voice.start(frequency, volume);
            this.activeVoices.set(noteId, voice);
        } else {
            // Optional: "Voice Stealing" logic if the pool is empty
            console.warn("Out of voices!");
        }
    }

    noteOff(noteId) {
        const voice = this.activeVoices.get(noteId);
        if (voice) {
            voice.stop(); // Fade out
            this.activeVoices.delete(noteId);
            setTimeout(() => {
                // Wait for the fade-out to finish before making it "free" again
                this.freeVoices.push(voice);
            }, 1000); // TODO Match this to your release time
        }
    }
}