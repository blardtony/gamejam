import { IceCream } from "./IceCream.js";
import { VanillaScoop, ChocolateScoop } from "./Scoop.js";
import { Cone, Cup } from "./Container.js";
import { ChocolateChips, Sprinkles } from "./Topping.js";

/**
 * Cat class
 * @param {number} x - x position of the cat
 * @param {number} y - y position of the cat
 * @param {number} animationSpeed - speed of the cat animation
 * @param {IceCream} iceCream - the ice cream the cat has
 * @param {IceCream} iceCreamNeeded - the ice cream the cat needs
 */
export class Cat {
    constructor(x, y, animationSpeed) {
        this.x = x;
        this.y = y;
        this.animationSpeed = animationSpeed;
        const container = [new Cone(), new Cup()];
        const scoop = [new VanillaScoop(), new ChocolateScoop()];
        const topping = [new ChocolateChips(), new Sprinkles()];
        this.iceCream = new IceCream();

        this.iceCreamNeeded = new IceCream();
        this.iceCreamNeeded.addContainer(container[Math.floor(Math.random() * 1000) % 2]);
        this.iceCreamNeeded.addScoop(scoop[Math.floor(Math.random() * 1000) % 2]);
        this.iceCreamNeeded.addTopping(topping[Math.floor(Math.random() * 1000) % 2]);
    }

    async getAnimationSprite() {
        // const loader = PIXI.Loader.shared;
        const sheet = await PIXI.Assets.load('assets/img/pos.json');
        // console.log(sheet.data.meta.image);
        const cats = ['assets/img/pos.png', 'assets/img/garfields.png', 'assets/img/chats.png'];
        // const texture = await PIXI.Texture.from(cats[2]);
        const texture = await PIXI.Texture.from(cats[Math.floor(Math.random() *3)]);
        // console.log(texture);
        const spritesheet = new PIXI.Spritesheet(
            texture,
            sheet.data
        );
        // Generate all the Textures asynchronously
        await spritesheet.parse();

        const anim =  new PIXI.AnimatedSprite(spritesheet.animations.cats);
        anim.x = this.x;
        anim.y = this.y;
        anim.anchor.set(0.5);
        anim.animationSpeed = 0.1666;
        return anim;
    }

}