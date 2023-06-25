export class DivisionOrderError extends Error {
    constructor() {
        super("current division should have order bellow desired division");
    }
}
