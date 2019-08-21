/** @author Nicola Pasquali */
export class SoundPlayer {
    constructor() {
        this._audioContext = new AudioContext();
        this._frequencies = [175, 265, 355, 445];
        this._sounds = [];
    }

    play(index) {
        const oscillator = this._audioContext.createOscillator();
        oscillator.type = 'square';
        oscillator.connect(this._audioContext.destination);
        oscillator.frequency.value = this._frequencies[index];
        oscillator.start();
        this._sounds[index] = oscillator;
    }

    stop(index) {
        this._sounds[index].stop();
    }
}
