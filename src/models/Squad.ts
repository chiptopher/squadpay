import {Member} from "./Member";

export class Squad {
    squadMembers: Member[];

    constructor() {
        this.squadMembers = [];
    }

    addSquadMember(member: Member) {
        this.squadMembers.push(member);
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
            total += member.totalCostOfContributions();
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

            const costOfTrip = this.totalCostOfContributions();
            const contributionPerMember = costOfTrip / this.squadMembers.length;
            let amount = (contributionPerMember - underpaidMember.totalCostOfContributions()) * (overpaidMember.totalCostOfContributions() / this.overpaidTotal());
            return this.memberOverpaid(member1) ? -1 * amount : amount;
        }
        throw new Error("it broke");
    }

    expectedContributionPerMember(): number {
        return this.totalCostOfContributions() / this.squadMembers.length;
    }

    memberOverpaid(member: Member): boolean {
        return member.totalCostOfContributions() > this.expectedContributionPerMember();
    }

    overpaidTotal(): number {
        let total = 0;
        this.overpaidMembers().forEach((member) => {
            total += member.totalCostOfContributions();
        });
        return total;
    }

    overpaidMembers(): Member[] {
        return this.squadMembers.filter(this.memberOverpaid, this);
    }
}
