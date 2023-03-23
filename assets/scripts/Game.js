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
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            resolution: window.devicePixelRatio || 1,
        });
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    init = () => {
        /* Setting the position of the canvas to absolute. */
        this.app.renderer.view.style.position = 'absolute';
        const background = PIXI.Sprite.from('assets/img/background.png');
        background.width = this.width;
        background.height = this.height;

        this.app.stage.addChild(background);

        /* Adding the canvas to the body of the HTML document. */
        this.resize();
        document.body.appendChild(this.app.view);
    }

    resize = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const minWidth = 300;
        /** Minimum screen height before the resizing function shrinks the view. */
        const minHeight = 300;
    
        // Calculate renderer and canvas sizes based on current dimensions
        const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
        const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
        const scale = scaleX > scaleY ? scaleX : scaleY;
        const width = windowWidth * scale;
        const height = windowHeight * scale;
    
        // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
        this.app.renderer.view.style.width = `${windowWidth}px`;
        this.app.renderer.view.style.height = `${windowHeight}px`;
        window.scrollTo(0, 0);
    
        // Update renderer  and navigation screens dimensions
        this.app.renderer.resize(width, height);
    }
}