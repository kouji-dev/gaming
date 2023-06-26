import {Discount} from "./discount";
import {DiscountType} from "./discountType";

export class DiscountService {
    public applyDiscount(discount: Discount | undefined, totalDivisionsPrice: number) {
        if (discount) {
            switch (discount.type) {
                case DiscountType.FLAT:
                    return totalDivisionsPrice - discount.amount;
                case DiscountType.PERCENT:
                    return totalDivisionsPrice * (100 - discount.amount)
            }
        }
        return totalDivisionsPrice;
    }
}
