import {Division} from "./division";
import {Discount} from "./discount";

export class Order {
    currentDivision: Division;
    desiredDivision: Division;
    discount?: Discount;

    constructor(currentDivision: Division, desiredDivision: Division, discount?: Discount) {
        this.currentDivision = currentDivision;
        this.desiredDivision = desiredDivision;
        this.discount = discount;
    }


}
