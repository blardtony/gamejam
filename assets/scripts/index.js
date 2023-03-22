import { Game } from "./Game.js";
import { Cat } from "./Cat.js";

const game = new Game();
/**
 * Initialize the game
 */
game.init();


/**
 * Resize the game
 */
window.addEventListener("resize", () => {
    game.resize();
})
game.resize();

/**
 * Get the game start and game over screens
 */
const gameStart = document.querySelector("#game-start");
const gameOver = document.querySelector("#game-over");

/**
 * Start the game
 */
gameStart.addEventListener("click", () => {
    gameStart.style.display = "none";
    setTimeout(() => {
        gameOver.style.display = "block";
    }   , 10000);
    start()
});


/**
 * Start method for the game
 */
async function start() {
    /**
     * The cat object
     * @type {Cat}
     * @param {Number} x The x position of the cat.
     * @param {Number} y The y position of the cat.
     * @param {Number} scale The scale of the cat.
     */
    const cat = new Cat(game.width / 1, game.height / 2, 0.1666);

    /**
     * The animation sprite of the cat.
     * @type {PIXI.AnimatedSprite}
     */
    const anim = await cat.getAnimationSprite();

    /**
     * Play the animation.
     * @method PIXI.AnimatedSprite#play
     */
    anim.play();

    /**
     * Add the animation to the stage.
     * @method PIXI.Container#addChild
     * @param {PIXI.AnimatedSprite} anim The animation sprite.
     */
    game.app.stage.addChild(anim);


    /**
     * Make the animation interactive.
     * @property PIXI.AnimatedSprite#interactive
     */
    anim.interactive = true;

    /**
     * The distance between the anim and the center of the screen.
     */
    const distance = anim.x - game.width / 2;
    /**
     * The speed of the anim.
     */
    const speed = distance / (2.5 * 60);

    /**
     * The animation loop.
     */
    game.app.ticker.add(() => {
        if (anim.x < game.width / 2) {
            anim.stop();
            return
        }
        anim.x -= speed;
    });
}

