export class Bucket {
    constructor(img, x, y, classType) {
        this.sprite = PIXI.Sprite.from(img);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scale.set(3);
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.classType = classType;
    }

    getItem() {
        return new this.classType();
    }
}