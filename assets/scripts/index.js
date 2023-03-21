import { Game } from "./Game.js";

const game = new Game();
game.init();


/* Adding the canvas to the body of the HTML document. */
window.addEventListener("resize", () => {
    game.resize();
})
game.resize();

