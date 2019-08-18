import * as React from "react";
import {formatNameToId, Member} from "../../models/Member";
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


interface Props {
    member: Member
    squad: Squad
    addContribution: (name: string, amount: number) => void
}

export function MemberListElement(props: Props) {
    const [showModal, setShowModal] = useState(false);
    const [toggled, setToggled] = useState(false);

    const submitContributionOnClick = (name: string, amount: number) => {
        setShowModal(false);
        props.addContribution(name, amount);
    };

    const toggleContributionsList = () => {
        setToggled(!toggled);
    };

    const toggleModal = (event: any) => {
        event.stopPropagation();
        setShowModal(true);
    };


    return <div className={"MemberListElement"}>
        <div>
            <div className={"member-content"} id={formatNameToId(props.member)} onClick={toggleContributionsList}>
                <div className={'member-header'}>
                    <div className={'member-name-and-button'}>
                        <span className={'name-text'}>{props.member.name}</span>
                        <div className={'button-container'}>
                            <button id={createContributionId(props.member)}
                                    className={'button-small'}
                                    onClick={toggleModal}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                        </div>
                    </div>
                    <ToggleArrow toggled={toggled}/>
                </div>
                {
                    toggled && <ContributionsList member={props.member}/>
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
