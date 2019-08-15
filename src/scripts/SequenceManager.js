/** @author Nicola Pasquali */
export class SequenceManager {
    constructor(buttons) {
        this.level = 1;
        this._buttons = buttons;
        this._generateSequence();
    }

    _generateSequence() {
        this.currentSequence = Array.from({ length: this.level }, () => Math.floor(Math.random() * 4));
    }

    nextLevel() {
        this.level++;
        this._generateSequence();
    }

    playSequence(step = 0) {
        let button = this._buttons[this.currentSequence[step]];
        this._pressButton(button);
        if (step < this.currentSequence.length - 1) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(this.playSequence(++step)), 1000);
            });
        } else {
            return new Promise((resolve) => {
                setTimeout(() => resolve(), 1000);
            });
        }
    }

    _pressButton(button) {
        button.onDown();
        setTimeout(() => button.onUp(), 400);
    }
}