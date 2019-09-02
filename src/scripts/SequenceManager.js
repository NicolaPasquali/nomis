/** @author Nicola Pasquali */

export class SequenceManager {
    constructor(buttons, mode) {
        this._buttons = buttons;
        this._mode = mode;
        this._slow = mode % 2 === 0;
        this._currentSequence = [];
        this.generateSequence();
    }

    generateSequence() {
        if (this._mode < 2) {
            this._currentSequence.push(Math.floor(Math.random() * 4));
        } else if (this._mode >= 2) {
            this._currentSequence = Array.from({ length: this._currentSequence.length + 1 }, () => Math.floor(Math.random() * 4));
        }
        this._temporarySequence = [...this._currentSequence];
    }

    playSequence(step = 0) {
        let button = this._buttons[this._currentSequence[step]];
        this._pressButton(button);
        if (step < this._currentSequence.length - 1) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(this.playSequence(++step)), this._slow ? 700 : 400);
            });
        } else {
            return new Promise((resolve) => {
                setTimeout(() => resolve(), this._slow ? 900 : 600);
            });
        }
    }

    _pressButton(button) {
        button.ontouchstart();
        setTimeout(() => button.ontouchend(), 350);
    }

    check(buttonIndex) {
        if (buttonIndex !== this._temporarySequence.pop()) {
            return -1;
        }
        if (this._temporarySequence.length === 0) {
            return 1;
        }
        return 0;
    }
}