import * as React from "react";
import {Member} from "../models/Member";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import {InputWithLabel} from "./InputWithLabel";
import {useState} from "react";

import './AddMember.scss';
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import AnalyticsClient from "../services/AnalyticsClient";

interface Props {

    onMemberSubmit(member: Member): void
}

export function AddMember(props: Props) {
    const [addingMember, setAddingMember] = useState(false);
    const [nameInput, setNameInput] = useState('');

    const toggleOnClick = () => {
        setAddingMember(true);
        AnalyticsClient.event('Add Member', 'Toggle Input');
    };

    const saveOnClick = () => {
        props.onMemberSubmit(new Member(nameInput));
        setAddingMember(false);
        setNameInput('');
    };

    const onNameInputChange = (event: any) => {
        setNameInput(event.target.value);
    };

    const addingMemberForm = () => {
        return <div className={'add-member-info-container'}>
            <InputWithLabel label={'Name'}
                            id={'squadMemberAddName'}
                            type={'text'}
                            placeholder={'Squad Member'}
                            onChange={onNameInputChange}/>
        </div>;
    };

    return <div className={'add-member'}>
        <div className={'button-container'}>
            <button data-testid="add-person" className={addingMember ? 'confirm-button' : 'button'}
                    id={"squadMemberAddActivate"}
                    onClick={!addingMember ? toggleOnClick : saveOnClick}>
                {addingMember ?
                    <FontAwesomeIcon icon={faCheck}/> :
                    <FontAwesomeIcon icon={faUser}/>}
            </button>
        </div>
        {addingMember && addingMemberForm()}
    </div>

}
