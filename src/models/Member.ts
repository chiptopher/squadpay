import {Contribution} from "./Contribution";


export interface Member {
    name: string;
    /**
     * @deprecated
     */
    contribution: number;
    contributions?: Contribution[];
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
