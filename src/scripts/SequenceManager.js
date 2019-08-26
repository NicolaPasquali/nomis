/** @author Nicola Pasquali */

export class SequenceManager {
    constructor(buttons, mode) {
        this._buttons = buttons;
        this._mode = mode;
        this._currentSequence = [];
        this.generateSequence();
    }

    generateSequence() {
        if (this._mode === 'classic' ) {
            this._currentSequence.push(Math.floor(Math.random() * 4));
        } else if (this._mode === 'random') {
            this._currentSequence = Array.from({ length: this._currentSequence.length + 1 }, () => Math.floor(Math.random() * 4));
        }
        this._temporarySequence = [...this._currentSequence];
    }

    playSequence(step = 0) {
        console.log('suona \'stocazzo', this._buttons);
        console.log('sequenza di \'stocazzo', this._currentSequence);
        let button = this._buttons[this._currentSequence[step]];
        this._pressButton(button);
        if (step < this._currentSequence.length - 1) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(this.playSequence(++step)), 800);
            });
        } else {
            return new Promise((resolve) => {
                setTimeout(() => resolve(), 1000);
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