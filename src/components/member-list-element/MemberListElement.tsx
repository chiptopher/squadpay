import * as React from "react";
import {Squad} from "../../models/Squad";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {Modal} from "../Modal";
import {useState} from "react";
import {InputWithLabel} from "../InputWithLabel";
import {ContributionListElement} from "./ContributionListElement";
import {Contribution} from "../../models/Contribution";
import {faAngleDown, faAngleRight} from "@fortawesome/free-solid-svg-icons";

import "./MemberListElement.scss";
import {ToggleArrow} from "./ToggleArrow";
import {createContributionId} from "./helpers";
import {AddContributionModal} from "./AddContributionModal";
import {ContributionsList} from "./ContributionsList";
import {TabElement, TabSelector} from "../TabSelector";
import {formatMemberToId, Member} from "../../models/Member";
import {PaymentsList} from "./PaymentsList";
import AnalyticsClient from "../../services/AnalyticsClient";


interface Props {
    member: Member
    squad: Squad
    addContribution: (name: string, amount: number) => void
}

const CONTRIBUTIONS_TAB = {name: 'Contributions'};
const PAYMENTS_TAB = {name: 'Payments'};

export function MemberListElement(props: Props) {
    const [showModal, setShowModal] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [chosenTab, setChosenTab] = useState(CONTRIBUTIONS_TAB);

    const submitContributionOnClick = (name: string, amount: number) => {
        setShowModal(false);
        props.addContribution(name, amount);
        AnalyticsClient.event('Add Contribution', 'Submit');
    };

    const toggleContributionsList = () => {
        if (!toggled) {
            AnalyticsClient.event('Member Info', 'Toggle Squad Member');
        } else {
            AnalyticsClient.event('Member Info', 'Untoggle Squad Member');
        }
        setToggled(!toggled);
    };

    const toggleModal = (event: any) => {
        event.stopPropagation();
        setShowModal(true);
        AnalyticsClient.event('Add Contribution', 'Toggle Modal');
    };

    const onChosenTabSelect = (chosenTab: TabElement) => {
        setChosenTab(chosenTab);
    };

    function displayTab() {
        if (chosenTab.name === CONTRIBUTIONS_TAB.name) {
            AnalyticsClient.event('Member Info', 'Open Contributions Tab');
            return <ContributionsList member={props.member}/>;
        } else if (chosenTab.name === PAYMENTS_TAB.name) {
            AnalyticsClient.event('Member Info', 'Open Payments Tab');
            return <PaymentsList squad={props.squad} member={props.member}/>;
        }
    }


    return <div className={"MemberListElement"}>
        <div>
            <div className={"member-content"} id={formatMemberToId(props.member)} onClick={toggleContributionsList}>
                <div className={'member-header'}>
                    <div className={'member-name-and-button'}>
                        <span className={'name-text'}>{props.member.name}</span>
                        <div className={'button-container'}>
                            <button data-testid={formatMemberToId(props.member) + "-add-contribution"}
                                    id={createContributionId(props.member)}
                                    className={'button-small'}
                                    onClick={toggleModal}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                        </div>
                    </div>
                    <ToggleArrow toggled={toggled}/>
                </div>
                {
                    toggled && <TabSelector tabs={[CONTRIBUTIONS_TAB, PAYMENTS_TAB]} onTabSelected={onChosenTabSelect}>
                        {displayTab()}
                    </TabSelector>
                }
            </div>
            {
                showModal && <AddContributionModal member={props.member}
                                                   onSubmit={submitContributionOnClick}
                                                   onClose={() => setShowModal(false)}/>
            }
        </div>
    </div>;
}
