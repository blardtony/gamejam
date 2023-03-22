import { Game } from "./Game.js";
import { Cat } from "./Cat.js";

const game = new Game();
game.init();

window.addEventListener("resize", () => {
    game.resize();
})
game.resize();

const gameStart = document.querySelector("#game-start");
console.log(gameStart);

const gameOver = document.querySelector("#game-over");
gameStart.addEventListener("click", () => {
    gameStart.style.display = "none";
    setTimeout(() => {
        gameOver.style.display = "block";
    }   , 10000);
    start()
});


// After 10 seconds display the game over screen
async function start() {
    const cat = new Cat(game.width / 1, game.height / 2, 0.1666);
    const anim = await cat.getAnimationSprite();
    anim.play();

    // add it to the stage to render
    game.app.stage.addChild(anim);

    // Make the anim interactive
    anim.interactive = true;

    requestAnimationFrame(update);

    function update() {

        if (anim.x < game.width / 2) {
            anim.stop();
            return
        }
        anim.x -= 3;
        requestAnimationFrame(update);

        console.log("test")
    }


    // Set interactions on our anim 
    anim
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown)
        
    function onButtonDown() {
        anim.x = game.width / Math.floor(Math.random() * 10);
        anim.y = game.height / Math.floor(Math.random() * 10);
    }
}

