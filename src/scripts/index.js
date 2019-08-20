/** @author Nicola Pasquali */
import '../styles/index.scss';
import { init, initPointer, GameLoop } from 'kontra';
import { generateButtons } from './ButtonGenerator';
import { SequenceManager } from './SequenceManager';
const { canvas } = init();
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;
initPointer();
let demonstration = true;
const buttonClickCallback = (buttonIndex) => {
    if (!demonstration) {
        const result = sequenceManager.check(buttonIndex);
        if (result === 0) {
            sequenceManager.nextLevel();
            setTimeout(() => play(), 1000);
        }
        if (result === -1) {
            alert('Game over');
        }
    }
};
const buttons = generateButtons(WIDTH, buttonClickCallback);
const sequenceManager = new SequenceManager(buttons);

const gameLoop = GameLoop({
    update: () => { },
    render: () => {
        buttons.forEach(button => button.render());
    }
});

gameLoop.start();
function play() {
    demonstration = true;
    sequenceManager.playSequence()
        .then(() => demonstration = false);
}

setTimeout(() => play(), 1000);