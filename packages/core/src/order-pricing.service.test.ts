import {OrderPricingService} from "./order-pricing.service";
import {Order} from "./order";
import {Division} from "./division";

// this is just a price mock per division
const pricePerDivision = 5;

let orderPricingService: OrderPricingService;

let currentDivision: Division;
let desiredDivision: Division;
let totalPrice = pricePerDivision * 4;

let divisions: Division[];


beforeEach(() => {
    orderPricingService = new OrderPricingService();

    divisions = [
        new Division("bronze I", pricePerDivision),
        new Division("silver IV", pricePerDivision),
        new Division("silver III", pricePerDivision),
        new Division("silver II", pricePerDivision),
        new Division("silver I", pricePerDivision),
    ]

    currentDivision = new Division("bronze I", pricePerDivision);
    desiredDivision = new Division("silver I", pricePerDivision);
    totalPrice = pricePerDivision * 4;
})

describe('Order Pricing Service', function () {
    test("should return 5 if order is from bronze I to silver IV", () => {
        const order = new Order(currentDivision, new Division("silver IV", pricePerDivision));
        const price: number = orderPricingService.price(order, divisions.slice(0, 2));
        expect(price).toEqual(pricePerDivision);
    })

    test("should return sum of price per division between currentDivision and desiredDivision", () => {
        const order = new Order(currentDivision, desiredDivision);
        const price: number = orderPricingService.price(order, divisions);
        expect(price).toEqual(totalPrice);
    })

    test("should throw DivisionOrderError with message 'current division should have order bellow desired division'", () => {
        const order = new Order(desiredDivision, currentDivision);
        expect(() => orderPricingService.price(order, divisions))
            .toThrow(/current division should have order bellow desired division/)
    })
});
