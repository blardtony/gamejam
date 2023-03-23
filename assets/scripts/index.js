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
  fontSize: 48,
  fill: "black",
  align: "center",
});
scoreText.x = game.width / 2 - scoreText.width / 2;
scoreText.y = 50;

const iceCreamNeededText = new PIXI.Text("IceCreamNeeded: ", {
  fontFamily: "Arial",
  fontSize: 25,
  fill: "black",
  align: "center",
});
iceCreamNeededText.x = 80;
iceCreamNeededText.y = 120;

const iceCreamText = new PIXI.Text("IceCream: ", {
  fontFamily: "Arial",
  fontSize: 25,
  fill: "black",
  align: "center",
});
iceCreamText.x = 80;
iceCreamText.y = 150;
/**
 * Initialize the game
 */
game.init();

game.app.stage.addChild(scoreText);
game.app.stage.addChild(iceCreamNeededText);
game.app.stage.addChild(iceCreamText);


/**
 * Get the game start and game over elements
 */
const gameStart = document.querySelector("#game-start");
const gameOver = document.querySelector("#game-over");
const gameRetryButton = document.querySelector("#game-retry-button");

/**
 * Add event listener to the game start button
 */
gameStart.addEventListener("click", () => {
  gameStart.style.display = "none";
  setTimeout(() => {
    gameOver.style.display = "block";
    game.app.ticker.destroy();
  }, 10000);
  /**
   * Start the game
   */
  start();
});

gameRetryButton.addEventListener("click", () => {
  /**
   * Reload the page
   */
  location.reload();
});

/**
 * Start method for the game
 */
async function start() {
    const sound = PIXI.sound.Sound.from('assets/sound.wav');
    sound.play();
  const bucketSpace = game.width / 4;

  const coneBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace,
    game.height - 80,
    Cone
  );
  game.app.stage.addChild(coneBucket.sprite);

  const cupBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace,
    game.height - 180,
    Cup
  );
  game.app.stage.addChild(cupBucket.sprite);

  const vanillaBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace * 2,
    game.height - 80,
    VanillaScoop
  );
  game.app.stage.addChild(vanillaBucket.sprite);

  const chocolateBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace * 2,
    game.height - 180,
    ChocolateScoop
  );
  game.app.stage.addChild(chocolateBucket.sprite);

  const sprinklesBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace * 3,
    game.height - 80,
    Sprinkles
  );
  game.app.stage.addChild(sprinklesBucket.sprite);

  const chocolateChipsBucket = new Bucket(
    "/assets/img/bunny.png",
    bucketSpace * 3,
    game.height - 180,
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
   * The text that shows the ice cream needed.
   * Parse the ice cream needed to a string.
   */
  /**
   * The animation sprite of the cat.
   * @type {PIXI.AnimatedSprite}
   */
  let anim = await cat.getAnimationSprite();

  iceCreamNeededText.text = `IceCreamNeeded ${cat.iceCreamNeeded.container.constructor.name}/${cat.iceCreamNeeded.scoop.constructor.name}/${cat.iceCreamNeeded.topping.constructor.name}`;
  iceCreamText.text = `IceCream ${cat.iceCream.container?.constructor?.name}/${cat.iceCream.scoop?.constructor.name}/${cat.iceCream.topping?.constructor.name}`;

  /**
   * Play the animation.
   * @method PIXI.AnimatedSprite#play
   */
  anim.play();
  console.log(anim.textures)

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
    if (anim.x < -100) {
      anim.stop();
      if (checkIceCream(cat)) {
        score += 1;
        scoreText.text = "Score: " + score;
      }
      cat = new Cat(game.width / 1, game.height / 2, 0.1666);
      anim = await cat.getAnimationSprite();
      iceCreamNeededText.text = `Container ${cat.iceCreamNeeded.container.constructor.name} Scoop ${cat.iceCreamNeeded.scoop.constructor.name} Topping ${cat.iceCreamNeeded.topping.constructor.name}`;
      game.app.stage.addChild(anim);
      seconds = 0;
      return;
    }
    if (seconds > 3 && seconds <= 3.3 && !checkIceCream(cat)) {
        anim.gotoAndStop(0);
        return
    }
    if ((seconds > 3.3 || checkIceCream(cat))&& anim.currentFrame == 0) {
        console.log(anim.currentFrame)
        anim.gotoAndPlay(1)
        return
    }
    console.log(anim.currentFrame)
    anim.play();
    anim.x -= runSpeed;
  };

  let seconds = 0;
  const catReachMiddle = async (delta) => {
    if (!sound.isPlaying){
        sound.play();
    }
    iceCreamText.text = `IceCream ${cat.iceCream.container?.constructor?.name}/${cat.iceCream.scoop?.constructor.name}/${cat.iceCream.topping?.constructor.name}`;
    if (anim.x < game.width / 2) {
      seconds += (1 / 60) * delta;
      anim.stop();
      if (checkIceCream(cat) || seconds > 3) {
        catRunAway();
        return;
      }
      return;
    }
    if (anim.currentFrame == 0) {
        anim.gotoAndPlay(1)
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

const checkIceCream = (cat) => {
  return (
    cat.iceCream.container?.constructor.name ===
      cat.iceCreamNeeded.container.constructor.name &&
    cat.iceCream.scoop?.constructor.name ===
      cat.iceCreamNeeded.scoop.constructor.name &&
    cat.iceCream.topping?.constructor.name ===
      cat.iceCreamNeeded.topping.constructor.name
  );
};
