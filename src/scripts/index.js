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
let score = 0;
const buttonClickCallback = (buttonIndex) => {
    if (!demonstration) {
        switch (sequenceManager.check(buttonIndex)) {
            case -1: // Sequence failed
                alert('Game over. Restarting!');
                sequenceManager.restart();
                score = 0;
                setTimeout(() => play(), 1000);
                break;
            case 1: // Sequence completed
                sequenceManager.nextLevel();
                setTimeout(() => play(), 1000);
            case 0: // Step completed
                score++;
        }
        document.getElementById('score').innerHTML = `Score: ${score}`;
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