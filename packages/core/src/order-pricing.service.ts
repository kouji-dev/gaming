import {Order} from "./order";
import {Division} from "./division";
import {DivisionOrderError} from "./division-order.error";

export class OrderPricingService {

    public price(order: Readonly<Order>, divisions: ReadonlyArray<Division>) {
        const currentDivisionIndex = this.getDivisionIndex(divisions, order.currentDivision);
        const desiredDivisionIndex = this.getDivisionIndex(divisions, order.desiredDivision);

        this.validateDivisions(currentDivisionIndex, desiredDivisionIndex);

        return this.sumDivisionsPrice(currentDivisionIndex, desiredDivisionIndex, divisions);
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
