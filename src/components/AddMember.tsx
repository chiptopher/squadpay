import * as React from "react";
import {Member} from "../models/Member";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import {InputWithLabel} from "./InputWithLabel";
import {useState} from "react";

import './AddMember.scss';

interface Props {

    onMemberSubmit(member: Member): void
}

export function AddMember(props: Props) {
    const [addingMember, setAddingMember] = useState(false);
    const [nameInput, setNameInput] = useState('');

    const toggleOnClick = () => {
        setAddingMember(true);
    };

    const saveOnClick = () => {
        props.onMemberSubmit({name: nameInput, contribution: 0.0});
        setAddingMember(false);
        setNameInput('');
    };

    const onNameInputChange = (event: any) => {
        setNameInput(event.target.value);
    };

    return <div className={'add-member'}>
        <div className={'button-container'}>
            <button className={addingMember ? 'confirm-button' : 'button'}
                    id={"squadMemberAddActivate"}
                    onClick={!addingMember ? toggleOnClick : saveOnClick}>
                {addingMember ?
                    <FontAwesomeIcon icon={faCheck}/> :
                    <FontAwesomeIcon icon={faPlus}/>}
            </button>
        </div>
        {
            addingMember && <div className={'add-member-info-container'}>
                <InputWithLabel label={'Name'}
                                id={'squadMemberAddName'}
                                type={'text'}
                                onChange={onNameInputChange}/>
            </div>
        }
    </div>

}
