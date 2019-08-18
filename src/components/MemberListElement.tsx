import * as React from "react";
import {addContributions, formatNameToId, Member} from "../models/Member";
import {Squad} from "../models/Squad";

import "./MemberListElement.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {Modal} from "./Modal";
import {useState} from "react";
import {InputWithLabel} from "./InputWithLabel";

interface Props {
    member: Member
    squad: Squad
    addContribution: (name: string, amount: number) => void
}

export function MemberListElement(props: Props) {
    const [showModal, setShowModal] = useState(false);
    const [contributionAmount, setContributionAmount] = useState(0.0);

    const createButtonId = () => formatNameToId(props.member) + '-contribution';
    const modalOnClose = () => {
        setShowModal(false)
    };
    const addContributionOnClick = () => {
        setShowModal(true)
    };
    const submitContributionOnClick = () => {
        modalOnClose();
        props.addContribution('', contributionAmount);
    };


    return <div className={"MemberListElement"}>
        <div id={props.member.name.replace(/\s+/g, "-")}>
            <div className={"memberHeader"}>
                <span className={'name-text'}>{props.member.name}</span>
                <div className={'button-container'}>
                    <button id={createButtonId()}
                            className={'button-small'}
                            onClick={addContributionOnClick}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
                {
                    showModal && <Modal onClose={modalOnClose}>
                        <div>
                            <InputWithLabel id={createButtonId() + '-input'}
                                            label={'Contribution Amount'}
                                            type={'number'}
                                            onChange={(event: any) => {
                                                setContributionAmount(Number(event.target.value));
                                            }}/>
                            <button id={createButtonId() + '-submit'} className={'button-small'} onClick={submitContributionOnClick}>Add Amount</button>
                        </div>
                    </Modal>
                }
            </div>
        </div>
    </div>;
}
