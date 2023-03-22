import { Game } from "./Game.js";
import { Cat } from "./Cat.js";

const game = new Game();
game.init();

window.addEventListener("resize", () => {
    game.resize();
})
game.resize();

const cat = new Cat(game.width / 2, game.height / 2, 0.1666);
const anim = await cat.getAnimationSprite();
anim.play();

// add it to the stage to render
game.app.stage.addChild(anim);

// Make the anim interactive
anim.interactive = true;

// Set interactions on our anim 
anim
    .on('mousedown', onButtonDown)
    .on('touchstart', onButtonDown)
    
function onButtonDown() {
    anim.x = game.width / Math.floor(Math.random() * 10);
    anim.y = game.height / Math.floor(Math.random() * 10);
    console.log("here")
}
