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
const buttons = generateButtons(WIDTH);
const sequenceManager = new SequenceManager(buttons);

const gameLoop = GameLoop({
    update: () => { },
    render: () => {
        buttons.forEach(button => button.render());
    }
});

gameLoop.start();
sequenceManager.playSequence()
    .then(() => {
        sequenceManager.nextLevel();
        return sequenceManager.playSequence();
    });