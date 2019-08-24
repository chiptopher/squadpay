jest.mock("react-ga");

import AnalyticsClient from "./AnalyticsClient";
import a1 from "./AnalyticsClient";
import a2 from "./AnalyticsClient";
import ReactGA from "react-ga";

describe('AnalyticsClient', () => {
    describe('instantiation', () => {
        it('there should only be one instance', () => {
            expect(a1).toBe(a2);
        });
        it('should only initialize react-ga once', () => {
            expect(ReactGA.initialize).toHaveBeenCalledTimes(1);
        });
    });
    describe('modalView', () => {
        it('should call react-ga modal view', () => {
            AnalyticsClient.modalView('modal name');
            expect(ReactGA.modalview).toHaveBeenCalledWith('modal name');
        });
    });
    describe('event', () => {
        it('should call react-ga with the event information', () => {
            AnalyticsClient.event('Subscribe', 'Confirm Button Click');
            expect(ReactGA.event).toHaveBeenCalledWith({category: 'Subscribe', action: 'Confirm Button Click'})
        });
    });
    describe('pageView', () => {
        it('should call react-ga with the page view information', () => {
            AnalyticsClient.pageView('/page');
            expect(ReactGA.pageview).toHaveBeenCalledWith('/page');
        });
    });
});
