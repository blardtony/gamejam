export class IceCream {
    constructor() {
        this.scoop = null;
        this.container = null;
        this.topping = null;
    }
    
    addScoop = (scoop) => {
        if (this.container !== null && this.scoop === null)
            this.scoop = scoop;
    }

    addContainer = (container) => {
        if (this.container === null)
            this.container = container;
    }

    addTopping = (topping) => {
        if (this.container !== null && this.scoop !== null && this.topping === null)
            this.topping = topping;
    }
}