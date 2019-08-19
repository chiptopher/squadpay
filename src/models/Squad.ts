import {Member} from "./Member";

export class Squad {
    squadMembers: Member[];

    constructor() {
        this.squadMembers = [];
    }

    addSquadMember(member: Member) {
        this.squadMembers.push(member);
    }

    /**
     * @deprecated
     */
    costOfTrip(): number {
        if (this.squadMembers.length === 0) {
            return 0;
        }
        return this.squadMembers.reduce((prev, current) => {
            return {
                name: "",
                contribution: prev.contribution + current.contribution
            };
        }).contribution;
    }

    otherSquadMembers(member: Member): Member[] {
        return this.squadMembers.filter((element) => element !== member );
    }

    totalCostOfContributions(): number {
        if (this.squadMembers.length === 0) {
            return 0;
        }
        let total = 0;
        this.squadMembers.forEach((member) => {
            let memberTotal = 0;
            if (member.contributions) {
                member.contributions.forEach(contribution => memberTotal += contribution.amount)
            }
            total += memberTotal;
        });
        return total;
    }

    debtOfMemberToMember(member1: Member, member2: Member): number {
        if (this.memberOverpaid(member1) && this.memberOverpaid(member2)) {
            return 0;
        } else if (!this.memberOverpaid(member1) && !this.memberOverpaid(member2)) {
            return 0;
        } else if (this.memberOverpaid(member1) || this.memberOverpaid(member2)) {
            const overpaidMember = this.memberOverpaid(member1) ? member1 : member2;
            const underpaidMember = this.memberOverpaid(member2) ? member1 : member2;

            const costOfTrip = this.costOfTrip();
            const contributionPerMember = costOfTrip / this.squadMembers.length;
            let amount = (contributionPerMember - underpaidMember.contribution) * (overpaidMember.contribution / this.overpaidTotal());
            return this.memberOverpaid(member1) ? -1 * amount : amount;
        }
        throw new Error("it broke");
    }

    expectedContributionPerMember(): number {
        return this.costOfTrip() / this.squadMembers.length;
    }

    memberOverpaid(member: Member): boolean {
        return member.contribution > this.expectedContributionPerMember();
    }

    overpaidTotal(): number {
        return this.overpaidMembers().reduce((prev, current) => {
            return {
                name: "",
                contribution: prev.contribution + current.contribution
            }
        }).contribution
    }

    overpaidMembers(): Member[] {
        return this.squadMembers.filter(this.memberOverpaid, this);
    }
}
