import * as React from "react";

import {mount} from 'enzyme'
import {Dashboard} from "./Dashboard";

describe('Dashboard', () => {
    function mountScreen() {
        return mount(<Dashboard/>);
    }

    function addSquadMate(subject: any, squadMateName: string) {

        const plusButton = subject.find("#squadMemberAddActivate");
        plusButton.simulate("click");

        subject.update();

        const newMemberNameInput = subject.find("#squadMemberAddName").find('input');
        newMemberNameInput.simulate('change', {target: {value: squadMateName}});

        subject.update();

        const newPlusButton = subject.find("#squadMemberAddActivate");
        newPlusButton.simulate("click");

        let update = subject.update();

        return update;
    }

    describe('Adding a squad member', () => {
        it('should display them in the squad list', () => {
            const subject = addSquadMate(mountScreen(), 'Squad Mate 1');
            expect(subject.text()).toContain('Squad Mate 1');
        });
        it("adding a member should hide the input", () => {
            const subject = addSquadMate(mountScreen(), 'Squad Mate 1');
            expect(subject.find("#squadMemberAddName")).toHaveLength(0);
        });
    });
});
