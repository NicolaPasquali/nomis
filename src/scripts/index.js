/** @author Nicola Pasquali */
import '../styles/index.scss';
import { init, initPointer, track, Sprite, GameLoop } from 'kontra';
const { canvas } = init();
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const COLORS = [
	{ normal: '#2196f2', pressed: '#03a9f3' },
	{ normal: '#4caf50', pressed: '#8bc24a' },
	{ normal: '#fe9800', pressed: '#fec007' },
	{ normal: '#d50000', pressed: '#ff1744' }
];
let sprites = [];

initPointer();
canvas.width = WIDTH;
canvas.height = HEIGHT;

// The magic number is the sum of the lateral and inner spacing of the buttons
const buttonSize = (WIDTH - 30) / 2;

for (let row = 0; row < 2; row++) {
	for (let column = 0; column < 2; column++) {
		const button = Sprite({
			x: 10 + (row * buttonSize + row * 10),
			y: 10 + (column * buttonSize + column * 10),
			color: COLORS[+`0b${row}${column}`].normal,
			width: buttonSize,
			height: buttonSize,
			normalColor: COLORS[+`0b${row}${column}`].normal,
			pressedColor: COLORS[+`0b${row}${column}`].pressed,
			onDown: function() {
				this.color = this.pressedColor;
			},
			onUp: function() {
				this.color = this.normalColor;
			}
		});
		sprites.push(button);
		track(button);
	}
}

const gameLoop = GameLoop({
	update: () => {},
	render: () => {
		sprites.forEach(sprite => sprite.render());
	}
});

gameLoop.start();
