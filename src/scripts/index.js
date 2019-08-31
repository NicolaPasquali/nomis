/** @author Nicola Pasquali */
import '../styles/index.scss';
import { generateButtons } from './ButtonGenerator';
import { SequenceManager } from './SequenceManager';
import { SoundPlayer } from './SoundPlayer';

const soundPlayer = new SoundPlayer();
let demonstration = true;
let score = 0;

const buttonClickCallback = (buttonIndex) => {
    if (!demonstration) {
        switch (sequenceManager.check(buttonIndex)) {
            case -1: // Sequence failed
                alert(`Game over! Score: ${score}`);
                document.getElementById('menu').style.display = 'flex';
                document.getElementById('logo').style.display = 'block';
                document.getElementById('game-pad').style.display = 'none';
                document.getElementById('score').style.display = 'none';
                score = 0;
                break;
            case 1: // Sequence completed
                sequenceManager.generateSequence();
                setTimeout(() => play(), 1000);
            case 0: // Step completed
                score++;
        }
        document.getElementById('score').innerHTML = `Score: ${score}`;
    }
};
const buttons = generateButtons(buttonClickCallback, soundPlayer);
let sequenceManager;

function start(mode) {
    sequenceManager = new SequenceManager(buttons, mode);
    document.getElementById('menu').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
    document.getElementById('game-pad').style.display = 'grid';
    document.getElementById('score').style.display = 'block';
    play();
}

function play() {
    demonstration = true;
    sequenceManager.playSequence()
        .then(() => demonstration = false);
}

document.getElementById('btn-classic').onclick = () => start('classic');
document.getElementById('btn-random').onclick = () => start('random');