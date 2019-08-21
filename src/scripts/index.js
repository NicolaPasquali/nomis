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
                alert('Game over. Restarting!');
                sequenceManager.restart();
                score = 0;
                setTimeout(() => play(), 1000);
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
const sequenceManager = new SequenceManager(buttons);

function play() {
    demonstration = true;
    sequenceManager.playSequence()
        .then(() => demonstration = false);
}

setTimeout(() => play(), 1000);