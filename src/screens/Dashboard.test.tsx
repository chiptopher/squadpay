import * as React from "react";

import {mount} from 'enzyme'
import {Dashboard} from "./Dashboard";

describe('Dashboard', () => {
    function mountScreen() {
        return mount(<Dashboard/>);
    }

    function addSquadMate(subject: any, squadMateName: string) {
        const addSquadMemberInput = subject.find('#squadMateInput');
        addSquadMemberInput.simulate('change', {target: {value: squadMateName}});

        const addSquadMateButton = subject.find('#squadMateButton');
        addSquadMateButton.simulate('click');
    }

    describe('Adding a squad member', () => {
        it('should display them in the squad list', () => {

            const subject = mountScreen();
            addSquadMate(subject, 'Squad Mate 1');

            expect(subject.text()).toContain('Squad Mate 1');
        });
        it('should clear the input when hitting enter', () => {

            const subject = mountScreen();
            addSquadMate(subject, 'Squad Mate 1');

            expect(subject.find('#squadMateInput').props().value).toEqual('');
        });
    });
});
