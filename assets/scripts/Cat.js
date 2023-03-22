import { IceCream } from "./IceCream.js";

export class Cat {
    constructor(x, y, animationSpeed) {
        this.x = x;
        this.y = y;
        this.animationSpeed = animationSpeed;
        this.iceCream = new IceCream();
    }

    async getAnimationSprite() {
        // const loader = PIXI.Loader.shared;
        const sheet = await PIXI.Assets.load('assets/img/cats.json');
        // console.log(sheet.data.meta.image);
        const texture = await PIXI.Texture.from('assets/img/cats.png');
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