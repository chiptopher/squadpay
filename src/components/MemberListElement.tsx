import * as React from "react";
import {addContributions, formatNameToId, Member} from "../models/Member";
import {Squad} from "../models/Squad";

import "./MemberListElement.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {Modal} from "./Modal";
import {useState} from "react";
import {InputWithLabel} from "./InputWithLabel";
import {ContributionListElement} from "./ContributionListElement";
import {Contribution} from "../models/Contribution";
import {faAngleDown, faAngleRight, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";

const createButtonId = (member: Member) => formatNameToId(member) + '-contribution';

interface Props {
    member: Member
    squad: Squad
    addContribution: (name: string, amount: number) => void
}

export function MemberListElement(props: Props) {
    const [showModal, setShowModal] = useState(false);
    const [toggled, setToggled] = useState(false);

    const submitContributionOnClick = (name: string, amount: number) => {
        setShowModal(false)
        props.addContribution(name, amount);
    };

    const toggleContributionsList = () => {
        setToggled(!toggled);
    };


    return <div className={"MemberListElement"}>
        <div>
            <div className={"memberHeader"}>
                <div id={formatNameToId(props.member)} onClick={toggleContributionsList}>
                    <ToggleArrow toggled={toggled}/>
                    <span className={'name-text'}>{props.member.name}</span>
                </div>
                <div className={'button-container'}>
                    <button id={createButtonId(props.member)}
                            className={'button-small'}
                            onClick={() => setShowModal(true)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
                {
                    showModal && <AddContributionModal member={props.member}
                                                       onSubmit={submitContributionOnClick}
                                                       onClose={() => setShowModal(false)}/>
                }
            </div>
            {
                toggled && <ShowContributions member={props.member}/>
            }
        </div>
    </div>;
}

const ShowContributions: React.FunctionComponent<{ member: Member }> = (props) => {
    return <div> {
        props.member.contributions && props.member.contributions.map((contribution: Contribution) => {
            return <ContributionListElement key={props.member.name + contribution.name}
                                            contribution={contribution}/>;
        })
    }</div>
};

interface AddContributionModalProps {
    onClose: () => void;
    onSubmit: (name: string, amount: number) => void;
    member: Member;
}

const AddContributionModal: React.FunctionComponent<AddContributionModalProps> = (props) => {
    const [contributionAmount, setContributionAmount] = useState(0.0);
    const [contributionName, setContributionName] = useState('');
    return <Modal onClose={props.onClose}>
        <div>
            <InputWithLabel label={'Contribution Name'}
                            id={createButtonId(props.member) + '-name-input'}
                            onChange={(event: any) => {
                                setContributionName(event.target.value);
                            }}/>
            <InputWithLabel id={createButtonId(props.member) + '-input'}
                            label={'Contribution Amount'}
                            type={'number'}
                            onChange={(event: any) => {
                                setContributionAmount(Number(event.target.value));
                            }}/>
            <button id={createButtonId(props.member) + '-submit'} className={'button-small'}
                    onClick={() => {
                        props.onSubmit(contributionName, contributionAmount)
                    }}>Add Amount
            </button>
        </div>
    </Modal>
};

const ToggleArrow: React.FunctionComponent<{ toggled: boolean }> = (props) => {
    return !props.toggled ? <FontAwesomeIcon icon={faAngleRight}/> :
                            <FontAwesomeIcon icon={faAngleDown}/>;
};
