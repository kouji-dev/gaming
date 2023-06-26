import {OrderOptionsService} from "./order-options.service";

const inputAmount = 100;

let orderOptionsService: OrderOptionsService;

beforeEach(() => {
    orderOptionsService = new OrderOptionsService();
})

describe('Order Options Service', function () {
    test("should return same amount if there is not option used", () => {
        const amount = orderOptionsService.applyOptions(inputAmount);
        expect(amount).toBe(inputAmount);
    })

    test("should increase the amount by 20% if there is soloOnly option", () => {
        const amount = orderOptionsService.applyOptions(inputAmount, ["soloOnly"]);
        expect(amount).toBe(inputAmount * 1.2);
    })

    test("should increase the amount by 15% if there is streamGames option", () => {
        const amount = orderOptionsService.applyOptions(inputAmount, ["streamGames"]);
        expect(amount).toBe(inputAmount * 1.15);
    })

    test("should increase the amount by 25% + 15% = 40% if there is priorityBoost + streamGames options", () => {
        const amount = orderOptionsService.applyOptions(inputAmount, ["priorityBoost", "streamGames"]);
        expect(amount).toBe(inputAmount * 1.4);
    })
});
