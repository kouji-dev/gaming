const OPTIONS = {
    soloOnly: 0.2,
    streamGames: .15,
    priorityBoost: .25
}

export type Options = (keyof typeof OPTIONS)[]

export class OrderOptionsService {

    applyOptions(amount: number, options?: Options) {
        if (options) return options.reduce((acc, curr) => acc + OPTIONS[curr], 1) * amount;
        return amount;
    }
}
