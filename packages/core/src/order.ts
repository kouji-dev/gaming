import {Division} from "./division";
import {Discount} from "./discount";
import {Options} from "./order-options.service";

export class Order {
    currentDivision: Division;
    desiredDivision: Division;
    discount?: Discount;
    options?: Options;

    constructor(currentDivision: Division, desiredDivision: Division, discount?: Discount, options?: Options) {
        this.currentDivision = currentDivision;
        this.desiredDivision = desiredDivision;
        this.discount = discount;
        this.options = options;
    }

}
