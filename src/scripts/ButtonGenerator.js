/** @author Nicola Pasquali */
import { track, Sprite } from 'kontra';
import { SoundPlayer } from './SoundPlayer';

const soundPlayer = new SoundPlayer();
const BUTTONS_CONFIGURATION = [
    { normalColor: '#fdd835', pressedColor: '#ffeb3b', soundFrequency: 175 },
    { normalColor: '#2196f2', pressedColor: '#03a9f3', soundFrequency: 265 },
    { normalColor: '#4caf50', pressedColor: '#8bc24a', soundFrequency: 355 },
    { normalColor: '#d50000', pressedColor: '#ff1744', soundFrequency: 445 }
];

export function generateButtons(screenWidth, clickCallback) {
    let result = [];
    // The magic number is the sum of the lateral and inner spacing of the buttons
    const buttonSize = (screenWidth - 30) / 2;

    for (let row = 0; row < 2; row++) {
        for (let column = 0; column < 2; column++) {
            // We're converting the two indexes into a base 2 number in order to access the configuration
            const currentConfiguration = BUTTONS_CONFIGURATION[+`0b${row}${column}`];
            const button = Sprite({
                x: 10 + (column * buttonSize + column * 10),
                y: 10 + (row * buttonSize + row * 10),
                color: currentConfiguration.normalColor,
                width: buttonSize,
                height: buttonSize,
                normalColor: currentConfiguration.normalColor,
                pressedColor: currentConfiguration.pressedColor,
                onDown: function () {
                    this.color = this.pressedColor;
                    this.sound = soundPlayer.playSound(currentConfiguration.soundFrequency);
                },
                onUp: function () {
                    this.color = this.normalColor;
                    soundPlayer.stopSound(this.sound);
                    clickCallback(+`0b${row}${column}`);
                }
            });
            result.push(button);
            track(button);
        }
    }
    return result;
}