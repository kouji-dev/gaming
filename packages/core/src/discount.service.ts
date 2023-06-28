import {Discount} from "./discount";
import {DiscountType} from "./discountType";

export class DiscountService {
    public applyDiscount(amount: number, discount?: Discount) {
        if (discount) {
            switch (discount.type) {
                case DiscountType.FLAT:
                    return amount - discount.amount;
                case DiscountType.PERCENT:
                    return amount * (100 - discount.amount)
            }
        }
        return amount;
    }
}
