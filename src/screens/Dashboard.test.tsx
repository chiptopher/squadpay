import * as React from "react";

import {mount} from 'enzyme'
import {Dashboard} from "./Dashboard";

describe('Dashboard', () => {
    function mountScreen() {
        return mount(<Dashboard/>);
    }

    function addSquadMate(subject: any, squadMateName: string, contribution: number) {

        const plusButton = subject.find("#squadMemberAddActivate");
        plusButton.simulate("click");

        subject.update();

        const newMemberNameInput = subject.find("#squadMemberAddName");
        newMemberNameInput.simulate('change', {target: {value: squadMateName}});

        const newMemberContributionInput = subject.find("#squadMemberAddContribution");
        newMemberContributionInput.simulate('change', {target: {value: contribution}});

        subject.update();

        const newPlusButton = subject.find("#squadMemberAddActivate");
        newPlusButton.simulate("click");

        let update = subject.update();

        return update;
    }

    describe('Adding a squad member', () => {
        it('should display them in the squad list', () => {
            const subject = addSquadMate(mountScreen(), 'Squad Mate 1', 100);
            expect(subject.text()).toContain('Squad Mate 1');
        });
        it("should display their contribution amount", () => {
            const subject = addSquadMate(mountScreen(), "Squad Mate 1", 100);
            expect(subject.text()).toContain("Squad Mate 1 contributed $100.00");
        });
        it("adding a member should hide the input", () => {
            const subject = addSquadMate(mountScreen(), 'Squad Mate 1', 100);
            expect(subject.find("#squadMemberAddName")).toHaveLength(0);
        });
        it("should show the cost of the trip on the page", () => {
            const subject = addSquadMate(mountScreen(), "Squad Mate 1", 100.0);
            expect(subject.text()).toContain("Trip Cost: $100.00");
        })
    });
});
