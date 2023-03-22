import { Game } from "./Game.js";
import { Cat } from "./Cat.js";
import { VanillaScoop, ChocolateScoop } from "./Scoop.js";
import { Cone, Cup } from "./Container.js";
import { Sprinkles, ChocolateChips } from "./Topping.js";
import { Bucket } from "./Bucket.js";

const game = new Game();
let score = 0;

const scoreText = new PIXI.Text("Score: " + score, {
    fontFamily: "Arial",
    fontSize: 24,
    fill: "white",
    align: "center",
});
scoreText.x = game.width / 2 - scoreText.width / 2;
scoreText.y = 50;
game.app.stage.addChild(scoreText);

/**
 * Initialize the game
 */
game.init();

/**
 * Resize the game
 */
window.addEventListener("resize", () => {
  game.resize();
});
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
    game.app.ticker.destroy();
    // game.app.stage.removeChildren();
  }, 1000000);
  start();
});

/**
 * Start method for the game
 */
async function start() {
  const bucketSpace = game.width / 4;

  const coneBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace,
    game.height - 150,
    Cone
  );
  game.app.stage.addChild(coneBucket.sprite);

  const cupBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace,
    game.height - 300,
    Cup
  );
  game.app.stage.addChild(cupBucket.sprite);

  const vanillaBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace * 2,
    game.height - 150,
    VanillaScoop
  );
  game.app.stage.addChild(vanillaBucket.sprite);

  const chocolateBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace * 2,
    game.height - 300,
    ChocolateScoop
  );
  game.app.stage.addChild(chocolateBucket.sprite);

  const sprinklesBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace * 3,
    game.height - 150,
    Sprinkles
  );
  game.app.stage.addChild(sprinklesBucket.sprite);

  const chocolateChipsBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace * 3,
    game.height - 300,
    ChocolateChips
  );
  game.app.stage.addChild(chocolateChipsBucket.sprite);

  /**
   * The cat object
   * @type {Cat}
   * @param {Number} x The x position of the cat.
   * @param {Number} y The y position of the cat.
   * @param {Number} scale The scale of the cat.
   */
  let cat = new Cat(game.width / 1, game.height / 2, 0.1666);

  /**
   * The animation sprite of the cat.
   * @type {PIXI.AnimatedSprite}
   */
  let anim = await cat.getAnimationSprite();

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
  const speed = distance / (1 * 60);

  const runSpeed = distance / (0.8 * 60);

  /**
   * The animation loop.
   */

  const catRunAway = async () => {
    // console.log(anim.x)
    if (anim.x < -100) {
      anim.stop();
      if (
        cat.iceCream.container &&
        cat.iceCream.scoop &&
        cat.iceCream.topping
      ) {
        score += 1;
        scoreText.text = "Score: " + score;
      }
      cat = new Cat(game.width / 1, game.height / 2, 0.1666);
      anim = await cat.getAnimationSprite();
      game.app.stage.addChild(anim);
      seconds = 0;
      return;
    }
    anim.play();
    anim.x -= runSpeed;
  };

  let seconds = 0;
  const catReachMiddle = async (delta) => {
    // console.log(anim.x)
    if (anim.x < game.width / 2) {
      seconds += (1 / 60) * delta;
      anim.stop();
      if (
        (cat.iceCream.container &&
          cat.iceCream.scoop &&
          cat.iceCream.topping) ||
        seconds > 3
      ) {
        catRunAway();
        return;
      }
      return;
    }
    anim.play();
    anim.x -= speed;
    console.log(score);
  };
  game.app.ticker.add(catReachMiddle);

  coneBucket.sprite.on("pointerdown", () => {
    cat.iceCream.addContainer(coneBucket.getItem());
    console.log(cat.iceCream.container);
  });

  cupBucket.sprite.on("pointerdown", () => {
    cat.iceCream.addContainer(cupBucket.getItem());
    console.log(cat.iceCream.container);
  });

  vanillaBucket.sprite.on("pointerdown", () => {
    cat.iceCream.addScoop(vanillaBucket.getItem());
    console.log(cat.iceCream.scoop);
  });

  chocolateBucket.sprite.on("pointerdown", () => {
    cat.iceCream.addScoop(chocolateBucket.getItem());
    console.log(cat.iceCream.scoop);
  });

  sprinklesBucket.sprite.on("pointerdown", () => {
    cat.iceCream.addTopping(sprinklesBucket.getItem());
    console.log(cat.iceCream.topping);
  });

  chocolateChipsBucket.sprite.on("pointerdown", () => {
    cat.iceCream.addTopping(chocolateChipsBucket.getItem());
    console.log(cat.iceCream.topping);
  });
}
