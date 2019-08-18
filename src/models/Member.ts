import {Contribution} from "./Contribution";


export interface Member {
    name: string;
    /**
     * @deprecated
     */
    contribution: number;
    contributions?: Contribution[];
}

export function formatNameToId(member: Member): string {
    return member.name.replace(/\s+/g, "-").toLowerCase();
}

export function addContributions(member: Member, name: string, amount: number) {
    if (member.contributions === undefined) {
        member.contributions = [];
    }
    member.contributions.push(new Contribution(name, amount));
}
