import * as React from "react";

import {mount} from 'enzyme'
import {Dashboard} from "./Dashboard";
import {formatNameToId} from "../models/Member";

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

    function addContributionToSquadMateWithName(subject: any, name: string, contributionName: string, contributionAmount: number) {
        const formattedName = formatNameToId(name);
        subject.find(`#${formattedName}-contribution`).simulate('click');
        subject.find(`#${formattedName}-contribution-name-input`).find('input').simulate('change', {target: {value: 'Name'}});
        subject.find(`#${formattedName}-contribution-input`).find('input').simulate('change', {target: {value: 1.0}});
        subject.find(`#${formattedName}-contribution-submit`).simulate('click');
        return subject.update();
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
            subject.update();
            expect(subject.html()).toContain('Name $1.00')
        });
        it('it should give the option to view how much is owed from other people', () => {
            let subject = addSquadMate(mountScreen(), 'Squad Mate 1');
            subject = addSquadMate(subject, 'Squad Mate 2');
            addContributionToSquadMateWithName(subject, 'Squad Mate 1', 'name1', 10.0);
            addContributionToSquadMateWithName(subject, 'Squad Mate 2', 'name2', 8.0);
            subject.find('#squad-mate-1').simulate('click');
            expect(subject.html()).toContain('Payments')
        });
        describe('selecting payments', () => {
            it('should list the other squad members', () => {
                let subject = addSquadMate(mountScreen(), 'Squad Mate 1');
                subject = addSquadMate(subject, 'Squad Mate 2');
                addContributionToSquadMateWithName(subject, 'Squad Mate 1', 'name1', 10.0);
                addContributionToSquadMateWithName(subject, 'Squad Mate 2', 'name2', 8.0);
                subject.find('#squad-mate-1').simulate('click');
                subject.find('.tab').simulate('click');
                subject.update();
                expect(subject.html()).toContain('Owed by Squad Mate 2')
            });
            it('should display the amounts owed to and from each member', () => {
                let subject = addSquadMate(mountScreen(), 'Squad Mate 1');
                subject = addSquadMate(subject, 'Squad Mate 2');
                addContributionToSquadMateWithName(subject, 'Squad Mate 1', 'name1', 10.0);
                addContributionToSquadMateWithName(subject, 'Squad Mate 2', 'name2', 8.0);
                subject.find('#squad-mate-1').simulate('click');
                subject.find('.tab').simulate('click');
                subject.update();
                expect(subject.html()).toContain('Owed by Squad Mate 2')
            });
        })
    })
});
