import * as React from "react";

import "./TabSelector.scss";
import {useState} from "react";

export interface TabElement {
    name: string;
}

interface Props {
    tabs: TabElement[];
    onTabSelected: (chosenTab: TabElement) => void
}

export const TabSelector: React.FunctionComponent<Props> = (props) => {
    const [selectedTab, setSelectedTab] = useState(props.tabs[0]);
    return <div className={'tab-selector'}>
        <div className={'tabs'} onClick={(event) => event.stopPropagation()}>
        {
            props.tabs.map((tab) => {
                return <div key={tab.name}
                            className={tab === selectedTab ? 'selected-tab' : 'tab'}
                            onClick={() => {
                                setSelectedTab(tab);
                                props.onTabSelected(tab)
                            }}>
                    {tab.name}
                </div>
            })
        }
        </div>
        <div>{props.children}</div>
    </div>
};
