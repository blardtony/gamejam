import { IceCream } from "./IceCream.js";
import { VanillaScoop, ChocolateScoop } from "./Scoop.js";
import { Cone, Cup } from "./Container.js";
import { ChocolateChips, Sprinkles } from "./Topping.js";

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
        const sheet = await PIXI.Assets.load('assets/img/cats.json');
        // console.log(sheet.data.meta.image);
        const cats = ['assets/img/cats.png', 'assets/img/garfield.png', 'assets/img/po.png'];
        const texture = await PIXI.Texture.from(cats[Math.floor(Math.random() * 1000) % 3]);
        // console.log(texture);
        const spritesheet = new PIXI.Spritesheet(
            texture,
            sheet.data
        );
        // Generate all the Textures asynchronously
        await spritesheet.parse();

        // spritesheet is ready to use!
        // console.log(spritesheet.animations.cats);
        const anim=  new PIXI.AnimatedSprite(spritesheet.animations.cats);
        anim.x = this.x;
        anim.y = this.y;
        anim.anchor.set(0.5);
        anim.animationSpeed = 0.1666;
        return anim;
    }

}