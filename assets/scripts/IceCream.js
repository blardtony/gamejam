export class IceCream {
    constructor() {
        this.scoop = null;
        this.container = null;
        this.topping = null;
    }
    
    addScoop = (scoop) => {
        this.scoop = scoop;
    }

    addContainer = (container) => {
        this.container = container;
    }

    addTopping = (topping) => {
        this.topping = topping;
    }
}