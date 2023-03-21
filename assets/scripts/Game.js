/**
 * The Game class is the main class of the game.
 * It is responsible for creating the canvas and the renderer.
 * It also handles the resizing of the canvas.
 * @class Game
 * @constructor Game
 * @param {PIXI.Application} app The PIXI application.
 * @param {Function} init The init function.
 * @param {Function} resize The resize function.
 */
export class Game {
    constructor() {
        this.app = new PIXI.Application();

    }

    init = () => {
        window.addEventListener("resize", () => {
            /* Resizing the canvas to the size of the window. */
            this.resize();
        })
        /* Setting the position of the canvas to absolute. */
        this.app.renderer.view.style.position = 'absolute';
        /* Adding the canvas to the body of the HTML document. */
        document.body.appendChild(this.app.view);
        this.resize();
    }

    resize = () => {
        /* Resizing the canvas to the size of the window. */
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }
    
}