/** @author Nicola Pasquali */

export function generateButtons(clickCallback, soundPlayer) {
    let result = [];
    const gamePad = document.getElementById('game-pad');

    for (let row = 0; row < 2; row++) {
        for (let column = 0; column < 2; column++) {
            const color = 90 * +`0b${row}${column}`;

            const gameButton = document.createElement('div');
            gameButton.style.backgroundColor = `hsl(${color}, 100%, 50%)`;
            gameButton.style.height = '10rem';
            gameButton.ontouchstart = () => {
                gameButton.style.backgroundColor = `hsl(${color}, 100%, 75%)`;
                soundPlayer.play(+`0b${row}${column}`);
            };
            gameButton.ontouchend = () => {
                gameButton.style.backgroundColor = `hsl(${color}, 100%, 50%)`;
                soundPlayer.stop(+`0b${row}${column}`);
                clickCallback(+`0b${row}${column}`);
            };
            // TODO Check if game should use touch or click event
            // gameButton.onmousedown = gameButton.ontouchstart;
            // gameButton.onmouseup = gameButton.ontouchend;
            gamePad.appendChild(gameButton);
            result.push(gameButton);
        }
    }
    return result;
}