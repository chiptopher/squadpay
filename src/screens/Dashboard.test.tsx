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

    describe('Adding an expense to a user', () => {
        it('should increase the overall cost of the trip', () => {
            const subject = addSquadMate(mountScreen(), 'Squad Mate 1');
            subject.find('#squad-mate-1-contribution').simulate('click');
            subject.find('#squad-mate-1-contribution-input').find('input').simulate('change', {target: {value: 1.0}});
            subject.find('#squad-mate-1-contribution-submit').simulate('click');
            subject.update();
            subject.update();
            expect(subject.html()).toContain('Total Cost $1.00');
        });
    });
    describe('toggling a user', () => {
        it('should show the contribution under the squad member', () => {
            const subject = addSquadMate(mountScreen(), 'Squad Mate 1');
            subject.find('#squad-mate-1-contribution').simulate('click');
            subject.find('#squad-mate-1-contribution-name-input').find('input').simulate('change', {target: {value: 'Name'}});
            subject.find('#squad-mate-1-contribution-input').find('input').simulate('change', {target: {value: 1.0}});
            subject.find('#squad-mate-1-contribution-submit').simulate('click');
            subject.find('#squad-mate-1').simulate('click');
            expect(subject.html()).toContain('Name $1.00')
        });
    })
});
