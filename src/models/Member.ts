import {Contribution} from "./Contribution";


export class Member {
    name: string;
    contributions: Contribution[];

    constructor(name: string, contributions: Contribution[] = []) {
        this.name = name;
        this.contributions = contributions;
    }

    public totalCostOfContributions() {
        let total = 0;
        this.contributions.forEach((contribution) => {
            total += contribution.amount;
        });
        return total;
    }

}

export function formatMemberToId(member: Member): string {
    return formatNameToId(member.name);
}

export function formatNameToId(name: string): string {
    return name.replace(/\s+/g, "-").toLowerCase();
}

export function addContributions(member: Member, name: string, amount: number) {
    if (member.contributions === undefined) {
        member.contributions = [];
    }
    member.contributions.push(new Contribution(name, amount));
}
