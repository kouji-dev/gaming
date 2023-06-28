import {Discount} from "./discount";
import {DiscountType} from "./discountType";
import {DiscountService} from "./discount.service";

const fakeAmount = 100;

let discountService: DiscountService;

beforeEach(() => {
    discountService = new DiscountService();
})

describe('Discount Service', function () {

    test("should apply flat discount of 10$ to the amount of 100$", () => {
        const discountAmount = 10;
        const discount = new Discount(discountAmount)
        const amount: number = discountService.applyDiscount(fakeAmount, discount);
        expect(amount).toEqual(fakeAmount - discountAmount);
    })

    test("should apply a discount of 10% to 100$", () => {
        const discountPercentage = 10;
        const discount = new Discount(discountPercentage, DiscountType.PERCENT)
        const amount: number = discountService.applyDiscount(fakeAmount, discount);
        expect(amount).toEqual(fakeAmount * (100 - discountPercentage));
    })
});
