import {Order} from "./order";
import {Division} from "./division";
import {DivisionOrderError} from "./division-order.error";
import {DiscountService} from "./discount.service";
import {OrderOptionsService} from "./order-options.service";

export class OrderPricingService {
    private discountService: DiscountService;
    private orderOptionsService: OrderOptionsService;

    constructor(discountService: DiscountService, orderOptionsService: OrderOptionsService) {
        this.discountService = discountService;
        this.orderOptionsService = orderOptionsService;
    }

    public price(order: Readonly<Order>, divisions: ReadonlyArray<Division>) {
        const currentDivisionIndex = this.getDivisionIndex(divisions, order.currentDivision);
        const desiredDivisionIndex = this.getDivisionIndex(divisions, order.desiredDivision);

        this.validateDivisions(currentDivisionIndex, desiredDivisionIndex);

        const totalDivisionsPrice = this.sumDivisionsPrice(currentDivisionIndex, desiredDivisionIndex, divisions);
        const priceWithDiscount = this.discountService.applyDiscount(totalDivisionsPrice, order.discount)
        return this.orderOptionsService.applyOptions(priceWithDiscount, order.options);
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
