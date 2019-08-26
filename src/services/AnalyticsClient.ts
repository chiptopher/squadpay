import ReactGA from "react-ga";


interface AnalyticsConfig {
    trackingId?: string
}

interface AnalyticsClientImpl {
    modalView: (name: string) => void
    event: (groupName: string, action: string) => void
    pageView: (name: string) => void
}

export function create(config: AnalyticsConfig): AnalyticsClientImpl {
    if (config.trackingId) {
        ReactGA.initialize(config.trackingId);
    }
    const modalView = config.trackingId ?
        (name: string) => ReactGA.modalview(name) :
        (_: string) => {};
    const event = config.trackingId ?
        (groupName: string, action: string) => ReactGA.event({category: groupName, action: action}) :
        (_: string) => {};
    const pageView = config.trackingId ?
        (name: string) => ReactGA.pageview(name) :
        (_: string) => {};

    return {
        modalView,
        event,
        pageView
    };
}

export default create({
    trackingId: process.env.REACT_APP_ANALYTICS_TRACKING_ID
});
