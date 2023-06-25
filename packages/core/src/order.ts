import {Division} from "./division";

export class Order {
    currentDivision: Division;
    desiredDivision: Division;

    constructor(currentDivision: Division, desiredDivision: Division) {
        this.currentDivision = currentDivision;
        this.desiredDivision = desiredDivision;
    }


}
