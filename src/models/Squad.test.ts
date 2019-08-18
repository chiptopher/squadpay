import {Member} from "./Member";
import {Squad} from "./Squad";
import {Contribution} from "./Contribution";

function createMember(name: string, contribution: number): Member {
    return {name, contribution}
}

describe("Member", () => {
    describe("addMember", () => {
        it("should add the member to the squad", () => {
            const member: Member = {
                name: "name",
                contribution: 100.0
            };
            const squad = new Squad();
            squad.addSquadMember(member);
            expect(squad.squadMembers).toContain(member);
        });
    });

    describe("costOfTrip", () => {
        it("should calculate the total cost of the trip", () => {
            const member1: Member = {
                name: "name1",
                contribution: 25.0,
                contributions: [new Contribution('', 25)]
            };
            const member2: Member = {
                name: "name2",
                contribution: 25.0,
                contributions: [new Contribution('', 25)]
            };
            const squad = new Squad();
            squad.addSquadMember(member1);
            squad.addSquadMember(member2);
            expect(squad.costOfTrip()).toEqual(50.0);
        });
        it("should result in zero when there are no members", () => {
            const squad = new Squad();
            expect(squad.costOfTrip()).toEqual(0);
        });
    });
    describe("totalCostOfContributions", () => {
        it("should calculate the total cost of the trip", () => {
            const member1: Member = {
                name: "name1",
                contribution: 0.0,
                contributions: [new Contribution('', 25)]
            };
            const member2: Member = {
                name: "name2",
                contribution: 0.0,
                contributions: [new Contribution('', 25)]
            };
            const squad = new Squad();
            squad.addSquadMember(member1);
            squad.addSquadMember(member2);
            expect(squad.totalCostOfContributions()).toEqual(50.0);
        });
        it("should result in zero when there are no members", () => {
            const squad = new Squad();
            expect(squad.totalCostOfContributions()).toEqual(0);
        });
    });
    describe("getDebtOfMemberToMember", () => {
        describe("when there are two members that paid different ammounts", () => {
            it("should calculate the negative when the first member payed more than the second member", () => {
                const member1 = createMember("name1", 100);
                const member2 = createMember("name2", 50);

                const squad = new Squad();
                squad.addSquadMember(member1);
                squad.addSquadMember(member2);

                expect(squad.debtOfMemberToMember(member1, member2)).toEqual(-25);
            });
            it("should calculate a postitive debt when the first member is ows money to the second member", () => {
                const memberThatPayedMore = createMember("name1", 100);
                const memberThatPayedLess = createMember("name2", 50);

                const squad = new Squad();
                squad.addSquadMember(memberThatPayedMore);
                squad.addSquadMember(memberThatPayedLess);

                expect(squad.debtOfMemberToMember(memberThatPayedLess, memberThatPayedMore)).toEqual(25);
            });
        });
        describe("when two members overpaid and one underpaid", () => {
            const memberThatPayedMost = createMember("name1", 100);
            const memberThatPayedMiddle = createMember("name2", 80);
            const memberThatPayedLeast = createMember("name3", 20);
            const squad = new Squad();

            beforeEach(() => {
                squad.addSquadMember(memberThatPayedMost);
                squad.addSquadMember(memberThatPayedMiddle);
                squad.addSquadMember(memberThatPayedLeast);
            });
            it("should calculate the debt of the underpaid to both overpaid", () => {
                let underpaidAmount = squad.expectedContributionPerMember() - memberThatPayedLeast.contribution;
                let debtToMemberThatPayedMost = underpaidAmount * (memberThatPayedMost.contribution / squad.overpaidTotal());
                expect(squad.debtOfMemberToMember(memberThatPayedLeast, memberThatPayedMost)).toEqual(debtToMemberThatPayedMost);
                let debtToMemberThatPayedMiddle = underpaidAmount * (memberThatPayedMiddle.contribution / squad.overpaidTotal());
                expect(squad.debtOfMemberToMember(memberThatPayedLeast, memberThatPayedMiddle)).toEqual(debtToMemberThatPayedMiddle);
            });
            it("should not register a debt for a member that overpaid for another that overpaid", () => {
                expect(squad.debtOfMemberToMember(memberThatPayedMost, memberThatPayedMiddle)).toEqual(0);
                expect(squad.debtOfMemberToMember(memberThatPayedMiddle, memberThatPayedMost)).toEqual(0);
            });
        });

        describe("when two members underpaid and one overpayed", () => {
            const memberThatPayedMost = createMember("name1", 100);
            const memberThatPayedMiddle = createMember("name2", 10);
            const memberThatPayedLeast = createMember("name3", 5);
            const squad = new Squad();

            beforeEach(() => {
                squad.addSquadMember(memberThatPayedMost);
                squad.addSquadMember(memberThatPayedMiddle);
                squad.addSquadMember(memberThatPayedLeast);
            });
            it("shouldn't register debt between two underpayers", () => {
                expect(squad.debtOfMemberToMember(memberThatPayedMiddle, memberThatPayedLeast)).toEqual(0);
                expect(squad.debtOfMemberToMember(memberThatPayedLeast, memberThatPayedMiddle)).toEqual(0);
            });
        });

        describe("when two members overpaid and two underpaid", () => {
            const memberThatOverpaidMore = createMember("name1", 120);
            const memberThatOverpaidLess = createMember("name2", 110);
            const memberThatUnderpaidLess = createMember("name3", 35);
            const memberThatUnderpaidMore = createMember("name4", 10);
            const squad = new Squad();

            const amountOverpaid = (memberThatOverpaidMore.contribution + memberThatOverpaidLess.contribution);
            const memberOverpaidMorePercent = memberThatOverpaidMore.contribution / amountOverpaid;
            const memberOverpaidLessPercent = memberThatOverpaidLess.contribution / amountOverpaid;

            beforeEach(() => {
                squad.addSquadMember(memberThatOverpaidMore);
                squad.addSquadMember(memberThatOverpaidLess);
                squad.addSquadMember(memberThatUnderpaidLess);
                squad.addSquadMember(memberThatUnderpaidMore);
            });

            it("should equally divide the debt owed by each debtor to those that overpaid", () => {
                let underpaidLessUnderpaymentAmount = squad.expectedContributionPerMember() - memberThatUnderpaidLess.contribution;
                const memberUnderpaidLessDebtToOverpaidMore = underpaidLessUnderpaymentAmount * memberOverpaidMorePercent;
                expect(squad.debtOfMemberToMember(memberThatUnderpaidLess, memberThatOverpaidMore)).toEqual(memberUnderpaidLessDebtToOverpaidMore);
                expect(squad.debtOfMemberToMember(memberThatOverpaidMore, memberThatUnderpaidLess)).toEqual(-1 * memberUnderpaidLessDebtToOverpaidMore);
                const underpaidLessDebtToOverpaidLess = underpaidLessUnderpaymentAmount * memberOverpaidLessPercent;
                expect(squad.debtOfMemberToMember(memberThatUnderpaidLess, memberThatOverpaidLess)).toEqual(underpaidLessDebtToOverpaidLess);
                expect(squad.debtOfMemberToMember(memberThatOverpaidLess, memberThatUnderpaidLess)).toEqual(-1 * underpaidLessDebtToOverpaidLess);
            });
        });
    });
});
