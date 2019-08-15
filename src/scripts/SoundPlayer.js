/** @author Nicola Pasquali */
export class SoundPlayer {
    constructor() {
        this._audioContext = new AudioContext();
    }

    playSound(frequency) {
        const oscillator = this._audioContext.createOscillator();
        oscillator.type = 'square';
        oscillator.connect(this._audioContext.destination);
        oscillator.frequency.value = frequency;
        oscillator.start();
        return oscillator;
    }

    stopSound(oscillator) {
        oscillator.stop();
    }
}
