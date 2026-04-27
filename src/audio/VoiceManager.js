import Voice from "./VoiceClass";
export default class VoiceManager {
    constructor(context, poolSize = 32) {
        this.freeVoices = [];
        this.activeVoices = new Map(); // Key: Frequency, Value: Voice Object

        for (let i = 0; i < poolSize; i++) {
            const voice = new Voice(context);
            this.freeVoices.push(voice);
        }
    }

    noteOn(freq) {
        // 1. Don't play the same frequency twice
        if (this.activeVoices.has(freq)) return;
        // 2. Get a voice from the pool
        const voice = this.freeVoices.pop();

        if (voice) {
            voice.start(freq);
            this.activeVoices.set(freq, voice);
        } else {
            // Optional: "Voice Stealing" logic if the pool is empty
            console.warn("Out of voices!");
        }
    }

    noteOff(freq) {
        const voice = this.activeVoices.get(freq);
        if (voice) {
            voice.stop(); // Fade out
            this.activeVoices.delete(freq);
            // Wait for the fade-out to finish before making it "free" again
            setTimeout(() => {
                this.freeVoices.push(voice);
            }, 100); // Match this to your release time
        }
    }
}