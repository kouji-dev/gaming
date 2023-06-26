import {Order} from "./order";
import {Division} from "./division";
import {DivisionOrderError} from "./division-order.error";
import {DiscountService} from "./discount.service";

export class OrderPricingService {
    private discountService: DiscountService;

    constructor(discountService: DiscountService) {
        this.discountService = discountService;
    }

    public price(order: Readonly<Order>, divisions: ReadonlyArray<Division>) {
        const currentDivisionIndex = this.getDivisionIndex(divisions, order.currentDivision);
        const desiredDivisionIndex = this.getDivisionIndex(divisions, order.desiredDivision);

        this.validateDivisions(currentDivisionIndex, desiredDivisionIndex);

        const totalDivisionsPrice = this.sumDivisionsPrice(currentDivisionIndex, desiredDivisionIndex, divisions);
        return this.discountService.applyDiscount(order.discount, totalDivisionsPrice);
    }

    private validateDivisions(currentDivisionIndex: number, desiredDivisionIndex: number) {
        if (currentDivisionIndex >= desiredDivisionIndex) {
            throw new DivisionOrderError();
        }
    }

    private getDivisionIndex(divisions: ReadonlyArray<Division>, division: Readonly<Division>) {
        return divisions.findIndex(element => element.key == division.key);
    }

    private sumDivisionsPrice(currentDivisionIndex: number, desiredDivisionIndex: number, divisions: ReadonlyArray<Division>) {
        let price = 0;

        while (currentDivisionIndex < desiredDivisionIndex) {
            price += divisions[currentDivisionIndex++].price;
        }

        return price;
    }
}
