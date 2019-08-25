import * as React from "react";

import {mount} from 'enzyme'
import {Dashboard} from "./Dashboard";
import {formatMemberToId, formatNameToId} from "../models/Member";
import {findByText, fireEvent, render, wait} from "@testing-library/react";

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

    function addSquadMate2(getByTestId: (i: string) => any, getByPlaceholderText: (i: string) => any, name: string) {
        fireEvent.click(getByTestId('add-person'));
        fireEvent.change(getByPlaceholderText('Squad Member'), {target: {value: name}});
        fireEvent.click(getByTestId('add-person'));
    }

    function addContributionToSquadMateWithName2(config: {
        getByTestId: (i: string) => any,
        getByPlaceholderText: (i: string) => any,
        getByText: (i: string) => any,
        squadMemberName: string,
        contributionAmount: number,
        contributionName: string
    }) {
        fireEvent.click(config.getByTestId(formatNameToId(config.squadMemberName) + '-add-contribution'));
        fireEvent.change(config.getByPlaceholderText('32.50'), {target: {value: config.contributionAmount}});
        fireEvent.change(config.getByPlaceholderText('Pizza and Drinks'), {target: {value: config.contributionName}});
        fireEvent.click(config.getByTestId('submit'));
    }

    function addContributionToSquadMateWithName(subject: any, name: string, contributionName: string, contributionAmount: number) {
        const formattedName = formatNameToId(name);
        subject.find(`#${formattedName}-contribution`).simulate('click');
        subject.find(`#${formattedName}-contribution-name-input`).find('input').simulate('change', {target: {value: contributionName}});
        subject.find(`#${formattedName}-contribution-input`).find('input').simulate('change', {target: {value: contributionAmount}});
        subject.find(`#${formattedName}-contribution-submit`).simulate('click');
        return subject.update();
    }

    describe('Adding a squad member', () => {
        test('should display them in squad list', async () => {
            const {getByTestId, getByText, getByPlaceholderText} = render(<Dashboard/>);
            fireEvent.click(getByTestId('add-person'));
            fireEvent.change(getByPlaceholderText('Squad Member'), {target: {value: 'Squad Mate 1'}});
            fireEvent.click(getByTestId('add-person'));
            await wait(() => {
                expect(getByText('Squad Mate 1'));
            });
        });
        test('submitting should hide the input', async () => {
            const {getByTestId, getByPlaceholderText, queryByPlaceholderText} = render(<Dashboard/>);
            fireEvent.click(getByTestId('add-person'));
            fireEvent.change(getByPlaceholderText('Squad Member'), {target: {value: 'Squad Mate 1'}});
            fireEvent.click(getByTestId('add-person'));
            await wait(() => {
                expect(queryByPlaceholderText('Squad Member')).toBeNull();
            });
        });
    });

    describe('Adding an expense to a user', () => {
        test('should increase the overall cost of the trip', async () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            fireEvent.click(getByText('Squad Mate 1'));
            fireEvent.click(getByTestId('squad-mate-1-add-contribution'));
            fireEvent.change(getByPlaceholderText('32.50'), {target: {value: 1.0}});
            fireEvent.click(getByTestId('submit'));
            await wait(() => {
                getByText('Total Cost $1.00');
            });
        });
    });
    describe('toggling a user', () => {
        test('should increase the overall cost of the trip', async () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            fireEvent.click(getByText('Squad Mate 1'));
            fireEvent.click(getByTestId('squad-mate-1-add-contribution'));
            fireEvent.change(getByPlaceholderText('32.50'), {target: {value: 1.0}});
            fireEvent.click(getByTestId('submit'));
            await wait(() => {
                getByText('Total Cost $1.00');
            });
        });
        test('should show the contribution under the squad member', async () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            addContributionToSquadMateWithName2({
                getByTestId,
                getByPlaceholderText,
                getByText,
                squadMemberName: 'Squad Mate 1',
                contributionName: 'Name',
                contributionAmount: 1.0
            });
            fireEvent.click(getByText('Squad Mate 1'));
            await wait(() => {
                getByText('Name $1.00');
            });
        });
        test('it should give the option to view how much is owed from other people', async () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 2');
            addContributionToSquadMateWithName2({
                getByTestId,
                getByPlaceholderText,
                getByText,
                squadMemberName: 'Squad Mate 1',
                contributionName: 'name1',
                contributionAmount: 10.0
            });
            addContributionToSquadMateWithName2({
                getByTestId,
                getByPlaceholderText,
                getByText,
                squadMemberName: 'Squad Mate 2',
                contributionName: 'name2',
                contributionAmount: 8.0
            });
            fireEvent.click(getByText('Squad Mate 1'));
            await wait(() => {
                expect(getByText('Payments'));
            });
        });
        describe('selecting payments', () => {
            test('should list the other squad members', async () => {
                const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
                addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 1');
                addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 2');
                addContributionToSquadMateWithName2({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 1',
                    contributionName: 'name1',
                    contributionAmount: 10.0
                });
                addContributionToSquadMateWithName2({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 2',
                    contributionName: 'name2',
                    contributionAmount: 8.0
                });
                fireEvent.click(getByText('Squad Mate 1'));
                fireEvent.click(getByText('Payments'));
                await wait(() => {
                    expect(getByText('Owed by Squad Mate 2'));
                });
            });
            test('should display the amounts owed to and from each member', async () => {
                const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
                addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 1');
                addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 2');
                addContributionToSquadMateWithName2({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 1',
                    contributionName: 'name1',
                    contributionAmount: 10.0
                });
                addContributionToSquadMateWithName2({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 2',
                    contributionName: 'name2',
                    contributionAmount: 8.0
                });
                fireEvent.click(getByText('Squad Mate 1'));
                fireEvent.click(getByText('Payments'));
                await wait(() => {
                    expect(getByText('$1.00'));
                });
            });
            test("should say 'owed to' if the the member owes money to a person in the list", async () => {
                const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
                addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 1');
                addSquadMate2(getByTestId, getByPlaceholderText, 'Squad Mate 2');
                addContributionToSquadMateWithName2({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 1',
                    contributionName: 'name1',
                    contributionAmount: 8.0
                });
                addContributionToSquadMateWithName2({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 2',
                    contributionName: 'name2',
                    contributionAmount: 10.0
                });
                fireEvent.click(getByText('Squad Mate 1'));
                fireEvent.click(getByText('Payments'));
                await wait(() => {
                    expect(getByText('Owed to', {exact: false}));
                });
            });
        })
    })
});
