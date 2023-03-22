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
    const cone = new Cone();
    const cup = new Cup();
    const vanillaScoop = new VanillaScoop();
    const chocolateScoop = new ChocolateScoop();
    const sprinkles = new Sprinkles();
    const chocolateChips = new ChocolateChips();
    const iceCream = new IceCream();

    const coneBucket = PIXI.Sprite.from('/assets/img/bunny.png');
    coneBucket.x = 150;
    coneBucket.y = game.height - 50;
    // Opt-in to interactivity
    coneBucket.interactive = true;
    // Shows hand cursor
    coneBucket.buttonMode = true;
    coneBucket.on('pointerdown', () => {
        if (iceCream.container === null) {
            iceCream.addContainer(cone);
            console.log(iceCream);
        }
    });

    game.app.stage.addChild(coneBucket);

    const cupBucket = PIXI.Sprite.from('/assets/img/bunny.png');
    cupBucket.x = 150;
    cupBucket.y = game.height - 150;
    // Opt-in to interactivity
    cupBucket.interactive = true;
    // Shows hand cursor
    cupBucket.buttonMode = true;
    cupBucket.on('pointerdown', () => {
        if (iceCream.container === null) {
            iceCream.addContainer(cup);
            console.log(iceCream);
        }
    });

    game.app.stage.addChild(cupBucket);

    const vanillaBucket = PIXI.Sprite.from('/assets/img/bunny.png');
    vanillaBucket.x = 250;
    vanillaBucket.y = game.height - 150;
    // Opt-in to interactivity
    vanillaBucket.interactive = true;
    // Shows hand cursor
    vanillaBucket.buttonMode = true;
    vanillaBucket.on('pointerdown', () => {
        if (iceCream.container !== null && iceCream.scoop === null) {
            iceCream.addScoop(vanillaScoop);
            console.log(iceCream);
        }
    });

    game.app.stage.addChild(vanillaBucket);

    const chocolateBucket = PIXI.Sprite.from('/assets/img/bunny.png');
    chocolateBucket.x = 250;
    chocolateBucket.y = game.height - 50;
    // Opt-in to interactivity
    chocolateBucket.interactive = true;
    // Shows hand cursor
    chocolateBucket.buttonMode = true;
    chocolateBucket.on('pointerdown', () => {
        if (iceCream.container !== null && iceCream.scoop === null) {
            iceCream.addScoop(chocolateScoop);
            console.log(iceCream);
        }
    });

    game.app.stage.addChild(chocolateBucket);


    const sprinklesBucket = PIXI.Sprite.from('/assets/img/bunny.png');
    sprinklesBucket.x = 350;
    sprinklesBucket.y = game.height - 50;
    // Opt-in to interactivity
    sprinklesBucket.interactive = true;
    // Shows hand cursor
    sprinklesBucket.buttonMode = true;
    sprinklesBucket.on('pointerdown', () => {
        if (iceCream.container !== null && iceCream.scoop !== null && iceCream.topping === null) {
            iceCream.addTopping(sprinkles);
            console.log(iceCream);
        }
    });
    game.app.stage.addChild(sprinklesBucket);

    const chocolateChipsBucket = PIXI.Sprite.from('/assets/img/bunny.png');
    chocolateChipsBucket.x = 350;
    chocolateChipsBucket.y = game.height - 150;
    // Opt-in to interactivity
    chocolateChipsBucket.interactive = true;
    // Shows hand cursor
    chocolateChipsBucket.buttonMode = true;
    chocolateChipsBucket.on('pointerdown', () => {
        if (iceCream.container !== null && iceCream.scoop !== null && iceCream.topping === null) {
            iceCream.addTopping(chocolateChips);
            console.log(iceCream);
        }
    });

    game.app.stage.addChild(chocolateChipsBucket);
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

    const runSpeed = distance / (0.8 * 60);

    /**
     * The animation loop.
     */
    game.app.ticker.add(() => {
        if (anim.x < game.width / 2) {
            anim.stop();
            setTimeout(runAway, 2000);
            function runAway() {
                anim.play();
                anim.x -= runSpeed;
                if (anim.x < -100) {
                    anim.stop();
                    return;
                }
            }
            return;

        }
        anim.x -= speed;
    });

    

}

