/** @author Nicola Pasquali */
export class SequenceManager {
    constructor(buttons) {
        this._buttons = buttons;
        this._currentSequence = [];
        this._generateSequence();
    }

    _generateSequence() {
        this._currentSequence.push(Math.floor(Math.random() * 4));
        this._temporarySequence = [...this._currentSequence];
    }

    nextLevel() {
        this._generateSequence();
    }

    restart() {
        this._currentSequence = [];
        this.nextLevel();
    }

    playSequence(step = 0) {
        let button = this._buttons[this._currentSequence[step]];
        this._pressButton(button);
        if (step < this._currentSequence.length - 1) {
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

    check(buttonIndex) {
        if (buttonIndex !== this._temporarySequence.pop()) {
            return -1;
        }
        if (this._temporarySequence.length === 0) {
            return 0;
        }
    }
}