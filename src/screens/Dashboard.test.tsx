import * as React from "react";

import {Dashboard} from "./Dashboard";
import {formatNameToId} from "../models/Member";
import {fireEvent, render, wait} from "@testing-library/react";

import AnalyticsClient from "../services/AnalyticsClient";
jest.mock("../services/AnalyticsClient");

describe('Dashboard', () => {

    function addSquadMate(getByTestId: (i: string) => any, getByPlaceholderText: (i: string) => any, name: string) {
        fireEvent.click(getByTestId('add-person'));
        fireEvent.change(getByPlaceholderText('Squad Member'), {target: {value: name}});
        fireEvent.click(getByTestId('add-person'));
    }

    function addContributionToSquadMateWithName(config: {
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

    describe('on load', () => {
        test('should create analytics pageview event', () => {
            const {} = render(<Dashboard/>);
            expect(AnalyticsClient.pageView).toHaveBeenCalledWith('/dashboard');
        });
    });

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
        test('should send analytics event', () => {
            const {getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            fireEvent.click(getByTestId('add-person'));
            fireEvent.change(getByPlaceholderText('Squad Member'), {target: {value: 'Squad Mate 1'}});
            fireEvent.click(getByTestId('add-person'));
            expect(AnalyticsClient.event).toHaveBeenCalledWith('Add Member', 'Toggle Input')
        })
    });

    describe('Adding an expense to a user', () => {
        test('should increase the overall cost of the trip', async () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            fireEvent.click(getByText('Squad Mate 1'));
            fireEvent.click(getByTestId('squad-mate-1-add-contribution'));
            fireEvent.change(getByPlaceholderText('32.50'), {target: {value: 1.0}});
            fireEvent.click(getByTestId('submit'));
            await wait(() => {
                getByText('Total Cost $1.00');
            });
        });
        test('should send an analytics event', () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            fireEvent.click(getByText('Squad Mate 1'));
            fireEvent.click(getByTestId('squad-mate-1-add-contribution'));
            fireEvent.change(getByPlaceholderText('32.50'), {target: {value: 1.0}});
            fireEvent.click(getByTestId('submit'));
            expect(AnalyticsClient.event).toHaveBeenCalledWith('Add Contribution', 'Toggle Modal');
            expect(AnalyticsClient.modalView).toHaveBeenCalledWith('Add Contribution Modal');
            expect(AnalyticsClient.event).toHaveBeenCalledWith('Add Contribution', 'Submit');
        })
    });
    describe('toggling a user', () => {
        test('should increase the overall cost of the trip', async () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            fireEvent.click(getByText('Squad Mate 1'));
            fireEvent.click(getByTestId('squad-mate-1-add-contribution'));
            fireEvent.change(getByPlaceholderText('32.50'), {target: {value: 1.0}});
            fireEvent.click(getByTestId('submit'));
            await wait(() => {
                getByText('Total Cost $1.00');
            });
        });
        test('should create an analytics event for toggling the member info', () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            addContributionToSquadMateWithName({
                getByTestId,
                getByPlaceholderText,
                getByText,
                squadMemberName: 'Squad Mate 1',
                contributionName: 'Name',
                contributionAmount: 1.0
            });
            fireEvent.click(getByText('Squad Mate 1'));
            expect(AnalyticsClient.event).toHaveBeenCalledWith('Member Info', 'Toggle Squad Member');
        });
        test('should create an analytics event for opening the contributions tab', () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            addContributionToSquadMateWithName({
                getByTestId,
                getByPlaceholderText,
                getByText,
                squadMemberName: 'Squad Mate 1',
                contributionName: 'Name',
                contributionAmount: 1.0
            });
            fireEvent.click(getByText('Squad Mate 1'));
            expect(AnalyticsClient.event).toHaveBeenCalledWith('Member Info', 'Open Contributions Tab');
        });
        test('untoggling member info should create an analytics event', () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            addContributionToSquadMateWithName({
                getByTestId,
                getByPlaceholderText,
                getByText,
                squadMemberName: 'Squad Mate 1',
                contributionName: 'Name',
                contributionAmount: 1.0
            });
            fireEvent.click(getByText('Squad Mate 1'));
            fireEvent.click(getByText('Squad Mate 1'));
            expect(AnalyticsClient.event).toHaveBeenCalledWith('Member Info', 'Untoggle Squad Member');
        });
        test('should show the contribution under the squad member', async () => {
            const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
            addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            addContributionToSquadMateWithName({
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
            addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
            addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 2');
            addContributionToSquadMateWithName({
                getByTestId,
                getByPlaceholderText,
                getByText,
                squadMemberName: 'Squad Mate 1',
                contributionName: 'name1',
                contributionAmount: 10.0
            });
            addContributionToSquadMateWithName({
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
                addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
                addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 2');
                addContributionToSquadMateWithName({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 1',
                    contributionName: 'name1',
                    contributionAmount: 10.0
                });
                addContributionToSquadMateWithName({
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
                addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
                addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 2');
                addContributionToSquadMateWithName({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 1',
                    contributionName: 'name1',
                    contributionAmount: 10.0
                });
                addContributionToSquadMateWithName({
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
                addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
                addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 2');
                addContributionToSquadMateWithName({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 1',
                    contributionName: 'name1',
                    contributionAmount: 8.0
                });
                addContributionToSquadMateWithName({
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
            test('should send an analytics event for opening the payments tab', () => {
                const {getByText, getByTestId, getByPlaceholderText} = render(<Dashboard/>);
                addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 1');
                addSquadMate(getByTestId, getByPlaceholderText, 'Squad Mate 2');
                addContributionToSquadMateWithName({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 1',
                    contributionName: 'name1',
                    contributionAmount: 10.0
                });
                addContributionToSquadMateWithName({
                    getByTestId,
                    getByPlaceholderText,
                    getByText,
                    squadMemberName: 'Squad Mate 2',
                    contributionName: 'name2',
                    contributionAmount: 8.0
                });
                fireEvent.click(getByText('Squad Mate 1'));
                fireEvent.click(getByText('Payments'));
                expect(AnalyticsClient.event).toHaveBeenCalledWith('Member Info', 'Open Payments Tab');
            })
        })
    })
});
