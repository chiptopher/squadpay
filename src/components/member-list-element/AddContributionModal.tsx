import {Member} from "../../models/Member";
import * as React from "react";
import {useState} from "react";
import {Modal} from "../Modal";
import {InputWithLabel} from "../InputWithLabel";
import {createContributionId} from "./helpers";
import AnalyticsClient from "../../services/AnalyticsClient";

interface Props {
    onClose: () => void;
    onSubmit: (name: string, amount: number) => void;
    member: Member;
}

export const AddContributionModal: React.FunctionComponent<Props> = (props) => {
    const [contributionAmount, setContributionAmount] = useState(0.0);
    const [contributionName, setContributionName] = useState('');
    AnalyticsClient.modalView('Add Contribution Modal');
    return <Modal onClose={props.onClose}>
        <div>
            <InputWithLabel label={'Contribution Name'}
                            id={createContributionId(props.member) + '-name-input'}
                            placeholder={'Pizza and Drinks'}
                            onChange={(event: any) => {
                                setContributionName(event.target.value);
                            }}/>
            <InputWithLabel id={createContributionId(props.member) + '-input'}
                            label={'Contribution Amount'}
                            type={'number'}
                            placeholder={'32.50'}
                            onChange={(event: any) => {
                                setContributionAmount(Number(event.target.value));
                            }}/>
            <button id={createContributionId(props.member) + '-submit'} className={'button-small'}
                    onClick={() => {
                        props.onSubmit(contributionName, contributionAmount)
                    }}
                    data-testid="submit">
                Add Amount
            </button>
        </div>
    </Modal>
};
