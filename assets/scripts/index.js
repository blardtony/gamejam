import { Game } from "./Game.js";
import { Cat } from "./Cat.js";
import { VanillaScoop, ChocolateScoop } from "./Scoop.js";
import { Cone, Cup } from "./Container.js";
import { Sprinkles, ChocolateChips } from "./Topping.js";
import { IceCream } from "./IceCream.js";

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
    const vanillaScoop = new VanillaScoop();

    const chocolateScoop = new ChocolateScoop();

    const iceCream = new IceCream();

    const vanillaBucket = PIXI.Sprite.from('/assets/img/bunny.png');
    vanillaBucket.x = 250;
    vanillaBucket.y = game.height - 150;
    // Opt-in to interactivity
    vanillaBucket.interactive = true;
    // Shows hand cursor
    vanillaBucket.buttonMode = true;
    vanillaBucket.on('pointerdown', () => {
        if (iceCream.scoop === null) {
            iceCream.addScoop(vanillaScoop);
            console.log(iceCream);
        }
    });

    game.app.stage.addChild(vanillaBucket);

    const chocolateBucket = PIXI.Sprite.from('/assets/img/bunny.png');
    chocolateBucket.x = 150;
    chocolateBucket.y = game.height - 150;
    // Opt-in to interactivity
    chocolateBucket.interactive = true;
    // Shows hand cursor
    chocolateBucket.buttonMode = true;
    chocolateBucket.on('pointerdown', () => {
        if (iceCream.scoop === null) {
            iceCream.addScoop(chocolateScoop);
            console.log(iceCream);
        }
    });

    game.app.stage.addChild(chocolateBucket);

    console.log(iceCream);
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

    const runSpeed = distance / (0.8 * 60);

    setTimeout(runAway, 4000);

    function runAway() {
        game.app.ticker.add(() => {
            if (anim.x < -100) {
                // console.log(anim.x) need to check this
                anim.stop();
                return
            }
            anim.x -= runSpeed;
        })
    }
    

}

