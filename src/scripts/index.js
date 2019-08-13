/** @author Nicola Pasquali */
import '../styles/index.scss';
import { init, Sprite, GameLoop } from 'kontra';
const { canvas } = init();
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const COLORS = [
	{ normal: '#2196f2', pressed: '#03a9f3' },
	{ normal: '#4caf50', pressed: '#8bc24a' },
	{ normal: '#fe9800', pressed: '#fec007' },
	{ normal: '#673ab7', pressed: '#9c27b0' }
];
let sprites = [];

canvas.width = WIDTH;
canvas.height = HEIGHT;

// The magic number is the sum of the lateral and inner spacing of the buttons
const buttonSize = (WIDTH - 30) / 2;

for (let row = 0; row < 2; row++) {
	for (let column = 0; column < 2; column++) {
		sprites.push(
			Sprite({
				x: 10 + (row * buttonSize + row * 10),
				y: 10 + (column * buttonSize + column * 10),
				color: COLORS[+`0b${row}${column}`].normal, // We're converting the two indexes into a base two number to access the color
				width: buttonSize,
				height: buttonSize
			})
		);
	}
}

const gameLoop = GameLoop({
	update: () => {},
	render: () => {
		sprites.forEach(sprite => sprite.render());
	}
});

gameLoop.start();
