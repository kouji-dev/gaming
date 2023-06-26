import {DiscountType} from "./discountType";

export class Discount {
    type: DiscountType;
    amount: number;

    constructor(amount: number, type?: DiscountType) {
        this.amount = amount;
        this.type = type || DiscountType.FLAT;
    }

}
