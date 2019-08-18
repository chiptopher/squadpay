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

const createButtonId = (member: Member) => formatNameToId(member) + '-contribution';

interface Props {
    member: Member
    squad: Squad
    addContribution: (name: string, amount: number) => void
}

export function MemberListElement(props: Props) {
    const [showModal, setShowModal] = useState(false);
    const [contributionAmount, setContributionAmount] = useState(0.0);
    const [contributionName, setContributionName] = useState('');
    const [toggled, setToggled] = useState(false);


    const modalOnClose = () => {
        setShowModal(false)
    };

    const addContributionOnClick = () => {
        setShowModal(true)
    };

    const submitContributionOnClick = (name: string, amount: number) => {
        modalOnClose();
        props.addContribution(contributionName, contributionAmount);
    };

    const toggleContributionsList = () => {
        setToggled(!toggled);
    };


    return <div className={"MemberListElement"}>
        <div>
            <div className={"memberHeader"}>
                <span id={formatNameToId(props.member)}
                      onClick={toggleContributionsList}
                      className={'name-text'}>
                    {props.member.name}
                </span>
                <div className={'button-container'}>
                    <button id={createButtonId(props.member)}
                            className={'button-small'}
                            onClick={addContributionOnClick}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
                {
                    showModal && <Modal onClose={modalOnClose}>
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
                                        submitContributionOnClick(contributionName, contributionAmount)
                                    }}>Add Amount
                            </button>
                        </div>
                    </Modal>
                }
            </div>
            <div>
                {
                    toggled && <div> {
                        props.member.contributions && props.member.contributions.map((contribution: Contribution) => {
                            return <ContributionListElement key={props.member.name + contribution.name} contribution={contribution}/>;
                        })
                    }</div>
                }
            </div>
        </div>
    </div>;
}
