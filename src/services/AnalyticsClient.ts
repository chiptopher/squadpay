import ReactGA from "react-ga";


interface AnalyticsConfig {
    trackingId: string
}

interface AnalyticsClientImpl {
    modalView: (name: string) => void
    event: (groupName: string, action: string) => void
    pageView: (name: string) => void
}

function create(config: AnalyticsConfig): AnalyticsClientImpl {
    ReactGA.initialize(config.trackingId);
    return {
        modalView: (name: string) => {
            ReactGA.modalview(name);
        },
        event: (groupName: string, action: string) => {
            ReactGA.event({category: groupName, action: action});
        },
        pageView: (name: string) => {
            ReactGA.pageview(name);
        }
    };
}

export default create({
    trackingId: ''
});
