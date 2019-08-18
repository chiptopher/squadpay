export class Contribution {
    readonly name: string;
    readonly amount: number;

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }
}
