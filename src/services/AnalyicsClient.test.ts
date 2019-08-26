import {create} from "./AnalyticsClient";
import ReactGA from 'react-ga';


describe('create', () => {
    let AnalyticsClient: any;
    beforeEach(() => {
        jest.clearAllMocks();
        AnalyticsClient = create({trackingId: 'trackingid'});
    });
    describe('instantiation', () => {
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
    describe('when not given a tracking id', () => {
        it('should not send any analytics events', () => {
            const client = create({});
            client.event('name', 'action');
            expect(ReactGA.event).not.toHaveBeenCalled();
            client.modalView('name');
            expect(ReactGA.modalview).not.toHaveBeenCalled();
            client.pageView('name');
            expect(ReactGA.pageview).not.toHaveBeenCalled();
        });

    });
});
